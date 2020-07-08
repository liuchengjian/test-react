class MUtil {
    request(param) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: param.type || 'get',
                url: param.url || '',
                dataType: param.dataType || 'json',
                data: param.data || null,
                success: res => {
                    if (res.success) {
                        typeof resolve === 'function' && resolve(res.data, res.msg);
                        console.log(res.data);
                    } else {
                        this.doLogin();
                        typeof reject === 'function' && reject(res.msg || res.data);
                    }
                },
                error: err => {
                    console.log(err)
                    typeof reject === 'function' && reject(err.statusText);
                },
            });
        });
    }

    doLogin() {
        window.location.href = './login?redirect=' + encodeURIComponent(window.location.pathname);
    }

    getUrlParam(name) {
        let queryString = window.location.search.split('?')[1] || "";
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        let result = queryString.match(reg);
        return result ? encodeURIComponent(result[2]) : null;
    }

    errorTips(errMsg) {
        alert(errMsg || '好像哪里不对')
    }

    setStorage(name, data) {
        let dataType = typeof data;
        if (dataType === 'object') {
            window.localStorage.setItem(name, JSON.stringify(data));
        } else if (['number', 'string', 'boolean'].indexOf(dataType) >= 0) {
            window.localStorage.setItem(name, data);
        } else {
            alert('该类型支持本来存储');
        }
    }

    getStorage(name) {
        let data = window.localStorage.getItem(name);
        if (data) {
            return JSON.parse(data);
        }else {
            return "";
        }
    }
    removeStorage(name){
        window.localStorage.removeItem(name);
    }
}

export default MUtil;
