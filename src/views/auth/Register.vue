<template>
  <div class="container mx-auto px-4 h-full">
    <div class="flex content-center items-center justify-center h-full">
      <div class="w-full lg:w-6/12 px-4">

        <!--STEP 0-->
        <div 
          class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0"
        >
          <div class="flex-auto px-4 lg:px-10 py-10 pt-5">
            <div class="text-blueGray-400 text-center mb-3 font-bold">
              <p style="font-size: 1.3rem;">Sign up</p>
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
                  v-model="user.username"
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
                  v-model="user.password"
                />
              </div>

              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Email
                </label>
                <input
                  type="email"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Email"
                  v-model="user.email"
                />
              </div>

              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  First Name
                </label>
                <input
                  type="text"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="First Name"
                  v-model="user.firstname"
                />
              </div>

              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Last Name"
                  v-model="user.lastname"
                />
              </div>

              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Profile Type
                </label>
                <select
                  type="text"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  v-model="user.profiletype"
                >
                  <option value="">Please select your profile type</option>
                  <option value="employee">Employee</option>
                  <option value="employer">Employer</option>
                </select>
              </div>

              <div class="text-center mt-6">
                <button
                  class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="button"
                  @click="FinishSignup()"
                  :disabled="registerloading"
                >
                  <p v-if="!registerloading">Register</p>
                  <i v-else class="fas fa-solid fa-spinner" style="animation:spin 4s linear infinite;"></i>
                </button>
              </div>

              <div class="text-center mt-6">
                <router-link to="/">
                    <small>Do you have an account? Login here</small>
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
      registerloading: false,
      user: {
        username: "",
        password: "",
        email: "",
        firstname: "",
        lastname: "",
        profiletype: ""
      }
    };
  },
  methods: {
    async FinishSignup(){

      this.registerloading = true

      const alphaRegex = /^[A-Za-z]+$/;
      const withSpecialCharRegex = /^[A-Za-z0-9@/[\]#]+$/;
      const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (this.user.username == ""){
        this.$swal({
          title: "Enter your username",
          icon: "error",
        })
        this.registerloading = false;
        return
      }
      else if (this.user.username.length < 5 || this.user.username.length > 15 ){
        this.$swal({
          title: "Username must be greater than 5 and less than 15 characters",
          icon: "error",
        })
        this.registerloading = false;
        return;
      }
      else if (!alphaRegex.test(this.user.username)){
        this.$swal({
          title: "Please don't use numbers or special characters for username",
          icon: "error",
        })
        this.registerloading = false;
        return;
      }
      else if (this.user.password == ""){
        this.$swal({
          title: "Please enter password",
          icon: "error",
        })
        this.registerloading = false;
        return;
      }
      else if (this.user.password.length < 5 || this.user.password.length > 25 ){
        this.$swal({
          title: "Password must be greater than 5 and less than 25 characters",
          icon: "error",
        })
        this.registerloading = false;
        return;
      }
      else if (!withSpecialCharRegex.test(this.user.password)){
        this.$swal({
          title: "Only use letters, numbers and some special characters (@/[]#) for password",
          icon: "error",
        })
        this.registerloading = false;
        return;
      }
      else if (!emailregex.test(this.user.email)){
        this.$swal({
          title: "Your email is not valid!",
          icon: "error",
        })
        this.registerloading = false;
        return;
      }
      else if (this.user.profiletype == ""){
        this.$swal({
          title: "Profile type is not valid! Please select your profile type",
          icon: "error",
        })
        this.registerloading = false;
        return;
      }

      const response = await fetch(`${process.env.VUE_APP_API_URL}/users/createusers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userusername: this.user.username,
          password: this.user.password,
          email: this.user.email,
          firstname: this.user.firstname,
          lastname: this.user.lastname,
          profiletype: this.user.profiletype
        })
      });

      const responseData = await response.json();

      if (response.status === 400) {
        //  API HERE
        this.$swal({
          title: responseData.data,
          icon: "error"
        })
        this.registerloading = false
        return;
      }
      else if (response.status == 401){
        this.$swal({
          title: "Authentication Failed! You will now be redirected to the login page",
          icon: "error"
        })

        this.$router.push({path: "/"})
      }
      //  ADD API HERE
      this.$swal({
        title: "Your account has successfully registered",
        icon: "success",
        allowOutsideClick: false
      }).then((data) => {
        if (data.isConfirmed){
          this.registerloading = false
          this.$router.push({path: "/"})
        }
      })
    }
  }
};
</script>
