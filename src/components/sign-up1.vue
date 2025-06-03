<template>
  <div class="sign-up1-container1">
    <div class="sign-up1-max-width thq-section-max-width">
      <div class="sign-up1-form-root thq-section-padding">
        <div class="sign-up1-form1">
          <div class="sign-up1-title-root">
            <h2 class="thq-heading-2">
              <slot name="heading1">
                <!--Default content for heading1-->
                <div class="sign-up1-fragment2">
                  <span class="sign-up1-text19">Join our UbraAntique today!</span>
                </div>
              </slot>
            </h2>
            <div class="sign-up1-have-an-account-login1 backtologin" @click="() => {
              this.$router.push('/')
            }">
              <p class="thq-body-large">Already have an account? Sign in</p>
            </div>
          </div>
          <form class="sign-up1-form2">
            <div class="sign-up1-email">
              <label for="thq-sign-up-1-email" class="thq-body-large">
                Email <span style="color: red">*</span>
              </label>
              <input
                type="email"
                id="thq-sign-up-1-email"
                required="true"
                class="sign-up1-textinput1 thq-body-large thq-input"
              />
            </div>
            <div class="sign-up1-username">
              <label for="thq-sign-up-1-username" class="thq-body-large">
                First Name <span style="color: red">*</span>
              </label>
              <input
                type="text"
                id="thq-sign-up-1-username"
                required="true"
                class="sign-up1-textinput2 thq-body-large thq-input"
              />
            </div>
            <div class="sign-up1-username">
              <label for="thq-sign-up-1-username" class="thq-body-large">
                Middle Name (Optional)
              </label>
              <input
                type="text"
                id="thq-sign-up-1-username"
                required="true"
                class="sign-up1-textinput2 thq-body-large thq-input"
              />
            </div>
            <div class="sign-up1-username">
              <label for="thq-sign-up-1-username" class="thq-body-large">
                Last Name <span style="color: red">*</span>
              </label>
              <input
                type="text"
                id="thq-sign-up-1-username"
                required="true"
                class="sign-up1-textinput2 thq-body-large thq-input"
              />
            </div>
            <div class="sign-up1-password">
              <div class="sign-up1-textfield">
                <div class="sign-up1-container2">
                  <label for="thq-sign-up-1-password" class="thq-body-large">
                    Password <span style="color: red">*</span>
                  </label>
                  <!-- <div class="sign-up1-hide-password">
                    <svg viewBox="0 0 1024 1024" class="sign-up1-icon1">
                      <path
                        d="M317.143 762.857l44.571-80.571c-66.286-48-105.714-125.143-105.714-206.857 0-45.143 12-89.714 34.857-128.571-89.143 45.714-163.429 117.714-217.714 201.714 59.429 92 143.429 169.143 244 214.286zM539.429 329.143c0-14.857-12.571-27.429-27.429-27.429-95.429 0-173.714 78.286-173.714 173.714 0 14.857 12.571 27.429 27.429 27.429s27.429-12.571 27.429-27.429c0-65.714 53.714-118.857 118.857-118.857 14.857 0 27.429-12.571 27.429-27.429zM746.857 220c0 1.143 0 4-0.571 5.143-120.571 215.429-240 432-360.571 647.429l-28 50.857c-3.429 5.714-9.714 9.143-16 9.143-10.286 0-64.571-33.143-76.571-40-5.714-3.429-9.143-9.143-9.143-16 0-9.143 19.429-40 25.143-49.714-110.857-50.286-204-136-269.714-238.857-7.429-11.429-11.429-25.143-11.429-39.429 0-13.714 4-28 11.429-39.429 113.143-173.714 289.714-289.714 500.571-289.714 34.286 0 69.143 3.429 102.857 9.714l30.857-55.429c3.429-5.714 9.143-9.143 16-9.143 10.286 0 64 33.143 76 40 5.714 3.429 9.143 9.143 9.143 15.429zM768 475.429c0 106.286-65.714 201.143-164.571 238.857l160-286.857c2.857 16 4.571 32 4.571 48zM1024 548.571c0 14.857-4 26.857-11.429 39.429-17.714 29.143-40 57.143-62.286 82.857-112 128.571-266.286 206.857-438.286 206.857l42.286-75.429c166.286-14.286 307.429-115.429 396.571-253.714-42.286-65.714-96.571-123.429-161.143-168l36-64c70.857 47.429 142.286 118.857 186.857 192.571 7.429 12.571 11.429 24.571 11.429 39.429z"
                      ></path>
                    </svg>
                    <span class="thq-body-small">Hide</span>
                  </div> -->
                </div>
                <input
                  type="password"
                  id="thq-sign-up-1-password"
                  required="true"
                  class="sign-up1-textinput3 thq-body-large thq-input"
                />
              </div>
            </div>
          </form>
          <div class="sign-up1-container3"></div>
          <p class="thq-body-large">
            By creating an account, you agree to the Terms of use and Privacy
            Policy.
            <span v-html="rawev05"></span>
          </p>
          <button type="submit" class="thq-button-filled sign-up1-button">
            <span class="sign-up1-text17 thq-body-small">
              <slot name="action1">
                <!--Default content for action1-->
                <div class="sign-up1-fragment1">
                  <span class="sign-up1-text18">Sign Up Now</span>
                </div>
              </slot>
            </span>
          </button>
          <div class="sign-up1-have-an-account-login2"></div>
        </div>
      </div>
      <div class="sign-up1-container4">
        <img
          :alt="image1Alt"
          :src="image1Src"
          class="sign-up1-sign-up-image thq-img-ratio-4-6"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignUp1',
  props: {
    image1Alt: {
      type: String,
      default: 'Sign Up Image',
    },
    image1Src: {
      type: String,
      default:
        'https://images.unsplash.com/photo-1499711860525-c485eb341d5e?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDE4fHxzaWduJTIwdXB8ZW58MHx8fHwxNzEyOTI5MDYzfDA&ixlib=rb-4.0.3&w=600',
    },
  },
  data() {
    return {
      rawev05: ' ',
    }
  },
}
</script>

