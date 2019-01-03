const db = require('../database/database_server')

const url = require('url')

const queryString = require('querystring')

// 转换工作名称
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

// 获取待复核员工数据总数
function getReadyTotal(req, res) {

    db(`select count(*)count from worker_status where workerstatus = 'ready'`, (err, result) => {

        if (err) {

            console.log(err)

            return

        }

        res.send({

            msg: "ok",

            count: result.recordset[0].count

        })

    })

}

// 获取待复核员工数据
function getReady(req, res) {

    var arg = url.parse(req.url).query

    var params = queryString.parse(arg)

    var page = parseInt(params.id)

    var number = 8

    db(`select distinct worker_detail.fileNo, name, sex, first, second, third, jobname from worker_detail, mechanism, job, worker_status where worker_detail.fileNo = mechanism.fileNo and mechanism.fileNo = job.fileNo and job.fileNo = worker_status.fileNo and worker_status.workerstatus = 'ready' order by worker_detail.fileNo offset ${(page - 1) * number} rows fetch next ${number} rows only`, (err, result) => {

        if (err) {

            console.log(err)

            return

        }

        var data = {

            msg: 'ok',

            data: result.recordset

        }

        data.data.forEach((value) => {

            var obj = jobChange(value.first, value.second, value.third)

            value.first = obj.first

            value.second = obj.second

            value.third = obj.third

        })

        res.send(data)

    })

}

// 获取搜索结果
function search(req, res) {

    var data = {

        first: req.body.first || "%",

        second: req.body.second || "%",

        third: req.body.third || "%",

        jobtype: req.body.jobtype || "%",

        jobname: req.body.jobname || "%",

        start: req.body.start,

        end: req.body.end

    }

    db(`select distinct worker_detail.fileNo, name, sex, first, second, third, jobname, exist, workerstatus from worker_detail, mechanism, job, worker_status where mechanism.first like '${data.first}' and mechanism.second like '${data.second}' and mechanism.third like '${data.third}' and job.jobtype like '${data.jobtype}' and job.jobname like '${data.jobname}' and worker_detail.time between '${data.start}' and '${data.end}' and worker_detail.fileNo = mechanism.fileNo and mechanism.fileNo = job.fileNo and job.fileNo = worker_status.fileNo`, (err, result) => {

        if (err) {

            console.log(err)

            return

        }

        var value = {

            msg: "ok",

            data: result.recordset

        }

        value.data.forEach((value) => {

            var obj = jobChange(value.first, value.second, value.third)

            value.first = obj.first

            value.second = obj.second

            value.third = obj.third

        })

        res.send(value)

    })


}

// 上传职工信息
function upload(req, res) {

    var data = req.body

    var imageUrl = "http://localhost:8888/" + req.file.originalname

    db(`select max(right(fileNo,2))fileNo from mechanism`, (err, result) => {

        console.log(result)

        if (result.recordset[0].fileNo == null) {

            var number = "01"

        } else {

            if (parseInt(result.recordset[0].fileNo) < 10) {

                var number = "0" + (parseInt(result.recordset[0].fileNo) + 1)

            } else {

                var number = parseInt(result.recordset[0].fileNo) + 1 + ""

            }

        }

        var fileNo = "2018" + data.first + "" + data.second + "" + data.third + "" + number

        console.log(fileNo)

        new Promise((resolve, reject) => {

            db(`insert into mechanism values ('${fileNo}','${data.first}','${data.second}','${data.third}')`, (err, result) => {

                if (err) {

                    reject(err)

                }

                if (result.rowsAffected[0] >= 0) {

                    resolve()

                } else {

                    reject('error')

                }

            })

        }).then(() => {

            db(`insert into salary values ('${fileNo}','${data.standard}','${data.openingbank}','${data.account}','${data.loginman}')`, (err, result) => {

                if (err) {

                    reject(err)

                }

            })

        }).then(() => {

            db(`insert into address values ('${fileNo}','${data.address}','${data.code}')`, (err, result) => {

                if (err) {

                    reject(err)

                }
            })

        }).then(() => {

            db(`insert into experience values ('${fileNo}','${data.resume}','${data.homemessage}','${data.remark}')`, (err, result) => {

                if (err) {

                    reject(err)

                }

            })

        }).then(() => {

            db(`insert into job values ('${fileNo}','${data.jobtype}','${data.jobname}','${data.jobsay}')`, (err, result) => {

                if (err) {

                    reject(err)

                }

            })

        }).then(() => {

            db(`insert into worker_detail values ('${fileNo}','${data.name}','${data.sex}','${data.phone}','${data.socialcode}','${data.QQ}','${data.mobile}','${data.time}','${data.speciality}','${data.age}','${data.education}','${data.favor}','${data.country}','${data.birthplace}','${data.birthday}','${data.profession}','${data.nation}','${data.religion}','${data.political}','${data.idcard}','${data.educationlimit}','${imageUrl}','${data.email}')`, (err, result) => {

                if (err) {

                    reject(err)

                }


            })

        }).then(() => {

            db(`insert into worker_status values ('${fileNo}','ready','exist')`, (err, result) => {

                if (err) {

                    reject(err)

                }

                res.send({ msg: "ok" })

            })

        }).catch((err) => {

            console.log(err)

            res.send({ msg: 'err' })

        })

    })


}

