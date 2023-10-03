<template>
  <!--  Blog Post-->
  <section class="bg-light position-relative mt-5">
    <div class="container">
      <div class="row g-5 align-items-center justify-content-between">
        <BlogPost v-show="showHome" :post="showHome"/>
        <BlogPost :post="post" v-for="(post, index) in blogPostsFeed" :key="index"/>
      </div>
    </div>
  </section>
  <!--  Blog Card-->
  <section class="bg-secondary">
    <div class="container">
      <div class="row justify-content-between py-5 g-4">
        <BlogCard :post="post" v-for="(post, index) in blogPostsCards" :key="index"/>
      </div>
    </div>
  </section>
  <!--  Register Section-->
  <section v-if="!this.$store.state.user" class="bg-primary register-section py-5">
    <div class="container py-5">
      <div class="row justify-content-between align-items-center">
        <div class="col-12 text-light">
          <h3 class="fw-bold display-5 text-uppercase pb-2">
            never miss a post. register for your free account today!
          </h3>
            <router-link to="/register"
                         class="text-uppercase text-decoration-none rounded-pill text-light fs-6 btn btn-danger mt-4 py-2 px-4">
              register for h-blog
            </router-link>
        </div>
      </div>
    </div>
  </section>
</template>


<style lang="scss">
.arrow-icon {
  width: 30px;
}
</style>


<script>
import BlogPost from "@/components/BlogPost";
import BlogCard from "@/components/BlogCard";
import {mapGetters} from 'vuex';

export default {
  name: 'HomeView',
  components: {BlogPost, BlogCard},
  data() {
    return {
      showHome: {
        blogTitle: 'welcome!',
        blogPost: 'Weekly blog articles with all things programming including HTML, CSS, JavaScript and more. Register today to never miss a post! ',
        showHome: true,
        photo: 'cover.png',
      },
    }
  },
  computed: {
    ...mapGetters(['blogPostsFeed','blogPostsCards']),
  },
}
</script>
