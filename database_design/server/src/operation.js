
// 插入属性
function insert(strsql) {

    db(strsql,(err,result) => {

        if(err) {
    
            console.log(err)
    
            return
    
        }
    
        if(result.rowsAffected[0] >= 0) {

            console.log("修改成功")

        }else {

            console.log("修改失败")

        }
    
    })

}
