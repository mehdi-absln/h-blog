<template>
  <section class="bg-light post-preview-section">
    <div class="container">
      <div class="row">
        <h2 class="fw-bold display-4 text-capitalize">{{ blogTitle }}</h2>
        <img :src="blogPhotoUrl" :alt="blogPhotoName">
        <p v-html="blogHtml"></p>
      </div>
    </div>
  </section>
</template>

<script>
import {mapState} from 'vuex';
export default {
  name: "PostPreview",
  computed: {
    ...mapState(['blogHtml', 'blogTitle', 'blogPhotoName']),
    blogPhotoUrl() {
      return this.$store.state.blogPhotoUrl;
    },
  },
}
</script>

<style lang="scss" scoped>
.post-preview-section{
  min-height: 80vh;
}
</style>
