$(function () {
    $('#link_register').click(function () {
        $('.login-register').hide();
        $('.login-signin').show();
    })
    $('#link_signin').click(function () {
        $('.login-signin').hide();
        $('.login-register').show();
    })
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
        }
    })
    // var glj = 'http://www.liulongbin.top:3008';
    $('#form_sig').on('submit', function (e) {
        e.preventDefault();
        var data = {
            username: $('#form_sig input[name=username]').val(),
            password: $('#form_sig input[name=password]').val(),
            repassword: $('#form_sig input[name=repassword]').val()
        }
        $.post('/api/reg', data, function (res) {
            // console.log(res);
            if (res.code != 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功，请登录！');
            $('#link_signin').click();
        })
    })
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.code != 0) {
                    return layer.msg('登录失败！！！');
                }
                layer.msg('登陆成功!!!');
                localStorage.setItem('token', res.token);
                location.href = './index.html';
            }
        })
    })

})