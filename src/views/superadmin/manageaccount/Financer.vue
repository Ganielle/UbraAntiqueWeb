<template>
  <div>
    <a
      class="text-black text-xl uppercase lg:inline-block font-semibold pt-12"
      href="javascript:void(0)"
    >
      Manage Account / Financer
    </a>
    <hr class="my-4 md:min-w-full" />
    <br/>
    <!-- Header -->
    <div>
      <div class="mb-3 pt-0" style="display: flex; gap: 10px;">
        <input type="text" placeholder="Search admin" class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline" v-model="search" @input="searchUser"/>
        
        <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="clearSearch()" :disabled="loadingapi">
          Clear Search
        </button>
      </div>
    </div>
    <br/>
    <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" v-on:click="toggleCreateUser()">
      Create User
    </button>
    <br/><br/><br/>
    <div style="display: flex; gap: 10px; justify-content: center; align-items: center;">
      <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" :disabled="pagination.page <= 0" @click="previousePage() || loadingapi">
        <i class="fas fa-chevron-left"></i>
      </button>

      <p style="font-size: 1.4rem; font-weight: bold;">{{ pagination.page + 1 }} / {{ pagination.totalpage }}</p>

      <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" :disabled="pagination.page >= pagination.totalpage - 1" @click="nextPage() || loadingapi">
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
    <br/><br/>
    <FinancerTable v-if="!loadingapi" :useritems="userlist" @edit-user="toggleEditUser" @delete-user="toggleDeleteUser"/>
    <center v-else>
      <i class="fas fa-solid fa-spinner" style="animation:spin 4s linear infinite;"></i>
    </center>

    <!--#region CREATE ACCOUNT-->
    <div>
      <vue-final-modal v-model="showModal" classes="modal-container" content-class="modal-content">
        <button class="modal__close" @click="toggleCreateUser()">
          <mdi-close></mdi-close>
        </button>
        <span class="modal__title">Create Financer Account</span>
        <br/>
        <div class="modal__content">
          <p>Username:</p>
          <input type="text" placeholder="Enter username" class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full" v-model="createUserdetails.username"/>
          <br/>
          <p>Password:</p>
          <input type="password" placeholder="Enter password" class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full" v-model="createUserdetails.password"/>
          <br/>
          <p>First Name:</p>
          <input type="text" placeholder="Enter first name" class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full" v-model="createUserdetails.firstname"/>
          <br/>
          <p>Last Name:</p>
          <input type="text" placeholder="Enter last name" class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full" v-model="createUserdetails.lastname"/>
          <br/><br/>
        </div>
        <div class="modal__action">
          <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="() => {
            resetCreateUser()
            toggleCreateUser()
          }" :disabled="loadingapi">
            <center v-if="loadingapi">
              <i class="fas fa-solid fa-spinner" style="animation:spin 4s linear infinite;"></i>
            </center>
            <p v-else>Cancel</p>
          </button>
          <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="createUser()" :disabled="loadingapi">
            <center v-if="loadingapi">
              <i class="fas fa-solid fa-spinner" style="animation:spin 4s linear infinite;"></i>
            </center>
            <p v-else>Create</p>
          </button>
        </div>
      </vue-final-modal>
    </div>

    <!--#region EDIT ACCOUNT-->
    <div>
      <vue-final-modal v-model="showModalEdit" classes="modal-container" content-class="modal-content">
        <button class="modal__close" @click="toggleEditUser()">
          <mdi-close></mdi-close>
        </button>
        <span class="modal__title">Edit Financer Account</span>
        <br/>
        <div class="modal__content">
          <p>Username:</p>
          <input type="text" placeholder="Enter username" class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full" v-model="editUserdetails.username"/>
          <br/>
          <p>Password:</p>
          <input type="password" placeholder="Enter password" class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full" v-model="editUserdetails.password"/>
          <br/>
          <p>First Name:</p>
          <input type="text" placeholder="Enter first name" class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full" v-model="editUserdetails.firstname"/>
          <br/>
          <p>Last Name:</p>
          <input type="text" placeholder="Enter last name" class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full" v-model="editUserdetails.lastname"/>
          <br/><br/>
        </div>
        <div class="modal__action">
          <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="toggleEditUser()" :disabled="loadingapi">
            <center v-if="loadingapi">
              <i class="fas fa-solid fa-spinner" style="animation:spin 4s linear infinite;"></i>
            </center>
            <p v-else>Cancel</p>
          </button>
          <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="editUser()" :disabled="loadingapi">
            <center v-if="loadingapi">
              <i class="fas fa-solid fa-spinner" style="animation:spin 4s linear infinite;"></i>
            </center>
            <p v-else>Edit</p>
          </button>
        </div>
      </vue-final-modal>
    </div>
  </div>
