let mysql = require("mysql");

function createConnection(){
    const connection = mysql.createConnection({
        post: "127.0.0.1",
        port: 3306,
        user: "root",
        password: "lkj980320",
        database: "my_blog"
    })
    return connection;
}

module.exports.createConnection = createConnection;