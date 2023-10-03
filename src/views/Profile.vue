<template>
  <div class="w-100 bg-light">
    <Modal v-if="showModal" :modal-message='modalMessage' @close-modal="closeModal"/>
    <h2 class="text-uppercase text-center py-4 fw-bold text-dark display-5">account setting</h2>
    <div class="w-100 d-flex align-items-center justify-content-center form-container pb-4">
      <div class="bg-secondary form-wrapper position-relative">
        <div class="w-100 d-flex justify-content-center mb-4">
          <div
              class="bg-light rounded-circle dropdown-profile-wrapper d-flex justify-content-center align-items-center">
            <span class="text-capitalize text-dark">{{ this.$store.state.profileInitials }}</span>
          </div>
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
              <input disabled class="w-100 border-0 rounded-pill py-2 mt-2 text-center" v-model="profileEmail" type="email">
            </label>
            <button @click.prevent="updateUser"
                    class="btn btn-danger w-100 text-uppercase text-light fw-bold px-4 py-2 mt-4 rounded-pill fs-6">save
              changes
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "@/components/Modal";
import {mapState} from 'vuex'
export default {
  name: "ProfileView",
  components:{Modal},
  data() {
    return {
      modalMessage: 'changes were saved',
      showModal: null,
    }
  },
  methods:{
    closeModal() {
      this.showModal = !this.showModal;
      this.email = '';
    },
    updateUser(){
      this.$store.dispatch('updateUserSetting');
      this.showModal = !this.showModal;
    },
  },
  computed:{
    ...mapState(['profileEmail','profileFirstName','profileLastName','profileUserName']),
    firstName:{
      get(){
        return this.profileFirstName
      },
      set(payload){
        this.$store.commit('changeFirstName', payload)
      },
    },
    lastName:{
      get(){
        return this.profileLastName;
      },
      set(payload){
        this.$store.commit('changeLastName', payload)
      },
    },
    userName:{
      get(){
        return this.profileUserName;
      },
      set(payload){
        this.$store.commit('changeUserName', payload)
      },
    },
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/variable";
input{
  background: $inputBgFocus;
}
</style>
