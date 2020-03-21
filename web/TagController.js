let blogDao = require("../dao/BlogDao");
let tagDao = require("../dao/TagDao");
let tagBlogMappingDao = require("../dao/TagBlogMappingDao");

let timeUtil = require("../util/TimeUtil");
let resultUtil = require("../util/resultUtil");
let url = require("url");

let path = new Map();

function queryRandomTag(request, response){
    tagDao.queryRandomTag(function(res){
        res.sort(function(){return Math.random() > 0.5 ? -1:1;})
        response.writeHead(200);
        response.write(resultUtil.writeResult("success", "查询成功", res))
        response.end();
    })
}
path.set("/query_random_tag", queryRandomTag);


function queryBlogByTag(request, response){
    let params = url.parse(request.url, true).query;
    tagDao.queryTag(params.tag, function(res){
        tagBlogMappingDao.queryBlogIdByTagId(res[0].id, function(res){
            console.log(res);
        })
    })
}
path.set("/query_by_tag", queryBlogByTag);


module.exports = path;