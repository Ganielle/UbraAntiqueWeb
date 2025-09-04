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

import ManageaccountAdmin from '@/views/superadmin/manageaccount/Admin.vue'
import ManageaccountFinancer from '@/views/superadmin/manageaccount/Financer.vue'
import ManageaccountCustomerSupport from '@/views/superadmin/manageaccount/Customersupport.vue'
import ManageaccountUser from '@/views/superadmin/manageaccount/User.vue'
import Manageuseridverification from '@/views/superadmin/manageaccount/Useridverification.vue'

import Inventorystore from '@/views/superadmin/inventory/Store.vue'
import InventoryItem from '@/views/superadmin/inventory/Items.vue'

import Livebidding from '@/views/superadmin/livebidding/Livebidding.vue'
import Livebiddingcontrol from '@/views/superadmin/livebidding/Livebiddingcontrol.vue'

import Announcement from '@/views/superadmin/announcement/announcement.vue'

import Load from '@/views/superadmin/load/Load.vue'
import Loan from '@/views/superadmin/loans/Request.vue'
import LoanPayments from '@/views/superadmin/loans/Payments.vue'

import Forums from '@/views/superadmin/forums/Forumlist.vue'
import ForumPostRequest from '@/views/superadmin/forums/Forumrequestlist.vue'

//  #endregion

//  #region USER

import Userdashboard from '@/views/user/employee/Dashboard.vue'
import Userprofile from '@/views/user/employee/Profile.vue'
import UserJobDescription from '@/views/user/employee/Jobdescription.vue'
import UserMyJobs from '@/views/user/employee/Myjobs.vue'
import UserMessaging from '@/views/user/employee/Message.vue'
import UserMyJobDescription from '@/views/user/employee/Myjobdescription.vue'

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
        path: "/superadmin/manageuser/admin",
        component: ManageaccountAdmin,
      },
      {
        path: "/superadmin/manageuser/financer",
        component: ManageaccountFinancer
      },
      {
        path: "/superadmin/manageuser/customersupport",
        component: ManageaccountCustomerSupport
      },
      {
        path: "/superadmin/manageuser/user",
        component: ManageaccountUser
      },
      {
        path: "/superadmin/manageuser/useridverification",
        component: Manageuseridverification
      },
      {
        path: "/superadmin/inventory/store",
        component: Inventorystore
      },
      {
        path: "/superadmin/inventory/items",
        component: InventoryItem
      },
      {
        path: "/superadmin/livebidding",
        component: Livebidding
      },
      {
        path: "/superadmin/livebidding/controls",
        component: Livebiddingcontrol
      },
      {
        path: "/superadmin/announcement",
        component: Announcement
      },
      {
        path: "/superadmin/load",
        component: Load
      },
      {
        path: "/superadmin/loan/request",
        component: Loan
      },
      {
        path: "/superadmin/loan/payment",
        component: LoanPayments
      },
      {
        path: "/superadmin/forum/postrequest",
        component: ForumPostRequest
      },
      {
        path: "/superadmin/forum/forumlist",
        component: Forums
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
