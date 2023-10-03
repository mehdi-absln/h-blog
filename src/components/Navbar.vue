<template>
  <header class="bg-light w-100 position-relative">
    <nav class="navbar container py-1 bg-light">
      <div class="navbar-brand">
        <img src="../assets/image/logo/logo.png" alt="logo" class="">
      </div>
      <ul class="d-none d-lg-flex ms-auto" :class="{'active-ul' : hamburgerOpen}">
        <li class="ps-lg-4 pt-3">
          <router-link to="/home" class="text-dark text-decoration-none ps-lg-3 fs-5 text-capitalize">home</router-link>
        </li>
        <li class="ps-lg-4 pt-3">
          <router-link to="/blogs" class="text-dark text-decoration-none ps-lg-3 fs-5 text-capitalize">blogs</router-link>
        </li>
        <li class="ps-lg-4 pt-3" v-if="!user">
          <router-link to="/login" class="text-dark text-decoration-none ps-lg-3 fs-5 text-capitalize">login</router-link>
        </li>
        <li class="ps-lg-4 pt-3" v-if="!user">
          <router-link to="/register" class="text-dark text-decoration-none ps-lg-3 fs-5 text-capitalize">register</router-link>
        </li>
        <li class="ps-lg-4 pt-3" v-if="user">
          <router-link to="/create-post" class="text-dark text-decoration-none ps-lg-3 fs-5 text-capitalize">create post</router-link>
        </li>
      </ul>
      <div class="ms-auto d-flex align-items-center">
        <button class="hamburger app d-block d-lg-none"
                @click="hamburgerOpen = !hamburgerOpen"
                :class="{ 'hamburger--is-open position-fixed' :hamburgerOpen }">
        </button>

        <div v-if="user" class="dropdown-profile-container position-relative">
          <div @click="dropDownOpen=!dropDownOpen"
               class="dropdown-profile-wrapper bg-success rounded-circle d-flex justify-content-center align-items-center pointer">
            <span class="text-capitalize text-white">{{ this.$store.state.profileInitials }}</span>
          </div>
          <div v-if="dropDownOpen" class="dropdown-content bg-primary position-absolute py-3 px-2 text-light">
            <div class="d-flex align-items-center">
              <div class="d-flex justify-content-center">
                <div
                    class="bg-light rounded-circle dropdown-profile-wrapper d-flex justify-content-center align-items-center">
                  <span class="text-capitalize text-dark">{{ this.$store.state.profileInitials }}</span>
                </div>
              </div>
              <div class="w-100 mt-2 ps-2">
            <span class="text-capitalize fs-6">{{
                this.$store.state.profileFirstName
              }} {{ this.$store.state.profileLastName }}</span>
                <span class="d-block fs-6">{{ this.$store.state.profileUserName }}</span>
                <span class="d-bloc fs-6">{{ this.$store.state.profileEmail }}</span>
              </div>
            </div>
            <hr>
            <div class="w-100">
              <router-link class="text-light d-block text-decoration-none" to="/profile">
                <img src="../assets/image/icon/icons8-person-skin-type-7-48.png" class="dropdown-icon" alt="">
                <span class="text-capitalize ps-2">profile</span>
              </router-link>
              <router-link @click="signOut" class="text-light d-block text-decoration-none mt-3" to="#">
                <img src="../assets/image/icon/icons8-sign-out-64.png" class="dropdown-icon" alt="">
                <span class="text-capitalize ps-2">sign out</span>
              </router-link>
            </div>
            <div class="arrow-up"></div>
          </div>
        </div>
      </div>
    </nav>
    <hr class="position-absolute bottom-0 w-100 start-0" v-if="hamburgerOpen===false">
  </header>
</template>


<style scoped lang="scss">
@import '../assets/scss/_variable.scss';

header {
  .navbar, hr {
    z-index: 3;
  }

  .navbar-brand {
    img {
      width: 100px;
    }
  }

  .hamburger {
    position: relative;
    z-index: 3;
    display: flex;
    height: 80px;
    width: 80px;
    border: 0;
    cursor: pointer;
    pointer-events: all;
    outline: none;
    background-color: transparent;

    &:before,
    &:after {
      content: "";
      position: absolute;
      top: 32px;
      left: 20px;
      background: black;
      width: 40px;
      height: 4px;
      transition: transform 300ms ease-out;
    }

    &:after {
      top: auto;
      bottom: 32px;
    }

    &--is-open {
      position: fixed;
      right: 8%;

      &:before {
        transform: translateY(6px) rotate(135deg);
      }

      &:after {
        transform: translateY(-6px) rotate(45deg);
      }
    }
  }

  .dropdown-profile-container {
    .dropdown-icon {
      width: 40px;
    }

    .dropdown-content {
      width: 300px;
      right: 0;
      margin-top: 17px;

      .arrow-up {
        width: 0;
        height: 0;
        border-left: 15px solid transparent;
        border-right: 15px solid transparent;
        border-bottom: 15px solid $primary;
        position: absolute;
        right: 10px;
        top: -12px;
      }
    }
  }
}

@media only screen and (max-width: 992px) {
  .active-ul {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 3;
    top: 0;
    left: 0;
    background-color: $light;
    display: flex !important;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    overflow-y: auto;

    li {
      margin-top: 70px;
    }

    li:first-child {
      padding-top: 5.5rem;
    }

    li:last-child {
      padding-bottom: 2.5rem;
    }
  }
}

@media only screen and (min-width: 992px) {
  ul {
    display: flex;
  }
}
</style>


<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export default {
  name: "NavbarItem",
  data() {
    return {
      hamburgerOpen: false,
      dropDownOpen: false,
    }
  },
  methods:{
    signOut(){
      firebase.auth().signOut();
      window.location.reload();
    },
  },
  computed:{
    user(){
      return this.$store.state.user;
    }
  }
}
</script>
