<template>
  <section id="login" class="hero is-dark is-fullheight">
    <div class="hero-body">
      <div class="container">
        <h2 class="title">Login</h2>
        <p class="has-text-danger">{{ error }}</p>
        <form @submit.prevent="login">
          <div class="columns field">
            <div class="column is-one-quarter">
              <label class="is-sr-only" for="username">Username</label>
              <div class="control">
                <input class="input is-half" type="text" name="username" placeholder="Username" v-model="username">
              </div>
            </div>
          </div>
          <div class="columns field">
            <div class="column is-one-quarter">
              <label class="is-sr-only" for="password">Password</label>
              <div class="control">
                <input class="input" type="password" name="password" placeholder="Password" v-model="password">
              </div>
            </div>
          </div>
          <div class="field is-grouped is-grouped-centered">
            <div class="control">
              <button class="button is-link" type="submit">Sign In</button>
            </div>
            <div class="control" v-if="isLoggedIn">
              <button class="button is-info" v-on:click="logout">Logout</button>
            </div>
            <div class="control" v-if="isLoggedIn">
              <router-link class="button is-primary" :to="{ name: 'dashboard' }">Dashboard</router-link>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import router from '../../router';

export default {
  name: "login",
  data() {
    return {
      username: '',
      password: '',
      error: '',
    }
  },
  computed: {
    isLoggedIn: function() {
      return this.$store.getters['auth/isLoggedIn'];
    }
  },
  methods: {
    login() {
      let data = {
        username: this.username,
        password: this.password
      }
      // debugger;
      this.$store.dispatch('auth/login', data)
        .then(() => {
          this.resetForm();
          router.push('/dashboard');
        })
        .catch(err => {
          this.error = err;
        })
    },
    logout() {
      // debugger;
      this.$store.dispatch('auth/logout')
        .then(() => {
          router.push('/');
        })
        .catch(err => {
          this.error = err;
        })
    },
    resetForm() {
      this.username = '';
      this.password = '';
    }
  }
}
</script>

<style scoped>
.has-text-danger {
  margin-bottom: 1.5rem;
}
#login.is-fullheight .hero-body {
  align-items: flex-start;
}
form .columns {
  justify-content: center;
}
</style>