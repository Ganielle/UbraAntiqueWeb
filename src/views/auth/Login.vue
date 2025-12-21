<template>
  <div class="" >
    <div class="container px-4 mx-auto flex flex-wrap items-center h-full" >
      <div class="w-full sm:w-2/12 md:w-4/12 lg:w-4/12 xl:w-4/12 px-4 mx-auto md:mx-0">
        <center>
          <img src="../../assets/subastanauan/login/logo.png" class="sm:mt-0"/>
        </center>
      </div>
      <div class="w-full sm:w-1/12 md:w-1/12 lg:w-8/12 xl:w-8/12 px-4">
        <div style="display: flex; justify-content: center; align-items: center;">
          <div
            class="relative flex flex-col min-w-0 break-words mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0 "
            style="max-width: 580px; width: 100%; margin-top: 10%"
          >
          <br/>
            <!--LOGIN-->
            <div v-if="loginstate == 'login'" class="flex-auto px-4 lg:px-10 py-10 pt-0">
              <div class="text-black-400 text-center mb-3 font-bold">
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

                
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Password
                </label>
                <div class="relative flex w-full flex-wrap items-stretch mb-3">
                  <input :type="showpw ? 'text' : 'password'" placeholder="Password"
                  v-model="password" class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full pr-10"/>
                  <span class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3" @click="() => {
                    showpw = !showpw
                  }">
                    <i :class="showpw ? 'fas fa-eye' : 'fa-regular fa-eye '"></i>
                  </span>
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
                  <br/><br/>
                  <router-link to="/forgotpassword" @click.native.prevent="loginloading ? null : $router.push('/forgotpassword')">
                    <small>Forgot password?</small>
                  </router-link>
                </div>
              </form>
            </div>

            <div v-else-if="loginstate=='OTP'" class="flex-auto px-4 lg:px-10 py-10 pt-0">
              <div class="text-blueGray-400 text-center mb-3 font-bold">
                <p style="font-size: 1.5rem;">EMAIL VERIFICATION</p>
              </div>
              <form>
                <br/>
                <center>
                  <p>Enter the code below to verify your Ubra Antique account.</p>
                  <p>This code will expire in 15 minutes.</p>
                </center>

                <br/>
                <div class="relative w-full mb-3">
                  <input
                    type="text"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Enter your code"
                    v-model="verificationcode"
                  />
                </div>

                <div class="text-center mt-6">
                  <button
                    class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                    type="button"
                    @click="generateCode()" :disabled="loginloading || generatingcode || seconds > 0"
                  >
                  <i v-if="loginloading || generatingcode" class="fas fa-solid fa-spinner" style="animation:spin 4s linear infinite;"></i>
                  <p v-else>{{ (seconds > 0 ? `Regenerating in ${seconds}` : 'Regenerate Code')}}</p>
                  </button>
                  <button
                    class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                    type="button"
                    @click="verifyemail()" :disabled="loginloading"
                  >
                  <i v-if="loginloading" class="fas fa-solid fa-spinner" style="animation:spin 4s linear infinite;"></i>
                  <p v-else>Verify Account</p>
                  </button>
                </div>
              </form>
            </div>
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
      loginloading: false,
      loginstate: "login",
      verificationcode: "",
      generatingcode: false,
      seconds: 150,
      showpw: false
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
      else if (this.username.length < 5 || this.username.length > 30   ){
        this.$swal({
          title: "Username must be greater than 5 and less than 30 characters",
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
        if (responseData.data.authenticated == false){
          this.loginstate = "OTP"
          this.startTimer()
          this.loginloading = false;
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
      }
    },
    async generateCode(){
      this.generatingcode = true

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
        this.generatingcode = false
        return;
      }
      else if (response.status == 401){
        this.$swal({
          title: "Authentication Failed! You will now be redirected to the login page",
          icon: "error"
        })

        this.username = "";
        this.password = "";
        this.verificationcode = ""
        this.generatingcode = false
        this.loginstate ="login"
      }
      else{
        this.startTimer()
        this.generatingcode = false
      }
    },
    async verifyemail(){
      this.loginloading = true;

      const response = await fetch(`${process.env.VUE_APP_API_URL}/auth/validateotp`,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            "verificationcode": this.verificationcode
        })
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

        this.username = "";
        this.password = "";
        this.verificationcode = ""
        this.loginloading = false;
        this.loginstate ="login"
      }
      else{
        this.loginloading = false;
        this.$swal({
            title: "Welcome!",
            icon: "success",
            allowOutsideClick: false
          }).then(() => {
            this.$router.push({path: `/${responseData.data.auth}`})
        })
      }
    },
    startTimer() {
      if (this.timer) return; // Prevent multiple intervals
      this.seconds = 150
      this.timer = setInterval(() => {
        if (this.seconds > 0) {
          this.seconds -= 1; // Decrement the seconds
        } else {
          this.stopTimer(); // Stop the timer when it reaches zero
        }
      }, 1000);
    },
    stopTimer() {
      clearInterval(this.timer); // Stop the timer
      this.timer = null; // Reset the timer ID
    },
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // Clean up the timer when the component is destroyed
    }
  },
};
</script>


