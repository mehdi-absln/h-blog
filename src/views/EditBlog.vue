<template>
  <div v-if="dataReady" class="bg-light editor-wrapper">
    <Loading v-if="loading"/>
    <blogCoverPreview v-if="this.blogCoverPreview"/>
    <div v-if="error" class="alert alert-danger text-capitalize container" role="alert">
      {{ errorMsg }}
    </div>
    <div class="container py-3">
      <label><input placeholder="enter blog title" class="text-capitalize create-post-input px-2" v-model="blogTitle"/></label>
      <input ref="blogPhoto" @change="fileChange" type="file" name="file" id="file"
             class="create-post-input-file position-absolute overflow-hidden opacity-0"/>
      <label for="file" class="btn btn-danger px-4 py-2 rounded-pill text-white me-2">Choose a file</label>
      <button @click="openPhotoPreview" class="btn btn-danger text-capitalize py-2 px-4 rounded-pill text-white"
              :class="{'invalid-btn': !this.$store.state.blogPhotoUrl}">preview photo
      </button>
      <span class="ps-2">file chosen {{ this.$store.state.blogPhotoName }}</span>
      <QuillEditor useCustomImageHandler v-model:content="blogHtml" contentType="html" theme="snow"/>
      <button @click="updateBlog" class="btn btn-danger text-capitalize py-2 px-4 rounded-pill text-white mt-3">
        save changes
      </button>
      <router-link to="/post-preview"
                   class="btn btn-danger text-capitalize py-2 px-4 rounded-pill text-white mt-3 ms-1">preview changes
      </router-link>
    </div>
  </div>
</template>

<style lang="scss">
@import "../assets/scss/variable";

.editor-wrapper {
  min-height: 80vh;

  .create-post-input {
    border: none;
    border-bottom: 2px solid black;
    background: transparent;
  }

  .ql-editor {
    height: 40vh;
  }

  .ql-toolbar {
    margin-top: 10px;
  }

  .invalid-btn {
    opacity: 0.7;
    box-shadow: none !important;

    &:focus, &:hover, &:active {
      background-color: $danger;
      border-color: $danger;
      cursor: unset;
      box-shadow: none;
    }
  }

  .create-post-input-file {
    z-index: -1;
  }
}
</style>


<script>
import {QuillEditor} from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import Loading from "@/components/Loading";
import BlogCoverPreview from "@/components/BLogCoverPreview";
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import db from '../firebase/firebaseinit';
import 'firebase/compat/firestore';
import {mapState} from "vuex";

export default {
  name: "EditBlog",
  data() {
    return {
      file: null,
      error: null,
      errorMsg: '',
      loading: null,
      dataReady: null,
      routeID: null,
      currentBlog: null,
    }
  },
  async mounted() {
    this.dataReady = true;
    this.routeID = this.$route.params.blogId;
    this.currentBlog = await this.$store.state.blogPosts.filter(post => {
      return post.blogID === this.routeID;
    })
    this.$store.commit("setBlogState", this.currentBlog[0]);
  },
  components: {
    BlogCoverPreview,
    QuillEditor,
    Loading,
  },
  methods: {
    fileChange() {
      this.file = this.$refs.blogPhoto.files[0];
      const fileName = this.file.name;
      this.$store.commit("fileNameChange", fileName);
      this.$store.commit("createFileUrl", URL.createObjectURL(this.file))
    },
    openPhotoPreview() {
      this.$store.commit('openPhotoPreview');
    },
    async updateBlog() {
      const dataBase = db.collection('blogPosts').doc(this.routeID)
      if (this.blogTitle.length !== 0 && this.blogHtml !== "<p><br></p>") {
        if (this.file) {
          this.loading = true;
          const storage = getStorage();
          const storageRef = ref(storage, `(documents/BlogCoverPhotos/${this.$store.state.blogPhotoName})`);
          const uploadTask = uploadBytesResumable(storageRef, this.file);
          uploadTask.on('state_changed',
              (snapshot) => {
                console.log(snapshot);
              },
              (error) => {
                console.log(error);
                this.loading = false;
              }, () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                      dataBase.update({
                        blogHtml: this.blogHtml,
                        blogCoverPhoto: downloadURL,
                        blogPhotoName: this.blogPhotoName,
                        blogTitle: this.blogTitle,
                      });
                      this.$store.dispatch("updatePost", this.routeID);
                      this.loading = false;
                      this.$router.push({name:"ViewBlog",params:{blogId:dataBase.id}});
                    })
              },
          )
        }
        this.loading = true;
         dataBase.update({
          blogHtml: this.blogHtml,
          blogTitle: this.blogTitle,
        });
        await this.$store.dispatch('updatePost',this.routeID);
        this.loading = false;
        await this.$router.push({name:"ViewBlog",params:{blogId:dataBase.id}});
      } else {
        console.log('error');
        this.error = true;
        this.errorMsg = "blog title and blog post has been filed!";
        setTimeout(() => {
          this.error = false;
        }, 5000);
      }
    }
  },
  computed: {
    ...mapState(['blogCoverPreview','blogPhotoName','profileId']),
    blogTitle: {
      get() {
        return this.$store.state.blogTitle;
      },
      set(payload) {
        this.$store.commit("updateBlogTitle", payload)
      }
    },
    blogHtml: {
      get() {
        return this.$store.state.blogHtml;
      },
      set(payload) {
        this.$store.commit("newBlogPost", payload)
      }
    },
  },
}
</script>
