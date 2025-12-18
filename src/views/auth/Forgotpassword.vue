<template>
  <div class="container mx-auto px-4 h-full">
    <div class="flex content-center items-center justify-center h-full">
      <div class="w-full lg:w-4/12 px-4">
        <div
          class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0"
        >
        <br/>
          <!--LOGIN-->
          <div v-if="loginstate == 'request'" class="flex-auto px-4 lg:px-10 py-10 pt-0">
            <div class="text-blueGray-400 text-center mb-3 font-bold">
              <p style="font-size: 1.5rem;">FORGOT PASSWORD</p>
            </div><br/>
            <form>
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Enter your username
                </label>
                <input
                  type="text"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Username"
                  v-model="username"
                />
              </div>

              
              <div class="text-center mt-6">
                <button
                  class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="button"
                  @click="SendRequestOTP()" :disabled="forgotpwloading"
                >
                <i v-if="forgotpwloading" class="fas fa-solid fa-spinner" style="animation:spin 4s linear infinite;"></i>
                <p v-else>Submit Forgot Password Request</p>
                </button>
              </div>
              
              <div class="text-center mt-6 relative">
                <router-link to="/login" @click.native.prevent="forgotpwloading ? null : $router.push('/login')">
                  <small>Back to login</small>
                </router-link>
              </div>
            </form>
          </div>

          <!--OTP-->
          <div v-else-if="loginstate == 'otp'" class="flex-auto px-4 lg:px-10 py-10 pt-0">
            <div class="text-blueGray-400 text-center mb-3 font-bold">
              <p style="font-size: 1.5rem;">Enter your OTP</p>
            </div><br/>
            <form>
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  OTP
                </label>
                <input
                  type="text"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="OTP"
                  v-model="verificationcode"
                />
              </div>

              <p>Your otp is sent to your email. Please check your email for the otp!</p>

              
              <div class="text-center mt-6">
                <button
                  class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="button"
                  @click="Verifycode()" :disabled="forgotpwloading"
                >
                <i v-if="forgotpwloading" class="fas fa-solid fa-spinner" style="animation:spin 4s linear infinite;"></i>
                <p v-else>Submit</p>
                </button>
              </div>
              
              <div class="text-center mt-6 relative">
                <router-link to="/login" @click.native.prevent="forgotpwloading ? null : $router.push('/login')">
                  <small>Back to login</small>
                </router-link>
              </div>
            </form>
          </div>
          
          <!--CHANGE PASSWORD-->
          <div v-if="loginstate == 'change'" class="flex-auto px-4 lg:px-10 py-10 pt-0">
            <div class="text-blueGray-400 text-center mb-3 font-bold">
              <p style="font-size: 1.5rem;">Enter your new password</p>
            </div><br/>
            <form>
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                New password
              </label>
              <div class="relative flex w-full flex-wrap items-stretch mb-3">
                <input :type="showpw ? 'text' : 'password'" placeholder="New password"
                v-model="password" class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full pr-10"/>
                <span class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3" @click="() => {
                  showpw = !showpw
                }">
                  <i :class="showpw ? 'fas fa-eye' : 'fa-regular fa-eye '"></i>
                </span>
              </div>

              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Re-enter new password
              </label>
              <div class="relative flex w-full flex-wrap items-stretch mb-3">
                <input :type="showpw ? 'text' : 'password'" placeholder="Re-enter new password"
                v-model="newpassword" class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full pr-10"/>
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
                  @click="changepassword()" :disabled="forgotpwloading"
                >
                <i v-if="forgotpwloading" class="fas fa-solid fa-spinner" style="animation:spin 4s linear infinite;"></i>
                <p v-else>Submit</p>
                </button>
              </div>
              
              <div class="text-center mt-6 relative">
                <router-link to="/login" @click.native.prevent="forgotpwloading ? null : $router.push('/login')">
                  <small>Back to login</small>
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
      newpassword: "",
      forgotpwloading: false,
      loginstate: "request",
      verificationcode: "",
      tempverifiationcode: "",
      showpw: false
    };
  },
  methods: {
    async SendRequestOTP(){

      this.forgotpwloading = true;

      if (this.username == ""){
        this.$swal({
          title: "Enter your username",
          icon: "error",
        })
        this.forgotpwloading = false;
        return
      }

      const response = await fetch(`${process.env.VUE_APP_API_URL}/auth/generateforgotpwotp?username=${this.username}&password=${this.password}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            username: this.username
        })
      });

      const responseData = await response.json();

      if (response.status === 400) {
        //  API HERE
        this.$swal({
          title: responseData.data,
          icon: "error"
        })
        this.forgotpwloading = false;
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
        this.tempverifiationcode = ""
        this.loginstate = "otp"
        this.forgotpwloading = false;
      }
    },
    async Verifycode(){
      this.forgotpwloading = true

      const response = await fetch(`${process.env.VUE_APP_API_URL}/auth/validateforgotpwotp`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            code: this.verificationcode,
            username: this.username
        })
      });

      const responseData = await response.json();
      if (response.status === 400) {
        //  API HERE
        this.$swal({
          title: responseData.data,
          icon: "error"
        })
        this.forgotpwloading = false
        return;
      }
      else if (response.status == 401){
        this.$swal({
          title: "Authentication Failed! You will now be redirected to the login page",
          icon: "error"
        })
      }
      else{
        this.tempverifiationcode = this.verificationcode
        this.loginstate ="change"
        this.forgotpwloading = false
      }
    },
    async changepassword(){

    const withSpecialCharRegex = /^[A-Za-z0-9@/[\]#]+$/;

      if (this.password == ""){
        this.$swal({
          title: "Please enter password",
          icon: "error",
        })
        return;
      }
      else if (this.password.length < 5 || this.password.length > 25 ){
        this.$swal({
          title: "Password must be greater than 5 and less than 25 characters",
          icon: "error",
        })
        return;
      }
      else if (!withSpecialCharRegex.test(this.password)){
        this.$swal({
          title: "Only use letters, numbers and some special characters (@/[]#) for password",
          icon: "error",
        })
        return;
      }
      else if (this.newpassword == ""){
        this.$swal({
          title: "Please enter password",
          icon: "error",
        })
        return;
      }
      else if (this.newpassword.length < 5 || this.newpassword.length > 25 ){
        this.$swal({
          title: "Re-enter new password must be greater than 5 and less than 25 characters",
          icon: "error",
        })
        return;
      }
      else if (!withSpecialCharRegex.test(this.newpassword)){
        this.$swal({
          title: "Only use letters, numbers and some special characters (@/[]#) for re-enter new password",
          icon: "error",
        })
        return;
      }
      else if (this.password != this.newpassword){
        this.$swal({
          title: "New password and re-enter new password must be the same!",
          icon: "error",
        })
        return;
      }
        
      this.forgotpwloading = true;

      const response = await fetch(`${process.env.VUE_APP_API_URL}/auth/changepassword`,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            "code": this.tempverifiationcode,
            "newpw": this.password,
            "username": this.username
        })
      });

      const responseData = await response.json();

      if (response.status === 400) {
        //  API HERE
        this.$swal({
          title: responseData.data,
          icon: "error"
        })
        this.forgotpwloading = false;
        return;
      }
      else if (response.status == 401){
        this.$swal({
          title: "Authentication Failed! You will now be redirected to the login page",
          icon: "error"
        })

        this.$router.push({path: `/`})
      }
      else{
        this.forgotpwloading = false;
        this.$swal({
            title: "You have successfully change your password! you can now login you account with the new password",
            icon: "success",
            allowOutsideClick: false
          }).then(() => {
            this.$router.push({path: `/`})
        })
      }
    }
  },
};
</script>


