<template>
  <div class="col-lg-6 blog-photo">
    <img v-if="post.showHome" :src="require(`../assets/image/${post.photo}`)" alt="blog-photo" class="w-100">
    <img v-else :src="post.blogCoverPhoto" alt="blog-photo" class="w-100">
  </div>
  <div class="col-lg-6 blog-content">
    <h1 class="fw-bold text-dark display-2 text-uppercase text-center text-lg-start" v-if="post.showHome">
      {{ post.blogTitle }}</h1>
    <h3 class="fw-bold text-dark display-6 text-uppercase text-center text-lg-start" v-else>{{post.blogTitle }} </h3>
    <h6 class="text-dark pt-2 fs-5 text-center text-lg-start" v-if="post.showHome">{{ post.blogPost }}</h6>
    <p class="text-dark pt-2 fs-5 text-center textpm-lg-start" v-html="post.blogHtml"></p>
    <div v-if="post.showHome" class="w-100 d-flex d-lg-block justify-content-center">
      <router-link to="/login"
                   class="text-uppercase text-decoration-none text-white fs-6 btn btn-danger mt-2 py-2 px-4 rounded-pill">
        login/register
      </router-link>
    </div>
    <div v-else class="w-100 d-flex d-lg-block justify-content-center">
      <router-link :to="{name:'ViewBlog', params:{ blogId: this.post.blogID}}"
                   class="border-0 text-uppercase text-danger text-decoration-none d-block pt-2">show more
        <img src="../assets/image/icon/right-arrow-svgrepo-com.svg" class="arrow-icon ms-1 text-danger" alt="icon">
      </router-link>
    </div>
  </div>
</template>


<style scoped lang="scss">
.btn-outline-danger:hover {
  color: #fff !important;
}

.blog-content:nth-child(6) {
  padding-bottom: 50px;
}

@media only screen and (min-width: 992px) {
  .blog-photo:nth-child(1) {
    order: 1;
  }
  .blog-content:nth-child(2) {
    order: 2;
  }
  .blog-photo:nth-child(3) {
    order: 4;
  }
  .blog-content:nth-child(4) {
    order: 3;
  }
  .blog-photo:nth-child(5) {
    order: 5;
  }
  .blog-content:nth-child(6) {
    order: 6;
    padding: 0;
  }
}
</style>


<script>
export default {
  name: "BlogPost",
  props: ["post"],
}
</script>
