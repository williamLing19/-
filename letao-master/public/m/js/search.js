$(function(){
    addHistory();
    queryHistory();
    deleteHistory();
    clearHistory();
    function addHistory(){
        //1.1给每个按钮一个点击事件
        $(".btn-search").on("tap",function(){
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
            var arr=getHistoryData();
            
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
            //设置本地数据
            setHistoryData(arr);

            //6.添加完成后清空输入框
            $(".input-search").val("");
            //7.调用一次不用刷新
            queryHistory();
            //点击按钮将数据传到需要搜索的页面
            location="productlist.html?search="+search;
        })
    }
    
//查询的代码
    function queryHistory(){
        //将数据渲染到页面
        var arr=getHistoryData();
        
        //调用模板
        var html=template("searchTpl",{rows:arr});
        $(".search-history ul").html(html);
    }
    //删除的代码
    function deleteHistory(){
        //1.给每一个xx点击事件
        $(".search-history ul").on("tap","li .btn-delete",function(){
        // 2. 通过当前删除按钮data去获取data-index属性的值
        var index = $(this).data('index');
        console.log(index);
        // 3. 获取本地存储的数组 使用封装这个函数去获取本地存储的数组
        var arr = getHistoryData();
        console.log(arr);
        // 4. 把数组中当前index索引的元素删掉
        arr.splice(index, 1);
        console.log(arr);
        // 5. 删除成功要要存储到本地存储中  使用封装好的函数去设置本地存储的数据
        setHistoryData(arr);
        // 6. 删除完成并且存储更新了之后重新渲染
        queryHistory();
        })
    }
    //清空记录
    function clearHistory(){
        $(".btn-clear").on("tap",function(){
            //删除本地数据
            localStorage.removeItem("historySearch");
            //重新渲染
            queryHistory();
        })
    }
    //获取本地数据
    function getHistoryData(){
        //将数据渲染到页面
        var arr=localStorage.getItem("historySearch");
        // console.log(arr);
        //判断之前有没有数据
        if(arr==null){
            arr=[];
        }else{
            arr=JSON.parse(arr);
        }
        return arr;
    }
    //设置本地数据
    function setHistoryData(arr){
        localStorage.setItem("historySearch",JSON.stringify(arr));
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