$(function () {
    var form = layui.form;
    var layer = layui.layer;
    getUserInfo()
    function getUserInfo() {
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            headers: {
                Authorization: localStorage.getItem('token')
            },
            success: function (res) {
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
})