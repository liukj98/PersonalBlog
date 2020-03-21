let dbutil = require("./DBUtil");

function insertComment(blogId, parent, userName, userEmail, comments, c_time, u_time, parentName, success){
    let insertSql = "insert into comments(`blog_id`, `user_name`, `parent`, `comments`, `email`, `c_time`, `u_time`, `parent_name`) values(?, ?, ?, ?, ?, ?, ?, ?)";
    let params = [blogId, userName, parent, comments, userEmail, c_time, u_time, parentName];

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

function queryCommentsByBlogId(blogId, success){
    let querySql = "select * from comments where blog_id = ?;";
    let params = [blogId];

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

function queryNewComments(size, success){
    let querySql = "select * from comments order by c_time desc limit ?;";
    let params = [size];

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

function queryCommentCountByBlogId(blogId, success){
    let querySql = "select count(*) as count from comments where blog_id = ?;";
    let params = [blogId];

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
    "insertComment": insertComment,
    "queryCommentsByBlogId": queryCommentsByBlogId,
    "queryCommentCountByBlogId": queryCommentCountByBlogId,
    "queryNewComments": queryNewComments
}
