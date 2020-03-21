let fs = require("fs");
let confData = fs.readFileSync("./config.conf");
let globalConfig = {};
let confArr = confData.toString().split("\r\n")
for (let i = 0; i < confArr.length; i++) {
    globalConfig[confArr[i].split("=")[0]] = confArr[i].split("=")[1];
}

module.exports = globalConfig;