<template>
    <div>
        <a
        class="text-black text-xl uppercase lg:inline-block font-semibold pt-12"
        href="javascript:void(0)"
        >
            Forums / Post Request
        </a>
        <hr class="my-4 md:min-w-full" />
        <br/>

        <div>
            <div class="mb-3 pt-0" style="display: flex; gap: 10px;">
                <input type="text" placeholder="Search Forum" class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline" v-model="requestsearch" @input="SearchRequest()"/>
                
                <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="ClearSearchRequest()">
                Clear Search
                </button>
            </div>
        </div>
        <br/>
        <div style="display: flex; gap: 10px; justify-content: center; align-items: center;">
            <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="PreviousePageRequest()" :disabled="requestloading || requestpagination.page <= 0">
                <i class="fas fa-chevron-left"></i>
            </button>

            <p style="font-size: 1.4rem; font-weight: bold;">{{ requestpagination.page + 1 }} / {{ requestpagination.totalpage }}</p>

            <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="NextPageRequest()" :disabled="requestloading || requestpagination.page + 1 >= requestpagination.totalpage">
                <i class="fas fa-chevron-right"></i>
            </button>
        </div>
        <br/><br/>
        <ForumRequestTable :requestitems="requestlist" @approve-forum="toggleApproveItem" @denied-forum="toggleDeniedItem"/>
    </div>
</template>

<script>

import ForumRequestTable from '@/components/Subastanauan/Dashboard/Superadmin/forums/Forumrequesttable.vue'

export default{
    data(){
        return {
            //  #region REQUEST LIST

            requestloading: false,
            requestsearch: "",
            requestlist: [],
            requestpagination: {
                page: 0,
                limi: 10,
                totalpage: 1
            },
            debounceTimeoutRequest: null,

            //  #endregion
        }
    },
    components: {
        ForumRequestTable
    },
    methods: {
        //  #region REQUEST LIST

        toggleApproveItem(itemid){
            if (this.requestloading){
                return
            }

            if (itemid){
                this.$swal({
                    title: "Are you sure you want to approve this forum item?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, approve it!"
                }).then((data) => {
                    if (data.isConfirmed){
                        this.ApproveDeniedForum("Approved", itemid)
                    }
                })
            }
        },
        toggleDeniedItem(itemid){
            if (this.requestloading){
                return
            }

            if (itemid){
                this.$swal({
                    title: "Are you sure you want to denied this forum item?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, denied it!"
                }).then((data) => {
                    if (data.isConfirmed){
                        this.ApproveDeniedForum("Denied", itemid)
                    }
                })
            }
        },
        async GetRequestList(){
            this.requestloading = true

            const response = await fetch(`${process.env.VUE_APP_API_URL}/forums/getforumrequestlist?forumsearch=${this.requestsearch}&page=${this.requestpagination.page}&limit=10`, {
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

                this.requestloading = false
                return;
            }
            else if (response.status == 401){
                this.$swal({
                title: "Authentication Failed! You will now be redirected to the login page",
                icon: "error"
                })

                this.$router.push({path: "/"})
            }


            this.requestpagination.totalpage = responseData.data.totalpages <= 0 ? 1 : responseData.data.totalpages
            
            if (this.requestpagination.totalpage - 1 < this.requestpagination.page){
                this.requestpagination.page -= 1
                this.GetRequestList();
                return;
            }

            
            this.requestlist = responseData.data.list

            this.requestloading = false
        },
        SearchRequest(){
            if (this.requestloading){
                return
            }

            clearTimeout(this.debounceTimeoutRequest);
            this.debounceTimeoutRequest = setTimeout(() => {
                this.requestpagination.page = 0
                this.GetRequestList();
            }, 500);
        },
        ClearSearchRequest(){
            if (this.requestloading){
                return
            }

            clearTimeout(this.debounceTimeoutRequest);
            this.requestpagination.page = 0
            this.requestsearch = ""

            this.GetRequestList()
        },
        NextPageRequest(){
            this.requestpagination.page++
            this.GetRequestList()
        },
        PreviousePageRequest(){
            this.requestpagination.page--;
            this.GetRequestList()
        },
        async ApproveDeniedForum(isApproved, itemid){
            if (itemid == ""){
                return;
            }

            this.requestloading = true

            const response = await fetch(`${process.env.VUE_APP_API_URL}/forums/approvedenyforum`, {
                method: 'POST',
                headers: {
                "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    forumid: itemid,
                    status: isApproved
                })
            });

            const responseData = await response.json();

            if (response.status === 400) {
                //  API HERE
                this.$swal({
                title: responseData.data,
                icon: "error"
                })

                this.requestloading = false
                return;
            }
            else if (response.status == 401){
                this.$swal({
                title: "Authentication Failed! You will now be redirected to the login page",
                icon: "error"
                })

                this.$router.push({path: "/"})
            }

            this.requestloading = false

            this.$swal({
                title: `Item successfully ${isApproved}`,
                icon: "success",
                allowOutsideClick: false
            }).then(() => {
                this.GetRequestList()
            })
        },
        //  #endregion
    },
    mounted(){
        this.GetRequestList()
    }
}
</script>