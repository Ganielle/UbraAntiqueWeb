<template>
    <div>
        <a
        class="text-black text-xl uppercase lg:inline-block font-semibold pt-12"
        href="javascript:void(0)"
        >
            Forums
        </a>
        <hr class="my-4 md:min-w-full" />
        <br/>

        <!--#region MY FORUM REQUEST-->
        <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" :disabled="forumloading" @click="ToggleCreateForum()">
            Create Forum
        </button>
        <br/><br/>
        <p style="font-size: 1.5rem; font-weight: bold;">MY CREATED FORUMS</p>
        <br/><br/>
        <center v-if="createdlist.length <= 0">
            <p>No Created Forum for Approval yet!</p>
        </center>
        <div v-else>
            <div style="display: flex; gap: 10px; justify-content: center; align-items: center;">
                <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="PreviouseCreatedPageForum" :disabled="createdpagination.page <= 0 || createdforumloading">
                    <i class="fas fa-chevron-left"></i>
                </button>

                <p style="font-size: 1.4rem; font-weight: bold;">{{ createdpagination.page + 1 }} / {{ createdpagination.totalpage }}</p>

                <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="NextPageCreatedForum" :disabled="createdpagination.page >= createdpagination.totalpage || createdforumloading">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
            <br/>
            <div v-for="item in createdlist" :key="item.forumid">
                <div style="width: 100%; height: 200px; background-color: gainsboro; border-radius: 10px; cursor: pointer;" @click="() => {
                    forumcreateddatacontent.forumid = item.forumid
                    forumcreateddatacontent.content = item.content
                    forumcreateddatacontent.title = item.title
                    forumcreateddatacontent.username = item.username
                    forumcreateddatacontent.createdAt = item.createdAt
                    ToggleForumCreatedData()
                }">
                    <div style="margin: 20px; padding-top: 10px; padding-bottom: 10px;">
                        <p style="font-size: 2rem; font-weight: bold;">{{ item.title }}</p>
                        
                        <div style="display: inline-flex; gap: 20px;">
                            <p>Created by: {{ item.username }}</p>
                            <p>Created At: {{ item.createdAt }}</p>
                            <p>Status: <span :class="item.status == 'Pending' ? 'pending-status' : item.status == 'Denied' ? 'denied-status' : 'approved-status'"
                                style="font-weight: bold;"> {{ item.status }}</span>
                            </p>
                        </div>

                        <br/><br/>

                        <p style="font-size: 1.5rem;">{{ TruncatedText(item.content) }}</p>
                    </div>
                </div>
            </div>
        </div>
        <br/><br/>
        <!--#endregion-->
        
        <hr class="my-4 md:min-w-full" />

        <!--#region FORUM LIST-->
        <p style="font-size: 1.5rem; font-weight: bold;">FORUM LIST</p>
        <br/>

        <div class="mb-3 pt-0">
            <input type="text" placeholder="Search Forum" class="px-3 py-4 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-none focus:shadow-outline w-full" v-model="forumsearch" :disabled="forumloading" @input="SearchForum"/>
        </div>
        <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" :disabled="forumloading" @click="ClearSearchRequest">
            Clear Search
        </button>
        <br/>
        <div style="display: flex; gap: 10px; justify-content: center; align-items: center;">
            <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="PreviousePageForum" :disabled="forumpagination.page <= 0 || forumloading">
                <i class="fas fa-chevron-left"></i>
            </button>

            <p style="font-size: 1.4rem; font-weight: bold;">{{ forumpagination.page + 1 }} / {{ forumpagination.totalpage }}</p>

            <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="NextPageForum" :disabled="forumpagination.page >= forumpagination.totalpage || forumloading">
                <i class="fas fa-chevron-right"></i>
            </button>
        </div>
        <br/><br/>

        <center v-if="forumlist.length <=0">
            <p>
                No Forum Listed Yet!
            </p>
        </center>
        <div v-else v-for="item in forumlist" :key="item.forumid">
            <div style="width: 100%; height: 200px; background-color: gainsboro; border-radius: 10px; cursor: pointer;" @click="() => {
                forumdatacontent.forumid = item.forumid
                forumcomment.forumid = item.forumid
                forumdatacontent.content = item.content
                forumdatacontent.title = item.title
                forumdatacontent.username = item.username
                forumdatacontent.createdAt = item.createdAt
                ToggleForumData()
            }">
                <div style="margin: 20px; padding-top: 10px; padding-bottom: 10px;">
                    <p style="font-size: 2rem; font-weight: bold;">{{ item.title }}</p>
                    
                    <div style="display: inline-flex; gap: 20px;">
                        <p>Created by: {{ item.username }}</p>
                        <p>Created At: {{ item.createdAt }}</p>
                    </div>

                    <br/><br/>

                    <p style="font-size: 1.5rem;">{{ TruncatedText(item.content) }}</p>
                </div>
            </div>
        </div>
        <!--#endregion-->
    
        <!--#region CREATE FORUM-->
        <div>
            <vue-final-modal v-model="createforummodal" classes="modal-container"  :clickToClose="false" :escToClose="false" content-class="modal-content">
                <button class="modal__close" @click="ToggleCreateForum()">
                <mdi-close></mdi-close>
                </button>
                <span class="modal__title">Create Forum Form</span>
                <div class="modal__content">
                    <p class="mt-3">Title:</p>
                    <input type="text" placeholder="Enter Forum Title" class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full" v-model="createforumdata.title"/>
                </div>
                <br/>
                <p class="mt-3">Content:</p>
                <textarea
                    type="text"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    rows="4"
                    placeholder="Enter Forum Content" 
                    v-model="createforumdata.content"
                ></textarea>

                <br/>
                <div class="modal__action">
                <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="ToggleCreateForum()" :disabled="createdforumloading">
                    <center v-if="createdforumloading">
                    <i class="fas fa-solid fa-spinner" style="animation:spin 4s linear infinite;"></i>
                    </center>
                    <p v-else>Cancel</p>
                </button>
                <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" :disabled="createdforumloading" @click="CreateForum">
                    <center v-if="createdforumloading">
                    <i class="fas fa-solid fa-spinner" style="animation:spin 4s linear infinite;"></i>
                    </center>
                    <p v-else>Create Now</p>
                </button>
                </div>
            </vue-final-modal>
        </div>
        <!--#endregion-->

        <!--#region SHOW FORUM DATA-->
        <div>
            <vue-final-modal v-model="forumdatamodal" classes="modal-container"  :clickToClose="false" :escToClose="false" content-class="modal-content">
                <button class="modal__close" @click="ToggleForumData()">
                <mdi-close></mdi-close>
                </button>
                <span class="modal__title"></span>
                
                <div class="modal__content">
                    <p style="font-size: 2rem; font-weight: bold;">{{ forumdatacontent.title }}</p>
                    <div style="display: inline-flex; gap: 20px; font-size: 0.8rem;">
                        <p>Created by: {{ forumdatacontent.username }}</p>
                        <p>Created At: {{ forumdatacontent.createdAt }}</p>
                    </div>

                    <br/><br/>
                    <p style="font-size: 1.2rem;">{{ TruncatedText(forumdatacontent.content) }}</p>

                    <hr class="my-4 md:min-w-full" style="border-color: black;"/>

                    <p>Comment:</p>
                    <textarea
                        type="text"
                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                        rows="4"
                        placeholder="Enter Your Comment" 
                        v-model="forumcomment.comment"
                    ></textarea>
                    <br/>
                    <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="SaveComment()" :disabled="showforumdataloading">
                        <center v-if="showforumdataloading">
                        <i class="fas fa-solid fa-spinner" style="animation:spin 4s linear infinite;"></i>
                        </center>
                        <p v-else>Save Comment</p>
                    </button>
                    <br/><br/>

                    <p style="font-size: 1.2rem; font-weight: bold;">Comment Section</p>
                    <center v-if="forumdatacomment.length <= 0">
                        <p>No Comments Yet!</p>
                    </center>
                    <div v-else v-for="item in forumdatacomment" :key="item.forumid">
                        <div style="width: 100%; height: 100%; background-color: whitesmoke; border-radius: 10px;">
                            <div style="margin: 20px; padding-top: 10px; padding-bottom: 10px;">
                                <p style="font-size: 1rem; font-weight: bold;">{{ item.content }}</p>
                                
                                <div style="display: inline-flex; gap: 20px; font-size: 0.8rem;">
                                    <p>Created by: {{ item.username }}</p>
                                    <p>Created At: {{ item.createdAt }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                

                <br/>
                <div class="modal__action">
                    <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="ToggleForumData()" :disabled="showforumdataloading">
                        <p>CLOSE</p>
                    </button>
                </div>
            </vue-final-modal>
        </div>
        <!--#endregion-->

        <!--#region SHOW CREATED FORUM DATA-->
        <div>
            <vue-final-modal v-model="forumcreateddatamodal" classes="modal-container"  :clickToClose="false" :escToClose="false" content-class="modal-content">
                <button class="modal__close" @click="ToggleForumCreatedData()">
                <mdi-close></mdi-close>
                </button>
                <span class="modal__title"></span>
                
                <div class="modal__content">
                    <p style="font-size: 2rem; font-weight: bold;">{{ forumcreateddatacontent.title }}</p>
                    <div style="display: inline-flex; gap: 20px; font-size: 0.8rem;">
                        <p>Created by: {{ forumcreateddatacontent.username }}</p>
                        <p>Created At: {{ forumcreateddatacontent.createdAt }}</p>
                    </div>

                    <br/><br/>
                    <p style="font-size: 1.2rem;">{{ TruncatedText(forumcreateddatacontent.content) }}</p>
                </div>

                <br/>
                <div class="modal__action">
                    <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="ToggleForumCreatedData()">
                        <p>CLOSE</p>
                    </button>
                </div>
            </vue-final-modal>
        </div>
        <!--#endregion-->
    </div>
</template>

<script>

export default{
    data(){
        return{
            //  #region FORUM LIST
            forumloading: false,
            forumsearch: "",
            forumlist: [],
            // {
            //     "title": "First forum",
            //     "content": "Hello world! This is the first forum that I want to show you",
            //     "createdAt": "2024-12-20T05:47:47.066Z",
            //     "forumid": "67650503222f966357304b14",
            //     "username": "ganielle"
            // }
            forumpagination: {
                page: 0,
                limit: 10,
                totalpage: 1
            },
            debounceListTimeoutRequest: null,
            //  #endregion

            //  #region MY CREATED FORUM

            createdforumloading: false,
            createforummodal: false,
            createdlist: [],
            createdpagination: {
                page: 0,
                limit: 10,
                totalpage: 1
            },
            createforumdata: {
                title: "",
                content: ""
            },

            //  #endregion
        
            //  #region SHOW FORUM DATA

            showforumdataloading: false,
            forumdatamodal: false,
            forumcreateddatamodal: false,
            forumdatacomment: [],
            forumdatacontent: {
                title: "",
                content: "",
                forumid: "",
                username: "",
                createdAt: ""
            },
            forumcreateddatacontent: {
                title: "",
                content: "",
                forumid: "",
                username: "",
                createdAt: ""
            },
            forumcomment: {
                forumid: "",
                comment: ""
            }

            //  #endregion
        }
    },
    methods: {
        TruncatedText(data) {
            return data.length > 60 ? data.substring(0, 60) + "... See more" : data;
        },
        //  #region FORUM LIST
        async LoadForumList(){
            this.forumloading = true

            const response = await fetch(`${process.env.VUE_APP_API_URL}/forums/getforums?forumsearch=${this.forumsearch}&page=${this.forumpagination.page}&limit=10`, {
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

                this.forumloading = false
                return;
            }
            else if (response.status == 401){
                this.$swal({
                title: "Authentication Failed! You will now be redirected to the login page",
                icon: "error"
                })

                this.$router.push({path: "/"})
                return
            }

            this.forumpagination.totalpage = responseData.data.totalpages <= 0 ? 1 : responseData.data.totalpages
            
            if (this.forumpagination.totalpage - 1 < this.forumpagination.page){
                this.forumpagination.page -= 1
                this.LoadRequestList();
                return;
            }

            this.forumlist = responseData.data.list
            this.forumloading = false
        },
        SearchForum(){
            if (this.forumloading){
                return
            }

            clearTimeout(this.debounceListTimeoutRequest);
            this.debounceListTimeoutRequest = setTimeout(() => {
                this.forumpagination.page = 0
                this.LoadForumList();
            }, 500);
        },
        ClearSearchRequest(){
            if (this.forumloading){
                return
            }

            clearTimeout(this.debounceListTimeoutRequest);
            this.forumpagination.page = 0
            this.forumsearch = ""

            this.LoadForumList()
        },
        NextPageForum(){
            this.forumpagination.page++
            this.LoadForumList()
        },
        PreviousePageForum(){
            this.forumpagination.page--;
            this.LoadForumList()
        },
        //  #endregion

        //  #region MY CREATED FORUM

        ToggleCreateForum(){
            this.createforummodal = !this.createforummodal

            if (this.createforummodal == false){
                this.createforumdata = {
                    title: "",
                    content: ""
                }
            }
        },
        async LoadCreatedForumList(){
            this.createdforumloading = true

            const response = await fetch(`${process.env.VUE_APP_API_URL}/forums/getmycreatedforum?page=${this.createdpagination.page}&limit=10`, {
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

                this.createdforumloading = false
                return;
            }
            else if (response.status == 401){
                this.$swal({
                title: "Authentication Failed! You will now be redirected to the login page",
                icon: "error"
                })

                this.$router.push({path: "/"})
                return
            }

            this.createdpagination.totalpage = responseData.data.totalpages <= 0 ? 1 : responseData.data.totalpages
            
            if (this.createdpagination.totalpage - 1 < this.createdpagination.page){
                this.createdpagination.page -= 1
                this.LoadRequestList();
                return;
            }

            this.createdlist = responseData.data.list
            this.createdforumloading = false
        },
        async CreateForum(){
            this.createdforumloading = true

            const response = await fetch(`${process.env.VUE_APP_API_URL}/forums/createforums`, {
                method: 'POST',
                headers: {
                "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(this.createforumdata)
            });

            const responseData = await response.json();

            if (response.status === 400) {
                //  API HERE
                this.$swal({
                    title: responseData.data,
                    icon: "error"
                })

                this.createdforumloading = false;
                return;
            }
            else if (response.status == 401){
                this.$swal({
                title: "Authentication Failed! You will now be redirected to the login page",
                icon: "error"
                })

                this.$router.push({path: "/"})

                return
            }

            this.createdforumloading = false;
            this.ToggleCreateForum()
            this.LoadCreatedForumList()

            this.$swal({
                title: "Create forum successful",
                icon: "success"
            })
        },
        NextPageCreatedForum(){
            this.createdpagination.page++
            this.LoadCreatedForumList()
        },
        PreviouseCreatedPageForum(){
            this.createdpagination.page--;
            this.LoadCreatedForumList()
        },

        //  #endregion

        //  #region FORUM DATA

        ToggleForumData(){
            this.forumdatamodal = !this.forumdatamodal

            if (this.forumdatamodal == false){
                this.forumdatacontent = {
                    title: "",
                    content: "",
                    forumid: "",
                    username: "",
                    createdAt: ""
                }

                this.forumcomment = {
                    forumid: "",
                    comment: ""
                }

                this.forumdatacomment = []
            }
            else{
                this.GetForumComment()
            }
        },
        ToggleForumCreatedData(){
            this.forumcreateddatamodal = !this.forumcreateddatamodal

            if (!this.forumcreateddatamodal){
                this.forumcreateddatacontent = {
                    title: "",
                    content: "",
                    forumid: "",
                    username: "",
                    createdAt: ""
                }
            }
        },
        async SaveComment(){
            this.showforumdataloading = true

            const response = await fetch(`${process.env.VUE_APP_API_URL}/forums/commentonforum`, {
                method: 'POST',
                headers: {
                "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(this.forumcomment)
            });

            const responseData = await response.json();

            if (response.status === 400) {
                //  API HERE
                this.$swal({
                    title: responseData.data,
                    icon: "error"
                })

                this.showforumdataloading = false;
                return;
            }
            else if (response.status == 401){
                this.$swal({
                title: "Authentication Failed! You will now be redirected to the login page",
                icon: "error"
                })

                this.$router.push({path: "/"})

                return
            }

            this.showforumdataloading = false;
            this.forumcomment.comment = ""

            this.GetForumComment()

            this.$swal({
                title: "Create forum comment successful",
                icon: "success"
            })
        },
        async GetForumComment(){
            this.showforumdataloading = true

            const response = await fetch(`${process.env.VUE_APP_API_URL}/forums/getforumcomments?forumid=${this.forumcomment.forumid}`, {
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

                this.showforumdataloading = false
                return;
            }
            else if (response.status == 401){
                this.$swal({
                title: "Authentication Failed! You will now be redirected to the login page",
                icon: "error"
                })

                this.$router.push({path: "/"})
                return
            }

            this.forumdatacomment = responseData.data.list
            this.showforumdataloading = false
        }

        //  #endregion
    },
    mounted(){
        this.LoadForumList()
        this.LoadCreatedForumList()
    }
}
</script>

<style scoped>

.pending-status{
  color: blue
}

.approved-status{
  color: green
}

.denied-status{
  color: red
}
::v-deep .modal-content {
    background-color: gainsboro;
    width: 50%;
}
.modal__content {
  flex-grow: 1;
  overflow-y: auto;
}
</style>