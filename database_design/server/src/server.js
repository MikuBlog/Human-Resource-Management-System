const db = require('../database/database_server')

const url = require('url')

const queryString = require('querystring')

const bodyParser = require('body-parser')

const express = require('express')

const middleWare = require('./middleware')

const app = express()

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.use(express.static(__dirname+'/../static/images'))

function jobChange(first, second, third) {

    var obj = {}

    switch(first) {

        case '01':obj.first = '集团';break;

        case '02':obj.first = '司法厅';break;

    }

    switch(second) {

        case '01':obj.second = '互联网公司';break;

        case '02':obj.second = '娱乐公司';break;

        case '03':obj.second = '电子公司';break;

    }

    switch(third) {

        case '01':obj.third = '运维组';break;

        case '02':obj.third = 'UI组';break;

        case '03':obj.third = '前端组';break;

        case '04':obj.third = '后台组';break;

        case '05':obj.third = '数据分析组';break;

        case '06':obj.third = '人工智能组';break;

        case '07':obj.third = '嵌入式系统组';break;

        case '08':obj.third = '游戏开发组';break;

    }

    return obj

}

// 获取待登记酬薪数据总数
app.get('/getsalaryreadytotal', (req, res) => {

    db(`select count(*)count from grant_money where status = 'ready'`, (err, result) => {

        if(err) {

            console.log(err)

            return

        }

        res.send({

            msg:"ok",

            count:result.recordset[0].count

        })

    })

})

// 获取待复核员工数据总数
app.get('/getreadytotal', (req, res) => {

    db(`select count(*)count from worker_status where workerstatus = 'ready'`, (err, result) => {

        if(err) {

            console.log(err)

            return

        }

        res.send({

            msg:"ok",

            count:result.recordset[0].count

        })

    })

})

// 获取酬薪登记员工数据总数
app.get('/getstandardreadytotal', (req, res) => {

    db(`select count(*)count from standard where status = 'ready'`, (err, result) => {

        if(err) {

            console.log(err)

            return

        }

        res.send({

            msg:"ok",

            count:result.recordset[0].count

        })

    })

})

// 获取待复核员工数据
app.get('/getready', (req, res) => {

    var arg = url.parse(req.url).query

    var params =  queryString.parse(arg)

    var page =parseInt(params.id)

    var number = 8

    db(`select distinct worker_detail.fileNo, name, sex, first, second, third, jobname from worker_detail, mechanism, job, worker_status where worker_detail.fileNo = mechanism.fileNo and mechanism.fileNo = job.fileNo and job.fileNo = worker_status.fileNo and worker_status.workerstatus = 'ready' order by worker_detail.fileNo offset ${(page-1)*number} rows fetch next ${number} rows only`,(err, result) => {

        if(err) {

            console.log(err)

            return

        }

        console.log(result)

        var data = {

            msg:'ok',

            data:result.recordset

        }

        data.data.forEach((value) => {

            var obj = jobChange(value.first,value.second,value.third)

            value.first = obj.first
            
            value.second = obj.second

            value.third = obj.third

        })

        res.send(data)

    })

})

// 获取待复核酬薪标准数据
app.get('/getstandardready', (req, res) => {

    var arg = url.parse(req.url).query

    var params =  queryString.parse(arg)

    var page =parseInt(params.id)

    var number = 8

    db(`select * from worker_detail,standard where status = 'ready' and standard.fileNo = worker_detail.fileNo order by standard.standardNo offset ${(page-1)*number} rows fetch next ${number} rows only`, (err, result) => {

        if(err) {

            console.log(err)

            return

        }

        res.send({

            msg:"ok",

            data:result.recordset

        })

    })

})

// 请求待复核薪酬发放信息
app.get('/getsalary', (req, res) => {

    var arg = url.parse(req.url).query

    var params =  queryString.parse(arg)

    var page =parseInt(params.id)

    var number = 8

    db(`select * from grant_money where status = 'ready' order by grant_money.grantNo offset ${(page-1)*number} rows fetch next ${number} rows only`, (err, result) => {

        if(err) {

            console.log(err)

            res.send({

                msg:"error"

            })

        }

        var data = {

            msg:"ok",

            data:result.recordset

        }

        data.data.forEach((value) => {

            var obj = jobChange(value.first, value.second, value.third)

            value.first = obj.first

            value.second = obj.second

            value.third = obj.third

        })

        res.send(data)

    })

})

