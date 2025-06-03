<template>
  <div class="sign-in6-container1" v-bind:class="rootClassName">
    <div class="sign-in6-max-width thq-section-max-width">
      <div class="sign-in6-container2">
        <img
          :alt="image1Alt"
          :src="image1Src"
          class="sign-in6-sign-up-image"
          style="height: 100%;"
        />
      </div>
      <div class="sign-in6-form-root thq-section-padding">
        <div class="sign-in6-container3" style="pointer-events: auto; cursor: pointer;" @click="() => {
          this.$router.push('/signup')
        }">
          <span class="sign-in6-text1 thq-body-large">
            Don&apos;t have an account? Sign up
          </span>
        </div>
        <div class="sign-in6-form1">
          <h2 class="thq-heading-2 sign-in6-text2">
            <slot name="heading1">
              <!--Default content for heading1-->
              <div class="sign-in6-fragment2">
                <span class="sign-in6-text8">Sign In to Your Account</span>
              </div>
            </slot>
          </h2>
          <form class="sign-in6-form2">
            <div class="sign-in6-email">
              <label for="thq-sign-in-6-email" class="thq-body-large">
                Email
              </label>
              <input
                type="email"
                id="thq-sign-in-6-email"
                required="true"
                placeholder="Email address"
                class="sign-in6-textinput1 thq-body-large thq-input"
              />
            </div>
            <div class="sign-in6-password">
              <div class="sign-in6-textfield">
                <div class="sign-in6-container4">
                  <label for="thq-sign-in-6-password" class="thq-body-large">
                    Password
                  </label>
                  <!-- <div class="sign-in6-hide-password">
                    <svg viewBox="0 0 1024 1024" class="sign-in6-icon1">
                      <path
                        d="M317.143 762.857l44.571-80.571c-66.286-48-105.714-125.143-105.714-206.857 0-45.143 12-89.714 34.857-128.571-89.143 45.714-163.429 117.714-217.714 201.714 59.429 92 143.429 169.143 244 214.286zM539.429 329.143c0-14.857-12.571-27.429-27.429-27.429-95.429 0-173.714 78.286-173.714 173.714 0 14.857 12.571 27.429 27.429 27.429s27.429-12.571 27.429-27.429c0-65.714 53.714-118.857 118.857-118.857 14.857 0 27.429-12.571 27.429-27.429zM746.857 220c0 1.143 0 4-0.571 5.143-120.571 215.429-240 432-360.571 647.429l-28 50.857c-3.429 5.714-9.714 9.143-16 9.143-10.286 0-64.571-33.143-76.571-40-5.714-3.429-9.143-9.143-9.143-16 0-9.143 19.429-40 25.143-49.714-110.857-50.286-204-136-269.714-238.857-7.429-11.429-11.429-25.143-11.429-39.429 0-13.714 4-28 11.429-39.429 113.143-173.714 289.714-289.714 500.571-289.714 34.286 0 69.143 3.429 102.857 9.714l30.857-55.429c3.429-5.714 9.143-9.143 16-9.143 10.286 0 64 33.143 76 40 5.714 3.429 9.143 9.143 9.143 15.429zM768 475.429c0 106.286-65.714 201.143-164.571 238.857l160-286.857c2.857 16 4.571 32 4.571 48zM1024 548.571c0 14.857-4 26.857-11.429 39.429-17.714 29.143-40 57.143-62.286 82.857-112 128.571-266.286 206.857-438.286 206.857l42.286-75.429c166.286-14.286 307.429-115.429 396.571-253.714-42.286-65.714-96.571-123.429-161.143-168l36-64c70.857 47.429 142.286 118.857 186.857 192.571 7.429 12.571 11.429 24.571 11.429 39.429z"
                      ></path>
                    </svg>
                    <span class="thq-body-small">Hide</span>
                  </div> -->
                </div>
                <input
                  type="password"
                  id="thq-sign-in-6-password"
                  required="true"
                  placeholder="Password"
                  class="sign-in6-textinput2 thq-body-large thq-input"
                />
              </div>
              <!-- <a
                href="https://teleporthq.io/"
                target="_blank"
                rel="noreferrer noopener"
                class="sign-in6-link thq-body-small"
              >
                Forgot password
              </a> -->
            </div>
          </form>
          <button type="submit" class="sign-in6-button thq-button-filled">
            <span class="sign-in6-text6 thq-body-small">
              <slot name="action1">
                <!--Default content for action1-->
                <div class="sign-in6-fragment1">
                  <span class="sign-in6-text7">Sign In</span>
                </div>
              </slot>
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignIn6',
  props: {
    rootClassName: String,
    image1Src: {
      type: String,
      default:
        'https://images.unsplash.com/photo-1514561064005-2bac60d9f7ea?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDl8fHNpZ24lMjBpbnxlbnwwfHx8fDE3MTMyNjA2NTJ8MA&ixlib=rb-4.0.3&w=1400',
    },
    image1Alt: {
      type: String,
      default: 'Sign In Image',
    },
  },
}
</script>

