$(function () {
    pullRefresh();
    function pullRefresh() {
        mui.init({
            pullRefresh: {
                container: '#pullrefresh',
                down: {
                    callback: pulldownRefresh,
                    auto: true
                },
                up: {
                    contentrefresh: '正在加载...',
                    callback: pullupRefresh
                }
            }
        });
        /**
         * 下拉刷新具体业务实现
         */
        function pulldownRefresh() {
            setTimeout(function () {
                //发送ajax请求
                $.ajax({
                    url: "/cart/queryCartPaging",
                    data: { page: 1, pageSize: 5 },
                    success: function (data) {
                        console.log(data);
                        //模板三步走
                        //调用模板
                        var html = template("cartTpl", data);
                        $(".mui-table-view").html(html);
                        //结束转圈圈
                        mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
                        //下拉刷新完成后要重置上拉刷新
                        mui('#pullrefresh').pullRefresh().refresh(true);
                           page=1;
                    }
                })
            }, 500);
        }
        var page = 1;
        /**
         * 上拉加载具体业务实现
         */
        function pullupRefresh() {
            setTimeout(function () {
                //下拉刷新每次查询下一页
                $.ajax({
                    url: "/cart/queryCartPaging",
                    data: { page: page++, pageSize: 5 },
                    success: function (data) {
                        console.log(data);

                        //判断有没有数据提示用户
                        if (data.data) {
                            //模板三步走
                            //调用模板
                            var html = template("cartTpl", data);
                            $(".mui-table-view").append(html);
                            //结束转圈圈
                            mui('#pullrefresh').pullRefresh().endPullupToRefresh(); //refresh completed
                        }else{
                            mui('#pullrefresh').pullRefresh().endPullupToRefresh(true); 
                        }
                    }
                })
            }, 500);
        }
    }
})