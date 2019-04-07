$(function () {
    var search;
    searchProduct();
    nowSearchProduct();
    sortProduct();
    pullRefresh();
    function searchProduct() {
        //获取url网址search参数的值,
        //1.调用封装好的函数,传入键得到值,
        search = getQueryString("search");
        //2.发送ajax请求
        //一定要传递参数
        queryProduct({ proName: search });
    }

    //给当前页面搜索功能
    function nowSearchProduct() {
        $(".btn-search").on("tap", function () {
            //获取文本框的内容
            search = $(".input-search").val().trim();
            //非空判断
            if (search == "") {
                return;
            }
            //发送ajax请求
            // queryProduct({proName:search});
            queryProduct({ proName: search, page: 1, pageSize: 4 });
        })
    }




    //商品排序
    function sortProduct() {
        $(".mui-card-header a").on("tap", function () {
            //1.获取点击的类型
            var type = $(this).data("type");
            // console.log(type);
            var sort = $(this).data("sort");
            // console.log(sort);

            //3.判断是第一个改为第二个
            if (sort == 1) {
                sort = 2;
                $(this).find("i").removeClass("fa-angle-down").addClass("fa-angle-up");
            } else {
                sort = 1;
                $(this).find("i").removeClass("fa-angle-up").addClass("fa-angle-down");
            }
            $(this).addClass("active").siblings().removeClass("active");
            $(this).data("sort", sort);
            // console.log(sort);
            //准备好参数来发请求

            //想要动态添加一个属性就要用[]语法放变量
            var obj = {
                page: 1,
                pageSize: 4,
                proName: search
            };
            obj[type] = sort;
            queryProduct(obj);

        })


    }



    //将ajax请求公共代码封装--将所有参数作为对象
    //渲染数据业务代码
    function queryProduct(params) {
        //将参数改为对象,没有的初始化
        params.page = params.page || 1;
        params.pageSize = params.pageSize || 2;
        $.ajax({
            url: "/product/queryProduct",
            data: params,
            success: function (data) {
                console.log(data);
                //调用模板
                var html = template("productlistTpl", data);
                $(".product-list .mui-row").html(html);
            }
        })
    }

    //初始化下拉刷新插件
    function pullRefresh() {

        // 3. 初始化
        mui.init({
            // 初始化下拉刷新
            pullRefresh: {
                // 下拉刷新的容器 区域滚动的容器 选择器
                container: '#pullrefresh',
                // 表示初始化下拉刷新
                down: {
                    contentdown: "你正在下拉", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                    contentover: "可以松手了", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                    contentrefresh: "哥正在拼命刷新中...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                    // 下拉刷新的回调函数 触发了下拉刷新就执行回调
                    callback: pulldownRefresh
                },
                // 表示初始化上拉加载
                up: {

                    contentrefresh: '正在加载...',
                    // 上拉加载的回调函数 触发上拉加载会执行回调函数
                    callback: pullupRefresh
                }
            }
        });
        /**
         * 下拉刷新具体业务实现
         */
        function pulldownRefresh() {
            setTimeout(function () {
                //下拉刷新业务实现
                //1.重新渲染页面
                queryProduct({
                    page: 1,
                    pageSize: 3,
                    proName: search
                });
                //2.结束转圈圈
                // 当数据刷新完毕要结束下拉刷新 不结束会一直转圈圈下次也拉不了
                mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
            }, 1000);
        }
        var page = 1;
        /**
         * 上拉加载具体业务实现
         */
        function pullupRefresh() {
            setTimeout(function () {
                //上拉加载业务思路
                //1.发送ajax请求,page要++,不断得刷新下一页,
                //2.内容要追加到页面用append,不能用html
                //3.结束转圈圈
                //4.判断还有没有数据,没有要给参数true,提示用户没有数据了

                $.ajax({
                    url: "/product/queryProduct",
                    data: {
                        page: page++,
                        pageSize: 2,
                        proName: search
                    },
                    success: function (data) {
                        console.log(data);
                        if (data.data.length > 0) {
                            //调用模板
                            var html = template("productlistTpl", data);
                            $(".product-list .mui-row").append(html);
                            mui('#pullrefresh').pullRefresh().endPullupToRefresh();
                        }else{
                            mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
                        }

                    }
                })


            }, 1000);
        }


    }

    // 使用正则匹配url参数 返回这个匹配成功的值 根据参数名获取参数的值
    function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            console.log(r);
            // 别人之前使用unescape 方式解密  但是我们默认是encodeURI加密 使用 decodeURI 解密
            return decodeURI(r[2]);
        }
        return null;
    }
})