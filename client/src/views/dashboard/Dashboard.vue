<template>
  <div id="dashboard">  
    <div class="dashboard-side hero is-dark is-fullheight is-paddingless">
      <div class="columns is-marginless">
        <!-- SIDEBAR -->
        <side-bar :user="user"></side-bar>
        <main class="dashboard-content column is-paddingless">
          <!-- TOPNAV -->
          <top-nav></top-nav>
          <div class="container">
            <!-- CONTENT -->
            <router-view></router-view>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import AuthService from '@/services/AuthService'
import TopNav from '@/components/dashboard/TopNav';
import SideBar from '@/components/dashboard/Sidebar';
import { mapActions } from 'vuex'

export default {
  name: "Dashboard",
  components: {
    TopNav,
    SideBar
  },
  data() {
    return {
      user: {}
    }
  },
  created() {
    this.getUserData()
    this.getChapters()
    this.getBooks()
    this.getMotos()
  },
  methods: {
    ...mapActions('chapters', ['getChapters']),
    ...mapActions('books', ['getBooks']),
    ...mapActions('motos', ['getMotos']),
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

</style>