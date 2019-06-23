<template>
  <div>
    <h2>Dashboard</h2>
    <p>Name: {{ user.username }}</p>
  </div>
</template>

<script>
import router from "../../router";
import axios from "axios";

export default {
  name: "Dashboard",
  data() {
    return {
      user: {}
    }
  },
  mounted() {
    // this.getUserData()
  },
  methods: {
    getUserData: function() {
      let self = this;
      debugger;
      axios.get("/api/user", { withCredentials: true })
        .then((response) => {
          this.user = response.data.user;
          // self.$set(this, "user", response.data.user)
        })
        .catch((errors) => {
          router.push("/"); 
        })
    }
  }
}
</script>