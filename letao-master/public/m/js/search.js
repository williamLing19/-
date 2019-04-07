$(function(){
    addHistory();
    queryHistory();
    deleteHistory();
    clearHistory();
    function addHistory(){
        //1.1给每个按钮一个点击事件
        $(".btn-search").on("click",function(){
            //1.2 获取input的内容并且去空格
            var search=$(".input-search").val().trim();
            //1.3将内容添加到localSortage
            //非空判断
            if(search==""){
                return;
            }
            // localStorage.setItem(search);
            //将内容添加到数组里面,判断是否第一次数组是空,其他为储存的数据
            //将储存的值取出来
            var json=localStorage.getItem("historySearch");
            if(json!=null){
                var arr=JSON.parse(json);
            }else{
                var arr=[];
            }
            
            //添加到数组之前先去重,还有判断是否有一致的内容要把内容删除掉
            arr=uniq(arr);
            for(var i=0;i<arr.length;i++){
                if(search==arr[i]){
                    arr.splice(i,1);
                    //如果数组中有多个一样的值,删掉一个,循环就会减少一次,循环还会继续,所以要i--
                    i--;
                }
            }
            arr.unshift(search);
            localStorage.setItem("historySearch",JSON.stringify(arr));

            //6.添加完成后清空输入框
            $(".input-search").val("");
            //7.调用一次不用刷新
            queryHistory();
        })
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
//查询的代码
    function queryHistory(){
        //将数据渲染到页面
        var arr=localStorage.getItem("historySearch");
        // console.log(arr);
        //判断之前有没有数据
        if(arr==null){
            arr=[];
        }else{
            arr=JSON.parse(arr);
        }
        //调用模板
        var html=template("searchTpl",{rows:arr});
        $(".search-history ul").html(html);
    }
    function deleteHistory(){

    }
    function clearHistory(){

    }
})