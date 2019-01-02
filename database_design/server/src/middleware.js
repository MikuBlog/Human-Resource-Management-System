
//引入模块用于将utf-8转码为中文字符
var iconv = require('iconv-lite')

//引入文件解析模块
var multipart = require('connect-multiparty')

//引入文件解析模块
var multer = require('multer')

//配置图片中间件
var RamImage = multer.diskStorage({

	destination:function(req,file,callback){

		//第二个参数设置路径，下面的路径为server.js所在目录的相对路径
        callback(null,__dirname+'/../static/images')
        
    },
    
	filename:function(req,file,callback){

		//第二个参数设置文件名，下面的文件名为上传时的文件名
        callback(null,file.originalname)
        
    }
    
})

//配置照片中间件
var RamVideo = multer.diskStorage({

	destination:function(req,file,callback){

		//第二个参数设置路径，下面的路径为server.js所在目录的相对路径
        callback(null,__dirname+'/../../source/videos')
        
    },
    
	filename:function(req,file,callback){

		//第二个参数设置文件名，下面的文件名为上传时的文件名
        callback(null,file.originalname)
        
    }
    
})

//配置文件中间件
var RamFile = multer.diskStorage({

	destination:function(req,file,callback){

		//第二个参数设置路径，下面的路径为server.js所在目录的相对路径
        callback(null,__dirname+'/../../source/files')
        
    },
    
	filename:function(req,file,callback){

		//第二个参数设置文件名，下面的文件名为上传时的文件名
        callback(null,file.originalname)
        
    }
    
})

//配置照片对象
uploadImage = multer({storage:RamImage})

//配置视频对象
uploadVideo = multer({storage:RamVideo})

//配置文件对象
uploadFile = multer({storage:RamFile})

//获取中间件数据
function getData(req,res,next) {

    var array = []

    req.on('data',function(chunk) {

        array.push(chunk)

    }).on('end',function() {

        //将Buffer数据转换为utf-8编码
        req.rawBody = iconv.decode(Buffer.concat(array),"utf-8")   

        //将utf-8编码转编为字符串
        req.body = decodeURIComponent(req.rawBody)

        next()

    })

}

//新版获取数据中间件
function getDataNewVersion(req,res,next) {

    var array = []

    req.on('data',function(chunk) {

        array.push(chunk)

    }).on('end',function() {

        //将Buffer数据转换为utf-8编码,并转换为字符串
        req.rawBody = decodeURIComponent(iconv.decode(Buffer.concat(array),"utf-8"))

        req.body = {}

        var list = req.rawBody.split('&')

        list.forEach(function(value) {

            var array =  value.split('=')
            
            var key = array[0]
            
            var val = array[1]
            
            req.body[key] = val

        })

        next()

    })

}

//获取formData数据
var multipartMiddleware = multipart();

module.exports = {

    getData:getData,

    multipartMiddleware:multipartMiddleware,

    uploadImage:uploadImage,

    uploadVideo:uploadVideo,

    uploadFile:uploadFile,

    getDataNewVersion:getDataNewVersion

}