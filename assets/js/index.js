$(function () {
    var form = layui.form;
    var layer = layui.layer;
    getUserInfo()
    function getUserInfo() {
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            // headers: {
            //     Authorization: localStorage.getItem('token')
            // },
            success: function (res) {
                // console.log(res);
                if (res.code != 0) {
                    return layer.msg('获取用户信息失败！！')
                }
                renderAvatar(res.data)
            }
        })
    }
    function renderAvatar(user) {
        var name = user.nickname || user.username;
        $('#welcome').html(`欢迎 ${name}`)
        if (user.user_pic) {
            $('.layui-nav-img').attr('src', user.user_pic).show();
            $('.text-avatar').hide();
        } else {
            $('.layui-nav-img').hide();
            $('.text-avatar').show();

            $('.text-avatar').html(name[0].toUpperCase())
        }
    }

    $('#logoutBtn').click(function () {
        layer.confirm('确定退出登录？', 
            { icon: 3, title: '提示' ,btn:['确定', '取消', '我没屌用']}, //可以无限个按钮
            function (index, layero) {
                localStorage.removeItem('token');
                location.replace('login.html');
                layer.close(index)
            }
        );
    })
    //eg2
    // layer.open({
    //     content: 'test'
    //     , btn: ['按钮一', '按钮二', '按钮三']
    //     , yes: function (index, layero) {
    //         //按钮【按钮一】的回调
    //     }
    //     , btn2: function (index, layero) {
    //         //按钮【按钮二】的回调
    //         //return false 开启该代码可禁止点击该按钮关闭
    //     }
    //     , btn3: function (index, layero) {
    //         //按钮【按钮三】的回调
    //         //return false 开启该代码可禁止点击该按钮关闭
    //     }
    //     , cancel: function () {
    //         //右上角关闭回调
    //         //return false 开启该代码可禁止点击该按钮关闭
    //     }
    // });
})