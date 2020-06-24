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
}
