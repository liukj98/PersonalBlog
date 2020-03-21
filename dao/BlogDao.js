let dbutil = require("./DBUtil");

function insertBlog(title, content, views, tags, c_time, u_time, success){
    let insertSql = "insert into blog(`title`, `content`, `views`, `tags`, `c_time`, `u_time`) values(?, ?, ?, ?, ?, ?)";
    let params = [title, content, views, tags, c_time, u_time];
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

function queryBlogByPage(page, pageSize, success){
    let querySql = "select * from blog limit ?, ?";
    let params = [page*pageSize, pageSize];

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

function queryBlogCount(success){
    let querySql = "select count(1) as count from blog;";
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

function queryBlogById(id, success){
    let querySql = "select * from blog where id = ?;";
    let params = [id];

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

function queryAllBlog(success){
    let querySql = "select * from blog;";
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

function updateBlogViews(blogId, success){
    let updateSql = "update blog set views = views + 1 where id = ?;";
    let params = [blogId];

    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(updateSql, params, function(error, res){//回调函数
        if(res){//插入成功的回调
            success(res);
        }else{//插入失败的回调
            console.log(error);
        }
    })
    connection.end();
}

function queryHotBlog(size, success){
    let querySql = "select * from blog order by views desc limit ?;";
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

module.exports = {
    "insertBlog": insertBlog,
    "queryBlogByPage": queryBlogByPage,
    "queryBlogCount": queryBlogCount,
    "queryBlogById": queryBlogById,
    "queryAllBlog": queryAllBlog,
    "updateBlogViews": updateBlogViews,
    "queryHotBlog": queryHotBlog
}

