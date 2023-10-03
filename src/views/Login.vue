<template>
  <div class="bg-secondary w-100 py-4">
    <div class="w-100 d-flex align-items-center justify-content-center form-container">
      <div class="bg-light form-wrapper position-relative">
        <div class="w-100 d-flex justify-content-center mb-4">
          <span class="fs-6 text-capitalize">Don't have an account? <router-link to="/register" class="text-danger">register</router-link> </span>
        </div>
        <div class="d-flex justify-content-center">
          <img src="../assets/image/logo/logo.png" class="logo" alt="logo">
        </div>
        <div>
          <form @submit.prevent="" method="post" action="" class="w-75 form m-auto form">
            <label class="w-100 position-relative">
              <span class="text-capitalize fw-bold">email</span>
              <input class="w-100 border-0 rounded-pill py-2 mt-2 text-center" v-model="email" type="email">
            </label>
            <label class="w-100 mt-4 position-relative">
              <span class="fw-bold text-capitalize">password</span>
              <input class="w-100 border-0 rounded-pill py-2 mt-2 text-center" v-model="password"
                     type="password">
              <small v-if="error" class="text-danger">{{ errorMsg }}</small>
            </label>
            <button @click.prevent="signIn"
                    class="btn btn-danger w-100 text-uppercase text-light fw-bold px-4 py-2 mt-4 rounded-pill fs-6">sign
              in
            </button>
            <router-link to="/reset-password"
                         class="border-0 text-uppercase text-danger text-decoration-none d-block mt-5 text-center">
              reset password
              <img src="../assets/image/icon/right-arrow-svgrepo-com.svg" class="arrow-icon ms-1 text-danger"
                   alt="icon">
            </router-link>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "../assets/scss/form";
</style>


<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export default {
  name: "LoginView",
  data() {
    return {
      email: null,
      password: null,
      error: null,
      errorMsg: '',
    }
  },
  methods: {
    signIn() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(() => {
        this.$router.push({name: 'HomeView'});
        this.error = false;
        this.errorMsg = '';
      }).catch((err) => {
        this.error = true;
        this.errorMsg = err.message;
      })
    },
  }
}
</script>
