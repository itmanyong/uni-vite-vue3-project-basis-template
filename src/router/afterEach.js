/*
 * @FilePath: \uni-preset-vue-vite\src\router\afterEach.js
 * @Date: 2022-10-02 02:29:54
 * @Author: itmanyong@gmail.com
 * @LastEditors: itmanyong@gmail.com
 * @LastEditTime: 2022-10-02 03:43:51
 * @Description: 路由后置守卫
 * @item 导出的函数会自动注册
 */

// 示例
export function test(to, from) {
    console.log(`路由后置守卫: ${to.url}`);
}