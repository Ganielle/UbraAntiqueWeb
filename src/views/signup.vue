<template>
  <div class="signup-container">
    <sign-up1>
      <template v-slot:action1>
        <div class="signup-fragment1">
          <span class="signup-text1">Sign Up Now</span>
        </div>
      </template>
      <template v-slot:heading1>
        <div class="signup-fragment2">
          <span class="signup-text2">Join our UbraAntique today!</span>
        </div>
      </template>
    </sign-up1>
  </div>
</template>

<script>
import SignUp1 from '../components/sign-up1'

export default {
  name: 'Signup',
  props: {},
  components: {
    SignUp1,
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
.signup-container {
  width: 100%;
  display: flex;
  min-height: 100vh;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-image: linear-gradient(90deg, rgb(253, 248, 242) 0.00%,rgb(247, 150, 90) 100.00%);
}
 
.signup-fragment1 {
  display: contents;
}
 
.signup-text1 {
  display: inline-block;
}
 
.signup-fragment2 {
  display: contents;
}
 
.signup-text2 {
  display: inline-block;
}
</style>
