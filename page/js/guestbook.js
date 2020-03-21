
const sendComment = new Vue({
    el: "#send_comment",
    data: {
        vcode: "",//验证码
        rightCodeText: ""//验证码文本
    },
    methods: {
        /**
         * 向后端请求验证码
         */
        changeCode(){
            axios({
                url: "/query_random_code",
                method: "get",
            }).then((res) => {
                this.vcode = res.data.data.data
                this.rightCodeText = res.data.data.text;
            })
        },
        /**
         * 发送评论
         */
        sendComment(){
            let verificationValue = document.getElementsByClassName("verification")[0].value;
            //在发送评论之前判断验证码是否正确
            if(verificationValue !== this.rightCodeText){
                alert("验证码错误");
                this.changeCode();
                return;
            }

            let blogId = -2;// 博客id 表示你要对哪个博客进行评论
            let parentName =  document.getElementsByClassName("parent_name")[0];// 表示你是初次发送评论还是回复别人评论（复数表示初次发送评论 正数表示回复别人评论）
            let parent =  document.getElementsByClassName("parent")[0];// 表示你是初次发送评论还是回复别人评论（负数表示初次发送评论 正数表示回复别人评论）
            let userName =  document.getElementsByClassName("user_name")[0];
            let userEmail =  document.getElementsByClassName("user_email")[0];
            let commentContent =  document.getElementsByClassName("comment_content")[0];
            let commentMsg = {
                blogId: parseInt(blogId),
                parent: parseInt(parent.value),
                userName: userName.value,
                userEmail: userEmail.value,
                commentContent: commentContent.value,
                parentName: parentName.value
            }
            /**
             * 向后端添加评论功能
             */
            axios({
                url: "/add_comment",
                method: "post",
                data: JSON.stringify(commentMsg)
            }).then((res) => {
                alert(res.data.msg)
            })
        }   
    },
    created(){
        //请求验证码
        this.changeCode();   
    }
})

const showComments = new Vue({
    el: "#show_comments",
    data: {
        count: 10,
        comments: []
    },
    methods: {
        reply(commentId, commentUserName){
            document.getElementsByClassName("parent_name")[0].value = commentUserName;
            document.getElementsByClassName("parent")[0].value = commentId;
            location.href = "#send_comment";
        }
    },
    created(){
        let blogId = -2;
        axios({
            url: "/query_comments_by_blogId?blogId=" + blogId,
            method: "get"
        }).then((res) => {
            let comments = res.data.data;
            for (let i = 0; i < comments.length; i++) {
                let commentsRes = {};
                commentsRes.userName = comments[i].user_name;
                commentsRes.cTime = comments[i].c_time;
                commentsRes.content = comments[i].comments;
                commentsRes.id = comments[i].id;
                commentsRes.options = comments[i].parent_name;

                this.comments.push(commentsRes);
            }
        })
        axios({
            url: "/query_comment_count_by_blogId?blogId=" + blogId,
            method: "get"
        }).then((res) => {
            this.count = res.data.data.length;
        })
    }
})