# uni-vite-vue3-project-basis-template
- [Github](https://github.com/itmanyong/uni-vite-vue3-project-basis-template)
- [uniapp插件市场](https://ext.dcloud.net.cn/plugin?id=9682)

## ✨ Features

- 样式处理: scss + unocss
- 状态管理: pinia-setup + pinia-plugin-persistedstate
- 网络请求: uni-ajax + 轻度 hook 封装
- 页面路由: uni-crazy-router + 轻度封装
- 工具方法: 常用方法封装
- 导入优化: 全自动可配置导入 + 解救半只手

### 🚀 样式处理

- scss 无需多言
- 配置 unocss 更改根目录 uno.config.js 即可,一般不需要更改直接使用,归因模式默认以 c- 为前缀

### 🚀 状态管理

- src/model 下的目录均被认定为一个模块,模块名即目录名
- 目录下必须存在 index.js 文件且导出一个 setup 函数和 option 配置对象
- setup 用于定义导出 pinia 模块的变量、方法
- option 用于配置额外参数，如持久化插件的配置
- 新增模块只需要将 src/model/global 复制一份改一下目录名即可,会自动注册
- 如何使用

```js
// 不需要导入
const globalModel = model.global() // 等同于常见使用的 useGlobalModel 方法,global等于目录名
```

### 🚀 网络请求

- 主要使用了 [uni-ajax](https://uniajax.ponjs.com/)进行了简单的 hook 封装
- 实例封装在 src/common/request.js 文件,hook 封装在 src/hooks/useRequest.js 文件
- hook 仅实现了基本的请求、缓存、重试、响应依赖
- 如何使用

```js
// 不需要导入
const {data,error,loading,count,status,cookies,run,clear,stop...} = useRequest(urlPath[,{可配参数见useRequest.js文件}])
```

### 🚀 页面路由

- 主要使用了 [uni-crazy-router](https://github.com/devilwjp/uni-crazy-router#readme)
- 路由守卫存在于 src/router 下面对应的文件,方便统一管理
- 路由守卫对应名称卸载的方法全部挂载于 uni.$router 下面,调用即卸载

### 🚀 工具方法

- src/utils 下面的文件导出的函数全部都会被自动按需导入到页面,无需手动操作
- 前缀可以在 vite.config.js 下面的 autoImport 插件配置改
- 如何使用

```js
// 无需导入
前缀_导出的函数名称()
// 例如
util_isPromise(() => {}) // false
```

### 🚀 导入优化

- 详见 vite.config.js 文件中的插件 AutoImport 配置
- 需要注意的是:需要自动导入的目录下的文件导出需要使用：`统一具名导出`

```js
// 定义任意个函数
const testFn = () => {}
const testFn2 = () => {}
// 统一具名导出
export { testFn, testFn2 }
```
- 因为不支持一些用于区分的配置,所以在 .config/util.js 提供了一些实现相同功能的函数
```js
// 例如上面工具方法的使用需要加上前缀 util_ 即是因为使用了 getDirFileApi 函数进行自动申明api
// 如何配置-在插件AutoImport的imports中的对象中使用
{
    // 需要用扩展运算符将其拉平
    ...getDirFileApi(`src下面的目录路径`,{...前缀后缀扩展名等配置})
    // 例如 src/util/test 目录下的所有文件的导出支持自动导入
    ...getDirFileApi(`util/test`,{prefix:"u_t_"}) // 第二个参数可不配置
    // 那么使用时: u_t_函数名()
}

```

### ⚠️ ？？？？？
- 不上ts?-------1.非所有场景需要 2.自己需要时加上不麻烦 3.因为ts而用ts?
- 有任何问题、建议,[移步至此](https://github.com/itmanyong/uni-vite-vue3-project-basis-template/issues)
