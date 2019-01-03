const bodyParser = require('body-parser')

const express = require('express')

const middleWare = require('./src/middleware')

const personnelMatters = require('./src/personnel_matters')

const pay = require('./src/pay')

const login  = require('./src/login')

const app = express()

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.use(express.static(__dirname+'/static/images'))


/*----------------------------员工信息------------------------------ */

// 获取待复核员工数据总数
app.get('/getreadytotal', personnelMatters.getReadyTotal)

// 获取待复核员工数据
app.get('/getready', personnelMatters.getReady)

// 获取搜索结果
app.post('/search', bodyParser.urlencoded({extended:false}), personnelMatters.search)

// 上传职工信息
app.post('/upload', middleWare.uploadImage.single('image'), personnelMatters.upload)

// 修改职工信息
app.post('/correct', bodyParser.urlencoded({extended:false}), personnelMatters.correct)

// 将职工档案状态设置为not exist
app.post('/delete', bodyParser.urlencoded({extended:false}), personnelMatters.deleted)

// 将职工档案状态设置为exist
app.post('/recover', bodyParser.urlencoded({extended:false}), personnelMatters.recover)

// 获取职工详情
app.post('/getdetail', bodyParser.urlencoded({extended:false}), personnelMatters.getDetail)

// 复核职工信息
app.post('/update', bodyParser.urlencoded({extended:false}), personnelMatters.update)


/*----------------------------员工薪酬------------------------------ */

// 获取酬薪登记员工数据总数
app.get('/getstandardreadytotal', pay.getStandardReadyTotal)

// 获取待登记酬薪数据总数
app.get('/getsalaryreadytotal', pay.getSalaryReadyTotal)

// 获取待复核酬薪标准数据
app.get('/getstandardready', pay.getStandardReady)

// 请求待复核薪酬发放信息
app.get('/getsalary', pay.getSalary)

// 获取当前最大的酬薪编号
app.get('/getstandardno', pay.getStandardNo)

// 获取该酬薪下的所有员工信息
app.post('/getsalaryworker', bodyParser.urlencoded({extended:false}), pay.getsalaryWorker)

// 获取酬薪复核搜索结果
app.post('/searchsalary', bodyParser.urlencoded({extended:false}), pay.searchSalary)

// 获取酬薪标准搜索结果
app.post('/searchstandard', bodyParser.urlencoded({extended:false}), pay.searchStandard)

// 更新薪酬总额
app.post('/updatesumary', bodyParser.urlencoded({extended:false}), pay.updateSumary)

// 登记酬薪信息
app.post('/loginsalary', bodyParser.urlencoded({extended:false}), pay.loginSalary)

// 更新酬薪标准总价
app.post('/updatestandardtotal', bodyParser.urlencoded({extended:false}), pay.updateStandardTotal)

// 复核薪酬信息
app.post('/updatestandard', bodyParser.urlencoded({extended:false}), pay.updateStandard)

// 修改薪酬信息
app.post('/correctstandard', bodyParser.urlencoded({extended:false}), pay.correctStandard)
 
// 获取酬薪标准详情
app.post('/getstandarddetail', bodyParser.urlencoded({extended:false}), pay.getStandardDetail)

// 使用者登录
app.post('/login', bodyParser.urlencoded({extended:false}), login.login)

// 上传酬薪标准数据
app.post('/uploadstandard', bodyParser.urlencoded({extended:false}), pay.uploadStandard)


.listen(8888)