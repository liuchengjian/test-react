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
                    } else {
                        this.doLogin();
                        typeof reject === 'function' && reject(res.msg || res.data);
                    }
                    console.log(res)
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
}

export default MUtil;
