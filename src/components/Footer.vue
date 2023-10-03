<template>
  <footer class="bg-dark w-100">
    <div class="container py-1">
      <div class="row align-items-center py-5 justify-content-between g-5 g-lg-0">
        <ul class="col-lg-4 col-12 d-flex justify-content-center justify-content-lg-start">
          <li class="pt-3">
            <router-link to="/home" class="text-light text-decoration-none fs-5 text-capitalize">home</router-link>
          </li>
          <li class="ps-lg-4 pt-3">
            <router-link to="/blogs" class="text-light text-decoration-none ps-3 fs-5 text-capitalize">blogs</router-link>
          </li>
          <li class="ps-lg-4 pt-3" v-if="!user">
            <router-link to="/login" class="text-light text-decoration-none ps-3 fs-5 text-capitalize">login</router-link>
          </li>
          <li class="ps-lg-4 pt-3" v-if="!user">
            <router-link to="/register" class="text-light text-decoration-none ps-3 fs-5 text-capitalize">register</router-link>
          </li>
          <li class="ps-lg-4 pt-3" v-if="user">
            <router-link to="/create-post" class="text-light text-decoration-none ps-3 fs-5 text-capitalize">create post</router-link>
          </li>
          </ul>
        <div class="col-lg-3 col-12">
          <h6 class="text-white">Copyright 2021 All Rights Reserved</h6>
        </div>
      </div>
    </div>
  </footer>
</template>


<style scoped lang="scss">
.footer-li:nth-child(1),.footer-li a:nth-child(1){
  padding: 0!important;
}

</style>


<script>
export default {
  name: "FooterItem",
  computed:{
    user(){
      return this.$store.state.user;
    }
  }
}
</script>
