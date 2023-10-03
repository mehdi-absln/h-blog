<template>
  <div class="w-100 bg-secondary py-4">
    <div class="w-100 d-flex align-items-center justify-content-center form-container">
      <div class="bg-light form-wrapper position-relative">
        <div class="w-100 d-flex justify-content-center mb-4">
          <span class="fs-6 text-capitalize">already have an account?
            <router-link to="/login" class="text-danger">login</router-link>
          </span>
        </div>
        <div>
          <form @submit.prevent="" method="post" action="" class="w-75 form m-auto">
            <label class="w-100 position-relative">
              <span class="text-capitalize fw-bold">first name</span>
              <input class="w-100 border-0 rounded-pill py-2 mt-2 text-center" v-model="firstName" type="text">
            </label>
            <label class="w-100 position-relative mt-4">
              <span class="text-capitalize fw-bold">last name</span>
              <input class="w-100 border-0 rounded-pill py-2 mt-2 text-center" v-model="lastName" type="text">
            </label>
            <label class="w-100 position-relative mt-4">
              <span class="text-capitalize fw-bold">user name</span>
              <input class="w-100 border-0 rounded-pill py-2 mt-2 text-center" v-model="userName" type="text">
            </label>
            <label class="w-100 mt-4 position-relative">
              <span class="text-capitalize fw-bold">email</span>
              <input class="w-100 border-0 rounded-pill py-2 mt-2 text-center" v-model="email" type="email">
            </label>
            <label class="w-100 mt-4 position-relative">
              <span class="fw-bold text-capitalize">password</span>
              <input class="w-100 border-0 rounded-pill py-2 mt-2 text-center" v-model="password"
                     type="password">
              <small v-if="error" class="text-danger">{{ errorMsg }}</small>
            </label>
            <button @click.prevent="register"
                    class="btn btn-danger w-100 text-uppercase text-light fw-bold px-4 py-2 mt-4 rounded-pill fs-6">sign
              up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import db from '../firebase/firebaseinit';

export default {
  name: "RegisterView",
  data() {
    return {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      error: null,
      errorMsg: '',
    }
  },
  methods: {
    async register() {
      if (this.email !== '' && this.password !== '' && this.firstName !== '' && this.lastName !== '' && this.username !== '') {
        this.error = false;
        this.errorMsg = '';
        const firebaseAuth = await firebase.auth();
        const createUser = await firebaseAuth.createUserWithEmailAndPassword(this.email, this.password);
        const result = await createUser;
        const dataBase = db.collection("users").doc(result.user.uid)
        await dataBase.set({
          firstName: this.firstName,
          lastName: this.lastName,
          userName: this.userName,
          email: this.email,
          password: this.password,
        });
        await this.$router.push({name: 'HomeView'});
      }
      this.error = true;
      this.errorMsg = "Please fill out all the fields!";
    },
  }
}
</script>

<style lang="scss" scoped>

// Import form.scss in Login

</style>
