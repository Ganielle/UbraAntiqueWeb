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
          <p style="font-weight: bold; margin: 0;">Location: {{ job.location }}</p>
          <p style="font-weight: bold; margin: 0;">Created at: {{ formatDate(job.createdAt) }}</p>
          <p style="font-weight: bold; margin: 0;">Job status: {{ job.status }}</p>
      </div>
      <br/>
      <hr>
      <div v-if="!showModal" class="px-4 mx-auto">
        
        <div v-if="job.status == 'Open'">
          <br/>
          <button class="text-white" style="width: 100px; margin-left: 20px; background-color: #f69d0b; height: 35px; border: none; border-radius: 4px; cursor: pointer;" @click="EditWorkDescription">
            <a>
              <i class="fa-solid fa-pen-to-square mr-2 text-sm"></i>
              EDIT
            </a>
          </button>
          <br/>
        </div>

        <div class="flex flex-wrap">
          <div class="w-full w-1/2 px-4 lg:w-8/12">
            <div class="block my-4 p-3" style="background-color: white; border-radius: 5px;">
              <div v-html="job.description ? job.description.replace(/\n/g, '<br>') : ''" style="margin-left: 20px; padding-top: 20px;"></div>
            </div>
          </div>
          <div class="w-full px-4 lg:w-4/12">
            <div class="block my-4 p-3">
              <div style="background-color: white; border-radius: 5px; padding-bottom: 10px;">
                <div style=" margin-left: 20px; padding-top: 20px; padding-bottom: 20px;">
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
                  <button class="text-white" style="width: 100px; background-color: #0ea6e9; height: 35px; border: none; border-radius: 4px; cursor: pointer;" @click="toggleModal">
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
      <Viewlistmodal v-else @close="toggleModal" :employees="job.applicantDetails" :jobstatus="job.status" @selectemployee="UpdateStatusWork" @message="message"/>
    </div>
  </div>
</template>
<script>
import htmlTruncate from 'html-truncate';
import Viewlistmodal from '../../../components/UbraAntique/Superadmin/Employerjobdetails/Viewlistmodal.vue';
import { ContentLoader } from 'vue-content-loader'

