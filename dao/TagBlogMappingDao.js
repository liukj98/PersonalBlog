let dbutil = require("./DBUtil");

function insertTagBlogMapping(tagId, blogId, c_time, u_time, success){
    let insertSql = "insert into tag_blog_mapping(`tag_id`, `blog_id`, `c_time`, `u_time`) values(?, ?, ?, ?)";
    let params = [tagId, blogId, c_time, u_time];

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

function queryBlogIdByTagId(tagId, success){
    let querySql = "select * from tag_blog_mapping where tag_id = ?"    
    let params = [tagId];

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
    "insertTagBlogMapping": insertTagBlogMapping,
    "queryBlogIdByTagId": queryBlogIdByTagId
}