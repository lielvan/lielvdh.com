<template>
  <aside class="column is-2 is-paddingless">
    <div class="user">
      <p class="is-size-4">Welcome <strong>{{ user.username }}</strong></p>
      <div class="field buttons are-small is-grouped is-grouped-centered">
        <div class="control">
          <router-link class="button is-info" :to="{ name: 'Home' }">Home</router-link>
        </div>
        <div class="control">
          <button class="button is-info" v-on:click="logout">Logout</button>
        </div>
      </div>
    </div>
    <hr>
    <nav class="menu">
      <p class="menu-label is-size-6 has-text-weight-semibold">General</p>
      <ul class="menu-list">
        <li><router-link :to="{ path: '/dashboard' }">Dashboard</router-link></li>
        <li><router-link :to="{ path: '/dashboard/chapters' }">Chapters</router-link></li>
        <li><router-link :to="{ path: '/dashboard/books' }">Books</router-link></li>
        <li><router-link :to="{ path: '/dashboard/motos' }">Motos</router-link></li>
      </ul>
    </nav>
  </aside>
</template>

<script>
export default {
  name: 'dashboard-sidebar',
  props: ['user'],
  methods: {
    logout() {
      // debugger;
      this.$store.dispatch('auth/logout')
        .then(() => {
          this.$router.push({ name: 'Home' });
        })
        .catch(err => {})
    },
  }
}
</script>

<style>
aside {
  height: 100vh;
  background-color: rgb(61, 61, 61);
}
.menu {
  padding: 2rem 0;
}
.menu .menu-label {
  color: rgb(245, 245, 245);
}
.menu .menu-list a {
  color: rgb(245, 245, 245);
}
.dashboard-side .menu-list a:hover {
  background-color: rgb(226, 226, 226);
}
.user {
  padding: 2rem 0;
  background-color: rgb(61, 61, 61);
}
.user .field {
  margin-top: 2rem;
}
</style>
