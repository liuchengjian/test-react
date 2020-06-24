import MUtil from 'utils/mm.jsx'

const _mm = new MUtil();

export default class User {
    login(loginInfo) {
        return _mm.request({
            type: 'post',
            url: '/mmall/user/login.do',
            data: loginInfo
        });
    }

    checkLoginInfo(loginInfo) {
        let username = $.trim(loginInfo.username);
        let password = $.trim(loginInfo.password);
        if (typeof username !== "string" || username.length === 0) {
            return {
                success: false,
                msg: "登录名不能为空"
            }
        } else if (typeof password !== "string" || password.length === 0) {
            return {
                success: false,
                msg: "密码不能为空"
            }
        } else {
            return {
                success: true,
                msg: "通过"
            }
        }
    }
}
