<template>
  <div class="login">
    账号：
    <el-input v-model="loginData.username" placeholder="请输入内容"/>
    <br>
    密码：
    <el-input v-model="loginData.password" placeholder="请输入密码" show-password/>
    <el-button>登录</el-button>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
interface LoginData {
  username: string
  password: string
}

const loginData = reactive<LoginData>({
  username: '',
  password: ''
})
</script>

<style scoped lang="scss">
.login {
  width: 300px;
}
</style>