</template>
<script>

import FinancerTable from "@/components/Subastanauan/Dashboard/Superadmin/Financertable.vue";

export default {
  name: "manage-account-financer-page",
  data() {
    return {
      showModal: false,
      showModalEdit: false,
      search: "",
      pagination: {
        page: 0,
        totalpage: 1,
        limit: 10
      },
      userlist: [],
      debounceTimeout: null,
      selecteduserid: "",
      createUserdetails: {
        username: "",
        password: "",
        firstname: "",
        lastname: ""
      },
      editUserdetails: {
        userid: "",
        password: "",
        username: "",
        firstname: "",
        lastname: ""
      },
      loadingapi: false
    }
  },
  components: {
    FinancerTable,
  },
  methods: {
    toggleCreateUser(){
      if (this.loadingapi){
        return
      }
      this.showModal = !this.showModal
    },
    toggleEditUser(userdetails){
      if (this.loadingapi){
        return
      }
      if (userdetails){
        this.editUserdetails = userdetails
      }
      else{
        this.editUserdetails = {
          userid: "",
          password: "",
          username: "",
          firstname: "",
          lastname: ""
        }
      }

      this.showModalEdit = !this.showModalEdit
    },
    toggleDeleteUser(userid){
      if (this.loadingapi){
        return
      }
      this.selecteduserid = userid
      this.$swal({
        title: "Are you sure you want to delete this user?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(async (data) => {
        if (data.isConfirmed){
          const response = await fetch(`${process.env.VUE_APP_API_URL}/users/deletestaff`, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
              "userid": this.selecteduserid
            })
          });

          const responseData = await response.json();

          if (response.status === 400) {
            //  API HERE
            this.$swal({
              title: responseData.data,
              icon: "error"
            })

            return;
          }
          else if (response.status == 401){
            this.$swal({
              title: "Authentication Failed! You will now be redirected to the login page",
              icon: "error"
            })

            this.$router.push({path: "/"})
          }
          else{
            this.$swal({
                title: "Admin successfully deleted",
                icon: "success",
                allowOutsideClick: false
            }).then(() => {
                
                if (this.pagination.totalpage - 1 < this.pagination.page){
                  this.pagination.page -= 1
                }

                this.selecteduserid = ""
                this.listUsers()
            })
          }
        }
      })
    },
    async listUsers() {
      this.loadingapi = true
      const response = await fetch(`${process.env.VUE_APP_API_URL}/users/liststaffs?authfilter=financer&fullnamefilter=${this.search}&page=${this.pagination.page}&limit=${this.pagination.limit}`, {
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

        this.loadingapi = false
        return;
      }
      else if (response.status == 401){
        this.$swal({
          title: "Authentication Failed! You will now be redirected to the login page",
          icon: "error"
        })

        this.$router.push({path: "/"})
      }
      else{
        this.pagination.totalpage = responseData.data.totalpages <= 0 ? 1 : responseData.data.totalpages
        this.userlist = responseData.data.list
        
        this.loadingapi = false
      }
    },
    searchUser(){
      if (this.loadingapi){
        return
      }
      clearTimeout(this.debounceTimeout);
      this.debounceTimeout = setTimeout(() => {
        this.pagination.page = 0
        this.listUsers();
      }, 500); // Adjust delay as needed (e.g., 500 ms)
    },
    clearSearch(){
      if (this.loadingapi){
        return
      }
      this.pagination.page = 0
      this.search = ""

      this.listUsers()
    },
    nextPage(){
      this.pagination.page++
      this.listUsers()
    },
    previousePage(){
      this.pagination.page--;
      this.listUsers()
    },
    async createUser(){
      this.loadingapi = true
      const alphaRegex = /^[A-Za-z]+$/;
      const withSpecialCharRegex = /^[A-Za-z0-9@/[\]#]+$/;

      if (this.createUserdetails.username == ""){
        this.$swal({
          title: "Please enter username"
        })
        this.loadingapi = false
        return;
      }
      else if (this.createUserdetails.username.length < 5 || this.createUserdetails.username.length > 15 ){
        this.$swal({
          title: "Username must be greater than 5 and less than 15 characters"
        })
        
        this.loadingapi = false
        return;
      }
      else if (!alphaRegex.test(this.createUserdetails.username)){
        this.$swal({
          title: "Please don't use numbers or special characters for username"
        })
        
        this.loadingapi = false
        return;
      }
      else if (this.createUserdetails.password == ""){
        this.$swal({
          title: "Please enter password"
        })
        
        this.loadingapi = false
        return;
      }
      else if (this.createUserdetails.password.length < 5 || this.createUserdetails.password.length > 25 ){
        this.$swal({
          title: "Password must be greater than 5 and less than 25 characters"
        })
        
        this.loadingapi = false
        return;
      }
      else if (!withSpecialCharRegex.test(this.createUserdetails.password)){
        this.$swal({
          title: "Only use letters, numbers and some special characters (@/[]#) for password"
        })
        
        this.loadingapi = false
        return;
      }
      else if (this.createUserdetails.firstname == ""){
        this.$swal({
          title: "Please enter your first name"
        })
        
        this.loadingapi = false
        return;
      }
      else if (response.status == 401){
        this.$swal({
          title: "Authentication Failed! You will now be redirected to the login page",
          icon: "error"
        })

        this.$router.push({path: "/"})
      }
      else if (this.createUserdetails.lastname == ""){
        this.$swal({
          title: "Please enter your last name"
        })
        
        this.loadingapi = false
        return;
      }

      const response = await fetch(`${process.env.VUE_APP_API_URL}/users/createstaffs`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
          "staffusername": this.createUserdetails.username,
          "password": this.createUserdetails.password,
          "firstname": this.createUserdetails.firstname,
          "lastname": this.createUserdetails.lastname,
          "auth": "admin"
        })
      });

      const responseData = await response.json();

      if (response.status === 400) {
        //  API HERE
        this.$swal({
          title: responseData.data,
          icon: "error"
        })
      
        this.loadingapi = false
        return;
      }
      else if (response.status == 401){
        this.$swal({
          title: "Authentication Failed! You will now be redirected to the login page",
          icon: "error"
        })

        this.$router.push({path: "/"})
      }
      else{
        this.$swal({
          title: "Admin created successfully!",
          icon: "success"
        })
        .then(() => {
          this.resetCreateUser()
          this.toggleCreateUser()
          this.pagination.page = 0
          this.search = ""
          this.listUsers()
        })
      }
    },
    resetCreateUser(){
      this.createUserdetails = {
        username: "",
        password: "",
        firstname: "",
        lastname: ""
      }
    },
    async editUser(){
      this.loadingapi = true
      const alphaRegex = /^[A-Za-z]+$/;
      const withSpecialCharRegex = /^[A-Za-z0-9@/[\]#]+$/;

      if (this.editUserdetails.username == ""){
        this.$swal({
          title: "Please enter username"
        })
        this.loadingapi = true
        return;
      }
      else if (this.editUserdetails.username.length < 5 || this.editUserdetails.username.length > 15 ){
        this.$swal({
          title: "Username must be greater than 5 and less than 15 characters"
        })
        this.loadingapi = true
        return;
      }
      else if (!alphaRegex.test(this.editUserdetails.username)){
        this.$swal({
          title: "Please don't use numbers or special characters for username"
        })
        this.loadingapi = true
        return;
      }
      else if (this.editUserdetails.password != ""){
        if (this.editUserdetails.password == ""){
          this.$swal({
            title: "Please enter password"
          })
          this.loadingapi = true
          return;
        }
        else if (this.editUserdetails.password.length < 5 || this.editUserdetails.password.length > 25 ){
          this.$swal({
            title: "Password must be greater than 5 and less than 25 characters"
          })
          this.loadingapi = true
          return;
        }
        else if (!withSpecialCharRegex.test(this.editUserdetails.password)){
          this.$swal({
            title: "Only use letters, numbers and some special characters (@/[]#) for password"
          })
          this.loadingapi = true
          return;
        }
      }
      else if (this.editUserdetails.firstname == ""){
        this.$swal({
          title: "Please enter your first name"
        })
        this.loadingapi = true
        return;
      }
      else if (this.editUserdetails.lastname == ""){
        this.$swal({
          title: "Please enter your last name"
        })
        this.loadingapi = true
        return;
      }

      const response = await fetch(`${process.env.VUE_APP_API_URL}/users/editstaff`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
          "userid": this.editUserdetails.userid,
          "staffusername": this.editUserdetails.username,
          "password": this.editUserdetails.password,
          "firstname": this.editUserdetails.firstname,
          "lastname": this.editUserdetails.lastname,
          "auth": "admin"
        })
      });

      const responseData = await response.json();

      if (response.status === 400) {
        //  API HERE
        this.$swal({
          title: responseData.data,
          icon: "error"
        })
      this.loadingapi = true
        return;
      }
      else if (response.status == 401){
        this.$swal({
          title: "Authentication Failed! You will now be redirected to the login page",
          icon: "error"
        })

        this.$router.push({path: "/"})
      }
      else{
        this.$swal({
          title: "Admin edited successfully!",
          icon: "success"
        })
        .then(() => {
          this.toggleEditUser()
          this.pagination.page = 0
          this.search = ""
          this.listUsers()
        })
      }
    }
  },
  mounted() {
    this.listUsers()
  }
};
</script>