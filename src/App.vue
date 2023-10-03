<template>
  <div class="w-100 h-100 bg-black position-fixed top-0 start-0" v-if="loadingApp">
    <Loading v-if="loadingApp"/>
  </div>
  <div class="app" v-if="this.$store.state.postLoaded">
    <Navbar v-if="!navigation"/>
    <main>
      <router-view/>
    </main>
    <Footer v-if="!navigation"/>
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");

$theme-colors: (
    "success": #757575,
    "dark": #2F2B38,
    "primary":#5c5858,
    "light": #E1DCD2,
    "danger": #DB5042,
    "info": #f8fffda8,
    "secondary":#CBC9C2,
);
@import "./node_modules/bootstrap/scss/bootstrap.scss";

* {
  font-family: "Quicksand", sans-serif;
  outline: none !important;
}

li {
  list-style: none !important;
}

body {
  overflow-x: hidden;
}

main {
  position: relative;
  min-height: 80vh;
}

.pointer {
  cursor: pointer;
}

.dropdown-profile-wrapper {
  width: 55px;
  height: 55px;
}
</style>
<script>

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {mapState} from 'vuex';

export default {
  components: {Footer, Navbar, Loading},
  data() {
    return {
      navigation: null,
    }
  },
  computed:{
    ...mapState(['loadingApp']),
  },
  methods: {
    checkRoute() {
      if (this.$route.name === "LoginView" || this.$route.name === "ResetPassword" || this.$route.name === "RegisterView") {
        this.navigation = true;
        return;
      }
      this.navigation = false;
    },

  },
  watch: {
    $route() {
      this.checkRoute();
    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.$store.commit('updateUser', user);
      if (user) {
        this.$store.dispatch('getCurrentUser');
      }
    });
    this.checkRoute();
    this.$store.dispatch('getPost')
  }
}
</script>
