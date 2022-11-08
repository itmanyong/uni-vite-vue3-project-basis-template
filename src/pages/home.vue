<!--
 * @FilePath: \经销商版本\code\src\pages\home.vue
 * @Date: 2022-10-02 02:56:11
 * @Author: itmanyong@gmail.com
 * @LastEditors: itmanyong@gmail.com
 * @LastEditTime: 2022-10-02 07:46:52
 * @Description: 
-->
<template>
  <PageView>
    <view>姓名：{{ data.data?.name || '' }}</view>
  </PageView>
</template>

<script setup>
const { data } = useRequest('http://127.0.0.1:4523/m1/1095302-0-default/pet/1')

watchEffect(() => {
  console.log(data.value)
})
</script>

<style lang="scss" scoped></style>
