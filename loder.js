let fs = require("fs");
let globalConfig = require("./config")

let controllerSet = [];
let pathMap = new Map();

//拿到web目录下的所有文件名并返回一个文件名的数组
let files = fs.readdirSync("./" + globalConfig['web_path']);
for (let i = 0; i < files.length; i++) {
    let temp = require("./" + globalConfig['web_path'] + "/" + files[i])
    if(temp){
        for(var [key, value] of temp){
            if(!pathMap.get(key)){
                pathMap.set(key, value);
            }else{
                throw new Error("url path 错误" + key)
            }
        }
        controllerSet.push(temp);
    }
}

module.exports = pathMap;