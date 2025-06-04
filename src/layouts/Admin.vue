<template>
  <div>
    <sidebar />
    <div class="relative md:ml-64 bg-blueGray-100" style="height: 100vh;">
      <div class="px-4 md:px-10 mx-auto w-full">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
import Sidebar from "@/components/Sidebar/Sidebar.vue";
export default {
  name: "admin-layout",
  components: {
    Sidebar,
  },
};
</script>
