<template>
  <div class="bg-secondary w-100">
    <Modal v-if="showModal" :modal-message='modalMessage' @close-modal="closeModal"/>
    <Loading v-if="loading"/>
    <div class="w-100 d-flex align-items-center justify-content-center form-container">
      <div class="bg-light form-wrapper position-relative">
        <div class="w-100 d-flex justify-content-center mb-4">
          <span class="fs-6 text-capitalize">back to
            <router-link to="/login" class="text-danger">login</router-link>
          </span>
        </div>
        <div class="w-100 mb-4 text-center">
          <h3 class="fw-bold fs-2 text-uppercase">reset password</h3>
          <p class="text-capitalize pt-1">forgot your password? enter your email to reset it</p>
        </div>
        <div>
          <form @submit.prevent="" method="post" action="" class="w-75 form m-auto form">
            <label class="w-100 position-relative">
              <span class="text-capitalize fw-bold">email</span>
              <input class="w-100 border-0 rounded-pill py-2 mt-2 text-center" v-model="email" type="email">
              <small class="d-none">Error Message</small>
            </label>
            <button @click.prevent="resetPassword" class="btn btn-danger w-100 text-uppercase text-light fw-bold px-4 py-2 mt-4 rounded-pill fs-6">
              reset
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "@/components/Modal";
import Loading from "@/components/Loading";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export default {
  name: "ResetPassword",
  components: {Loading, Modal},
  data() {
    return {
      email: null,
      modalMessage: '',
      showModal: false,
      loading: null,
    }
  },
  methods: {
    closeModal() {
      this.showModal = !this.showModal;
      this.email = '';
    },
    resetPassword(){
      this.loading = true;
      firebase.auth().sendPasswordResetEmail(this.email).then(()=>{
        this.modalMessage = 'if your account exists, you will receive email';
        this.loading = false;
        this.showModal = true;
      }).catch(error=>{
        this.modalMessage = error.message;
        this.loading = false;
        this.showModal = true;
      })
    }
  }
}
</script>

<style scoped lang="scss">

// Import form.scss in Login

</style>