// 获取当前最大的酬薪编号
app.get('/getstandardno', (req, res) => {

    db(`select max(standardNo)standardNo from standard`, (err, result) => {

        if(err) {

            console.log(err)

            return

        }

        if(result.recordset[0].standardNo == null) {

            res.send({

                msg:"ok",

                standardNo:"100000000001"

            })

        }else {

            res.send({

                msg:"ok",

                standardNo:parseInt(result.recordset[0].standardNo) + 1 + ""

            })

        }

    })

})

// 获取该酬薪下的所有员工信息
app.post('/getsalaryworker', bodyParser.urlencoded({extended:false}), (req, res) => {

    var No = req.body.grantNo

    var dataArray = []

    db(`select standard.fileNo, standard.standardtotal,standard.grantNo,worker_detail.name,standard_items.* from standard, standard_items, worker_detail where grantNo = '${No}' and standard.fileNo = worker_detail.fileNo and standard.standardNo = standard_items.standardNo `, (err, result) => {

        if(err) {

            console.log(err)

            return

        }

        res.send({

            msg:"ok",

            data:result.recordset
    
        })

    })

})

// 获取酬薪复核搜索结果
app.post('/searchsalary', bodyParser.urlencoded({extended:false}), (req, res) => {

    var data = req.body

    db(`select * from grant_money where grantNo like '%${data.grantNo}%' and (first like '%${data.keywords}%' or second like '%${data.keywords}%' or third like '%${data.keywords}%' or people like '%${data.keywords}%')`, (err, result) => {

        if(err) {

            console.log(err)

            return

        }

        var data = {

            msg:"ok",

            data:result.recordset

        }

        data.data.forEach((value) => {

            var obj = jobChange(value.first, value.second, value.third)

            value.first = obj.first

            value.second = obj.second

            value.third = obj.third

        })

        res.send(data)

    })

})

// 获取酬薪标准搜索结果
app.post('/searchstandard', bodyParser.urlencoded({extended:false}), (req, res) => {

    var data = req.body

    db(`select * from worker_detail,standard where standard.fileNo = worker_detail.fileNo and standardNo like '%${data.standardNo}%' and logintime between '${data.start}' and '${data.end}' and (loginname like '%${data.keywords}%' or worker_detail.name like '%${data.keywords}%' or standardname like '%${data.keywords}%')`, (err, result) => {

        if(err) {

            console.log(err)

            return

        }

        res.send({
            
            msg:"ok",
    
            data:result.recordset
    
        })

    })

})

// 获取搜索结果
app.post('/search', bodyParser.urlencoded({extended:false}), (req, res) => {

    var data = {

        first:req.body.first || "%",

        second:req.body.second || "%",

        third:req.body.third || "%",

        jobtype:req.body.jobtype || "%",

        jobname:req.body.jobname || "%",

        start:req.body.start,

        end:req.body.end

    }

    db(`select distinct worker_detail.fileNo, name, sex, first, second, third, jobname, exist, workerstatus from worker_detail, mechanism, job, worker_status where mechanism.first like '${data.first}' and mechanism.second like '${data.second}' and mechanism.third like '${data.third}' and job.jobtype like '${data.jobtype}' and job.jobname like '${data.jobname}' and worker_detail.time between '${data.start}' and '${data.end}' and worker_detail.fileNo = mechanism.fileNo and mechanism.fileNo = job.fileNo and job.fileNo = worker_status.fileNo`,(err, result) => {

        if(err) {

            console.log(err)

            return

        }

        var value = {

            msg:"ok",

            data:result.recordset

        }

        value.data.forEach((value) => {

            var obj = jobChange(value.first,value.second,value.third)

            value.first = obj.first
            
            value.second = obj.second

            value.third = obj.third

        })

        res.send(value)

    })

})