export default {
  name: "employer-my-job-description-page",
  props: {
    title: String,
    id: String,
  },
  components: {
    ContentLoader,
    Viewlistmodal
  },
  data() {
    return {
      loading: false,
      job: {},
      name: "",
      showModal: false
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
    },
    toggleModal(){
      this.showModal = !this.showModal
    },
    UpdateStatusWork(id, name){
      this.$swal({
          title: `Are you sure you want to select ${name} for this job?`,
          showCancelButton: true,
          confirmButtonText: "Yes",
          showLoaderOnConfirm: true,
          preConfirm: async () => {
              try {
                  const response = await fetch(`${process.env.VUE_APP_API_URL}/jobs/selectemployeeforjob`,{
                      method: 'POST',
                      headers: {
                          "Content-Type": "application/json"
                      },
                      credentials: "include",
                      body: JSON.stringify({
                          "employeeid": id,
                          "jobid": this.job._id
                      })
                  });

                  if (!response.ok) {
                      return this.$swal.showValidationMessage("There's a problem with the server! Please contact customer support for more details");
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
                  title: "You have successfully selected" + name + " for this job posted",
                  icon: "success",
                  allowOutsideClick: false
              }) 
          }
      })
    },
    EditWorkDescription(){
      this.$swal({
          title: "POST YOUR JOB",
          html: `
              <center>
              <input type="text" id="titleInput" placeholder="Job title" class="swal2-input" style="display: flex; width: 70%;"/>
              <textarea autocapitalize="off" id="descInput" placeholder="Job Description" class="swal2-textarea" style="display: flex;  width: 70%;"></textarea>
              <center/>
              <input type="number" id="salaryInput" placeholder="Salary" class="swal2-input" style="display: flex; width: 70%; height: 2.6rem"/>
              <label for="cars" style="">Choose a location:</label>
              <br/>
              <select name="location" id="location" style="display: flex; width: 70%;">
                <option value="Pandan">Pandan</option>
                <option value="Libertad">Libertad</option>
                <option value="Laua-an">Laua-an</option>
                <option value="Valderrama">Valderrama</option>
                <option value="Sibalom">Sibalom</option>
                <option value="San Remigio">San Remigio</option>
                <option value="Tibiao">Tibiao</option>
                <option value="Culasi">Culasi</option>
                <option value="Bugasong">Bugasong</option>
                <option value="Patnongon">Patnongon</option>
                <option value="Belison">Belison</option>
                <option value="Sebaste">Sebaste</option>
                <option value="San Jose de Buenavista">San Jose de Buenavista</option>
                <option value="Hamtic">Hamtic</option>
                <option value="Tobias Fornier">Tobias Fornier</option>
                <option value="Anini-y">Anini-y</option>
                <option value="Caluya">Caluya</option>
                <option value="Barbaza">Barbaza</option>
              </select>
          `,
          focusConfirm: false,
          showCancelButton: true,
          confirmButtonText: "Submit",
          showLoaderOnConfirm: true,
          didOpen: () => {
            document.getElementById("titleInput").value = this.job.title;
            document.getElementById("descInput").value = this.job.description;
            document.getElementById("salaryInput").value = this.job.salary;
            document.getElementById("location").value = this.job.location;
          },
          preConfirm: async () => {
              const title = document.getElementById('titleInput').value;
              const description = document.getElementById('descInput').value;
              const salary = document.getElementById('salaryInput').value.trim();
              const location = document.getElementById('location').value;

              if (title == ""){
                return this.$swal.showValidationMessage(`Please input your job title first!`);
              }

              else if (description == ""){
                return this.$swal.showValidationMessage(`Please input your job description first!`);
              }

              else if (isNaN(salary)){
                return this.$swal.showValidationMessage(`Please numbers on the salary only!`);
              }

              const response = await fetch(`${process.env.VUE_APP_API_URL}/jobs/editjob`,{
                  method: 'POST',
                  headers: {
                  'Content-Type': 'application/json',
                  },
                  credentials: "include",
                  body: JSON.stringify({
                    jobid: this.job._id,
                    title: title,
                    description: description,
                    salary: salary.toLocaleString(),
                    location: location
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
    message(id, name){
      this.$swal({
          title: "MESSAGE",
          html: `
              <center>
              <label for="receiver" style="">Receiver</label>
              <input type="text" name"receiver" id="receiver" placeholder="Job title" class="swal2-input" style="display: flex; width: 70%;" disabled/>
              <label for="title" style="">Title</label>
              <input type="text" name"title" id="title" placeholder="Job title" class="swal2-input" style="display: flex; width: 70%;" />
              
              <label for="message" style="">Message</label>
              <textarea autocapitalize="off" name="message" id="message" placeholder="Your Message" class="swal2-textarea" style="display: flex;  width: 70%;"></textarea>
              <center/>
          `,
          focusConfirm: false,
          showCancelButton: true,
          confirmButtonText: "Submit",
          showLoaderOnConfirm: true,
          didOpen: () => {
            document.getElementById("receiver").value = name.toUpperCase();
            document.getElementById("title").value = `${name.toUpperCase()}'s and ${this.job.ownerDetails.firstname.toUpperCase()} ${this.job.ownerDetails.lastname.toUpperCase()}'s conversation`;
          },
          preConfirm: async () => {
              const receiver = id;
              const title = document.getElementById('title').value;
              const message = document.getElementById('message').value;

              if (title == ""){
                return this.$swal.showValidationMessage(`Please input your message title first!`);
              }

              else if (receiver == ""){
                return this.$swal.showValidationMessage(`Please select a valid user first!`);
              }

              else if (message == ""){
                return this.$swal.showValidationMessage(`Please input your message first!`);
              }

              const response = await fetch(`${process.env.VUE_APP_API_URL}/chat/createnewmessage`,{
                  method: 'POST',
                  headers: {
                  'Content-Type': 'application/json',
                  },
                  credentials: "include",
                  body: JSON.stringify({
                    title: title,
                    receiver: receiver,
                    message: message,
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

              return this.$swal({
                  title: `Successfully message ${name}!`,
                  icon: "success",
                  allowOutsideClick: false
              })
          }
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