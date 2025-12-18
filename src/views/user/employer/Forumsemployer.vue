<template>
    <div>
        <a
        class="text-black text-xl uppercase lg:inline-block font-semibold pt-12"
        href="javascript:void(0)"
        >
        MY POSTS
        </a>
        
        <hr/>
        <br/>
        
        <!-- Header -->
        <!-- <div class="px-4 mx-auto">
            <div class="flex flex-wrap">
                <div class="w-full w-1/2 px-4 lg:w-9/12">
                <div class="block mb-3 pt-0">
                    <input type="text" placeholder="Search Discussion Title" class="px-3 py-4 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-none focus:shadow-outline w-full" v-model="search"/>
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
        </div> -->
        <br/>
        <div>
            <button class="bg-yellow-500 text-white active:bg-emerald-600 font-bold uppercase text-base px-12 py-3 rounded shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="() => {
                PostQuestion()
            }">
                CREATE QUESTION
            </button>
        </div>
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
        <h2 v-if="forums.length <= 0">
            <center>
            No forums created yet!
            </center>
        </h2>
        <div v-else style="">

            <div class="flex flex-wrap gap-2 items-stretch">
            <div 
                v-for="forum in forums" 
                :key="forum._id"
                class="w-full sm:w-10/12 md:w-7/12 lg:w-6/12 xl:w-4/12 min-h-[100px] p-5 relative flex flex-col"
            >
                <div class="bg-white border border-black rounded p-5" style="height: 100%;">
                <p class="text-lg font-bold mb-3">
                    {{ forum.title }}
                </p>

                <div class="text-xs font-bold mb-3">
                    <p>Posted by: {{ forum.owner.firstname.toUpperCase() }} {{ forum.owner.lastname.toUpperCase() }}</p>
                    <p>Created at: {{ formatDate(forum.createdAt) }}</p>
                    <p>Status: {{ forum.status }}</p>
                    <p>Tag: {{ forum.tag }}</p>
                </div>

                <div 
                    v-html="truncatedDescription(forum.content.replace(/\n/g, '<br>'))" 
                    class="text-base mb-10 flex-grow"
                ></div>

                <br/><br/>

                <div style="position: absolute; bottom: 20px; right: 30px; display: flex; gap: 8px; margin-bottom: 20px;">
                    <button
                    class="bg-emerald-500 text-white px-3 py-1 rounded shadow hover:shadow-lg"
                    @click="viewdetails(forum.title, forum._id)"
                    >
                    View Post
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

                <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="NextPageRequest" :disabled="loading || currentpage >= totalpage - 1">
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
      locationfilter: "",
      forums: [],
      loading: false,
      currentpage: 0,
      totalpage: 0
    }
  },
  methods: {
    async GetData() {
      this.loading = true;

      const response = await fetch(`${process.env.VUE_APP_API_URL}/forums/myforums?page=${this.currentpage}&limit=12`, {
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

      this.forums = responseData.data.forums
      this.totalpage = responseData.data.totalpage
      this.loading = false;
    },
    truncatedDescription(html) {
      return htmlTruncate(html, 450); // truncates to ~200 characters safely
    },
    PreviousePageRequest(){

      if (this.loading || this.currentpage <= 0){
        return;
      }

      this.currentpage--
      this.GetData()
    },
    NextPageRequest(){

      if (this.loading || this.currentpage >= this.totalpage - 1){
        return;
      }

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
    },
    searchFilters(){
      this.$swal({
          title: "SEARCH FILTERS",
          html: `
              <center>
              <input type="text" name="titleInput" id="titleInput" placeholder="Search Job Title" class="swal2-input" style="display: flex; width: 70%;" />
              <center/>
              <br/>
              <label for="location" style="">Choose a location:</label>
              <br/>
              <select name="location" id="location" style="display: flex; width: 70%;">
                <option value="">No Location Filter</option>
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
          confirmButtonText: "Search",
          didOpen: () => {
            document.getElementById("location").value = this.locationfilter;
            document.getElementById("titleInput").value = this.search;
          },
          showLoaderOnConfirm: true,

          preConfirm: async () => {
              const title = document.getElementById('titleInput').value;
              const location = document.getElementById('location').value;

              this.search = title
              this.locationfilter = location
          },
          allowOutsideClick: () => !this.$swal.isLoading()
      }).then((tempresponse) => {
          if (tempresponse.isConfirmed){
            this.currentpage = 0
            this.GetData()
          }
      })
    },
    async PostQuestion(){
      this.$swal({
          title: "POST YOUR TOPIC",
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

              const response = await fetch(`${process.env.VUE_APP_API_URL}/forums/postforum`,{
                  method: 'POST',
                  headers: {
                  'Content-Type': 'application/json',
                  },
                  credentials: "include",
                  body: JSON.stringify({
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
                  title: "Successfully created!",
                  icon: "success",
                  allowOutsideClick: false
              })
          }
      })
    },
    viewdetails(title, id){
      const routeData = this.$router.resolve({
        path: '/employer/forums/post',
        query: { title: title, id: id, path: 'MY POSTS', pagepath: '/employer/forums' }
      })
      
      window.open(routeData.href, '_blank');
    }
  },
  mounted() {
    this.GetData()
  }
};
</script>