// 复核职工信息
function update(req, res) {

    var data = req.body

    new Promise((resolve, reject) => {

        db(`update worker_detail set name = '${data.name}', sex = '${data.sex}',phone = '${data.phone}',socialcode = '${data.socialcode}',QQ = '${data.QQ}',mobile = '${data.mobile}',time = '${data.time}',speciality = '${data.speciality}',age = '${data.age}',education = '${data.education}',favor = '${data.favor}',country = '${data.country}',birthplace = '${data.birthplace}',profession = '${data.profession}',nation = '${data.nation}',religion = '${data.religion}',political = '${data.political}',idcard = '${data.idcard}',educationlimit = '${data.educationlimit}',head = '${data.head}',email = '${data.email}' where fileNo = '${data.fileNo}'`, (err, result) => {

            if (err) {

                reject(err)

            }

            resolve()

        })

    }).then(() => {

        db(`update salary set standard = '${data.standard}',openingbank = '${data.openingbank}',account = '${data.account}',loginman = '${data.loginman}' where fileNo = '${data.fileNo}'`, (err, result) => {

            if (err) {

                reject(err)

            }

        })

    }).then(() => {

        db(`update experience set resume = '${data.resume}',homemessage = '${data.homemessage}',remark = '${data.remark}' where fileNo = '${data.fileNo}'`, (err, result) => {

            if (err) {

                reject(err)

            }

        })

    }).then(() => {

        db(`update address set address = '${data.address}',code = '${data.code}' where fileNo = '${data.fileNo}'`, (err, result) => {

            if (err) {

                reject(err)

            }

        })

    }).then(() => {

        db(`update worker_status set workerstatus = 'ok' where fileNo = '${data.fileNo}'`, (err, result) => {

            if (err) {

                reject(err)

            }

            res.send({ msg: "ok" })


        })

    }).catch((err) => {

        console.lor(err)

        res.send({ msg: "error" })

    })

}

// 修改职工信息
function correct(req, res) {

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

}

// 将职工档案状态设置为not exist
function deleted(req, res) {

    var data = req.body

    db(`update worker_status set exist = 'not exist' where fileNo = '${data.fileNo}'`, (err, result) => {

        res.send({msg:"ok"})

    })

}

// 将职工档案状态设置为exist
function recover(req, res) {

    var data = req.body

    db(`update worker_status set exist = 'exist' where fileNo = '${data.fileNo}'`, (err, result) => {

        res.send({msg:"ok"})

    })

}

// 获取职工详情
function getDetail(req, res) {

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

}

module.exports = {

    getReadyTotal: getReadyTotal,

    getReady: getReady,

    search: search,

    upload: upload,

    update: update,

    correct: correct,

    deleted: deleted,

    recover: recover,

    getDetail: getDetail

}
