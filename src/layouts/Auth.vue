<template>
  <div>
    <main>
      <section class="relative w-full h-full py-40 min-h-screen">
        <div
          class="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
          :style="`background-image: url('${registerBg2}');`" style="filter: blur(4px);"
        ></div>
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
