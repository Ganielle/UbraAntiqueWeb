<template>
  <div>
    <div
      class="text-black text-xl uppercase lg:inline-block font-semibold pt-12"
      style="display: flex; "
    >
      <p @click="() => $router.push('/employer/myjobs')" class="breadcrumbs">MY JOBS</p> / JOB DESCRIPTION / {{ title.toUpperCase() }}
    </div>
    <br/>
    <!-- Header -->
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

      <p style="font-size: 2rem; margin-left: 20px; padding-top: 20px; font-weight: bold;">{{ job.title }}</p>
      <div style="display: flex; align-items: center; gap: 50px; margin-left: 20px; padding-top: 10px; font-size: 0.8rem;">
          <p style="font-weight: bold; margin: 0;">
              Posted by: {{ name.toUpperCase() }}
          </p>
          <p style="font-weight: bold; margin: 0;">Created at: {{ formatDate(job.createdAt) }}</p>
      </div>
      <br/>
      <hr>
      <br/>
      <div class="px-4 mx-auto">
        <div class="flex flex-wrap">
          <div class="w-full w-1/2 px-4 lg:w-8/12">
            <div class="block my-4 p-3" style="background-color: white; border-radius: 5px;">

              <button class="text-white" style="width: 100px; background-color: #f69d0b; height: 35px; border: none; border-radius: 4px; cursor: pointer;">
                <a>
                  <i class="fa-solid fa-pen-to-square mr-2 text-sm"></i>
                  EDIT
                </a>
              </button>

              <br/>

              <div v-html="job.description ? job.description.replace(/\n/g, '<br>') : ''" style="margin-left: 20px; padding-top: 20px;"></div>
            </div>
          </div>
          <div class="w-full px-4 lg:w-4/12">
            <div class="block my-4 p-3">
              <div style="background-color: white; border-radius: 5px; padding-bottom: 10px;">
                <div style=" margin-left: 20px; padding-top: 20px; padding-bottom: 20px;">
                  <button class="text-white" style="width: 100px; background-color: #f69d0b; height: 35px; border: none; border-radius: 4px; cursor: pointer;">
                    <a>
                      <i class="fa-solid fa-pen-to-square mr-2 text-sm"></i>
                      EDIT
                    </a>
                  </button>
                  <br/><br/>
                  <p style="font-size: 1.2rem; font-weight: 600;">SALARY:</p>
                  <p style="font-size: 1.3rem; font-weight: bolder;">₱{{ job.salary }}</p>
                </div>
                
              </div>
              <br/>
              <div style="background-color: white; border-radius: 5px; padding-bottom: 10px;">
                <div style=" margin-left: 20px; padding-top: 20px; padding-bottom: 20px;">
                  <p style="font-size: 1.2rem; font-weight: 600;">NUMBER OF APPLICANTS:</p>
                  <p style="font-size: 1.2rem; word-wrap: break-word; font-weight: bolder;">{{ job.applicantCount }} Applicant(s)</p>
                  <br/>
                  <button class="text-white" style="width: 100px; background-color: #0ea6e9; height: 35px; border: none; border-radius: 4px; cursor: pointer;">
                    <a>
                      VIEW LIST
                    </a>
                  </button>
                </div>
              </div>
            </div>
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
  name: "employer-my-job-description-page",
  props: {
    title: String,
    id: String,
  },
  components: {
    ContentLoader
  },
  data() {
    return {
      loading: false,
      job: {},
      name: "",
    }
  },
  methods: {
    async GetData() {
      this.loading = true;

      const response = await fetch(`${process.env.VUE_APP_API_URL}/jobs/getjobdetails?jobid=${this.id}`, {
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

      this.job = responseData.data.job
      this.name = `${this.job.ownerDetails.firstname} ${this.job.ownerDetails.lastname}`
      console.log(this.job.isApplied)
      this.loading = false
    },
    ApplyJob(){
        this.$swal({
            title: `Are you sure you want to apply for this job (${this.job.title})`,
            showCancelButton: true,
            confirmButtonText: "Yes",
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                try {
                    const response = await fetch(`${process.env.VUE_APP_API_URL}/jobs/applyjob`,{
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        credentials: "include",
                        body: JSON.stringify({
                            "jobid": this.id
                        })
                    });

                    if (!response.ok) {
                        return this.$swal.showValidationMessage(`
                            ${response.data}
                        `);
                    }
                    return response.json();
                    } catch (error) {
                    this.$swal.showValidationMessage(`
                        Request failed: ${error}
                    `);
                }
            },
            allowOutsideClick: () => !this.$swal.isLoading()
        }).then((tempresponse) => {

            if (tempresponse.isConfirmed){

                this.GetData()

                return this.$swal({
                    title: "Successfully applied for the job!",
                    icon: "success",
                    allowOutsideClick: false
                })
            }
        })
    },
    truncatedDescription(html) {
      return htmlTruncate(html, 450); // truncates to ~200 characters safely
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
.breadcrumbs:hover{
    cursor: pointer;
}
</style>