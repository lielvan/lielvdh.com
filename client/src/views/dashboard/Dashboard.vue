<template>
  <div>
    <h2>Dashboard</h2>
    <p>Name: {{ user.username }}</p>
  </div>
</template>

<script>
import router from "../../router";
import AuthService from '../../services/AuthService'

export default {
  name: "Dashboard",
  data() {
    return {
      user: {}
    }
  },
  mounted() {
    this.getUserData()
  },
  methods: {
    async getUserData() {
      try {
        let response = await AuthService.getUser();
        this.user = response.data.user;
      } catch (error) {
        router.push("/");
      }
    }
  }
}
</script>