import {createStore} from 'vuex';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import db from '../firebase/firebaseinit';

export default createStore({
    state: {
        editPost: null,
        user: null,
        profileEmail: null,
        profileFirstName: null,
        profileLastName: null,
        profileUserName: null,
        profileId: null,
        profileInitials: null,
        blogHtml: "write something....",
        blogTitle: "",
        blogPhotoName: null,
        blogPhotoUrl: null,
        blogCoverPreview: null,
        blogPosts: [],
        postLoaded: null,
        loadingApp: null,
    },

    getters: {
        blogPostsFeed(state) {
            return state.blogPosts.slice(0, 2)
        },
        blogPostsCards(state) {
            return state.blogPosts.slice(2, 6)
        },
    },
    mutations: {
        toggleEditPost(state, payload) {
            state.editPost = payload;
        },
        profileSetInfo(state, user) {
            state.profileId = user.id;
            state.profileEmail = user.data().email;
            state.profileFirstName = user.data().firstName;
            state.profileLastName = user.data().lastName;
            state.profileUserName = user.data().userName;
        },
        profileSetInitials(state) {
            state.profileInitials =
                state.profileFirstName.toUpperCase().match(/\b([A-Z])/g).join('') +
                state.profileLastName.toUpperCase().match(/\b([A-Z])/g).join('');
        },
        filterBlogPost(state, payload) {
            state.blogPosts = state.blogPosts.filter(post => post.blogID !== payload);
        },
        setBlogState(state, payload) {
            state.blogTitle = payload.blogTitle;
            state.blogHtml = payload.blogHtml;
            state.blogPhotoUrl = payload.blogCoverPhoto;
            state.blogPhotoName = payload.blogPhotoName;
        },
        updateUser(state, payload) {
            state.user = payload;
        },
        changeFirstName(state, payload) {
            state.profileFirstName = payload;
        },
        changeLastName(state, payload) {
            state.profileLastName = payload;
        },
        changeUserName(state, payload) {
            state.profileUserName = payload;
        },
        updateBlogTitle(state, payload) {
            state.blogTitle = payload;
        },
        newBlogPost(state, payload) {
            state.blogHtml = payload;
        },
        fileNameChange(state, payload) {
            state.blogPhotoName = payload;
        },
        createFileUrl(state, payload) {
            state.blogPhotoUrl = payload;
        },
        closeModalPreview(state) {
            state.blogCoverPreview = false;
        },
        openPhotoPreview(state) {
            if (state.blogPhotoUrl) {
                state.blogCoverPreview = true;
            }
        },
    },
    actions: {
        async getCurrentUser({commit}) {
            const dataBase = await db.collection('users').doc(firebase.auth().currentUser.uid);
            const dbResults = await dataBase.get();
            commit("profileSetInfo", dbResults);
            commit("profileSetInitials");
        },
        async updateUserSetting({state, commit}) {
            const dataBase = await db.collection('users').doc(state.profileId);
            await dataBase.update({
                firstName: state.profileFirstName,
                lastName: state.profileLastName,
                userName: state.profileUserName,
            });
            commit("profileSetInitials");
        },
        async getPost({state}) {
            state.loadingApp = true;
            const dataBase = await db.collection('blogPosts').orderBy('date', 'desc').get();
            await dataBase.forEach(doc => {
                if (!state.blogPosts.some(post => post.blogID === doc.id)) {
                    const data = {
                        blogHtml: doc.data().blogHtml,
                        blogID: doc.data().blogID,
                        blogCoverPhoto: doc.data().blogCoverPhoto,
                        blogTitle: doc.data().blogTitle,
                        date: doc.data().date,
                        blogPhotoName: doc.data().blogPhotoName,
                    };
                    state.blogPosts.push(data)
                }
            })
            state.postLoaded = true;
            state.loadingApp= false;
        },
        async updatePost({commit,dispatch},payload){
          commit("filterBlogPost", payload);
          await dispatch("getPost")
        },
        async deletePost({commit}, payload) {
            const getPost = await db.collection("blogPosts").doc(payload);
            await getPost.delete();
            commit('filterBlogPost', payload);
        }
    },
    modules: {}
})
