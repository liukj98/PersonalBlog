
const randomTags = new Vue({
    el: "#random-tags",
    data: {
        tags: []
    },
    computed: {
        randomColor(){
            return function(){
                var red = Math.random()*255;
                var green = Math.random()*255;
                var blue = Math.random()*255;
                return "rgb(" + red + "," + green + "," + blue + ")"
            }
        },   
        randomFont(){
            return function(){
                var fontSize = Math.random()*20 + 10 + "px";
                return fontSize;
            }
        }    
    },
    created(){
        axios({
            url: "/query_random_tag",
            method: "get"
        }).then((res) => {
            let tags = res.data.data;
            for (let i = 0; i < tags.length; i++) {
                this.tags.push(tags[i].tag)
            }
        })
    }
})

const newHot = new Vue({
    el: "#new_hot",
    data: {
        hotTitles: []
    },
    created(){
        axios({
            url: "/query_hot_blog",
            method: "get"
        }).then((res) => {
            let blogList = res.data.data;
            for (let i = 0; i < blogList.length; i++) {
                let tempBlog = {};
                tempBlog.title = blogList[i].title;
                tempBlog.link = "/blog_detail.html?blogId=" + blogList[i].id;
                this.hotTitles.push(tempBlog);
            }

        })
    }
})

const newComment = new Vue({
    el: "#new_comment",
    data: {
        comments: []
    },
    created(){
        axios({
            url: "/query_new_comments",
            method: "get"
        }).then((res) => {
            let commentList = res.data.data;
            for (let i = 0; i < commentList.length; i++) {
                let tempComment = {};
                tempComment.userName = commentList[i].user_name;
                tempComment.date = changeTime(commentList[i].c_time*1000) ;
                tempComment.content = commentList[i].comments;
                this.comments.push(tempComment);
            }
        })
    }
})

