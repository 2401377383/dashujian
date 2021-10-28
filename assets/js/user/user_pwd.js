$(function () {
    //导入layer提示框
    var layer = layui.layer;
    //表单验证
    // 从 layui 对象中获取 form
    var form = layui.form;
    form.verify({
        // 自定义regpwd数组的验证方式
        regpwd: [/^[\S]{6,15}$/, '密码长度必须是6-15位的非空字符串'],
        // 验证原密码和新密码不能一致
        userpwd: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (value == $('#old').val()) {
                return '新旧密码不能一致';
            }
        },
        // 验证两次新密码是否一致
        samepwd: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (value != $('#password').val()) {
                return '两次密码不一致';
            }
        }
    });

    //给form表单注册提交事件
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();

        // serialize 获取表单内部的数据  表单的name属性值 = 表单的val值
        $.ajax({
            url: '/my/updatepwd',
            type: 'PATCH',
            data: $(this).serialize(),
            success: function (res) {

                if (res.code != 0) {
                    return layer.msg(res.message);
                }
                layer.msg('修改密码成功!');
                //重置表单
                $('.layui-form')[0].reset();
            }
        })
    })

})