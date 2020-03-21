let everydayDao = require("../dao/EverydayDao");
let timeUtil = require("../util/TimeUtil");
let resultUtil = require("../util/resultUtil");

let path = new Map();

function editEveryday(request, response){
    request.on("data", (res) => {
        let content = JSON.parse(res.toString()).content;
        let author = JSON.parse(res.toString()).author;
        everydayDao.insertEveryday(content, timeUtil.getNowSecond(), author, function(res){
            response.writeHead(200);
            response.write(resultUtil.writeResult("success", "添加成功", null))
            response.end();
        });
    })
}
path.set("/edit_everyday", editEveryday);

function queryEveryday(request, response){
    everydayDao.queryEveryday(function(result){
        response.writeHead(200);
        response.write(resultUtil.writeResult("success", "查询成功", result))
        response.end();
    })
}
path.set("/query_everyday", queryEveryday);

module.exports = path;