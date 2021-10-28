$(function () {
    // 点击去注册链接 注册页展示
    $('#link_reg').click(function () {
        $('.reg-box').show();
        $('.login-box').hide();
    })

    // 点击去登录链接 注册页展示
    $('#link_login').click(function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    // 从 layui 对象中获取 form
    var form = layui.form;
    form.verify({
        // 自定义regpwd数组的验证方式
        regpwd: [/^[\S]{6,15}$/, '密码长度必须是6-15位的非空字符串'],
        // 验证两次密码是否一致
        samepwd: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (value != $('#password').val()) {
                return '两次密码不一致';
            }
        }
    });

    //导入layer提示框
    var layer = layui.layer;




    //监听注册表单的 提交事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        //收集好请求数据
        var data = {
            username: $('#form_reg input[name=username]').val(),
            password: $('#form_reg input[name=password]').val(),
            repassword: $('#form_reg input[name=repassword]').val()
        }

        // 发起ajax请求
        $.post('/api/reg', data, function (res) {
            // console.log(res);
            if (res.code != 0) {
                return layer.msg(res.message);
            }

            layer.msg('注册成功,请登录!');
            //自动触发点击事件 去登录
            $('#link_login').click();
        })
    })

    //监听登录按钮 
    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type:'post',
            url: '/api/login',
            data:$(this).serialize(),
            success:function(res){
                if(res.code != 0){
                    return layer.msg('登录失败!')
                }

                layer.msg('登录成功!');
                //将登录成功之后得到的token 字符串 , 存在 localStorage
                localStorage.setItem('token',res.token);
                
                //跳到首页
                location.href = './index.html'
            }
        })
    })
})