$(function () {

    //导入layer提示框
    var layer = layui.layer;

    getUserInfo();

    // 给退出的按钮注册点击事件
    $('#logoutBtn').click(function () {

        layer.confirm('确认退出登录?', { icon: 3, title: '提示' },
            function (index, layero) {
                //确定按钮的回调
                //清空本地存储的token
                localStorage.removeItem('token');
                //跳转到登录页
                location.href = 'login.html';

                //关闭弹出询问框
                layer.close(index);
            }
        );
    })

})

//获取用户基本信息
function getUserInfo() {
    $.ajax({
        type: 'get',
        url: '/my/userinfo',
        // // headers 就是配置请求头  (baseapi统一设置过请求头)
        // headers: {
        //     Authorization: localStorage.getItem('token')
        // },
        success: function (res) {
            if (res.code != 0) {
                return layer.msg('获取用户信息失败!');
            }
            //成功之后拿到信息渲染页面
            renderAvatar(res.data);
        },
        //请求失败 
        error: function (err) {

        },
        //不论成功或者失败,最终都会调用 complete 函数
        // complete:function(res){
        //     // console.log(res);
        //     if(res.responseJSON.code == 1){
        //         // 强制清空 token
        //         localStorage.removeItem('token');
        //         // 强行跳回登录页
        //         location.replace('login.html');

        //     }
        // }

    })
}

// 渲染用户头像
function renderAvatar(user) {
    // console.log(user);
    // 1. 获取用户名称
    var name = user.nickname || user.username;
    // 2.设置昵称
    $('#welcome').html('欢迎 ' + name);

    // 3.设置头像
    if (user.user_pic) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        $('.text-avatar').show();
        $('.text-avatar').text(name[0].toUpperCase());
    }
}