/*
 * @FilePath: \uni-preset-vue-vite\src\plugins\setupRouter.js
 * @Date: 2022-10-01 21:32:30
 * @Author: itmanyong@gmail.com
 * @LastEditors: itmanyong@gmail.com
 * @LastEditTime: 2022-10-02 02:48:44
 * @Description:
 */

import uniCrazyRouter, { beforeEach, afterEach, onError, afterNotNext } from 'uni-crazy-router';
import * as befores from 'src/router/beforeEach';
import * as afters from 'src/router/afterEach';
import * as errors from 'src/router/onError';

export function setupRouter(app) {
    app.use(uniCrazyRouter);

    // 注册路由前置守卫
    const before = {};
    for (let key in befores) {
        before[key] = beforeEach((...rest) => befores[key](...rest, afterNotNext));
    }

    // 注册路由后置守卫
    const after = {};
    for (let key in afters) {
        after[key] = afterEach(afters[key]);
    }

    // 注册路由错误守卫
    const error = {};
    for (let key in errors) {
        error[key] = onError(errors[key]);
    }

    // 挂载守卫消除函数到uni
    uni.$router = {
        before,
        after,
        error,
    };
}