// 上传职工信息
app.post('/upload', middleWare.uploadImage.single('image'), (req, res) => {

    var data = req.body

    var imageUrl = "http://localhost:8888/"+req.file.originalname

    db(`select max(right(fileNo,2))fileNo from mechanism`, (err,result) => {

        console.log(result)

        if(result.recordset[0].fileNo == null){ 

            var number = "01"

        }else {

            if(parseInt(result.recordset[0].fileNo) < 10) {

                var number = "0" + (parseInt(result.recordset[0].fileNo) + 1)

            }else {

                var number = parseInt(result.recordset[0].fileNo) + 1 +""

            }

        }

        var fileNo = "2018"+data.first+""+data.second+""+data.third+""+number

        console.log(fileNo)

        new Promise((resolve, reject) => {

            db(`insert into mechanism values ('${fileNo}','${data.first}','${data.second}','${data.third}')`,(err,result) => {

                    if(err) {
                
                        reject(err)
                
                    }
            
                    if(result.rowsAffected[0] >= 0) {
            
                        resolve()
            
                    }else {
            
                        reject('error')
            
                    }
                
            })

        }).then(() => {

            db(`insert into salary values ('${fileNo}','${data.standard}','${data.openingbank}','${data.account}','${data.loginman}')`,(err,result) => {

                    if(err) {
                
                        reject(err)
                
                    }
                
            })

        }).then(() => {

            db(`insert into address values ('${fileNo}','${data.address}','${data.code}')`,(err,result) => {

                    if(err) {
                
                        reject(err)
                
                    }
            })

        }).then(() => {

            db(`insert into experience values ('${fileNo}','${data.resume}','${data.homemessage}','${data.remark}')`,(err,result) => {

                    if(err) {
                
                        reject(err)
                
                    }

            })

        }).then(() => {

            db(`insert into job values ('${fileNo}','${data.jobtype}','${data.jobname}','${data.jobsay}')`,(err,result) => {

                    if(err) {
                
                        reject(err)
                
                    }
                
            })

        }).then(() => {

            db(`insert into worker_detail values ('${fileNo}','${data.name}','${data.sex}','${data.phone}','${data.socialcode}','${data.QQ}','${data.mobile}','${data.time}','${data.speciality}','${data.age}','${data.education}','${data.favor}','${data.country}','${data.birthplace}','${data.birthday}','${data.profession}','${data.nation}','${data.religion}','${data.political}','${data.idcard}','${data.educationlimit}','${imageUrl}','${data.email}')`,(err,result) => {

                    if(err) {
                
                        reject(err)
                
                    }

                
            })

        }).then(() => {

            db(`insert into worker_status values ('${fileNo}','ready','exist')`,(err,result) => {

                if(err) {
            
                    reject(err)
            
                }
        
                res.send({msg:"ok"})
            
        })

        }).catch((err) => {

            console.log(err)

            res.send({msg:'err'})

        })
        
    })

})

// 更新薪酬总额
app.post('/updatesumary', bodyParser.urlencoded({extended:false}), (req, res) => {

    var data = req.body

    db(`update grant_money set sumary = '${data.sumary}', status = 'ok' where grantNo = '${data.grantNo}'`, (err, result) => {

        if(err) {

                eject(err)

        }

        res.send({msg:"ok"})

    })

})

// 登记酬薪信息
app.post('/loginsalary', bodyParser.urlencoded({extended:false}), (req, res) => {


    var data = req.body

    new Promise((resolve, reject) => {

        db(`update standard_items set basic = '${data.basic}',traffic = '${data.traffic}',lunch = '${data.lunch}',communication = '${data.communication}',pension = '${data.pension}',unemployment = '${data.unemployment}',medical = '${data.medical}',housing = '${data.housing}',reward = '${data.reward}',reducereward = '${data.reducereward}' where standard_items.standardNo = '${data.standardNo}'`, (err, result) => {

            if(err) {

                reject(err)

            }

            res.send("ok")

        })

    }).catch((err) => {

        console.log(err)

        res.send({msg:"error"})

    })

})

// 更新酬薪标准总价
app.post('/updatestandardtotal', bodyParser.urlencoded({extended:false}), (req, res) => {

    var data = req.body

    console.log(data)

    db(`update standard set standardtotal = '${data.standardtotal}' where standardNo = '${data.standardNo}'`, (err,result) => {

        if(err) {

            console.log(err)

            return

        }

        res.send({msg:"ok"})

    })

})