<style scoped>
.sign-in6-container1 {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  min-height: 100%;
  align-items: center;
  flex-direction: row;
  justify-content: center;
}
 
.sign-in6-max-width {
  height: auto;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
}
 
.sign-in6-container2 {
  width: 50%;
  height: 100%;
  display: flex;
  align-self: center;
  align-items: center;
  flex-direction: row;
  justify-content: center;
}
 
.sign-in6-sign-up-image {
  width: 100%;
  height: 100%;
  align-self: stretch;
  max-height: 100%;
  min-height: 100%;
}
 
.sign-in6-form-root {
  gap: var(--dl-layout-space-unit);
  width: 50%;
  height: 100%;
  display: flex;
  overflow: hidden;
  align-items: center;
  flex-shrink: 0;
  flex-direction: column;
  justify-content: center;
}
 
.sign-in6-container3 {
  width: 100%;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  justify-content: center;
}
 
.sign-in6-text1 {
  align-self: flex-end;
  transition: 0.3s;
}
 
.sign-in6-text1:hover {
  color: var(--dl-color-theme-primary2);
}
 
.sign-in6-form1 {
  gap: var(--dl-layout-space-twounits);
  width: 100%;
  display: flex;
  max-width: 500px;
  align-items: flex-start;
  flex-direction: column;
  justify-content: flex-end;
}
 
.sign-in6-form2 {
  gap: var(--dl-layout-space-unit);
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
}
 
.sign-in6-email {
  gap: var(--dl-layout-space-halfunit);
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-shrink: 0;
  flex-direction: column;
}
 
.sign-in6-textinput1 {
  width: 100%;
  border-color: var(--dl-color-theme-primary1);
  background-color: transparent;
}
 
.sign-in6-password {
  gap: var(--dl-layout-space-halfunit);
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}
 
.sign-in6-textfield {
  gap: var(--dl-layout-space-halfunit);
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-shrink: 0;
  flex-direction: column;
}
 
.sign-in6-container4 {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
}
 
.sign-in6-hide-password {
  gap: var(--dl-layout-space-halfunit);
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
  flex-shrink: 1;
  justify-content: center;
}
 
.sign-in6-icon1 {
  fill: var(--dl-color-theme-neutral-dark);
  width: 24px;
  height: 24px;
}
 
.sign-in6-textinput2 {
  width: 100%;
  border-color: var(--dl-color-theme-primary1);
  background-color: transparent;
}
 
.sign-in6-link {
  align-self: flex-end;
  transition: 0.3s;
  text-decoration:   none;
}
 
.sign-in6-link:hover {
  color: var(--dl-color-theme-primary2);
}
 
.sign-in6-button {
  width: 100%;
}
 
.sign-in6-text6 {
  text-align: center;
}
 
.sign-in6-fragment1 {
  display: contents;
}
 
.sign-in6-text7 {
  display: inline-block;
}
 
/* .sign-in6-fragment2 {
  display: contents;
} */

.sign-in6-text8:hover{
  cursor: grab;
}
 
.sign-in6-text8 {
  display: inline-block;
}
 
.sign-in6root-class-name {
  height: 100%;
  max-height: 100%;
  min-height: 100%;
}
 
@media(max-width: 991px) {
  .sign-in6-max-width {
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }
  .sign-in6-container2 {
    width: 100%;
    height: var(--dl-layout-size-xxlarge);
    display: none;
  }
  .sign-in6-form-root {
    width: 100%;
  }
}
 
@media(max-width: 767px) {
  .sign-in6-container3 {
    align-items: center;
  }
}
 
@media(max-width: 479px) {
  .sign-in6-text1 {
    align-self: flex-start;
    text-align: center;
  }
  .sign-in6-text2 {
    text-align: center;
  }
  .sign-in6-button {
    width: 100%;
  }
}
</style>
