import { createApp } from "vue";
import { createWebHistory, createRouter } from "vue-router";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
// import VueGoogleMaps from '@fawmi/vue-google-maps';

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
import Forgotpassword from "./views/auth/Forgotpassword.vue";

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

import Forumsapproval from "./views/superadmin/Forumsapproval.vue";
import Forumslist from "./views/superadmin/Forumslist.vue";
import Forumsdenied from "./views/superadmin/Forumsdenied.vue";
import Forumpost from "./views/superadmin/Forumpost.vue";

//  #endregion

//  #region USER

import Userdashboard from '@/views/user/employee/Dashboard.vue'
import Userprofile from '@/views/user/employee/Profile.vue'
import UserJobDescription from '@/views/user/employee/Jobdescription.vue'
import UserMyJobs from '@/views/user/employee/Myjobs.vue'
import UserMessaging from '@/views/user/employee/Message.vue'
import UserMyJobDescription from '@/views/user/employee/Myjobdescription.vue'
import Usermanagement from "./views/superadmin/usermanagement.vue";
import Usermanagementbanned from "./views/superadmin/usermanagementbanned.vue";
import Usermanagementprofile from "./views/superadmin/Usermanagementprofile.vue";
import Adminmanageaccount from "./views/superadmin/Adminmanageaccount.vue";
import Adminmanageaccountbanned from "./views/superadmin/Adminmanageaccountbanned.vue";
import Forumsemployee from "./views/user/employee/Forumsemployee.vue";
import Forumpostemployee from "./views/user/employee/Forumpost.vue";
import Forumslistemployee from "./views/user/employee/Forumslist.vue";

//  #endregion

//  #region EMPLOYER

import Employerdashboard from '@/views/user/employer/Dashboard.vue'
import EmployerMessaging from '@/views/user/employer/Message.vue'
import EmployerMyJobDescription from '@/views/user/employer/Myjobdescription.vue'
import Employeeprofile from "./views/user/employer/Employeeprofile.vue";
import Forumsemployer from "./views/user/employer/Forumsemployer.vue";
import Forumpostemployer from "./views/user/employer/Forumpost.vue";
import Forumslistemployer from "./views/user/employer/Forumslist.vue";
import Profileemployer from "./views/user/employer/Profile.vue";

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
        path: "/superadmin/management/activeusers",
        component: Usermanagement
      },
      {
        path: "/superadmin/management/banusers",
        component: Usermanagementbanned
      },
      {
        path: "/superadmin/management/user/profile",
        component: Usermanagementprofile,
        props: route => ({
          id: route.query.id,
          path: route.query.path
        })
      },
      {
        path: "/superadmin/management/activeadmins",
        component: Adminmanageaccount
      },
      {
        path: "/superadmin/management/banadmins",
        component: Adminmanageaccountbanned
      },
      
      {
        path: "/superadmin/forums/approval",
        component: Forumsapproval
      },
      {
        path: "/superadmin/forums/list",
        component: Forumslist
      },
      {
        path: "/superadmin/forums/denied",
        component: Forumsdenied
      },
      {
        path: "/superadmin/forums/post",
        component: Forumpost,
        props: route => ({
          title: route.query.title,
          id: route.query.id,
          path: route.query.path,
          pagepath: route.query.pagepath
        })
      },
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
      {
        path: "/employee/myforums",
        component: Forumsemployee
      },
      {
        path: "/employee/forums/post",
        component: Forumpostemployee,
        props: route => ({
          title: route.query.title,
          id: route.query.id,
          path: route.query.path,
          pagepath: route.query.pagepath
        })
      },
      {
        path: "/employee/forums",
        component: Forumslistemployee
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
      {
        path: "/employer/jobdescription/employee/profile",
        component: Employeeprofile,
        props: route => ({
          employeeid: route.query.employeeid
        })
      },
      {
        path: "/employer/myforums",
        component: Forumsemployer
      },
      {
        path: "/employer/forums/post",
        component: Forumpostemployer,
        props: route => ({
          title: route.query.title,
          id: route.query.id,
          path: route.query.path,
          pagepath: route.query.pagepath
        })
      },
      {
        path: "/employer/forums",
        component: Forumslistemployer
      },
      {
        path: "/employer/myprofile",
        component: Profileemployer,
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
      {
        path: "/forgotpassword",
        component: Forgotpassword
      }
    ],
  },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// createApp(App).use(router).use(vfmPlugin).use(VueGoogleMaps, {
//   load: {
//     key: 'AIzaSyCDuoNto3I8FpZ1b1wwA0CiZsGjxAEirR8',
//   },
// }).use(VueSweetalert2).mount("#app");

createApp(App).use(router).use(vfmPlugin).use(VueSweetalert2).mount("#app");