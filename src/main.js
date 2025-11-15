import { createApp } from "vue";
import { createWebHistory, createRouter } from "vue-router";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import VueGoogleMaps from '@fawmi/vue-google-maps';

// styles

import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/assets/styles/tailwind.css";

// mouting point for the whole app

import App from "@/App.vue";
import { vfmPlugin } from 'vue-final-modal'

// #region LAYOUTS

import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";
import Auth from "@/layouts/Auth.vue";

import Admin from "@/layouts/Admin.vue";
import User from '@/layouts/User.vue'
import Employer from '@/layouts/Employer.vue'

//  #endregion

//  #region SUPERADMIN

import Dashboard from "@/views/superadmin/Dashboard.vue";

import WorksSA from '@/views/superadmin/Works.vue'
import WorksListSA from '@/views/superadmin/Workslist.vue'
import WorkDeniedSA from '@/views/superadmin/Worksdenied.vue'

import Jobdescriptionworks from "./views/superadmin/Jobdescriptionworks.vue";
import Jobdescriptionworksdenied from "./views/superadmin/Jobdescriptionworksdenied.vue";

//  #endregion

//  #region USER

import Userdashboard from '@/views/user/employee/Dashboard.vue'
import Userprofile from '@/views/user/employee/Profile.vue'
import UserJobDescription from '@/views/user/employee/Jobdescription.vue'
import UserMyJobs from '@/views/user/employee/Myjobs.vue'
import UserMessaging from '@/views/user/employee/Message.vue'
import UserMyJobDescription from '@/views/user/employee/Myjobdescription.vue'
import Usermanagement from "./views/superadmin/usermanagement.vue";
import Usermanagementprofile from "./views/superadmin/Usermanagementprofile.vue";

//  #endregion

//  #region EMPLOYER

import Employerdashboard from '@/views/user/employer/Dashboard.vue'
import EmployerMessaging from '@/views/user/employer/Message.vue'
import EmployerMyJobDescription from '@/views/user/employer/Myjobdescription.vue'

//  #endregion

const routes = [
  {
    path: "/superadmin",
    redirect: "/superadmin/dashboard",
    component: Admin,
    children: [
      {
        path: "/superadmin/dashboard",
        component: Dashboard,
      },
      {
        path: "/superadmin/works/approval",
        component: WorksSA,
      },
      {
        path: "/superadmin/works/list",
        component: WorksListSA,
      },
      {
        path: "/superadmin/works/denied",
        component: WorkDeniedSA
      },
      {
        path: "/superadmin/works/description",
        component: Jobdescriptionworks,
        props: route => ({
          title: route.query.title,
          id: route.query.id,
          path: route.query.path
        })
      },
      {
        path: "/superadmin/deniedworks/description",
        component: Jobdescriptionworksdenied,
        props: route => ({
          title: route.query.title,
          id: route.query.id,
          path: route.query.path
        })
      },
      {
        path: "/superadmin/management/user",
        component: Usermanagement
      },
      {
        path: "/superadmin/management/user/profile",
        component: Usermanagementprofile,
        props: route => ({
          id: route.query.id,
          path: route.query.path
        })
      }
    ],
  },
  {
    path: "/employee",
    redirect: "/employee/dashboard",
    component: User,
    children: [
      {
        path: "/employee/dashboard",
        component: Userdashboard,
      },
      {
        path: "/employee/myprofile",
        component: Userprofile,
      },
      {
        path: "/employee/jobdescription",
        component: UserJobDescription,
        props: route => ({
          title: route.query.title,
          id: route.query.id
        })
      },
      {
        path: "/employee/myjobs",
        component: UserMyJobs
      },
      {
        path: "/employee/message",
        component: UserMessaging
      },
      {
        path: "/employee/myjobdescription",
        component: UserMyJobDescription,
        props: route => ({
          title: route.query.title,
          id: route.query.id
        })
      },
    ]
  },
  {
    path: "/employer",
    redirect: "/employer/myjobs",
    component: Employer,
    children: [
      {
        path: "/employer/myjobs",
        component: Employerdashboard,
      },
      {
        path: "/employer/message",
        component: EmployerMessaging
      },
      {
        path: "/employer/myjobdescription",
        component: EmployerMyJobDescription,
        props: route => ({
          title: route.query.title,
          id: route.query.id
        })
      },
    ]
  },
  {
    path: "/",
    redirect: "/login",
    component: Auth,
    children: [
      {
        path: "/login",
        component: Login,
      },
      {
        path: "/register",
        component: Register,
      },
    ],
  },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).use(vfmPlugin).use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCDuoNto3I8FpZ1b1wwA0CiZsGjxAEirR8',
  },
}).use(VueSweetalert2).mount("#app");
