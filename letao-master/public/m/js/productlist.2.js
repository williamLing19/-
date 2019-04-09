$(function () {
    var search;
    searchProduct();
    nowSearchProduct();
    productSort();
    function searchProduct() {
        //1.调用已知函数获取网址的值
        search = getQueryString("search");
        //2.发送ajax请求渲染页面
        queryProduct({ proName: search });
    }
    //给当前页面搜索功能
    function nowSearchProduct() {
        //1.给搜索按钮一个点击事件
        $(".btn-search").on("tap", function () {
            //2.获取文本框的内容
            search = $(".input-search").val().trim();
            if (search == "") {
                return;
            }
            //发送请求
            queryProduct({ proName: search, page: 1, pageSize: 4 });
        })
    }

    //商品排序
    function productSort() {
        //1.给每一a添加点击事件
        $(".mui-card-header a").on("tap", function () {
            //2.获取type
            var type=$(this).data("type");
            //3.获取sort
            var sort=$(this).data("sort");
            //4.判断sort是1就改为2
            if (sort == 1) {
                sort = 2;
                $(this).find("i").removeClass("fa-angle-down").addClass("fa-angle-up");
            } else {
                sort = 1;
                $(this).find("i").removeClass("fa-angle-up").addClass("fa-angle-down");
            }
            console.log(sort);
            
            $(this).addClass("active").siblings().removeClass("active");
            $(this).data("sort",sort);

        })
    }




    //将ajax请求渲染页面封装成函数
    function queryProduct(params) {
        $.ajax({
            url: "/product/queryProduct",
            data: {
                page: params.page || 1,
                pageSize: params.pageSize || 3,
                proName: params.search
            },
            success: function (data) {
                // console.log(data);
                var html = template("productlistTpl", data);
                $(".product-list .mui-row").html(html);
            }
        })
    }


    // 使用正则匹配url参数 返回这个匹配成功的值 根据参数名获取参数的值
    function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            // console.log(r);
            // 别人之前使用unescape 方式解密  但是我们默认是encodeURI加密 使用 decodeURI 解密
            return decodeURI(r[2]);
        }
        return null;
    }
})