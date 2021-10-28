// 注意 : 每次使用 $.get  $.post $.ajax 都会被触发
//在这个函数内部 我们可以取到ajax给我们配置的对象
$.ajaxPrefilter(function (options) {
    // console.log(options);
    //在发起真正的ajax之前 统一拼接接口地址
    options.url = 'http://www.liulongbin.top:3008' + options.url;

    //统一为有权限的接口设置 headers 请求头
    if (options.url.indexOf('/my/') != -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    //全局统一挂载 complete 函数  ( 不论接口请求成功或者失败 都会自动调用 )
    options.complete = function (res) {
     
        if (res.responseJSON.code == 1 && res.responseJSON.message == "身份认证失败！") {
            // 强制清空 token
            localStorage.removeItem('token');
            // 强行调回登录页
            location.replace('login.html');

        }
    }

})