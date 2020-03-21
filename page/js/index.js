
const everyDay = new Vue({
    el: "#every-day",
    data: {
        everydayContent: {
            content: "Lorem ipsum, dolor sit amet consectetur.",
            author: "Tom Smith"
        }
    },
    computed: {
        getContent() {
            return this.everydayContent.content;
        },
        getAuthor() {
            return "-----" + this.everydayContent.author;
        }
    },
    created() {
        //发送网络请求 获取每日一句的数据
        axios({
            url: "/query_everyday",
            method: "get",
        }).then(res => {
            this.everydayContent.content = res.data.data[0].content;
            this.everydayContent.author = res.data.data[0].author;
        })

    }
})

const articalList = new Vue({
    el: "#artical-list",
    data: {
        page: 1,//当前是第几页
        pageSize: 5,//每页的容量（每页最多展示多少条）
        pageCount: null,//总共的数据量
        totalCount: null,//总页数
        pageNumberList: [],
        articalList: [
            {
                title: "Laravel5.4安装passport时遇到的一些问题",
                content: "安装时可能不支持高版本，我使用了composer require laravel/passport ~4.0安装后执行迁移时nothing to migrate，需要手动注册Provider， 在config/app.php中providers中添加Laravel\Passport\PassportServiceProvider::class。执行php artisan passport:install时提示“There are no commands defined in the “passport” namespace.” 需要执行cache:clear和config:cache 更新缓存。...",
                date: "2019-12-06",
                views: "0",
                tags: "laravel",
                link: "/"
            },
        ]
    },
    methods: {
        //根据当前页和页容量获取文章数据
        getArticalData(){
            let paramArr = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
            let tag = "";
            for (let i = 0; i < paramArr.length; i++) {
                if(paramArr[i].split("=")[0] == "tag"){
                    tag = paramArr[i].split("=")[1];
                }
            }
            if(tag){//按照标签查询
                axios({
                    url: "/query_by_tag?page=" + (this.page - 1) + "&pageSize=" + this.pageSize + "&tag=" + tag,
                    method: "get",
                }).then(res => {
                    let dataList = res.data.data;
                    let list = [];
                    for (let i = 0; i < dataList.length; i++) {
                        let temp = {};
                        temp.title = dataList[i].title;
                        temp.content = dataList[i].content;
                        temp.views = dataList[i].views;
                        temp.tags = dataList[i].tags;
                        temp.date = changeTime(dataList[i].c_time*1000);
                        temp.link = "/blog_detail.html?blogId=" + dataList[i].id; //跳转到博客内容详情页
                        list.push(temp);
                    }
                    this.articalList = list;
                })
            }else{
                axios({
                    url: "/query_blog?page=" + (this.page - 1) + "&pageSize=" + this.pageSize,
                    method: "get",
                }).then(res => {
                    let dataList = res.data.data;
                    let list = [];
                    for (let i = 0; i < dataList.length; i++) {
                        let temp = {};
                        temp.title = dataList[i].title;
                        temp.content = dataList[i].content;
                        temp.views = dataList[i].views;
                        temp.tags = dataList[i].tags;
                        temp.date = changeTime(dataList[i].c_time*1000);
                        temp.link = "/blog_detail.html?blogId=" + dataList[i].id; //跳转到博客内容详情页
                        list.push(temp);
                    }
                    this.articalList = list;
                })
            }
        },
        //获取文章总数据量（总共多少条数据）
        getArticalCount(){
            axios({
                url: "/query_blog_count",
                method: "get",
            }).then(res => {
                this.pageCount = res.data.data[0].count;
                this.totalCount = Math.ceil(this.pageCount/this.pageSize)
                this.generatePageTool();
            })
        },
        //生成分页插件
        generatePageTool(){
            let nowPage = this.page;//当前页
            let totalCount = this.totalCount;//总页数
            let pageList = [];
            pageList.push({
                text: "上一页",
                nowPage: nowPage
            })
            if(nowPage > 2){
                pageList.push({
                    text: nowPage - 2,
                    nowPage: nowPage - 2
                })
            }
            if(nowPage > 1){
                pageList.push({
                    text: nowPage - 1,
                    nowPage: nowPage - 1
                })
            }
            pageList.push({
                text: nowPage,
                nowPage: nowPage
            })
            if(nowPage + 1 <= totalCount){
                pageList.push({
                    text: nowPage + 1,
                    nowPage: nowPage + 1
                })
            }
            if(nowPage + 2 <= totalCount){
                pageList.push({
                    text: nowPage + 2,
                    nowPage: nowPage + 2
                })
            }
            pageList.push({
                text: "下一页",
                nowPage: parseInt(totalCount),
            })
            this.pageNumberList = pageList;

        },
        //跳转到点击页
        jumpToPage(text, nowPage){
            if(typeof(text) != 'string') {
                this.page = nowPage;
                this.getArticalData();
                this.generatePageTool();
            }else{
                if(text == '上一页'){
                    if(this.page == 1){
                        return;
                    }else{
                        this.page --;
                        this.getArticalData();
                        this.generatePageTool();
                    }
                }else if(text == '下一页'){
                    if(this.page == Math.ceil(this.pageCount/this.pageSize)){
                        return;
                    }else{
                        this.page ++;
                        this.getArticalData();
                        this.generatePageTool();
                    }
                }
            } 
        }

    },
    created() {
        //发送网络请求 获取文章的数据
        this.getArticalData();  
        this.getArticalCount(); 
    }
})

