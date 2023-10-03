import {createRouter, createWebHashHistory} from 'vue-router';
import Home from '@/views/Home.vue';
import store from '@/store';
import Blogs from "@/views/Blogs";
import Login from "@/views/Login";
import Register from "@/views/Register";
import ResetPassword from "@/views/ResetPassword";
import Profile from "@/views/Profile";
import CreatePost from "@/views/CreatePost";
import PostPreview from "@/views/PostPreview";
import ViewBlog from "@/views/ViewBlog";
import EditBlog from "@/views/EditBlog";
//import firebase from 'firebase/compat/app';
//import 'firebase/compat/auth';

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'HomeView',
    component: Home,
    meta:{
      title: "Home",
      requiresAuth: false,
    }
  },
  {
    path: '/blogs',
    name: 'BlogsView',
    component: Blogs,
    meta:{
      title: "Blogs",
      requiresAuth: false,
    }
  },
  {
    path: '/login',
    name: 'LoginView',
    component: Login,
    meta:{
      title: "Login",
      requiresAuthAfterLogin: true,
    }
  },
  {
    path: '/register',
    name: 'RegisterView',
    component: Register,
    meta:{
      title: "Register",
      requiresAuthAfterLogin: true,
    }
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: ResetPassword,
    meta:{
      title: "Reset Password",
      requiresAuthAfterLogin: true,
    }
  },
  {
    path: '/profile',
    name: 'ProfileView',
    component: Profile,
    meta:{
      title: "Profile",
      requiresAuth: true,
    }
  },
  {
    path: '/create-post',
    name: 'CreatePost',
    component: CreatePost,
    meta:{
      title: "CreatePost",
      requiresAuth: true,
    }
  },
  {
    path: '/post-preview',
    name: 'PostPreview',
    component: PostPreview,
    meta:{
      title: "PostPreview",
      requiresAuth: true,
    }
  },
  {
    path: '/view-blog/:blogId',
    name: 'ViewBlog',
    component: ViewBlog,
    meta:{
      title: "ViewBlog"
    }
  },
  {
    path: '/edit-blog/:blogId',
    name: 'EditBlog',
    component: EditBlog,
    meta:{
      title: "EditBlog",
      requiresAuth:true,
    }
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
});
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | HBlogs`
  next();
});
router.beforeEach((to, from, next) => {
  let user = store.state.user;

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (user) {
      return next();
    }
    else {
      return next({name: 'HomeView'})
    }
  }
 return next()
 })
router.beforeEach((to, from, next) => {
  let user = store.state.user;

  if (to.matched.some((record) => record.meta.requiresAuthAfterLogin)) {
    if (user) {
      return next({name: 'HomeView'})
    }
    else {
      return next()
    }
  }
  return next()
})

export default router
