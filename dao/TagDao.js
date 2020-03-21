let dbutil = require("./DBUtil");

function insertTag(tag, c_time, u_time, success){
    let insertSql = "insert into tags(`tag`, `c_time`, `u_time`) values(?, ?, ?)";
    let params = [tag, c_time, u_time];

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

function queryTag(tag, success){
    let querySql = "select * from tags where tag = ?";
    let params = [tag];

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

function queryRandomTag(success){
    let querySql = "select * from tags";
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
    "insertTag": insertTag,
    "queryTag": queryTag,
    "queryRandomTag": queryRandomTag
}

