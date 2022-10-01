/*
 * @FilePath: \uni-preset-vue-vite\.config\util.js
 * @Date: 2022-10-01 22:02:16
 * @Author: itmanyong@gmail.com
 * @LastEditors: itmanyong@gmail.com
 * @LastEditTime: 2022-10-01 22:07:10
 * @Description: 公共方法文件
 */

import path from 'path';
import fs from 'fs';

function traverse(dir) {
    const res = [];
    fs.readdirSync(dir).forEach(file => {
        const pathname = path.join(dir, file);
        if (fs.statSync(pathname).isDirectory()) {
            res.push(...traverse(pathname));
        } else {
            res.push(pathname);
        }
    });
    return res;
}
// 读取指定文件的内容
function readFileContent(filePath) {
    const fullPath = path.resolve(__dirname, `../${filePath}`);
    return fs.readFileSync(fullPath, 'utf-8');
}

/**
 * 获取指定目录下指定后缀的文件名称列表
 * @param {String} rootPath 相对于src的绝对文件夹路径,不需要前缀/,如果路径最后的后缀等于ext，则会被当成单个文件进行读取
 * @param {String} params1.ext 要读取的文件后缀,默认.js,带.
 * @param {String} params1.prefix 文件名前缀,默认''
 * @param {String} params1.suffix 文件名后缀,默认''
 * @returns {importPath:{...fileExportApiName}}
 */
function getDirFileApi(rootPath, ops = {}) {
    const defaultOps = { ext: '.js', prefix: '', suffix: '' };
    const { ext = '.js', prefix = '', suffix = '' } = Object.assign(defaultOps, ops);
    // 完整路径
    const fullPath = path.resolve(__dirname, `../src/${rootPath}`);
    // 存储文件的完整路径
    let files = [];
    try {
        // 先区分是文件夹还是文件->补充文件的完整路径
        if (fs.statSync(fullPath).isDirectory()) {
            files = fs
                .readdirSync(fullPath)
                .filter(file => fs.statSync(path.join(fullPath, file)).isFile() && path.extname(file) === ext)
                .map(file => path.join(fullPath, file));
        } else {
            files.push(path.join(fullPath));
        }
        // 存储对应别名路径文件暴露的api
        const apis = {};
        // 遍历文件生成对应的暴露aapi->key:values形式
        files.forEach(fileFullPath => {
            const fileContext = fs.readFileSync(fileFullPath, 'utf-8');
            const match = fileContext.match(/export\s*\{\s*([^\}]+)\s*\}/);
            if (match) {
                // 清除换行和空格获取导出的api名称形成数组
                const apiNames = match[0]
                    .replace(/^export/, '')
                    .replace(/[\s\n\{\}]/g, '')
                    .split(',');
                if (apiNames.length) {
                    if (prefix || suffix) {
                        apiNames.forEach((apiName, apiIndex) => {
                            apiNames[apiIndex] = [apiName, `${prefix}${apiName}${suffix}`];
                        });
                    }
                    apis[`src${fileFullPath.split('src')[1].replace(/\\/g, '/')}`] = apiNames;
                }
            }
        });

        return apis;
    } catch {
        return [];
    }
}
/**
 * 获取指定目录下指定后缀的所有文件名称列表
 * @param {String} dirPath 从项目根目录的文件夹名开始的文件夹路径
 * @param {RegExp} ops.ext 文件后缀，默认 /.*$/
 * @param {String} ops.prefix 文件名前缀，默认 ''
 * @param {String} ops.suffix 文件名后缀，默认 ''
 * @param {String} ops.separator 名称间隔符，默认 '_',用于替换/
 * @param {Boolean} ops.isAllName 文件夹是否参与文件名，默认 true
 * @returns {}
 */
function getDirFilePath(dirPath, ops = {}) {
    const defaultOps = { ext: /.*$/, prefix: '', suffix: '', separator: `_`, isAllName: true };
    const { ext, prefix, suffix, separator, isAllName } = Object.assign(defaultOps, ops);
    // 完整路径
    const fullPath = path.resolve(__dirname, `../${dirPath}`);
    // 读取fullPath下的所有文件
    const files = traverse(fullPath)
        .filter(p => ext.test(p))
        .map(file => `src/${file.replace(/\\/g, '/').split('/src/')[1]}`);
    // 存储对应别名路径文件暴露的api
    return files.reduce((acc, cur) => {
        const aliasName = isAllName
            ? cur.replace(/\..*$/, '').replace(/\//g, separator)
            : cur.replace(/\..*$/, '').split('/').at(-1);
        acc[cur] = [['default', `${prefix}${aliasName}${suffix}`]];
        return acc;
    }, {});
}

export { getDirFileApi, getDirFilePath, readFileContent, traverse };
