let blogDao = require("../dao/BlogDao");
let tagDao = require("../dao/TagDao");
let tagBlogMappingDao = require("../dao/TagBlogMappingDao");
let timeUtil = require("../util/TimeUtil");
let resultUtil = require("../util/resultUtil");
let url = require("url");

let path = new Map();

function queryHotBlog(request, response){
    blogDao.queryHotBlog(5, function(res){
        response.writeHead(200);
        response.write(resultUtil.writeResult("success", "查询成功", res))
        response.end();
    })

}
path.set("/query_hot_blog", queryHotBlog);


function queryAllBlog(request, response){
    blogDao.queryAllBlog(function(res){
        response.writeHead(200);
        response.write(resultUtil.writeResult("success", "查询成功", res))
        response.end();
    })
}
path.set("/query_all_blog", queryAllBlog);

function queryBlogByPage(request, response){
    let params = url.parse(request.url, true).query;
    let page = parseInt(params.page);
    let pageSize = parseInt(params.pageSize);
    blogDao.queryBlogByPage(page, pageSize, function(res){
        response.writeHead(200);
        response.write(resultUtil.writeResult("success", "查询成功", res))
        response.end();
    })
}
path.set("/query_blog", queryBlogByPage)

function queryBlogCount(request, response){
    blogDao.queryBlogCount(function(res){
        response.writeHead(200);
        response.write(resultUtil.writeResult("success", "查询成功", res))
        response.end();
    })
}
path.set("/query_blog_count", queryBlogCount)

function queryBlogById(request, response){
    let params = url.parse(request.url, true).query;
    console.log(params.blogId)
    blogDao.queryBlogById(params.blogId, function(res){
        response.writeHead(200);
        response.write(resultUtil.writeResult("success", "查询成功", res))
        response.end();
        blogDao.updateBlogViews(params.blogId, function(res){
            
        })
    })
}
path.set("/query_blog_by_id", queryBlogById)

function editBlog(request, response){
    request.on("data", (res) => {
        let title = JSON.parse(res.toString()).title;
        let tags = JSON.parse(res.toString()).tag;
        tags = tags.replace(/ /g, "").replace("，", ",");
        let content = JSON.parse(res.toString()).content;
        blogDao.insertBlog(title, content, 0, tags, timeUtil.getNowSecond(), timeUtil.getUpdateSecond(), function(res){
            response.writeHead(200);
            response.write(resultUtil.writeResult("success", "添加成功", null))
            response.end();

            let blogId = res.insertId;//博客ID
            let tagArr = tags.split(",");
            for (let i = 0; i < tagArr.length; i++) {
                if(tagArr[i] == ""){
                    continue;
                }
                queryTag(tagArr[i], blogId);
            }
        });
    })
}
function queryTag(tag, blogId){
    //通过传进来的tag从数据库中的tags表中查询是否已经存在该tag
    //如果不存在则将tag插入tags表中
    tagDao.queryTag(tag, function(res){
        if(res == null || res.length == 0){//tags表中不存在tag标签
            tagDao.insertTag(tag, timeUtil.getNowSecond(), timeUtil.getUpdateSecond(), function(res){
                //结束之后还要将tagId,blogId插入到tag_blog_mapping表中形成tag blog映射（一个blog可能对应多个tag）
                let tagId = res.insertId;
                insertTagBlogMapping(tagId, blogId); 
            })
        }else{//存在
            //结束之后还要将tagId,blogId插入到tag_blog_mapping表中
            tagBlogMappingDao.insertTagBlogMapping(res[0].id, blogId, function(res){
                // console.log(res);
            });
        }
    })
}
function insertTagBlogMapping(tagId, blogId){
    tagBlogMappingDao.insertTagBlogMapping(tagId, blogId, timeUtil.getNowSecond(), timeUtil.getUpdateSecond(), function(res){
        // console.log(res);
    })
}
path.set("/edit_blog", editBlog)


module.exports = path;