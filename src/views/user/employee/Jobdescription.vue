<template>
  <div>
    <div
      class="text-black text-xl uppercase lg:inline-block font-semibold pt-12"
      style="display: flex; "
    >
      <p @click="() => $router.push('/employee/dashboard')" class="breadcrumbs">HOME</p> / JOB DESCRIPTION / {{ title.toUpperCase() }}
    </div>
    <br/><br/>
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
        <div style="width: 100%; height: 100%; background-color: white; border-radius: 5px; padding-bottom: 10px; position: relative;">
            <p style="font-size: 2rem; margin-left: 20px; padding-top: 20px; font-weight: bold;">{{ job.title }}</p>
            <div style="display: flex; align-items: center; gap: 50px; margin-left: 20px; padding-top: 10px; font-size: 0.8rem;">
                <p style="font-weight: bold; margin: 0;">
                    Posted by: {{ name.toUpperCase() }}
                </p>
                <p style="font-weight: bold; margin: 0;">Created at: {{ job.createdAt }}</p>
            </div>
            
            <div v-html="job.description" style="font-size: 1rem; margin-left: 20px; padding-top: 20px;"></div>
            <br/><br/>
            <div v-if="!job.isApplied" style="position: absolute; bottom: 20px; right: 30px; display: flex; gap: 8px;" hidden="true">
                <button
                    style="padding: 6px 12px; background-color: #22c55e; color: white; border: none; border-radius: 4px; cursor: pointer;"
                    @click="() =>{
                        ApplyJob()
                    }"
                    >
                    APPLY NOW!
                </button>
            </div>
            <div v-else style="position: absolute; bottom: 20px; right: 30px; display: flex; gap: 8px;" hidden="true">
                <button
                    style="padding: 6px 12px; background-color: blue; color: white; border: none; border-radius: 4px; cursor: pointer;" disabled="true"
                    >
                    YOU ALREADY APPLIED TO THIS JOB!
                </button>
            </div>
        </div>
        <br/><br/>
        <div style="width: 100%; height: 100%; background-color: white; border-radius: 5px; padding-bottom: 10px; position: relative;">
            <p style="font-size: 1.5rem; margin-left: 20px; padding-top: 20px; font-weight: bold;">SALARY:</p>
            <p style="font-size: 3rem; margin-left: 20px;">₱{{ job.salary }}</p>

            <br/><br/>

            <p style="font-size: 1.5rem; margin-left: 20px; padding-top: 20px; font-weight: bold;">NUMBER OF APPLICANTS:</p>
            <p style="font-size: 3rem; margin-left: 20px;">{{ job.applicantCount }} Applicant(s)</p>
        </div>
    </div>
    
  </div>
</template>
<script>
import htmlTruncate from 'html-truncate';
import { ContentLoader } from 'vue-content-loader'

export default {
  name: "user-dashboard-page",
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