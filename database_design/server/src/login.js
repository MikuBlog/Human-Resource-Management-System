const db = require('../database/database_server')

function login(req, res) {

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

}

module.exports = {

    login: login

}