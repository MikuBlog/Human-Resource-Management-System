// 引入sql server数据库操作模块
const sqlserver = require('mssql');

// 配置数据库信息
const dbConfig = {

    // 服务器名
    server: "localhost",
    // 数据库名称
    database: "people_resoures",
    // 登录名
    user: 'xuanzai',
    // 登录密码
    password: 'wen289138',
    // 登录端口号
    port: 1433

};

// 连接数据库
sqlserver.connect(dbConfig).catch((err) => {

    callback(err,null)

});
 
 
// 创建数据库请求
function query(strsql, callback) {

    const req = new sqlserver.Request().query(strsql).then((recordset) => {

        callback(null,recordset)
    
    }).catch((err) => {
    
        console.log(err,null);
    
    });

}

 
// 导出数据库对象
module.exports = query;
