// import Vuetify from "https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.js";
// import Vue from "https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.esm.browser.js";
// import Vue from './vue.js';
import AuthView from '../components/Login.js';
import Example from "../components/ComponentExample";

Vue.use(VueSession);
Vue.use(axios);
Vue.use(VueRouter);
Vue.use(Vuetify);

Vue.prototype.$showFeedback = false;
Vue.prototype.$feedbackMessage = "";
Vue.prototype.$feedbackColor = "";

const routes = [
    {
        path: '*',
        redirect: "/"
    },
    {
        path: '/',
        component: Example,
        name: "Example"
    }
]

const router = new VueRouter({
    routes
});

new Vue({
    vuetify: new Vuetify(),
    router
}).$mount('#app');