<template>
  <div>
    <h2>Login</h2>
    <form @submit="login">
      <input type="text" name="username" v-model="username"><br>
      <input type="password" name="password" v-model="password"><br>
      <input type="submit" value="Login">
    </form>
  </div>
</template>

<script>
import router from '../router';
import AuthService from '../services/AuthService'

export default {
  name: "login",
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    async login() {
      let data = {
        username: this.username,
        password: this.password
      }
      let response = {}
      debugger;
      try {
        response = await AuthService.login(data);
        router.push("/dashboard");
      } catch(err) {
        router.push("/");
      }
    }
  }
}
</script>
