/*
 * @FilePath: \经销商版本\code\src\utils\color.js
 * @Date: 2022-10-02 03:02:52
 * @Author: itmanyong@gmail.com
 * @LastEditors: itmanyong@gmail.com
 * @LastEditTime: 2022-10-02 07:28:06
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

/**
 * rgba转十六进制
 * @param {String} rgba rgba颜色值
 * @returns String
 */
function rgbaToHex(rgba) {
  const reg = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d*.?\d?)\)$/
  const [, r, g, b, a] = rgba.match(reg)
  return `#${[r, g, b]
    .map(item => {
      const hex = Number(item).toString(16)
      return hex.length === 1 ? `0${hex}` : hex
    })
    .join('')}${Math.floor(a * 255).toString(16)}`
}
/**
 * 十六进制转rgba
 * @param {String} hex 十六进制颜色值
 * @returns String
 */
function hexToRgba(hex) {
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6}|[0-9a-fA-f]{8})$/
  let sColor = hex.toLowerCase()
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      let sColorNew = '#'
      for (let i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
      }
      sColor = sColorNew
    }
    // 处理六位的颜色值
    const sColorChange = []
    for (let i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt(`0x${sColor.slice(i, i + 2)}`))
    }
    return `rgba(${sColorChange.join(',')}, ${(parseInt(`0x${sColor.slice(7, 9)}`) / 255).toFixed(2)})`
  }
}
/**
 * 十六进制转hls
 * @param {String} hex 十六进制颜色值
 * @returns String
 */
function hexToHls(hex) {
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6}|[0-9a-fA-f]{8})$/
  let sColor = hex.toLowerCase()
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      let sColorNew = '#'
      for (let i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
      }
      sColor = sColorNew
    }
    // 处理六位的颜色值
    const sColorChange = []
    for (let i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt(`0x${sColor.slice(i, i + 2)}`))
    }
    const r = sColorChange[0] / 255
    const g = sColorChange[1] / 255
    const b = sColorChange[2] / 255
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0
    let s = 0
    const l = (max + min) / 2
    if (max === min) {
      h = 0
      s = 0
    } else {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0)
          break
        case g:
          h = (b - r) / d + 2
          break
        case b:
          h = (r - g) / d + 4
          break
        default:
          break
      }
      h /= 6
    }
    return `hsl(${Math.floor(h * 360)}, ${Math.floor(s * 100)}%, ${Math.floor(l * 100)}%)`
  }
}
/**
 * rgba转hls
 *  @param {String} rgba rgba颜色值
 * @returns String
 */
function rgbaToHls(rgba) {
  const reg = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d*.?\d?)\)$/
  const [, r, g, b, a] = rgba.match(reg)
  const r1 = r / 255
  const g1 = g / 255
  const b1 = b / 255
  const max = Math.max(r1, g1, b1)
  const min = Math.min(r1, g1, b1)
  let h = 0
  let s = 0
  const l = (max + min) / 2
  if (max === min) {
    h = 0
    s = 0
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r1:
        h = (g1 - b1) / d + (g1 < b1 ? 6 : 0)
        break
      case g1:
        h = (b1 - r1) / d + 2
        break
      case b1:
        h = (r1 - g1) / d + 4
        break
      default:
        break
    }
    h /= 6
  }

  return `hsl(${Math.floor(h * 360)}, ${Math.floor(s * 100)}%, ${Math.floor(l * 100)}%)`
}
/**
 * hls转rgba
 * @param {String} hls hls颜色值
 * @returns String
 */
function hlsToRgba(hls) {
  const reg = /^hsl\((\d+),\s*(\d+),\s*(\d+)\)$/
  const [, h, s, l] = hls.match(reg)
  const h1 = h / 360
  const s1 = s / 100
  const l1 = l / 100
  let r = 0
  let g = 0
  let b = 0
  if (s1 === 0) {
    r = g = b = l1
  } else {
    const q = l1 < 0.5 ? l1 * (1 + s1) : l1 + s1 - l1 * s1
    const p = 2 * l1 - q
    r = hue2rgb(p, q, h1 + 1 / 3)
    g = hue2rgb(p, q, h1)
    b = hue2rgb(p, q, h1 - 1 / 3)
  }
  return `rgba(${Math.floor(r * 255)}, ${Math.floor(g * 255)}, ${Math.floor(b * 255)}, 1)`
}
/**
 * hls转hex
 * @param {String} hls hls颜色值
 * @returns String
 */
function hlsToHex(hls) {
  const reg = /^hsl\((\d+),\s*(\d+),\s*(\d+)\)$/
  const [, h, s, l] = hls.match(reg)
  const h1 = h / 360
  const s1 = s / 100
  const l1 = l / 100
  let r = 0
  let g = 0
  let b = 0
  if (s1 === 0) {
    r = g = b = l1
  } else {
    const q = l1 < 0.5 ? l1 * (1 + s1) : l1 + s1 - l1 * s1
    const p = 2 * l1 - q
    r = hue2rgb(p, q, h1 + 1 / 3)
    g = hue2rgb(p, q, h1)
    b = hue2rgb(p, q, h1 - 1 / 3)
  }
  const hex = `#${Math.floor(r * 255).toString(16)}${Math.floor(g * 255).toString(16)}${Math.floor(b * 255).toString(16)}`
  return hex
}

export { randomRgbaColor, randomHexColor, randomHlsColor, rgbaToHex, hexToRgba, hexToHls, rgbaToHls, hlsToRgba, hlsToHex }
