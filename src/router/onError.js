/*
 * @FilePath: \uni-preset-vue-vite\src\router\onError.js
 * @Date: 2022-10-02 02:29:52
 * @Author: itmanyong@gmail.com
 * @LastEditors: itmanyong@gmail.com
 * @LastEditTime: 2022-10-02 02:57:44
 * @Description: 路由错误守卫
 * @item 导出的函数会自动注册
 */



// 校验授权
export function test(to, from) {
    console.log(`路由错误守卫: ${to.url}`);
}
