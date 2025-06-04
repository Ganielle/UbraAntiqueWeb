<template>
  <div>
    <a
      class="text-black text-xl uppercase lg:inline-block font-semibold pt-12"
      href="javascript:void(0)"
    >
      HOME
    </a>
    <br/><br/>
    <br/>
    <!-- Header -->
    <div class="mb-3 pt-0">
      <input type="text" placeholder="Search Job" class="px-3 py-4 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-none focus:shadow-outline w-full"/>
    </div>
    <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-base px-12 py-3 rounded shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
      SEARCH
    </button>

    <br/><br/>
    <br/><br/>
    <center>
      <h2>No jobs listed yet!</h2>
    </center>
  </div>
</template>
<script>
export default {
  name: "user-dashboard-page",
  components: {
  },
  data() {
    return {
    }
  },
  methods: {
  }
};
</script>

<style>
.vertical-line {
  width: 2px;
  height: 180px;
  background-color: #000;
  margin: 0 20px;
}
</style>