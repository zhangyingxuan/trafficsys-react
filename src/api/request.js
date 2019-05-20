import axios from 'axios';
import {message} from 'antd';
import {createHashHistory} from 'history';

const globalCode = {
    success: 0,
    timeout: 401,
    busyCode: 400
}

const instance = axios.create({
    //当创建实例的时候配置默认配置
    xsrfCookieName: 'xsrf-token',
    timeout: 1000 * 60,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
});

//添加请求拦截器
instance.interceptors.request.use(function (config) {
    //在发送请求之前做某事，比如加一个loading

    return config;
}, function (error) {
    //请求错误时做些事
    message.error('This is a message of error');
    return Promise.reject(error);
});

//添加一个响应拦截器
instance.interceptors.response.use(function (response) {
    // console.log(response)

    // 1.成功
    if (response.data && response.data.code === globalCode.success) {
        return response;
    }

    // 2.session过期handleClickMenuItem
    if (!response.data && response.data.code === globalCode.timeout) {
        message.error('会话过期，请重新登录');
        createHashHistory().push('/login');
        // 定义一个messagecode在后面会用到
        return Promise.reject({
            messageCode: 'timeout'
        })
    }

    // 3.11111111 系统异常、网络异常
    if (response.data && response.data.code === globalCode.busyCode) {
        message.error(response.data.message);
        return Promise.reject({
            messageCode: 'netError'
        })
    }

    // 3.其他失败，比如校验不通过等
    return Promise.reject(response.data);
}, function () {
    message.error('系统异常，请稍后重试！');
    // 4.系统错误，比如500、404等
    return Promise.reject({
        messageCode: 'sysError'
    });
});

export default instance;
