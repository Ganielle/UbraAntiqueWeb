<template>
  <div style="background-color: grey">
    <main>
      <section class="relative w-full h-full py-40 min-h-screen">
        <router-view />
      </section>
    </main>
  </div>
</template>
<script>

import registerBg2 from "@/assets/subastanauan/login/background.jpg";

export default {
  data() {
    return {
      registerBg2,
    };
  },
  components: {
  },
};
</script>
