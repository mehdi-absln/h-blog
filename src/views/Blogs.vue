<template>
  <section class="bg-light blogs-section">
    <div class="container py-4">
      <div class="row justify-content-between align-items-center py-5 g-4">
        <div class="col-12 d-flex justify-content-end align-items-center" v-if="user">
          <label for="editing-checkbox" class="text-capitalize text-dark">toggle editing post</label>
          <input v-model="editPost" type="checkbox" id="editing-checkbox" class="ms-3">
        </div>
      </div>
      <div class="row">
        <BlogCard class="ms-3 mt-3" :post="post" v-for="(post, index) in blogPosts" :key="index"/>
      </div>
    </div>
  </section>
</template>


<style lang="scss" scoped>
@import '../assets/scss/_variable.scss';

input[type="checkbox"] {
  position: relative;
  border: none;
  background: #fff;
  outline: none;
  width: 80px;
  height: 30px;
  border-radius: 30px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0.06);
  -webkit-appearance: none;
  cursor: pointer;
}

input[type="checkbox"]:before {
  position: absolute;
  content: '';
  width: 30px;
  height: 30px;
  border-radius: 20px;
  top: 0;
  left: 0;
  background: $dark;
  transform: scale(1.1);
  transition: 500ms ease all;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0.06);
}

input:checked[type="checkbox"]:before {
  background: $light;
  left: 52px;
}

.blogs-section {
  min-height: 80vh;
}
</style>


<script>
import BlogCard from "@/components/BlogCard";
import {mapState} from 'vuex';

export default {
  name: "BlogsView",
  components: {BlogCard},
  computed: {
    ...mapState(['user','blogPosts','editPost']),
    editPost: {
      get() {
        return this.editPost;
      },
      set(payload) {
        this.$store.commit("toggleEditPost", payload)
      }
    },
  },
  beforeUnmount() {
    this.$store.commit("toggleEditPost", false)
  }
}
</script>
