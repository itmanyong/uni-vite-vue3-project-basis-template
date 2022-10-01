/*
 * @FilePath: \uni-preset-vue-vite\src\common\request.js
 * @Date: 2022-10-01 23:57:23
 * @Author: itmanyong@gmail.com
 * @LastEditors: itmanyong@gmail.com
 * @LastEditTime: 2022-10-02 02:21:40
 * @Description: 请求封装 https://uniajax.ponjs.com/
 */

import ajax from 'uni-ajax';

const env = util_useEnv()

const request = ajax.create({
    baseURL: env.VITE_BASE_URL,
    timeout: env.VITE_TIMEOUT,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
    },
    dataType: 'json',
    responseType: 'text',
    validateStatus:statusCode => statusCode >= 200 && statusCode < 300
});

// 请求拦截器
request.interceptors.request.use(
    config => {
        // 在发送请求之前做些什么
        return config;
    },
    error => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 响应拦截器
request.interceptors.response.use(
    response => {
        // 对响应数据做点什么
        return response;
    },
    error => {
        // 对响应错误做点什么
        return Promise.reject(error);
    }
);

export { request };
