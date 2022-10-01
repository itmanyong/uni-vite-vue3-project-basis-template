/*
 * @FilePath: \uni-preset-vue-vite\uno.config.js
 * @Date: 2022-10-02 03:02:06
 * @Author: itmanyong@gmail.com
 * @LastEditors: itmanyong@gmail.com
 * @LastEditTime: 2022-10-02 03:03:03
 * @Description:
 */
import { defineConfig, presetAttributify, presetUno, transformerDirectives } from 'unocss'

const safes = 'full w-full h-full hidden'

export default defineConfig({
  // 样式集合-[[regexp,(matchContexts)=>string],{className:class string}]
  shortcuts: [
    {
      full: `w-full h-full`,
      'flex-center': `flex justify-center items-center`,
    },
  ],
  // 预设集合-[]
  presets: [presetUno(), presetAttributify({ prefix: 'c-', prefixedOnly: true, ignoreAttributes: [] })],
  // 自定义规则/^-?[1-9]\d*$/
  rules: [],
  // 静态样式列表
  safelist: [...safes.split(' ')],
  transformers: [transformerDirectives()],
})
