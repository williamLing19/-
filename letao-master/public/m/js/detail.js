$(function () {
    // 1. 使用getQueryString 函数获取当前id
    var id = getQueryString('id');
    // 调用 查询商品详情
    queryProductDetail();
    addcart();
    // 查询商品详情
    function queryProductDetail() {

        console.log(id);
        // 2. 根据当前id去请求数据
        $.ajax({
            url: '/product/queryProductDetail',
            data: {
                id: id
            },
            success: function (data) {
                console.log(data);
                // 3. 由于数据格式不是我们想要的单独处理尺码 40-50字符串 把字符串变成一个 [40,41..50]
                // 3.1 把字符串的最小值和最大值取出 并转成数字
                var min = +data.size.split('-')[0];
                var max = +data.size.split('-')[1];
                // 3.2 定义一个新的尺码数组来吧每个加进去
                data.size = [];
                // 3.3 循环从min开始到max结束 得包含max
                for (var i = min; i <= max; i++) {
                    // 3.4 把每个i的值添加到数组里面
                    data.size.push(i);
                }
                console.log(data.size);
                var html = template('productDetailTpl', data);
                $('#main').html(html);
                // 4. 这种组件是动态ajax添加进来的默认没有被初始化 得等渲染完成再手动初始化
                //获得slider插件对象
                var gallery = mui('.mui-slider');
                gallery.slider({
                    interval: 1000 //自动轮播周期，若为0则不自动播放，默认为0；
                });
                // 5. 初始化数字框（也是组件也是动态生成的 也要手动初始化） 基本上初始化组件都是选择组件的大容器
                mui('.mui-numbox').numbox();
                // 6. 让尺码能够点击也是在渲染完成后加事件和添加类名等 这个时候已经出来了不需要委托
                $('.btn-size').on('tap', function () {
                    $(this).addClass('mui-btn-warning').siblings().removeClass('mui-btn-warning');
                });
                //7.加载完成后初始化区域滑动
                mui('.mui-scroll-wrapper').scroll({
                    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
                });
            }
        })
    }

    function addcart() {
        //1.给购物车点击事件
        $(".btn-add-cart").on("tap", function () {
            //2.获取尺码
            var size = $(".btn-size.mui-btn-warning").data("size");
            //判断有这两个类名
            if (!size) {
                mui.toast('请选择尺码', { duration: 1000, type: 'div' })
                return;
            }
            //3.获取数量
            var num=mui('.mui-numbox').numbox().getValue();
            //4.发送Ajax请求
            $.ajax({
                url:"/cart/addCart",
                type:"post",
                data:{num:num,size:size,productId:id},
                success:function(data){
                    console.log(data);
                    if(data.error==400){
                        //表示不成功跳转到登录页面,将当前页面的网址传过去
                        location="login.html?returnUrl="+location.href;

                    }else{
                        //成功就要跳转到购物车
                        var btnArray = ['是', '否'];
                        mui.confirm('确认要去到购物车？', '温馨提示', btnArray, function(e) {
                            if (e.index == 0) {
                                //进到这里表示点到确认跳转到购物车
                                location="cart.html";
                            } else {
                                //取消提示一下
                                mui.toast('请继续添加!', {
                                    duration: 1000,
                                    type: 'div'
                                });
                            }
                        })
                    }
                    
                }
            })
        })
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