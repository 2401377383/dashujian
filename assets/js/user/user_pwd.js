$(function () {
    var form = layui.form;
    var layer = layui.layer;

    form.verify({
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        zcpass: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (value !== $('#password').val()) {
                return '密码不一致,请检查后再次输入';
            }
        },
        userpwd: function(value,item){
            if(value == $('old').val()) {
                return '新旧密码不能一致';
            }
        }
    })

    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            type:'patch',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if(res.code != 0) {
                    return layer.msg('修改密码失败！');
                }
                layer.msg('修改密码成功！');
                $('#btnReset').click();
            }
        })
    })
})