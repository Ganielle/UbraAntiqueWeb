<template>
  <div class="login-container">
    <sign-in6
      image1Src="/ubraantiquelogo-1400w.png"
      rootClassName="sign-in6root-class-name"
    >
      <template v-slot:action1>
        <div class="login-fragment1">
          <span class="login-text1">Sign In</span>
        </div>
      </template>
      <template v-slot:heading1>
        <div class="login-fragment2">
          <span class="login-text2">Sign In to Your Account</span>
        </div>
      </template>
    </sign-in6>
  </div>
</template>

<script>
import SignIn6 from '../components/sign-in6'

export default {
  name: 'Login',
  props: {},
  components: {
    SignIn6,
  },
  metaInfo: {
    title: 'UbraAntique',
    meta: [
      {
        property: 'og:title',
        content: 'UbraAntique',
      },
    ],
  },
}
</script>

<style scoped>
.login-container {
  width: 100%;
  display: flex;
  min-height: 100vh;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-image: linear-gradient(90deg, rgb(253, 248, 242) 3.00%,rgb(253, 248, 242) 31.00%,rgb(198, 166, 100) 100.00%);
}
 
.login-fragment1 {
  display: contents;
}
 
.login-text1 {
  display: inline-block;
}
 
.login-fragment2 {
  display: contents;
}
 
.login-text2 {
  display: inline-block;
}
</style>
