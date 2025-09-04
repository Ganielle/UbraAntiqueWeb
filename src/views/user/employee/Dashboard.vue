<template>
  <div>
    <a
      class="text-black text-xl uppercase lg:inline-block font-semibold pt-12"
      href="javascript:void(0)"
    >
      JOB LISTING
    </a>

    <hr/>
    <br/><br/>
    <!-- Header -->
    <div class="px-4 mx-auto">
      <div class="flex flex-wrap">
        <div class="w-full w-1/2 px-4 lg:w-9/12">
          <div class="block mb-3 pt-0">
              <input type="text" placeholder="Search Job Title / Description / Role" class="px-3 py-4 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-none focus:shadow-outline w-full" v-model="search"/>
          </div>
        </div>
        <div class="w-full px-4 lg:w-3/12">
          <div class="block">
              <button class="w-full bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-base px-12 py-3 rounded shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="() => {
              currentpage = 0
              GetData()
              }">
              SEARCH
              </button>
          </div>
        </div>
      </div>
    </div>

    <br/>
    <div v-if="loading">
      <div style="width: 100%; height: 200px; background-color: white; border-radius: 5px;">
        <ContentLoader viewBox="0 0 250 110">
            <rect x="2" y="5" rx="3" ry="3" width="50" height="5" />
            <rect x="2" y="12" rx="3" ry="3" width="100" height="5" />
            <rect x="2" y="20" rx="3" ry="3" width="100" height="5" />
        </ContentLoader>
      </div>
      <br/>
      <div style="width: 100%; height: 200px; background-color: white; border-radius: 5px;">
        <ContentLoader viewBox="0 0 250 110">
            <rect x="2" y="5" rx="3" ry="3" width="50" height="5" />
            <rect x="2" y="12" rx="3" ry="3" width="100" height="5" />
            <rect x="2" y="20" rx="3" ry="3" width="100" height="5" />
        </ContentLoader>
      </div>
    </div>
    <div v-else>
      <h2 v-if="jobs.length <= 0">
        <center>
          No jobs listed yet!
        </center>
      </h2>
      <div v-else style="">

        <div class="flex flex-wrap gap-2 items-stretch">
          <div 
            v-for="job in jobs" 
            :key="job._id"
            class="w-full sm:w-10/12 md:w-7/12 lg:w-6/12 xl:w-4/12 min-h-[100px] p-5 relative flex flex-col"
          >
            <div class="bg-white border border-black rounded p-5">
              <p class="text-lg font-bold mb-3">
                {{ job.title }}
              </p>

              <div class="text-xs font-bold mb-3">
                <p>Posted by: {{ job.ownerDetails.firstname.toUpperCase() }} {{ job.ownerDetails.lastname.toUpperCase() }}</p>
                <p>Created at: {{ formatDate(job.createdAt) }}</p>
              </div>

              <div 
                v-html="truncatedDescription(job.description.replace(/\n/g, '<br>'))" 
                class="text-base mb-10 flex-grow"
              ></div>

              <div class="mt-auto text-right">
                <button
                  class="bg-emerald-500 text-white px-3 py-1 rounded shadow hover:shadow-lg"
                  @click="() =>{
                    $router.push({
                      path: '/employee/jobdescription',
                      query: { title: job.title, id: job._id }
                    })
                  }"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div style="display: flex; gap: 10px; justify-content: center; align-items: center;">
            <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="PreviousePageRequest" :disabled="loading || totalpage <= 0">
                <i class="fas fa-chevron-left"></i>
            </button>

            <p style="font-size: 1.4rem; font-weight: bold;">{{ currentpage  + 1 }} / {{ totalpage }}</p>

            <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="NextPageRequest" :disabled="loading || currentpage >= totalpage">
                <i class="fas fa-chevron-right"></i>
            </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import htmlTruncate from 'html-truncate';
import { ContentLoader } from 'vue-content-loader'

export default {
  name: "user-dashboard-page",
  components: {
    ContentLoader
  },
  data() {
    return {
      search: "",
      jobs: [],
      loading: false,
      currentpage: 0,
      totalpage: 0
    }
  },
  methods: {
    async GetData() {
      this.loading = true;

      const response = await fetch(`${process.env.VUE_APP_API_URL}/jobs/showjobs?search=${this.search}&page=${this.currentpage}&limit=10`, {
          method: 'GET',
          headers: {
          "Content-Type": "application/json"
          },
          credentials: "include"
      });

      const responseData = await response.json();

      if (response.status === 400) {
          //  API HERE
          this.$swal({
          title: responseData.data,
          icon: "error"
          })

          this.loading = false;
          return;
      }
      else if (response.status == 401){
          this.$swal({
          title: "Authentication Failed! You will now be redirected to the login page",
          icon: "error"
          })

          this.$router.push({path: "/"})
          return;
      }

      this.jobs = responseData.data.jobs
      this.totalpage = responseData.data.totalpage
      this.loading = false;
    },
    truncatedDescription(html) {
      return htmlTruncate(html, 450); // truncates to ~200 characters safely
    },
    PreviousePageRequest(){
      this.currentpage--
      this.GetData()
    },
    NextPageRequest(){
      this.currentpage++
      this.GetData()
    },
    formatDate(isoString) {
      const date = new Date(isoString)
      return date.toLocaleString("en-US", {
        year: "numeric",
        month: "long",   // August
        day: "numeric",  // 27
      })
    }
  },
  mounted() {
    this.GetData()
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