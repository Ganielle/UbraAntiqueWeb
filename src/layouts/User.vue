<template>
  <div>
    <sidebar />
    <div class="relative md:ml-64 bg-blueGray-100" style="min-height: 100vh; max-height: 100%;">
      <div class="px-4 md:px-10 mx-auto w-full" style="padding-bottom: 20px;">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
import Sidebar from "@/components/Sidebar/Sidebaruser.vue";
export default {
  name: "admin-layout",
  components: {
    Sidebar,
  },
};
</script>
