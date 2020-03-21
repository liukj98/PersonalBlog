let dbutil = require("./DBUtil");

function insertEveryday(content, c_time, author, success){
    let insertSql = "insert into every_day(`content`, `c_time`, `author`) values(?, ?, ?)";
    let params = [content, c_time, author];
    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function(error, res){//回调函数
        if(res){//插入成功的回调
            success(res);
        }else{//插入失败的回调
            console.log(error);
        }
    })
    connection.end();
}

function queryEveryday(success){
    let querySql = "select * from every_day order by id desc limit 1";
    let params = [];
    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function(error, res){//回调函数
        if(res){//插入成功的回调
            success(res);
        }else{//插入失败的回调
            console.log(error);
        }
    })
    connection.end();
}


module.exports = {
    "insertEveryday": insertEveryday,
    "queryEveryday": queryEveryday
}

