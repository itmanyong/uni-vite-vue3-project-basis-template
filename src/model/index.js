/*
 * @FilePath: \uni-preset-vue-vite\src\model\index.js
 * @Date: 2022-10-01 21:51:00
 * @Author: itmanyong@gmail.com
 * @LastEditors: itmanyong@gmail.com
 * @LastEditTime: 2022-10-01 23:34:39
 * @Description: 自动注册导出pinia模块
 * @item 当前文件同级目录为模块名称
 * @item 模块下的index.js为模块入口,只需要导出setup与option即可
 * @item setup为模块的状态与方法
 * @item option为模块的额外配置,包括持久化等
 * @item 模块的状态与方法可以在任意组件中通过 model.模块名称[导出的名称] 来访问
 */

const modelFiles = import.meta.globEager('./**/index.js');

const model = {};

const uniStorage = {
    length: 0,
    key: () => '',
    getItem: key => uni.getStorageSync(key),
    setItem: (key, value) => uni.setStorageSync(key, value),
    removeItem: key => uni.removeStorageSync(key),
    clear: () => uni.clearStorageSync(),
};

function registerModel() {
    for (let modelFileKey in modelFiles) {
        const modelName = modelFileKey.split('/').at(-2);
        const modelContext = modelFiles[modelFileKey];
        model[modelName] = defineStore(modelName, modelContext.setup, modelContext.option);
    }
}
export { model, registerModel, uniStorage };
