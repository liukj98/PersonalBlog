const express = require("express");
const globalConfig = require("./config");
const loder = require("./loder")
const app = new express();

app.use(express.static("./" + globalConfig.page_path + "/"));

app.post("/edit_everyday", loder.get("/edit_everyday"))
app.get("/query_everyday", loder.get("/query_everyday"))

app.post("/edit_blog", loder.get("/edit_blog"))
app.get("/query_blog", loder.get("/query_blog"))
app.get("/query_blog_count", loder.get("/query_blog_count"))
app.get("/query_blog_by_id", loder.get("/query_blog_by_id"))

app.post("/add_comment", loder.get("/add_comment"))

app.get("/query_random_code", loder.get("/query_random_code"))

app.get("/query_comments_by_blogId", loder.get("/query_comments_by_blogId"))
app.get("/query_comment_count_by_blogId", loder.get("/query_comment_count_by_blogId"))

app.get("/query_all_blog", loder.get("/query_all_blog"))

app.get("/query_random_tag", loder.get("/query_random_tag"))
app.get("/query_hot_blog", loder.get("/query_hot_blog"))
app.get("/query_new_comments", loder.get("/query_new_comments"))

app.get("/query_by_tag", loder.get("/query_by_tag"))

app.listen(globalConfig.port, () => {
    console.log("服务器已启动")
})