// 复核薪酬信息
app.post('/updatestandard', bodyParser.urlencoded({extended:false}), (req, res) => {

    var data = req.body

    new Promise((resolve, reject) => {

        db(`update standard set standardname = '${data.standardname}', loginname = '${data.loginname}', standardtotal = '${data.standardtotal}', status = 'ok' where standardNo = '${data.standardNo}'`, (err, result) => {

            if(err) {

                reject(err)

            }

            resolve()

        })

    }).then(() => {

        db(`update standard_items set basic = '${data.basic}', traffic = '${data.traffic}', lunch = '${data.lunch}', communication = '${data.communication}', pension = '${data.pension}', unemployment = '${data.unemployment}', medical = '${data.medical}', housing = '${data.housing}', reward = '${data.reward}', reducereward = '${data.reducereward}' where standardNo = '${data.standardNo}'`, (err, result) => {

            if(err) {

                reject(err)


            }

        })

    }).then(() => {

        db(`select first, second, third from mechanism where fileNo = '${data.fileNo}'`, (err, result) => {

            if(err) {

                reject(err)

            }

            var result_1 = result.recordset[0]

            db(`select count(*)count, grantNo from grant_money where first = '${result_1.first}' and second = '${result_1.second}' and third = '${result_1.third}' and status = 'ready' group by grantNo`, (err, result) => {

                if(err) {

                    reject(err)

                }

                console.log(result)

                if(result.recordset.length == 0) {

                    db(`select max(grantNo)grantNo from grant_money`, (err, result) => {

                        if(err) {

                            reject(err)

                        }

                        var number = result.recordset[0].grantNo

                        if(result.recordset[0].grantNo == null) {

                            db(`insert into grant_money values ('100000000001','${result_1.first}','${result_1.second}','${result_1.third}','1','${data.standardtotal}','ready')`, (err, result) => {

                                if(err) {
        
                                    reject(err)
        
                                }

                                db(`update standard set grantNo = '100000000001' where standardNo = '${data.standardNo}'`, (err, result) => {

                                    if(err) {

                                        reject(err)

                                    }

                                    res.send({msg:"ok"})

                                })
        
                            })

                        }else {

                            db(`insert into grant_money values ('${parseInt(number)+1}','${result_1.first}','${result_1.second}','${result_1.third}','1','${data.standardtotal}','ready')`, (err, result) => {

                                if(err) {
        
                                    reject(err)
        
                                }
        
                                db(`update standard set grantNo = '${parseInt(number)+1}' where standardNo = '${data.standardNo}'`, (err, result) => {

                                    if(err) {

                                        reject(err)

                                        return

                                    }

                                    res.send({msg:"ok"})

                                })
        
                            })

                        }

                    })

                }else {

                    var result_2 = result.recordset[0].grantNo

                    db(`update grant_money set people = people + 1, sumary = sumary + '${data.standardtotal}' where first = '${result_1.first}' and second = '${result_1.second}' and third = '${result_1.third}'`, (err, result) => {

                        if(err) {

                            reject(err)

                        }

                        db(`update standard set grantNo = '${result_2}' where standardNo = '${data.standardNo}'`, (err, result) => {

                            if(err) {

                                reject(err)

                                return

                            }

                            res.send({msg:"ok"})

                        })

                    })

                }

            })

        })

    }).catch((err) => {

        console.log(err)

        res.send({msg:"error"})

    })

})

// 复核职工信息
app.post('/update', bodyParser.urlencoded({extended:false}), (req, res) => {

    var data = req.body

    new Promise((resolve, reject) => {

        db(`update worker_detail set name = '${data.name}', sex = '${data.sex}',phone = '${data.phone}',socialcode = '${data.socialcode}',QQ = '${data.QQ}',mobile = '${data.mobile}',time = '${data.time}',speciality = '${data.speciality}',age = '${data.age}',education = '${data.education}',favor = '${data.favor}',country = '${data.country}',birthplace = '${data.birthplace}',profession = '${data.profession}',nation = '${data.nation}',religion = '${data.religion}',political = '${data.political}',idcard = '${data.idcard}',educationlimit = '${data.educationlimit}',head = '${data.head}',email = '${data.email}' where fileNo = '${data.fileNo}'`, (err, result) => {

            if(err) {
                
                reject(err)
        
            }

            resolve()

        })

    }).then(() => {

        db(`update salary set standard = '${data.standard}',openingbank = '${data.openingbank}',account = '${data.account}',loginman = '${data.loginman}' where fileNo = '${data.fileNo}'`,  (err, result) => {

            if(err) {
                
                reject(err)
        
            }

        })

    }).then(() => {

        db(`update experience set resume = '${data.resume}',homemessage = '${data.homemessage}',remark = '${data.remark}' where fileNo = '${data.fileNo}'`,  (err, result) => {

            if(err) {
                
                reject(err)
        
            }

        })

    }).then(() => {

        db(`update address set address = '${data.address}',code = '${data.code}' where fileNo = '${data.fileNo}'`,  (err, result) => {

            if(err) {
                
                reject(err)
        
            }
    
        })

    }).then(() => {

        db(`update worker_status set workerstatus = 'ok' where fileNo = '${data.fileNo}'`,  (err, result) => {

            if(err) {
                
                reject(err)
        
            }
    
            res.send({msg:"ok"})
    

        })

    }).catch((err) => {

        console.lor(err)

        res.send({msg:"error"})

    }) 

})

