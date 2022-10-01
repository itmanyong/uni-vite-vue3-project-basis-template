/*
 * @FilePath: \uni-preset-vue-vite\src\main.js
 * @Date: 2022-10-01 21:03:09
 * @Author: itmanyong@gmail.com
 * @LastEditors: itmanyong@gmail.com
 * @LastEditTime: 2022-10-02 03:09:23
 * @Description:
 */
import { createSSRApp } from 'vue';
import App from 'src/App.vue';

import "uno.css";

const plugins = Object.assign({}, ...Object.values(import.meta.globEager(`/src/plugins/*.[tj]s`)));

function createApp() {
    const app = createSSRApp(App);

    for (let key in plugins) {
        plugins[key](app);
    }

    return {
        app,
    };
}

export { createApp };
