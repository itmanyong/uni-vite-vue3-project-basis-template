/*
 * @FilePath: \uni-preset-vue-vite\src\utils\common.js
 * @Date: 2022-10-02 00:01:59
 * @Author: itmanyong@gmail.com
 * @LastEditors: itmanyong@gmail.com
 * @LastEditTime: 2022-10-02 00:04:16
 * @Description:
 */
/**
 * 判断对象是否为Promise
 * @param {any} obj 判断对象
 * @returns boolean
 */
function isPromise(obj) {
    if (!obj) return false;
    // 如果为函数
    if (typeof obj === 'function') {
        // 兼容()=>new Promise()
        if (typeof obj.__proto__ === 'function') {
            return obj.toString().indexOf('Promise') > -1;
        }
        return obj.__proto__.constructor.name === 'AsyncFunction';
    }
    // 如果为对象
    if (typeof obj === 'object') {
        return obj.__proto__.constructor.name === 'Promise';
    }
    return false;
}
/**
 * 将 vite 的原始环境变量转成正确的类型
 * @param env 原始的 vite 环境变量
 * @returns 转换成正确类型的 vite 环境变量
 */
function useEnv(envConf = import.meta.env) {
    return Object.keys(envConf).reduce((acc, cur) => {
        acc[cur] = envConf[cur];
        if (['true', 'false'].includes(envConf[cur]) || [/^(\-|\+)?\d+(\.\d+)?$/].some(reg => reg.test(envConf[cur]))) {
            acc[cur] = JSON.parse(envConf[cur]);
        }

        return acc;
    }, {});
}

/**
 * 加工版本定时器
 * @param {Number} ms 间隔毫秒数
 * @param {Function} callback 执行函数
 */
function interval(ms, callback, ...rest) {
    const start = document.timeline ? document.timeline.currentTime : performance.now(); //定时器开始时间
    // 定时器执行函数
    function timer1(time) {
        const gaps = time - start;
        const seconds = Math.round(gaps / ms); // 第几次执行
        const isStop = callback(seconds, ...rest); // 返回true表示不再继续执行
        if (isStop === true) return;
        const targetNext = (seconds + 1) * ms + start; // 算出下次interval开始的时间
        const delay = document.timeline ? document.timeline.currentTime : performance.now(); // 取出更新完UI的时间
        setTimeout(
            () => requestAnimationFrame(timer1),
            targetNext - delay // 算出距离下次interval开始时间
        );
    }
    // 首次触发
    timer1(start);
}

export { isPromise, useEnv, interval };