// 修改薪酬信息
app.post('/correctstandard', bodyParser.urlencoded({extended:false}), (req, res) => {

    var data = req.body

    new Promise((resolve, reject) => {

        db(`update standard set standardname = '${data.standardname}', loginname = '${data.loginname}', standardtotal = '${data.standardtotal}', status = 'ready' where standardNo = '${data.standardNo}'`, (err, result) => {

            if(err) {

                reject(err)

            }

            resolve()

        })

    }).then(() => {

        db(`update standard_items set basic = '${data.basic}', traffic = '${data.traffic}', lunch = '${data.lunch}', communication = '${data.communication}', pension = '${data.pension}', unemployment = '${data.unemployment}', medical = '${data.medical}', housing = '${data.housing}', reward = '${data.reward}', reducereward = '${data.reducereward}' where standardNo = '${data.standardNo}'`, (err, result) => {

            if(err) {

                reject(err)


            }

        })

    }).then(() => {

        db(`select first, second, third from mechanism where fileNo = '${data.fileNo}'`, (err, result) => {

            if(err) {

                reject(err)

            }

            var result_1 = result.recordset[0]

            db(`select count(*)count from grant_money where first = '${result_1.first}' and second = '${result_1.second}' and third = '${result_1.third}' and status = 'ready'`, (err, result) => {

                if(err) {

                    reject(err)

                }

                if(result.recordset[0].count == 0) {

                    db(`select max(grantNo)grantNo from grant_money`, (err, result) => {

                        if(err) {

                            reject(err)

                        }

                        if(result.recordset[0].grantNo == null) {

                            db(`insert into grant_money values ('100000000001','${result_1.first}','${result_1.second}','${result_1.third}','1','${data.standardtotal}','ready')`, (err, result) => {

                                if(err) {
        
                                    reject(err)
        
                                }
        
                                res.send({msg:"ok"})
        
                            })

                        }else {

                            db(`insert into grant_money values ('${parseInt(result.recordset[0].grantNo)+1}','${result_1.first}','${result_1.second}','${result_1.third}','1','${data.standardtotal}','ready')`, (err, result) => {

                                if(err) {
        
                                    reject(err)
        
                                }
        
                                res.send({msg:"ok"})
        
                            })

                        }

                    })

                }else {

                    db(`update grant_money set people = people - 1, sumary = sumary - '${data.standardtotal}' where first = '${result_1.first}' and second = '${result_1.second}' and third = '${result_1.third}'`, (err, result) => {

                        if(err) {

                            reject(err)

                        }

                        res.send({msg:"ok"})

                    })

                }

            })

        })

    }).catch((err) => {

        console.log(err)

        res.send({msg:"error"})

    })

})

// 修改职工信息
app.post('/correct', bodyParser.urlencoded({extended:false}), (req, res) => {

    var data = req.body

    new Promise((resolve, reject) => {

        db(`update worker_detail set name = '${data.name}', sex = '${data.sex}',phone = '${data.phone}',socialcode = '${data.socialcode}',QQ = '${data.QQ}',mobile = '${data.mobile}',time = '${data.time}',speciality = '${data.speciality}',age = '${data.age}',education = '${data.education}',favor = '${data.favor}',country = '${data.country}',birthplace = '${data.birthplace}',profession = '${data.profession}',nation = '${data.nation}',religion = '${data.religion}',political = '${data.political}',idcard = '${data.idcard}',educationlimit = '${data.educationlimit}',head = '${data.head}',email = '${data.email}' where fileNo = '${data.fileNo}'`, (err, result) => {

            if(err) {
                
                reject(err)
        
            }

            resolve()

        })

    }).then(() => {

        db(`update salary set standard = '${data.standard}',openingbank = '${data.openingbank}',account = '${data.account}',loginman = '${data.loginman}' where fileNo = '${data.fileNo}'`,  (err, result) => {

            if(err) {
                
                reject(err)
        
            }

        })

    }).then(() => {

        db(`update experience set resume = '${data.resume}',homemessage = '${data.homemessage}',remark = '${data.remark}' where fileNo = '${data.fileNo}'`,  (err, result) => {

            if(err) {
                
                reject(err)
        
            }

        })

    }).then(() => {

        db(`update address set address = '${data.address}',code = '${data.code}' where fileNo = '${data.fileNo}'`,  (err, result) => {

            if(err) {
                
                reject(err)
        
            }
    
        })

    }).then(() => {

        db(`update worker_status set workerstatus = 'ready' where fileNo = '${data.fileNo}'`,  (err, result) => {

            if(err) {
                
                reject(err)
        
            }
    
            res.send({msg:"ok"})
    

        })

    }).catch((err) => {

        console.lor(err)

        res.send({msg:"error"})

    }) 

})

