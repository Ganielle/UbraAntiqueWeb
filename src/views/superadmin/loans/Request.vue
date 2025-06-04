<template>
    <div>
        <a
        class="text-black text-xl uppercase lg:inline-block font-semibold pt-12"
        href="javascript:void(0)"
        >
            Loan / Request
        </a>
        <hr class="my-4 md:min-w-full" />
        <br/>
        <div>
            <div class="mb-3 pt-0" style="display: flex; gap: 10px;">
                <input type="text" placeholder="Search Loan Request" class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline" v-model="requestsearch" @input="SearchCashinRequest"/>
                
                <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="ClearSearchRequest">
                Clear Search
                </button>
            </div>
        </div>
        <br/>
        <div style="display: flex; gap: 10px; justify-content: center; align-items: center;">
            <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="PreviousePageRequest" :disabled="requestpagination.page <= 0 || requestloading">
                <i class="fas fa-chevron-left"></i>
            </button>

            <p style="font-size: 1.4rem; font-weight: bold;">{{ requestpagination.page + 1 }} / {{ requestpagination.totalpage }}</p>

            <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="NextPageRequest" :disabled="requestpagination.page >= requestpagination.totalpage || requestloading">
                <i class="fas fa-chevron-right"></i>
            </button>
        </div>
        <br/><br/>
        <LoanRequesttable :requestitems="requestlist" @view-receipt="ViewItemImage" @approve-loan="toggleApproveItem" @denied-loan="toggleDeniedItem"/>
        <br/><br/>
        <div>
            <div class="mb-3 pt-0" style="display: flex; gap: 10px;">
                <input type="text" placeholder="Search Loan History" class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline" v-model="historysearch" @input="SearchCashinHistory"/>
                
                <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="ClearSearchHistory">
                Clear Search
                </button>
            </div>
        </div>
        <br/>
        <div style="display: flex; gap: 10px; justify-content: center; align-items: center;">
            <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="PreviousePageRequest" :disabled="requestpagination.page <= 0 || requestloading">
                <i class="fas fa-chevron-left"></i>
            </button>

            <p style="font-size: 1.4rem; font-weight: bold;">{{ requestpagination.page + 1 }} / {{ requestpagination.totalpage }}</p>

            <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="NextPageRequest" :disabled="requestpagination.page >= requestpagination.totalpage || requestloading">
                <i class="fas fa-chevron-right"></i>
            </button>
        </div>
        <br/><br/>
        <LoanHistoryTable :requestitems="historylist"/>
    </div>
</template>

<script>

import LoanRequesttable from '@/components/Subastanauan/Dashboard/Superadmin/loan/Loanrequesttable.vue'
import LoanHistoryTable from '@/components/Subastanauan/Dashboard/Superadmin/loan/Loanhistorytable.vue'

export default {
    components: {
        LoanRequesttable,
        LoanHistoryTable
    },
    data(){
        return {
            //  #region REQUEST LIST

            requestsearch: "",
            requestloading: false,
            requestpagination: {
                page: 0,
                limit: 10,
                totalpage: 1
            },
            requestlist: [],
            debounceListTimeoutRequest: null,

            //  #endregion

            //  #region REQUEST HISTORY

            historysearch: "",
            historyloading: false,
            historypagination: {
                page: 0,
                limit: 10,
                totalpage: 1
            },
            historylist: [],
            debounceHistoryTimeoutRequest: null,

            //  #endregion
        }
    },
    methods: {
        ViewItemImage(data){
            window.open(`${process.env.VUE_APP_API_URL}/${data}`, '_blank')
        },
        //  #region REQUEST LIST
        toggleApproveItem(itemid){
            if (this.requestloading){
                return
            }

            if (itemid){
                this.$swal({
                    title: "Are you sure you want to approve this cashin?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, approve it!"
                }).then((data) => {
                    if (data.isConfirmed){
                        this.ApproveDeniedLoan("Approved", itemid)
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
                    title: "Are you sure you want to denied this cashin?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, denied it!"
                }).then((data) => {
                    if (data.isConfirmed){
                        this.ApproveDeniedLoan("Denied", itemid)
                    }
                })
            }
        },
        async LoadRequestList(){
            this.requestloading = true

            const response = await fetch(`${process.env.VUE_APP_API_URL}/loan/loanrequesthistory?searchname=${this.requestsearch}&status=Pending&page=${this.requestpagination.page}&limit=10`, {
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
                return
            }

            this.requestpagination.totalpage = responseData.data.totalpages <= 0 ? 1 : responseData.data.totalpages
            
            if (this.requestpagination.totalpage - 1 < this.requestpagination.page){
                this.requestpagination.page -= 1
                this.LoadRequestList();
                return;
            }

            this.requestlist = responseData.data.list
            this.requestloading = false
        },
        SearchCashinRequest(){
            if (this.requestloading){
                return
            }

            clearTimeout(this.debounceTimeoutRequest);
            this.debounceListTimeoutRequest = setTimeout(() => {
                this.requestpagination.page = 0
                this.LoadRequestList();
            }, 500);
        },
        ClearSearchRequest(){
            if (this.requestloading){
                return
            }

            clearTimeout(this.debounceTimeoutRequest);
            this.requestpagination.page = 0
            this.requestsearch = ""

            this.LoadRequestList()
        },
        NextPageRequest(){
            this.requestpagination.page++
            this.LoadRequestList()
        },
        PreviousePageRequest(){
            this.requestpagination.page--;
            this.LoadRequestList()
        },
        async ApproveDeniedLoan(isApproved, requestid){
            if (requestid == ""){
                return;
            }

            this.requestloading = true

            const response = await fetch(`${process.env.VUE_APP_API_URL}/loan/approvedenyloan`, {
                method: 'POST',
                headers: {
                "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    loanid: requestid,
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
                this.LoadRequestList()
                this.LoadRequestHistory()
            })
        },
        //  #endregion

        //  #region REQUEST HISTORY
        async LoadRequestHistory(){
            this.historyloading = true

            const response = await fetch(`${process.env.VUE_APP_API_URL}/loan/loanadministory?searchname=${this.historysearch}&page=${this.historypagination.page}&limit=10`, {
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

                this.historyloading = false
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

            this.historypagination.totalpage = responseData.data.totalpages <= 0 ? 1 : responseData.data.totalpages
            
            if (this.historypagination.totalpage - 1 < this.historypagination.page){
                this.historypagination.page -= 1
                this.LoadRequestHistory();
                return;
            }

            this.historylist = responseData.data.list
            this.historyloading = false
        },
        SearchCashinHistory(){
            if (this.requestloading){
                return
            }

            clearTimeout(this.debounceHistoryTimeoutRequest);
            this.debounceListTimeoutRequest = setTimeout(() => {
                this.historypagination.page = 0
                this.LoadRequestHistory();
            }, 500);
        },
        ClearSearchHistory(){
            if (this.requestloading){
                return
            }

            clearTimeout(this.debounceHistoryTimeoutRequest);
            this.historypagination.page = 0
            this.historysearch = ""

            this.LoadRequestHistory()
        },
        NextPageHistory(){
            this.historypagination.page++
            this.LoadRequestHistory()
        },
        PreviousePageHistory(){
            this.historypagination.page--;
            this.LoadRequestHistory()
        },
        //  #endregion
    },
    mounted() {
        this.LoadRequestList()
        this.LoadRequestHistory()
    }
}

</script>