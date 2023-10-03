<template>
  <div class="card bg-info col-lg-3 col-md-5 position-relative p-0">
    <img :src="post.blogCoverPhoto" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title text-uppercase">{{ post.blogTitle }}</h5>
    </div>
    <div class="card-footer bg-white border-0">
      <p class="card-text p-0 m-0">posted on: {{ new Date(post.date).toLocaleString('en-us', {dateStyle: "long"}) }}</p>
      <router-link :to="{name:'ViewBlog', params:{ blogId: this.post.blogID}}" class="border-0 text-uppercase text-danger text-decoration-none d-block m-0 p-0">show more
        <img src="../assets/image/icon/right-arrow-svgrepo-com.svg" class="arrow-icon ms-1 text-danger" alt="icon">
      </router-link>
    </div>
    <div class="icon-wrapper d-flex position-absolute top-0 end-0 pe-2 pt-2" v-if="showEditPost">
      <router-link to="" class="d-block btn btn-danger rounded-circle" @click="editPost">
        <img src="../assets/image/icon/edit.svg" alt="edit">
      </router-link>
      <router-link to="" class="d-block btn btn-danger ms-1 rounded-circle" @click="deletePost">
        <img src="../assets/image/icon/delete.svg" alt="delete">
      </router-link>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.icon-wrapper {
  img {
    width: 15px;
  }
}
.card-img, .card-img-top {
  min-height: 13rem;
  object-fit: cover;
}

@media (min-width: 992px) {
  .col-lg-3 {
    width: 23%;
  }
}
</style>


<script>

export default {
  name: "BlogCard",
  props: ["post"],
  computed: {
    showEditPost() {
      return this.$store.state.editPost
    }
  },
  methods: {
    deletePost(){
      this.$store.dispatch('deletePost',this.post.blogID)
    },
    editPost(){
      this.$router.push({name: 'EditBlog',params:{blogId:this.post.blogID}});
    }
  }
}
</script>
