let commentDao = require("../dao/CommentDao");
let timeUtil = require("../util/TimeUtil");
let resultUtil = require("../util/resultUtil");
let url = require("url");
let captcha = require("svg-captcha");


let path = new Map();


function queryNewComments(request, response){
    commentDao.queryNewComments(5, function(res){
        response.writeHead(200);
        response.write(resultUtil.writeResult("success", "添加成功", res))
        response.end();
    })
}
path.set("/query_new_comments", queryNewComments)


function queryRandomCode(request, response){
    let img = captcha.create({fontSize: 50, width: 100, height: 34})
    response.writeHead(200);
    response.write(resultUtil.writeResult("success", "添加成功", img))
    response.end();
}
path.set("/query_random_code", queryRandomCode)

function addComment(request, response){
    request.on("data", function(res){
        let commentMsg = JSON.parse(res.toString());
        let blogId = commentMsg.blogId;
        let parent = commentMsg.parent;
        let userName = commentMsg.userName;
        let userEmail = commentMsg.userEmail;
        let comments = commentMsg.commentContent;
        let parentName = commentMsg.parentName;

        commentDao.insertComment(blogId, parent, userName, userEmail, comments, timeUtil.getNowSecond(), timeUtil.getNowSecond(), parentName, function(res){
            response.writeHead(200);
            response.write(resultUtil.writeResult("success", "评论成功", null))
            response.end();
        })
    })
}
path.set("/add_comment", addComment)

function queryCommentsByBlogId(request, response){
    let params = url.parse(request.url, true).query;
    commentDao.queryCommentsByBlogId(params.blogId, function(res){
        response.writeHead(200);
        response.write(resultUtil.writeResult("success", "查询成功", res))
        response.end();
    })
}
path.set("/query_comments_by_blogId", queryCommentsByBlogId)

function queryCommentCountByBlogId(request, response){
    let params = url.parse(request.url, true).query;
    commentDao.queryCommentsByBlogId(params.blogId, function(res){
        response.writeHead(200);
        response.write(resultUtil.writeResult("success", "查询成功", res))
        response.end();
    })
}
path.set("/query_comment_count_by_blogId", queryCommentCountByBlogId)


module.exports = path;


