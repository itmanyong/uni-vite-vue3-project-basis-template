/*
 * @FilePath: \uni-preset-vue-vite\src\router\beforeEach.js
 * @Date: 2022-10-02 02:28:01
 * @Author: itmanyong@gmail.com
 * @LastEditors: itmanyong@gmail.com
 * @LastEditTime: 2022-10-02 02:57:39
 * @Description: 路由前置守卫
 * @item 导出的函数会自动注册
 * @item 第四个参数 afterNotNext 是一个包装函数,接受一个函数参数,在不调用 next 的情况下跳转其他路由时使用
 *       例如: afterNotNext(() => uni.navigateTo({url:'/'}));
 */

// 示例
export async function test(to, from, next, afterNotNext) {
    console.log(`路由前置守卫: ${to.url}`);
    next();
}
