<template>
  <div>
    <a
      class="text-black text-xl uppercase lg:inline-block font-semibold pt-12"
      href="javascript:void(0)"
    >
      MY POSTED JOBS
    </a>
    <br/><br/>
    <br/>
    <!-- Header -->
    <div class="mb-3 pt-0">
      <input type="text" placeholder="Search Job Title / Description / Role" class="px-3 py-4 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-none focus:shadow-outline w-full" v-model="search"/>
    </div>
    <div>
      <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-base px-12 py-3 rounded shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="() => {
        currentpage = 0
        GetData()
      }">
        SEARCH
      </button>
      <button class="bg-yellow-500 text-white active:bg-emerald-600 font-bold uppercase text-base px-12 py-3 rounded shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="() => {
        PostJob()
      }">
        CREATE JOB
      </button>
    </div>

    <br/><br/>
    <br/><br/>
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
          No jobs posted yet!
        </center>
      </h2>
      <div v-else>
        <div style="display: flex; gap: 10px; justify-content: center; align-items: center;">
            <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="PreviousePageRequest" :disabled="loading || totalpage <= 0">
                <i class="fas fa-chevron-left"></i>
            </button>

            <p style="font-size: 1.4rem; font-weight: bold;">{{ currentpage  + 1 }} / {{ totalpage }}</p>

            <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="NextPageRequest" :disabled="loading || currentpage >= totalpage">
                <i class="fas fa-chevron-right"></i>
            </button>
        </div>
        <br/><br/>
          <div v-for="job in jobs" :key="job._id" style="width: 100%; height: 100%; background-color: white; border-radius: 5px; margin-top: 20px; padding-bottom: 10px; position: relative;">
            <p style="font-size: 2rem; margin-left: 20px; padding-top: 20px;  font-weight: bold;">{{ job.title }}</p>
            <div style="display: flex; align-items: center; gap: 50px; margin-left: 20px; padding-top: 10px; font-size: 0.8rem;">
              <p style="font-weight: bold; margin: 0;">
                Posted by: {{ job.ownerDetails.firstname.toUpperCase() }} {{ job.ownerDetails.lastname.toUpperCase() }}
              </p>
              <p style="font-weight: bold; margin: 0;">Created at: {{ job.createdAt }}</p>
              <div style="font-weight: bold; margin: 0; margin-right: 20px;">
                <div style="position: relative;">
                  <p style="font-weight: bold; margin: 0;">Status:</p> <p :style="{
                    color: job.status === 'Pending' ? 'blue' : job.status === 'Open' ? 'green' : job.status === 'Declined' ? 'red' : 'black'
                  }" style="font-weight: bold; margin: 0;">{{ job.status }}</p>
                </div>
              </div>
            </div>
            
            <div v-html="truncatedDescription(job.description.replace(/\n/g, '<br>'))" style="font-size: 1rem; margin-left: 20px; padding-top: 20px;"></div>
            <br/><br/><br/>
            <div style="position: absolute; bottom: 20px; right: 30px; display: flex; gap: 8px;">
              <button
                  style="padding: 6px 12px; background-color: #22c55e; color: white; border: none; border-radius: 4px; cursor: pointer;"
                  @click="() =>{}"
                  >
                  View More Details
              </button>
            </div>
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

      const response = await fetch(`${process.env.VUE_APP_API_URL}/jobs/mypostedjobs?search=${this.search}&page=${this.currentpage}&limit=10`, {
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
    async PostJob(){
      this.$swal({
          title: "POST YOUR JOB",
          html: `
              <center>
              <input type="text" id="titleInput" placeholder="Job title" class="swal2-input" style="display: flex; width: 70%;" />
              <textarea autocapitalize="off" id="descInput" placeholder="Job Description" class="swal2-textarea" style="display: flex;  width: 70%;"></textarea>
              <center/>
              <input type="number" id="salaryInput" placeholder="Salary" class="swal2-input" style="display: flex; width: 70%; height: 2.6rem"/>
          `,
          focusConfirm: false,
          showCancelButton: true,
          confirmButtonText: "Submit",
          showLoaderOnConfirm: true,

          preConfirm: async () => {
              const title = document.getElementById('titleInput').value;
              const description = document.getElementById('descInput').value;
              const salary = document.getElementById('salaryInput').value.trim();

              if (title == ""){
                return this.$swal.showValidationMessage(`Please input your job title first!`);
              }

              else if (description == ""){
                return this.$swal.showValidationMessage(`Please input your job description first!`);
              }

              else if (isNaN(salary)){
                return this.$swal.showValidationMessage(`Please numbers on the salary only!`);
              }

              const response = await fetch(`${process.env.VUE_APP_API_URL}/jobs/createjobs`,{
                  method: 'POST',
                  headers: {
                  'Content-Type': 'application/json',
                  },
                  credentials: "include",
                  body: JSON.stringify({
                    title: title,
                    description: description,
                    salary: salary.toLocaleString()
                  })
              });

              if (!response.ok) {
                  return this.$swal.showValidationMessage(`
                      ${response.data}
                  `);
              }
              return response.json();
          },
          allowOutsideClick: () => !this.$swal.isLoading()
      }).then((tempresponse) => {
          if (tempresponse.isConfirmed){

              this.GetData()

              return this.$swal({
                  title: "Successfully edited!",
                  icon: "success",
                  allowOutsideClick: false
              })
          }
      })
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