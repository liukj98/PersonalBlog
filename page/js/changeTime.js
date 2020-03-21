function changeTime(time) {
    var commonTime = "";
    if (time) {
        var unixTimestamp = new Date(time * 1);
        commonTime = unixTimestamp.toLocaleString();
    }
    return commonTime;
}

