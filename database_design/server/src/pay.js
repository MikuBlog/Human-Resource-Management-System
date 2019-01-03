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

// 获取待登记酬薪数据总数
function getSalaryReadyTotal(req, res) {

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

}

// 获取酬薪登记员工数据总数
function getStandardReadyTotal(req, res) {

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

}

// 获取待复核酬薪标准数据
function getStandardReady(req, res) {

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

}

// 请求待复核薪酬发放信息
function getSalary(req, res) {

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

}

// 获取当前最大的酬薪编号
function getStandardNo(req, res) {

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

}

// 获取该酬薪下的所有员工信息
function getsalaryWorker(req, res) {

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

}

// 获取酬薪复核搜索结果
function searchSalary(req, res) {

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

}

// 获取酬薪标准搜索结果
function searchStandard(req, res) {

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

}

// 更新薪酬总额
function updateSumary(req, res) {

    var data = req.body

    db(`update grant_money set sumary = '${data.sumary}', status = 'ok' where grantNo = '${data.grantNo}'`, (err, result) => {

        if(err) {

                eject(err)

        }

        res.send({msg:"ok"})

    })

}

// 登记酬薪信息
function loginSalary(req, res) {

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

}

// 更新酬薪标准总价
function updateStandardTotal(req, res) {

    var data = req.body

    console.log(data)

    db(`update standard set standardtotal = '${data.standardtotal}' where standardNo = '${data.standardNo}'`, (err,result) => {

        if(err) {

            console.log(err)

            return

        }

        res.send({msg:"ok"})

    })

}

// 复核薪酬信息
function updateStandard(req, res) {

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

}

// 修改薪酬信息
function correctStandard(req, res) {

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

}

// 获取酬薪标准详情
function getStandardDetail(req, res) {

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

}

// 上传酬薪标准数据
function uploadStandard(req, res) {

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

}

module.exports = {

    getSalaryReadyTotal: getSalaryReadyTotal,

    getStandardReadyTotal: getStandardReadyTotal,

    getStandardReady: getStandardReady,

    getSalary: getSalary,

    getStandardNo: getStandardNo,

    getsalaryWorker: getsalaryWorker,

    searchSalary: searchSalary,

    searchStandard: searchStandard,

    updateSumary: updateSumary,

    loginSalary: loginSalary,

    updateStandardTotal: updateStandardTotal,

    updateStandard: updateStandard,

    correctStandard: correctStandard,

    getStandardDetail: getStandardDetail,

    uploadStandard: uploadStandard

}