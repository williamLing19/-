$(function(){
    login();
    function login(){
        //这是写登录页面的函数
        //给确认加点击事件
        $(".btn-login").on("tap",function(){
            //1.获取用户名跟密码
            var username=$(".username").val().trim();
            if(!username){
                mui.toast('请输入账号', { duration: 1000, type: 'div' });
                return;
            }
            var password=$(".password").val().trim();
            if(!password){
                mui.toast('请输入密码', { duration: 1000, type: 'div' });
                return;
            }
            //2.发送ajax请求
            $.ajax({
                url:'/user/login',
                type:"post",
                data:{username:username,password:password},
                success:function(data){
                    console.log(data);
                    if(data.error){
                        //登录失败
                        mui.toast(data.message, {
                            duration: 'short',
                            type: 'div'
                        });
                    }else{
                        //登录成功跳转到详情页
                        //获取传过来的网址的值
                        var returnUrl=getQueryString("returnUrl");
                        location=returnUrl;
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