<style scoped>
.sign-up1-container1 {
  width: 100%;
  display: flex;
  position: relative;
  align-items: center;
  flex-direction: row;
  justify-content: center;
}
 
.sign-up1-max-width {
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
}
 
.sign-up1-form-root {
  gap: var(--dl-layout-space-unit);
  width: 60%;
  height: 100%;
  display: flex;
  overflow: hidden;
  align-items: center;
  flex-shrink: 0;
  justify-content: center;
}
 
.sign-up1-form1 {
  gap: var(--dl-layout-space-twounits);
  width: auto;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: flex-end;
}
 
.sign-up1-title-root {
  gap: var(--dl-layout-space-halfunit);
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}
 
.sign-up1-have-an-account-login1 {
  gap: var(--dl-layout-space-halfunit);
  display: flex;
  align-items: flex-start;
}
 
.sign-up1-form2 {
  gap: var(--dl-layout-space-unit);
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
}
 
.sign-up1-email {
  gap: var(--dl-layout-space-halfunit);
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-shrink: 0;
  flex-direction: column;
}
 
.sign-up1-textinput1 {
  width: 100%;
  border-color: var(--dl-color-theme-primary1);
  background-color: transparent;
}
 
.sign-up1-username {
  gap: var(--dl-layout-space-halfunit);
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-shrink: 0;
  flex-direction: column;
}
 
.sign-up1-textinput2 {
  width: 100%;
  border-color: var(--dl-color-theme-primary1);
  background-color: transparent;
}
 
.sign-up1-password {
  gap: var(--dl-layout-space-halfunit);
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}
 
.sign-up1-textfield {
  gap: 4px;
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-shrink: 0;
  flex-direction: column;
}
 
.sign-up1-container2 {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
}
 
.sign-up1-hide-password {
  gap: var(--dl-layout-space-halfunit);
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
  flex-shrink: 1;
  justify-content: center;
}
 
.sign-up1-icon1 {
  fill: var(--dl-color-theme-neutral-dark);
  width: 24px;
  height: 24px;
}
 
.sign-up1-textinput3 {
  width: 100%;
  border-color: var(--dl-color-theme-primary1);
  background-color: transparent;
}
 
.sign-up1-container3 {
  gap: var(--dl-layout-space-halfunit);
  flex: 0 0 auto;
  width: auto;
  border: 2px dashed rgba(120, 120, 120, 0.4);
  height: auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
 
.sign-up1-text17 {
  text-align: center;
}
 
.sign-up1-have-an-account-login2 {
  gap: var(--dl-layout-space-halfunit);
  border: 2px dashed rgba(120, 120, 120, 0.4);
  display: flex;
  align-items: flex-start;
}
 
.sign-up1-container4 {
  width: 40%;
  height: 100%;
  display: flex;
  align-self: center;
  align-items: flex-start;
  flex-direction: row;
  justify-content: flex-start;
}
 
.sign-up1-sign-up-image {
  width: 100%;
  height: 100%;
}
 
.sign-up1-fragment1 {
  display: contents;
}
 
.sign-up1-text18 {
  display: inline-block;
}
 
.sign-up1-fragment2 {
  display: contents;
}
 
.sign-up1-text19 {
  display: inline-block;
}
 
@media(max-width: 991px) {
  .sign-up1-form-root {
    width: 100%;
    padding: var(--dl-layout-space-fourunits);
  }
  .sign-up1-container4 {
    display: none;
  }
}
 
@media(max-width: 479px) {
  .sign-up1-form-root {
    padding: var(--dl-layout-space-oneandhalfunits);
  }
  .sign-up1-button {
    width: 100%;
  }
}

.backtologin:hover{
  cursor: pointer;
  color: rgb(167, 119, 30);
}
</style>
