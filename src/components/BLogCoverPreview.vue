<template>
  <div class="modal-container d-flex justify-content-center align-items-center w-100 h-100 position-fixed top-0 start-0">
    <div class="modal-content w-25 px-4 py-4">
        <img @click="closeModalPreview" class="multiply-icon position-absolute end-0 top-0 me-4 my-3"
             src="../assets/image/icon/multiply-svgrepo-com.svg" alt="multiply">
      <img :src="this.blogCoverPhoto" :alt="this.$store.blogPhotoName" class="mt-4">
    </div>
  </div>
</template>


<style lang="scss" scoped>
.modal-container{
  background-color: rgba(0,0,0,0.7);
  z-index: 5;
  .modal-content{
    border-radius: 20px;
  }
  .multiply-icon{
    width: 25px;
    cursor: pointer;
  }
}
</style>

<script>
export default {
  name: "BLogCoverPreview",
  computed:{
    blogCoverPhoto(){
      return this.$store.state.blogPhotoUrl;
    }
  },
  methods:{
    closeModalPreview(){
      this.$store.commit('closeModalPreview')
    }
  }
}
</script>
