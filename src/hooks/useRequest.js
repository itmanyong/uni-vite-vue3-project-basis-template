/*
 * @FilePath: \uni-preset-vue-vite\src\hooks\useRequest.js
 * @Date: 2022-10-02 00:15:53
 * @Author: itmanyong@gmail.com
 * @LastEditors: itmanyong@gmail.com
 * @LastEditTime: 2022-10-02 02:19:29
 * @Description: 请求hook-依赖触发-缓存-重试
 * @params {string} urlPath 请求地址,空格分隔 urlPath与method
 * @params {object} options 请求配置
 * @params {string} options.id 缓存id
 * @params {boolean} options.cache 是否缓存
 * @params {number} options.cacheDelay 缓存时间，ms
 * @params {boolean} options.retry 重试次数
 * @params {number} options.retryDelay 重试间隔，ms
 * @params {vue-WatchSource} options.rely 响应式依赖,等同于vue的watch第一个参数
 * @return {object} 返回请求结果
 * @return {ref} return.loading 是否请求中
 * @return {ref} return.error 错误信息
 * @return {ref} return.data 请求数据
 * @return {ref} return.status 请求状态
 * @return {ref} return.cookies 请求cookies
 * @return {ref} return.headers 请求头
 * @return {ref} return.count 请求次数
 * @return {function} return.run 手动触发请求的方法
 * @example-1
 * const {} = useRequest('/user GET')-------> GET /user
 * const {} = useRequest('/user/:id',{params:{id:1}})-------> GET /user/1
 * const {} = useRequest('/user/:id POST',{params:{id:1},data:{name:'张三'}})-------> POST /user/1
 * const {} = useRequest('/user/:id DELETE',{params:{id:1}})-------> DELETE /user/1
 * @tips
 * 1.请求会以传递的urlPath作为缓存标识，如果urlPath相同，会直接返回缓存数据，第二参数中属性 id 可以覆盖
 * 2.第二个参数除开上述属性，还可以传递 uni-ajax 的其他所有配置(不含url&&method)
 * 3.手动触发请求，可以使用返回的 run 方法
 * 4.手动结束请求，可以使用返回的 stop 方法
 * 5.手动清除缓存，可以使用返回的 clear 方法
 * @issus
 * 1.依赖与缓存冲突时,到底是否重新请求呢? 1.忽略缓存,依赖更新直接静默?请求  2.添加重新请求标记,缓存过期直接静默?请求
 */

const env = util_useEnv();

const _cache = new Map(); // 缓存实例
const _cacheDelay = new Map(); // 缓存时间

function useRequest(urlPath = '', options = {}) {
    const {
        id = urlPath,
        cache = env.VITE_CACHE,
        cacheDelay = env.VITE_CACHE_DELAY,
        retry = env.VITE_RETRY,
        retryDelay = env.VITE_RETRY_DELAY,
        rely = null,
        ...uniAjaxOptions
    } = options;

    const loading = ref(false); // 是否请求中
    const error = ref(null); // 错误信息
    const data = ref(null); // 请求数据
    const status = ref(null); // 请求状态
    const cookies = ref(null); // 请求cookies
    const headers = ref(null); // 请求头
    const errMsg = ref(null); // 错误信息

    const count = ref(0); // 请求次数
    const retryCount = ref(0); // 重试次数
    const http = ref(null); // 请求实例
    // 清除缓存
    const clear = () => {
        _cache.has(id) && _cache.delete(id);
        _cacheDelay.has(id) && _cacheDelay.delete(id);
    };
    // 清理请求
    const stop = () => {
        loading.value && http.value?.abort();
    };
    // 请求回调
    const runCallBack = (val, isSuccess) => {
        data.value = isSuccess ? val.data || null : null;
        data.error = isSuccess ? null : val.data || null;
        status.value = val.statusCode || null;
        cookies.value = val.cookies || null;
        headers.value = val.header || null;
        errMsg.value = val.errMsg || null;
        loading.value = false;
    };
    // 请求成功回调
    const runSuccess = val => {
        // 处理缓存
        if (cache && val.config.method === 'GET') {
            _cache.set(id, val);
            _cacheDelay.set(id, new Date().getTime() + cacheDelay);
        }
        retryCount.value = 0;
        runCallBack(val, true);
    };
    // 请求失败回调
    const runFail = val => {
        // 处理重试
        if (retry && retryCount.value < retry) {
            retryCount.value++;
            setTimeout(run, retryDelay);
            return;
        }
        runCallBack(val, false);
    };
    // 请求函数
    const run = () => {
        // 清除正在进行中的请求
        stop();
        const [url, method = 'GET'] = urlPath.split(' ');
        // 处理缓存
        if (method === 'GET' && _cache.has(id)) {
            if (_cacheDelay.get(id) > new Date().getTime()) {
                runCallBack(_cache.get(id), true);
                return;
            } else {
                clear()
            }
        }
        loading.value = true;
        // 保存请求实例
        http.value = request({
            ...(uniAjaxOptions || {}),
            url: url,
            method,
        })
            .then(runSuccess)
            .catch(runFail)
            .finally(() => {
                count.value += 1;
            });
    };

    // 响应式依赖触发请求
    watch(rely, run, { deep: true, immediate: true });

    // 卸载时清理请求
    onBeforeUnmount(() => {
        stop();
    });

    return {
        loading: readonly(loading),
        error: readonly(error),
        data: readonly(data),
        status: readonly(status),
        cookies: readonly(cookies),
        headers: readonly(headers),
        count: readonly(count),
        retryCount: readonly(retryCount),
        run,
        stop,
        clear
    };
}

export { useRequest };