// 将职工档案状态设置为not exist
app.post('/delete', bodyParser.urlencoded({extended:false}), (req, res) => {

    var data = req.body

    db(`update worker_status set exist = 'not exist' where fileNo = '${data.fileNo}'`, (err, result) => {

        res.send({msg:"ok"})

    })

})

// 将职工档案状态设置为not exist
app.post('/recover', bodyParser.urlencoded({extended:false}), (req, res) => {

    var data = req.body

    db(`update worker_status set exist = 'exist' where fileNo = '${data.fileNo}'`, (err, result) => {

        res.send({msg:"ok"})

    })

})
 
// 获取酬薪标准详情
app.post('/getstandarddetail', bodyParser.urlencoded({extended:false}), (req, res) => {

    var data = req.body

    db(`select standard.loginname,standard.logintime,standard.standardtotal,standard.standardname,standard.fileNo,standard_items.*  from standard, standard_items where standard.standardNo = standard_items.standardNo and standard.standardNo = '${data.standardNo}'`, (err, result) => {

        if(err) {

            console.log(err)

            return

        }

        res.send({

            msg:"ok",

            data:result.recordset[0]

        })

    })

})

// 获取职工详情
app.post('/getdetail', bodyParser.urlencoded({extended:false}), (req, res) => {

    db(`select distinct * from worker_detail, job, salary, mechanism, experience, address, worker_status where worker_detail.fileNo = '${req.body.fileNo}' and worker_detail.fileNo = mechanism.fileNo and mechanism.fileNo = job.fileNo and job.fileNo = worker_status.fileNo and worker_status.fileNo = salary.fileNo and salary.fileNo = experience.fileNo and experience.fileNo = address.fileNo `, (err, result) => {

        if(err) {

            console.log(err)

            return
            
        }

        var data = {

            msg:"ok",

            data:result.recordset[0]

        }

        var obj = jobChange(data.data.first, data.data.second, data.data.third)

        data.data.first = obj.first

        data.data.second = obj.second

        data.data.third = obj.third

        res.send(data)

    })

})

// 使用者登录
app.post('/login', bodyParser.urlencoded({extended:false}), (req, res) => {

    db(`select * from manager where loginName = '${req.body.username}' and password = '${req.body.password}'`,(err,result) => {

        if(err) {
    
            console.log(err)

            res.send({

                msg:"error"

            })
    
            return
    
        }

        if(result.recordsets[0][0] != null) {

            var data = {

                msg:"ok",
    
                data:result.recordsets[0][0]
    
            }
        
            res.send(data)

        }else {

            res.send({

                msg:"error"

            })

        }
    
    })

})

// 上传酬薪标准数据
app.post('/uploadstandard', bodyParser.urlencoded({extended:false}), (req, res) => {

    var data = req.body

    new Promise((resolve, reject) => {

        db(`select workerstatus, exist from worker_status where fileNo = '${data.fileNo}'`, (err, result) => {

            if(err) {

                reject(err)

            }

            if(result.recordset[0].workerstatus == 'ok' && result.recordset[0].exist == 'exist') {

                db(`insert into standard values ('${data.standardNo}','${data.loginname}','${data.logintime}','${data.standardtotal}','${data.fileNo}','ready','${data.standardname}','')`, (err, result) => {

                    if(err) {
        
                        reject(err)
        
                    }
        
                    resolve()
        
                })

            }else {

                reject('错误')

            }

        })

    }).then(() => {

        db(`insert into standard_items values ('${data.standardNo}','${data.basic}','${data.traffic}','${data.lunch}','${data.communication}','${data.pension}','${data.unemployment}','${data.medical}','${data.housing}','${data.reward}','${data.reducereward}')`, (err, result) => {

            if(err) {

                reject(err)

            }

        })

    }).then(() => {

        db(`update salary set standard = '${data.standardNo}' where fileNo = '${data.fileNo}'`, (err, result) => {

            if(err) {

                reject(err)

            }

            res.send({msg:'ok'})

        })

    }).catch((err) => {

        console.log(err)

        res.send({msg:"error"})

    })

})




.listen(8888)