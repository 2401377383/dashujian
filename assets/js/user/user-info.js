$(function () {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pass: [
            /^[\S]{1,6}$/
            , '昵称必须1到6位，且不能出现空格'
        ],
        // zcpass: function (value, item) { //value：表单的值、item：表单的DOM对象}
    })
    getInfo()
    function getInfo() {
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
                // $('#loginName').val(res.data.username);
                form.val('test1',res.data);
            }
        })
    }
    $('#btnReset').click(function(e){
        e.preventDefault();
        getInfo();
    })

    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            type:'put',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if(res.code != 0) {
                    return layer.msg('更新用户信息失败！');
                }
                layer.msg('修改用户信息成功！');
                window.parent.getUserInfo()
            }
        })
    })
})