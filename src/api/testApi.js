/*
 * @FilePath: \uni-preset-vue-vite\src\api\testApi.js
 * @Date: 2022-10-02 00:20:18
 * @Author: itmanyong@gmail.com
 * @LastEditors: itmanyong@gmail.com
 * @LastEditTime: 2022-10-02 00:25:05
 * @Description: 测试接口api，使用时删除此文件
 */

// 获取帖子列表----默认请求为GET，可以省略请求类型
const API_GET_POST_LIST = `/posts`;
// 获取帖子详情
const API_GET_POST_DETAIL = `/posts/:id GET`;
// 获取帖子评论列表
const API_GET_POST_COMMENT_LIST = `/posts/:id/comments GET`;



// 使用这种方式导出,实现自动导入
export { API_GET_POST_LIST, API_GET_POST_DETAIL, API_GET_POST_COMMENT_LIST };
