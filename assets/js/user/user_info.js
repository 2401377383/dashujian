$(function () {

    // 导入form表单
    var form = layui.form;

    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在1~6位之间!'
            }
        }
    });

    //导入layer提示框
    var layer = layui.layer;

    getUserInfo();
    //获取用户基本信息
    function getUserInfo() {
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            success: function (res) {
                if (res.code != 0) {
                    return layer.msg('获取用户信息失败!');
                }
                
                //在这个地方为表单赋值
                form.val('getUserInfo',res.data);
            }
        })
    }

    //重置按钮注册点击事件
    $('#btnReset').click(function(e){
        //阻止默认清空表单行为
        e.preventDefault();
        getUserInfo();
    })

    //给表单注册提交事件
    $('.layui-form').on('submit',function(e){
        //阻止默认行为
        e.preventDefault();
        //发起ajax请求 提交数据
        $.ajax({
            type:'put',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if(res.code != 0){
                    return layer.msg('更新用户信息失败!')
                }
                layer.msg('修改用户信息成功!');

                //调用父级页面中的方法 更新 index 页的信息 
                //注意 : 父页面的方法和变量必须在 iframe 标签之前定义
                window.parent.getUserInfo();
            }
        })
    })

})