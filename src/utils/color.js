/*
 * @FilePath: \uni-preset-vue-vite\src\utils\color.js
 * @Date: 2022-10-02 03:02:52
 * @Author: itmanyong@gmail.com
 * @LastEditors: itmanyong@gmail.com
 * @LastEditTime: 2022-10-02 03:02:52
 * @Description: 颜色相关工具函数
 */
/**
 * 生成一个可控制透明度的rgba颜色值
 * @param {Number} opacity 透明度
 * @returns String
 */
function randomRgbaColor(opacity = 1) {
  return `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${opacity})`
}

/**
 * 随机生成一个可控制透明度的十六进制颜色值
 * @param {Number} opacity 透明度
 * @returns String
 */
function randomHexColor(opacity = 1) {
  return `#${['r', 'g', 'b'].map(() => Math.floor(Math.random() * (255 + 1)).toString(16)).join('')}${Math.floor(opacity * 255).toString(16)}`
}

/**
 * 随机生成一个可控制透明度的hls颜色值
 * @param {Number} opacity 透明度
 * @returns String
 */
function randomHlsColor(opacity = 1) {
  return `hsl(${Math.floor(Math.random() * 360)}, ${Math.floor(Math.random() * 100)}%, ${Math.floor(Math.random() * 100)}%, ${opacity})`
}

export { randomRgbaColor, randomHexColor, randomHlsColor }
