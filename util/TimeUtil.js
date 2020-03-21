
function getNowSecond(){
    return parseInt((+new Date())/1000); 
}

function getUpdateSecond(){
    return parseInt((+new Date())/1000);
}

module.exports = {
    "getNowSecond": getNowSecond,
    "getUpdateSecond": getUpdateSecond
}