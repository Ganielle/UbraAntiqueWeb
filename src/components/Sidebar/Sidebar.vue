<template>
  <nav
    class="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6"
  >
    <div
      class="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto"
    >
      <!-- Toggler -->
      <button
        class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
        type="button"
        v-on:click="toggleCollapseShow('bg-white m-2 py-3 px-6')"
      >
        <i class="fas fa-bars"></i>
      </button>
      <!-- Brand -->
      <router-link
        class="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
        to="/"
      >
        Subas Tanauan
      </router-link>
      <!-- Collapse -->
      <div
        class="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded"
        v-bind:class="collapseShow"
      >
        <!-- Collapse header -->
        <div
          class="md:min-w-full md:hidden block pb-4 mb-4"
        >
          <div class="flex flex-wrap">
            <div class="w-6/12">
              <router-link
                class="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                to="/"
              >
                Subas Tanauan
              </router-link>
            </div>
            <div class="w-6/12 flex justify-end">
              <button
                type="button"
                class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                v-on:click="toggleCollapseShow('hidden')"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
        </div>

        <!--#region FIRST NAVIGATION -->
        <hr class="my-4 md:min-w-full" />
        <ul class="md:flex-col md:min-w-full flex flex-col list-none">
          <li class="items-center">
            <router-link
              to="/superadmin/dashboard"
              v-slot="{ href, navigate, isActive }"
            >
              <a
                :href="href"
                @click="navigate"
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-emerald-500 hover:text-emerald-600'
                    : 'text-blueGray-700 hover:text-blueGray-500',
                ]"
              >
                <i
                  class="fas fa-chart-line mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-blueGray-300']"
                ></i>
                Dashboard
              </a>
            </router-link>
          </li>
        </ul>

        <!--#region SECOND NAVIGATION (MANAGE ACCOUNTS) -->
        <hr class="my-4 md:min-w-full" />
        <h6
          class="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
        >
          Manage Accounts
        </h6>
        <ul class="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
          <li class="items-center">
            <router-link
              to="/superadmin/manageuser/admin"
              v-slot="{ href, navigate, isActive }"
            >
              <a
                :href="href"
                @click="navigate"
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-emerald-500 hover:text-emerald-600'
                    : 'text-blueGray-700 hover:text-blueGray-500',
                ]"
              >
                <i
                  class="fas fa-user-secret mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-blueGray-300']"
                ></i>
                Admin
              </a>
            </router-link>
          </li>

          <li class="items-center">
            <router-link
              to="/superadmin/manageuser/financer"
              v-slot="{ href, navigate, isActive }"
            >
              <a
                :href="href"
                @click="navigate"
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-emerald-500 hover:text-emerald-600'
                    : 'text-blueGray-700 hover:text-blueGray-500',
                ]"
              >
                <i
                  class="fas fa-user-tie mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-blueGray-300']"
                ></i>
                Financer
              </a>
            </router-link>
          </li>

          <li class="items-center">
            <router-link
              to="/superadmin/manageuser/customersupport"
              v-slot="{ href, navigate, isActive }"
            >
              <a
                :href="href"
                @click="navigate"
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-emerald-500 hover:text-emerald-600'
                    : 'text-blueGray-700 hover:text-blueGray-500',
                ]"
              >
                <i
                  class="fas fa-ticket mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-blueGray-300']"
                ></i>
                Customer Support
              </a>
            </router-link>
          </li>

          <li class="items-center">
            <router-link
              to="/superadmin/manageuser/user"
              v-slot="{ href, navigate, isActive }"
            >
              <a
                :href="href"
                @click="navigate"
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-emerald-500 hover:text-emerald-600'
                    : 'text-blueGray-700 hover:text-blueGray-500',
                ]"
              >
                <i
                  class="fas fa-user mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-blueGray-300']"
                ></i>
                User
              </a>
            </router-link>
          </li>

          <li class="items-center">
            <router-link
              to="/superadmin/manageuser/useridverification"
              v-slot="{ href, navigate, isActive }"
            >
              <a
                :href="href"
                @click="navigate"
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-emerald-500 hover:text-emerald-600'
                    : 'text-blueGray-700 hover:text-blueGray-500',
                ]"
              >
                <i
                  class="fas fa-id-card mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-blueGray-300']"
                ></i>
                User ID Verification
              </a>
            </router-link>
          </li>
        </ul>

        <!--#region THIRD NAVIGATION (INVENTORY)-->
        <hr class="my-4 md:min-w-full" />
        <h6
          class="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
        >
          Inventory
        </h6>
        <ul class="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
          <li class="items-center">
            <router-link
              to="/superadmin/inventory/store"
              v-slot="{ href, navigate, isActive }"
            >
              <a
                :href="href"
                @click="navigate"
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-emerald-500 hover:text-emerald-600'
                    : 'text-blueGray-700 hover:text-blueGray-500',
                ]"
              >
                <i
                  class="fas fa-store  mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-blueGray-300']"
                ></i>
                Store
              </a>
            </router-link>
          </li>

          <li class="items-center">
            <router-link
              to="/superadmin/inventory/items"
              v-slot="{ href, navigate, isActive }"
            >
              <a
                :href="href"
                @click="navigate"
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-emerald-500 hover:text-emerald-600'
                    : 'text-blueGray-700 hover:text-blueGray-500',
                ]"
              >
                <i
                  class="fas fa-boxes-stacked mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-blueGray-300']"
                ></i>
                Items
              </a>
            </router-link>
          </li>
        </ul>

        <!--#region FOURTH NAVIGATION-->
        <hr class="my-4 md:min-w-full" />
        <ul class="md:flex-col md:min-w-full flex flex-col list-none">
          
          <li class="items-center">
            <router-link
              to="/superadmin/load"
              v-slot="{ href, navigate, isActive }"
            >
              <a
                :href="href"
                @click="navigate"
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-emerald-500 hover:text-emerald-600'
                    : 'text-blueGray-700 hover:text-blueGray-500',
                ]"
              >
                <i
                  class="fas fa-money-bill mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-blueGray-300']"
                ></i>
                LOAD
              </a>
            </router-link>
          </li>
        </ul>

          <!-- FOUR POINT ONE NAVIGATION -->
          <hr class="my-4 md:min-w-full" />
          <h6
            class="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
          >
            LOANS
          </h6>
          <ul class="md:flex-col md:min-w-full flex flex-col list-none">
            <li class="items-center">
              <router-link
                to="/superadmin/loan/request"
                v-slot="{ href, navigate, isActive }"
              >
                <a
                  :href="href"
                  @click="navigate"
                  class="text-xs uppercase py-3 font-bold block"
                  :class="[
                    isActive
                      ? 'text-emerald-500 hover:text-emerald-600'
                      : 'text-blueGray-700 hover:text-blueGray-500',
                  ]"
                >
                  <i
                    class="fas fa-landmark mr-2 text-sm"
                    :class="[isActive ? 'opacity-75' : 'text-blueGray-300']"
                  ></i>
                  Request
                </a>
              </router-link>
              <router-link
                to="/superadmin/loan/payment"
                v-slot="{ href, navigate, isActive }"
              >
                <a
                  :href="href"
                  @click="navigate"
                  class="text-xs uppercase py-3 font-bold block"
                  :class="[
                    isActive
                      ? 'text-emerald-500 hover:text-emerald-600'
                      : 'text-blueGray-700 hover:text-blueGray-500',
                  ]"
                >
                  <i
                    class="fas fa-landmark mr-2 text-sm"
                    :class="[isActive ? 'opacity-75' : 'text-blueGray-300']"
                  ></i>
                  Payments
                </a>
              </router-link>
            </li>
          </ul>

        <!--#region FIFTH NAVIGATION-->
        <hr class="my-4 md:min-w-full" />
        <ul class="md:flex-col md:min-w-full flex flex-col list-none">

          <li class="items-center">
            <router-link
              to="/superadmin/announcement"
              v-slot="{ href, navigate, isActive }"
            >
              <a
                :href="href"
                @click="navigate"
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-emerald-500 hover:text-emerald-600'
                    : 'text-blueGray-700 hover:text-blueGray-500',
                ]"
              >
                <i
                  class="fas fa-bullhorn mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-blueGray-300']"
                ></i>
                ANNOUNCEMENT
              </a>
            </router-link>
          </li>
        </ul>

        <!--#region SIXTH NAVIGATION-->
        <hr class="my-4 md:min-w-full" />
        <ul class="md:flex-col md:min-w-full flex flex-col list-none">
          <h6
            class="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
          >
            FORUMS
          </h6>
          <li class="items-center">
            <router-link
              to="/superadmin/forum/postrequest"
              v-slot="{ href, navigate, isActive }"
            >
              <a
                :href="href"
                @click="navigate"
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-emerald-500 hover:text-emerald-600'
                    : 'text-blueGray-700 hover:text-blueGray-500',
                ]"
              >
                <i
                  class="fas fa-bullhorn mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-blueGray-300']"
                ></i>
                POST Request
              </a>
            </router-link>
            <router-link
              to="/superadmin/forum/forumlist"
              v-slot="{ href, navigate, isActive }"
            >
              <a
                :href="href"
                @click="navigate"
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-emerald-500 hover:text-emerald-600'
                    : 'text-blueGray-700 hover:text-blueGray-500',
                ]"
              >
                <i
                  class="fas fa-bullhorn mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-blueGray-300']"
                ></i>
                Topic Post
              </a>
            </router-link>
          </li>
        </ul>

        <br/>
      </div>
      <button
        class="bg-emerald-500 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-2 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        @click="logout()"
        >
            Logout
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      collapseShow: "hidden",
    };
  },
  methods: {
    toggleCollapseShow: function (classes) {
      this.collapseShow = classes;
    },
    logout (){
      this.$swal({
        title: "Are you sure you want to logout?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Logout"
      }).then(async data => {
        if (data.isConfirmed){
          const response = await fetch(`${process.env.VUE_APP_API_URL}/auth/logout`, {
            method: 'GET',
            headers: {
              "Content-Type": "application/json"
            },
            credentials: "include"
          });

          const responseData = await response.json();

          if (response.status === 400) {
            //  API HERE
            this.$swal({
              title: responseData.data,
              icon: "error"
            })

            this.walletloading = false
            return;
          }
          else if (response.status == 401){
            this.$swal({
              title: "Authentication Failed! You will now be redirected to the login page",
              icon: "error"
            })

            this.$router.push({path: "/"})
          }

          this.$router.push("/")
        }
      })
    }
  },
  components: {
  },
};
</script>
