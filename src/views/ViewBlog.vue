<template>
  <section class="bg-light view-blog-section" v-if="showBlog">
    <div class="container">
      <div class="row">
        <h2 class="fw-bold display-4 text-capitalize">{{ this.currentBlog[0].blogTitle }}</h2>
        <p class="">posted on: {{ new Date(this.currentBlog[0].date).toLocaleString('en-us', {dateStyle: "long"}) }}</p>
        <img :src="this.currentBlog[0].blogCoverPhoto" :alt="this.currentBlog[0].blogPhotoName">
        <p class="py-4" v-html="this.currentBlog[0].blogHtml"></p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ViewBlog",
  data() {
    return {
      currentBlog: null,
      blogPosts: null,
      img: null,
      showBlog: null,
    }
  },
  async mounted() {
    this.blogPosts = await this.$store.state.blogPosts;
    this.currentBlog = await this.blogPosts.filter(blog => blog.blogID === this.$route.params.blogId);
    console.log(this.currentBlog)
    this.showBlog = true;
  },
}
</script>

<style lang="scss" scoped>
.view-blog-section {
  min-height: 80vh;
}
</style>
