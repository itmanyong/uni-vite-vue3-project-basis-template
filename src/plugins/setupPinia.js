/*
 * @FilePath: \uni-preset-vue-vite\src\plugins\setupPinia.js
 * @Date: 2022-10-01 21:32:03
 * @Author: itmanyong@gmail.com
 * @LastEditors: itmanyong@gmail.com
 * @LastEditTime: 2022-10-01 23:27:20
 * @Description:
 */
import { createPersistedState } from 'pinia-plugin-persistedstate';

export function setupPinia(app) {
    const modalPinia = createPinia();

    modalPinia.use(
        createPersistedState({
            storage: uniStorage,
        })
    );

    app.use(modalPinia);

    registerModel();
}
