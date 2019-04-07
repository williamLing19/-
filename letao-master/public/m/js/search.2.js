$(function () {
    addHistory();
    queryHistory();
    deleteHistory();
    clearHistory();
    function addHistory() {
        //添加的逻辑代码-分析思路
        //1.给每个搜索按钮一个点击事件
        $(".btn-search").on("tap", function () {
            //2.获取文本框的内容,去空格,去重,非空判断
            var search = $(".input-search").val().trim();
            if (search == "") {
                return;
            }
            //3.取出数据
            var arr=getHistoryData();
            //去重
            arr = uniq(arr);
            //判断有一致的内容要删掉
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == search) {
                    arr.splice(i, 1);
                    i--;
                }
            }
            arr.unshift(search);
            //4.将数组转为json格式储存在本地数据里面
            setHistoryData(arr);
            //5.清空文本框的内容
            $(".input-search").val("");
            //6.调用查询数据
            queryHistory();
            //7.将地址转到商品列表,带参数
            location="productlist.html?search="+search;
        })
    }
    //将本地数据取出来渲染到页面
    function queryHistory() {
        //1.getItem取数据,将数据转为js格式
        //2.判断是否是第一次,判断js数据的长度是不是>0,是就用里面的代码.不是声明一个空数组
        var arr=getHistoryData();
        //3.模板三步走渲染到页面-调用模板
        var html=template("searchTpl",{rows:arr});
        $(".mui-table-view").html(html);
    }
    function deleteHistory() {
        //删除数据的逻辑代码
        //1.给每个删除按钮委托点击事件
        $(".search-history ul").on("tap","li .btn-delete",function(){
        //2.获取要删除的index,在模板绑定传过来
        var index=$(this).data("index");
        //3.获取本地数据
        var arr=getHistoryData();
        //4.删除一个从index开始的数组
        arr.splice(index,1);
        //5.重新储存到本地数据
        setHistoryData(arr);
        //6.重新渲染
        queryHistory();
    })
    }
    //清空数据
    function clearHistory() {
        //1.给清空按钮点击事件
        $(".btn-clear").on("tap",function(){
        //2.用removeItem清空本地数据
        localStorage.removeItem("historySearch");
        //3.重新渲染
        queryHistory();
    })
    }

    //取出本地数据
    function getHistoryData() {
        //3.创建一个空数组,将内容添加到数组的最前面,判断是否第一次
        var json = localStorage.getItem("historySearch");
        if (json != null) {
            var arr = JSON.parse(json);
        } else {
            var arr = [];
        }
        return arr;
    }
    //设置本地数据
    function setHistoryData(arr){
        localStorage.setItem("historySearch", JSON.stringify(arr));
    }
    //去重的函数
    function uniq(array) {
        var temp = []; //一个新的临时数组
        for (var i = 0; i < array.length; i++) {
            if (temp.indexOf(array[i]) == -1) {
                temp.push(array[i]);
            }
        }
        return temp;
    }
})
