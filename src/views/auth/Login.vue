<template>
  <div class="container mx-auto px-4 h-full">
    <div class="flex content-center items-center justify-center h-full">
      <div class="w-full lg:w-4/12 px-4">
        <div
          class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0"
        >
        <br/>
          <!--LOGIN-->
          <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
            <div class="text-blueGray-400 text-center mb-3 font-bold">
              <p style="font-size: 1.5rem;">LOGIN</p>
            </div>
            <form>
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Username
                </label>
                <input
                  type="text"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Username"
                  v-model="username"
                />
              </div>

              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Password
                </label>
                <input
                  type="password"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Password"
                  v-model="password"
                />
              </div>

              <div class="text-center mt-6">
                <button
                  class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="button"
                  @click="Signin()" :disabled="loginloading"
                >
                <i v-if="loginloading" class="fas fa-solid fa-spinner" style="animation:spin 4s linear infinite;"></i>
                <p v-else>Sign In</p>
                </button>
              </div>
              
              <div class="text-center mt-6 relative">
                <router-link to="/register" @click.native.prevent="loginloading ? null : $router.push('/register')">
                    <small>Create new account</small>
                  </router-link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      loginloading: false
    };
  },
  methods: {
    async Signin(){

      this.loginloading = true;
      
      const alphaRegex = /^[A-Za-z]+$/;
      const withSpecialCharRegex = /^[A-Za-z0-9@/[\]#]+$/;

      if (this.username == ""){
        this.$swal({
          title: "Enter your username",
          icon: "error",
        })
        this.loginloading = false;
        return
      }
      else if (this.username.length < 5 || this.username.length > 15 ){
        this.$swal({
          title: "Username must be greater than 5 and less than 15 characters",
          icon: "error",
        })
        this.loginloading = false;
        return;
      }
      else if (!alphaRegex.test(this.username)){
        this.$swal({
          title: "Please don't use numbers or special characters for username",
          icon: "error",
        })
        this.loginloading = false;
        return;
      }
      else if (this.password == ""){
        this.$swal({
          title: "Please enter password",
          icon: "error",
        })
        this.loginloading = false;
        return;
      }
      else if (this.password.length < 5 || this.password.length > 25 ){
        this.$swal({
          title: "Password must be greater than 5 and less than 25 characters",
          icon: "error",
        })
        this.loginloading = false;
        return;
      }
      else if (!withSpecialCharRegex.test(this.password)){
        this.$swal({
          title: "Only use letters, numbers and some special characters (@/[]#) for password",
          icon: "error",
        })
        this.loginloading = false;
        return;
      }

      const response = await fetch(`${process.env.VUE_APP_API_URL}/auth/login?username=${this.username}&password=${this.password}`, {
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
        this.loginloading = false;
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
            title: "Welcome back!",
            icon: "success",
            allowOutsideClick: false
          }).then(() => {
            this.$router.push({path: `/${responseData.data.auth}`})
        })
      }
    },
  },
};
</script>


