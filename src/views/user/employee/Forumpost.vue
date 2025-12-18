<template>
  <div>
    <div
      class="text-black text-xl uppercase lg:inline-block font-semibold pt-12"
      style="display: flex; "
    >
      FORUMS / <p @click="() => $router.push(pagepath)" class="breadcrumbs" style="color: blue"> {{ path }} </p>  / {{ title }}
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

      <p style="font-size: 2rem; margin-left: 20px; padding-top: 20px; font-weight: bold;">{{ forumdata.title }}</p>
      <div style="display: flex; align-items: center; gap: 50px; margin-left: 20px; padding-top: 10px; font-size: 0.8rem;">
          <p style="font-weight: bold; margin: 0;">
              Posted by: {{ name.toUpperCase() }}
          </p>
          <p style="font-weight: bold; margin: 0;">Created at: {{ formatDate(forumdata.createdAt) }}</p>
          <p style="font-weight: bold; margin: 0;">Tag: {{ forumdata.tag }}</p>
      </div>
      <br/>
      <div v-if="forumdata.isOwner">
        <div style="display: flex; align-items: center; gap: 10px; margin-left: 20px; margin-bottom: 20px;">
          <div style="">
              <button
                class="bg-emerald-500 text-white px-3 py-1 rounded shadow hover:shadow-lg"
                @click="edittopic()"
              >
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
            </div>
            <div style="">
              <button
                class="bg-red-500 text-white px-3 py-1 rounded shadow hover:shadow-lg"
                @click="deletetopic(forumdata._id)"
              >
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
        </div>
      </div>
      <hr>
      <br/>
      <div v-html="forumdata.content ? forumdata.content.replace(/\n/g, '<br>') : ''" style="margin-left: 20px; padding-top: 20px;"></div>
      <br/>
      <hr>
      <br/>
      <p style="margin-left: 20px; font-size: 1.4rem; font-weight: bolder;">Comments</p>

      <div v-if="forumdata.comments?.length <= 0">
        <center>
          <p style="margin-left: 20px; font-size: 1.2rem; font-weight: bolder;">NO COMMENTS YET!</p>
        </center>
      </div>
      <div v-else style="max-height: 500px; overflow-x: auto;">
        <div 
            v-for="comments in forumdata.comments" 
            :key="comments._id"
            class="w-full in-h-[100px] p-5"
          >

            <div class="bg-white border border-black rounded p-5" style="height: 100%;">
              <div class="text-md font-bold mb-3">

                <p class="text-lg font-bold mb-3">
                  {{ comments.content }}
                </p>
                <p>Posted by: {{ Object.keys(comments.owner).length === 0 ? "Admin" : comments.owner.firstname.toUpperCase() }} {{ Object.keys(comments.owner).length === 0 ? "" : comments.owner.lastname.toUpperCase() }}</p>
                <p>Created at: {{ formatDate(comments.createdAt) }}</p>
              </div>
              <br/>
              <div v-if="comments.isMine" style="">
                <button
                  class="bg-red-500 text-white px-3 py-1 rounded shadow hover:shadow-lg"
                  @click="deletecomment(comments._id)"
                >
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
      </div>

      
      <br/>
      <hr>
      <br/>
      <p style="margin-left: 20px; font-size: 1.4rem; font-weight: bolder;">Post your comment</p>
      <br/>
      <div class="mb-3 pt-0">
        <textarea type="textarea" v-model="comment" placeholder="Enter your comment here" rows="4" cols="50" style="margin-left: 20px; width: 98%;" class="py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-lg shadow outline-none focus:outline-none focus:shadow-outline"> </textarea>
      </div>
      <div style="position: absolute; right: 50px; display: flex; margin-bottom: 20px;">
        <button
          class="bg-emerald-500 text-white px-3 py-1 rounded shadow hover:shadow-lg"
          @click="postcomment"
        >
          SUBMIT COMMENT
        </button>
      </div>

      <br/><br/><br/><br/>
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
    path: String,
    pagepath: String
  },
  components: {
    ContentLoader
  },
  data() {
    return {
      loading: false,
      forumdata: {},
      name: "",
      comment: ""
    }
  },
  methods: {
    async GetData() {
      this.loading = true;

      const response = await fetch(`${process.env.VUE_APP_API_URL}/forums/forumdatauser?forumId=${this.id}`, {
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

      this.forumdata = responseData.data
      this.name = `${this.forumdata.owner.firstname} ${this.forumdata.owner.lastname}`
      this.loading = false
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
    async postcomment(){
      this.loading = true;

      const response = await fetch(`${process.env.VUE_APP_API_URL}/forums/postcomment`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify({
            commentid: this.id,
            comment: this.comment
          })
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

      this.$swal("You've successfully commented your post")

      this.comment = "";
      this.GetData()
    },
    async deletecomment(commentsid){

      this.$swal({
          title: `Are you sure you want to delete this comment?`,
          showCancelButton: true,
          confirmButtonText: "Yes",
          showLoaderOnConfirm: true,
          preConfirm: async () => {
              try {
                  const response = await fetch(`${process.env.VUE_APP_API_URL}/forums/deletecomment`, {
                      method: 'POST',
                      headers: {
                        "Content-Type": "application/json"
                      },
                      credentials: "include",
                      body: JSON.stringify({
                        "commentid": commentsid
                      })
                  });

                  if (!response.ok) {
                      return this.$swal.showValidationMessage(response.data);
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
                  title: "You have successfully deleted this comment",
                  icon: "success",
                  allowOutsideClick: false
              }) 
          }
      })
    },
    async deletetopic(forumid){

      this.$swal({
          title: `Are you sure you want to delete this topic?`,
          showCancelButton: true,
          confirmButtonText: "Yes",
          showLoaderOnConfirm: true,
          preConfirm: async () => {
              try {
                  const response = await fetch(`${process.env.VUE_APP_API_URL}/forums/deleteforum`, {
                      method: 'POST',
                      headers: {
                        "Content-Type": "application/json"
                      },
                      credentials: "include",
                      body: JSON.stringify({
                        "forumid": forumid
                      })
                  });

                  if (!response.ok) {
                      return this.$swal.showValidationMessage(response.data);
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
                  title: "You have successfully deleted this topic",
                  icon: "success",
                  allowOutsideClick: false
              }).then(() => {
                window.close();
              })
          }
      })
    },
    async edittopic(){
      this.$swal({
          title: "EDIT YOUR TOPIC",
          html: `
              <center>
              <input type="text" id="titleInput" placeholder="Topic Title" class="swal2-input" style="display: flex; width: 70%;" />
              <textarea autocapitalize="off" id="descInput" placeholder="Topic Content" class="swal2-textarea" style="display: flex;  width: 70%;"></textarea>
              <center/>
              <label for="cars" style="">Choose a tag:</label>
              <br/>
              <select name="tag" id="tag" style="display: flex; width: 70%;">
                <option value="Work">Work</option>
                <option value="Question">Question</option>
                <option value="Warning">Warning</option>
                <option value="Others">Others</option>
              </select>
          `,
          focusConfirm: false,
          showCancelButton: true,
          confirmButtonText: "Submit",
          showLoaderOnConfirm: true,
          didOpen: () => {
            document.getElementById("tag").value = this.forumdata.tag;
            document.getElementById("titleInput").value = this.forumdata.title;
            document.getElementById("descInput").value = this.forumdata.content;
          },
          preConfirm: async () => {
              const title = document.getElementById('titleInput').value;
              const content = document.getElementById('descInput').value;
              const tag = document.getElementById('tag').value;

              if (title == ""){
                return this.$swal.showValidationMessage(`Please input your topic title first!`);
              }

              else if (content == ""){
                return this.$swal.showValidationMessage(`Please input your topic content first!`);
              }

              const response = await fetch(`${process.env.VUE_APP_API_URL}/forums/forumedituser`,{
                  method: 'POST',
                  headers: {
                  'Content-Type': 'application/json',
                  },
                  credentials: "include",
                  body: JSON.stringify({
                    forumid: this.forumdata._id,
                    title: title,
                    content: content,
                    tag: tag
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
                  title: "Successfully edited your posted topic!",
                  icon: "success",
                  allowOutsideClick: false
              })
          }
      })
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