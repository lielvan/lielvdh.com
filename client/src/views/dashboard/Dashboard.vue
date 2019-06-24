<template>
  <div id="dashboard">

    <nav class="nav">
      TOP NAV
    </nav>

    <div class="hero is-fullheight is-paddingless">
      <div class="columns is-marginless">
        <aside class="column is-2 is-paddingless">
          <nav class="menu">
            <div class="user">
              <h2>Admin Dashboard</h2>
              <p>Welcome <strong>{{ user.username }}</strong></p>
            </div>
            <p class="menu-label">General</p>
            <ul class="menu-list">
              <li><a>Dashboard</a></li>
              <li><a>Chapters</a></li>
              <li><a>Motos</a></li>
              <li><a>Footer</a></li>
            </ul>
          </nav>
        </aside>
        <main class="column is-paddingless">
          <div class="container">
            <nav class="level">
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading">Tweets</p>
                  <p class="title">3,456</p>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading">Following</p>
                  <p class="title">123</p>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading">Followers</p>
                  <p class="title">456K</p>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading">Likes</p>
                  <p class="title">789</p>
                </div>
              </div>
            </nav>
          </div>

        </main>
      </div>
    </div>

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

<style>
aside {
  height: 100vh;
  background-color: rgb(247, 247, 247);
}
.user {
  padding: 50px;
}
</style>