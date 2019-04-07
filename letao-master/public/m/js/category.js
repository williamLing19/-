
$(function () {
    initLeft();
    initRight();
    getFirst();
    getSecond(1);

   function initLeft(){
         // 初始化区域滚动插件
        mui('.category-left .mui-scroll-wrapper').scroll({
            indicators: false, //是否显示滚动条
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
   }
   function initRight(){
        // 初始化右侧 需要滚动条
        mui('.category-right .mui-scroll-wrapper').scroll({
            indicators: true, //是否显示滚动条
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
   }    
   function getFirst(){
    $.ajax({
        url: "http://localhost:3000/category/queryTopCategory",
        success: function (data) {
            // 调用模板
            var html = template("tpl", data);
            $(".category-left ul").html(html);

            //在 左边数据加载完之后才调用点击事件才可以获取到模板生成的数据
            toggleLeft();
        }
    })
   }
   function getSecond(id){
    $.ajax({
        url:"http://localhost:3000/category/querySecondCategory",
        data:{id:id},
        success:function(data){
            console.log(data);
            var html1=template("tpl1",data);
            $(".category-right .mui-row").html(html1);
        }
    })
   }
   function toggleLeft(){
    var lis=$(".category-left ul li");
    lis.on("click",function(){
        var id=$(this).data("id");
        getSecond(id);
        $(this).addClass("active").siblings().removeClass("active");
        
    })
    $(lis[0]).addClass("active");
   }



})



// $(function(){
//     getFirst();
//     getSecond(1);
//     toggleLeft();
//     //左侧模板调用函数
//     function getFirst(){
//         //发送ajax请求数据
//         $.ajax({
//             url:"http://localhost:3000/category/queryTopCategory",
//             success:function(data){
//                 console.log(data);
//                 //调用模板
//                 var html=template("leftTpl",data);
//                 $(".category-left ul").html(html);
//             }
//         })
//     }
//     function getSecond(id){
//         $.ajax({
//             url:"http://localhost:3000/category/querySecondCategory",
//             data:{id:id},
//             success:function(data){
//                 console.log(data);
//                 var html=template("rightTpl",data);
//                 $(".category-right .mui-row").html(html);
                
//             }
//         })
//     }
//     function toggleLeft(){
//         //给每一个li点击事件
//         $(".category-left").on("click","li",function(){
//             var id=$(this).data("id");
//             getSecond(id);
//             $(this).addClass("active").siblings().removeClass("active");
//         })
//         //默认第一个有active类
//         // $(".category-left li")[0].classList.add("active");
//         var lis=$(".category-left ul li");
//         $(lis[0]).addClass("active");
//     }
// })