/*
 * @FilePath: \uni-preset-vue-vite\src\utils\uniapp.js
 * @Date: 2022-10-01 23:43:09
 * @Author: itmanyong@gmail.com
 * @LastEditors: itmanyong@gmail.com
 * @LastEditTime: 2022-10-01 23:52:16
 * @Description: uni-app相关封装
 */
/**
 * 获取当前页面的实例对象
 * @returns uni页面Proxy对线
 */
function getPageCtx() {
    return getCurrentPages().at(-1);
}

/**
 * 查询指定节点的canvas实例
 * @param {string} selector 节点选择器
 * @returns canvas实例
 */
function queryCanvas(selector) {
    return new Promise((resolve, reject) =>
        uni
            .createSelectorQuery()
            .select(selector)
            .node(res => resolve(res.node))
            .exec()
    );
}




export { getPageCtx, queryCanvas };
