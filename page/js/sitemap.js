
const blog_list = new Vue({
    el: "#blog_list",
    data: {
        blogList: []
    },
    created(){
        axios({
            url: "/query_all_blog",
            method: "get"
        }).then((res) => {
            let allBlog = res.data.data;
            for (let i = 0; i < allBlog.length; i++) {
                allBlog[i].link = "/blog_detail.html?blogId=" + allBlog[i].id;             
            }
            this.blogList = allBlog;
        })
    }
})

