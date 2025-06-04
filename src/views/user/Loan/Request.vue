<template>
    <div>
        <a
        class="text-black text-xl uppercase lg:inline-block font-semibold pt-12"
        href="javascript:void(0)"
        >
            Loan Request
        </a>
        <hr class="my-4 md:min-w-full" />
        <br/>

        <div>
            <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="ToggleRequestModal">
                Request Loan
            </button>
        </div>
        <br/>
        <div style="display: flex; gap: 10px; justify-content: center; align-items: center;">
            <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="PreviousePageRequest" :disabled="historyloading || historypagination.page <= 0">
                <i class="fas fa-chevron-left"></i>
            </button>

            <p style="font-size: 1.4rem; font-weight: bold;">{{ historypagination.page  + 1 }} / {{ historypagination.totalpage }}</p>

            <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="NextPageRequest" :disabled="historyloading || historypagination.page >= historypagination.totalpage">
                <i class="fas fa-chevron-right"></i>
            </button>
        </div>
        <br/><br/>
        <LoanRequestTable :requestitems="historylist" @view-receipt="ViewItemImage"/>

        <!--#region APPLY STORE-->
        <div>
            <vue-final-modal v-model="requestmodal" classes="modal-container"  :clickToClose="false" :escToClose="false" content-class="modal-content">
                <button class="modal__close" @click="ToggleRequestModal()">
                <mdi-close></mdi-close>
                </button>
                <span class="modal__title">Request Load Form</span>
                <div class="modal__content">
                    <p class="mt-3">Loan Amount:</p>
                    <input type="text" placeholder="Enter Cashin Amount (Minimum of 200 pesos)" class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full" v-model="requestdata.amount"/>
                </div>

                <br/>
                <div class="modal__action">
                <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="ToggleRequestModal" :disabled="requestcashinloading">
                    <center v-if="requestcashinloading">
                    <i class="fas fa-solid fa-spinner" style="animation:spin 4s linear infinite;"></i>
                    </center>
                    <p v-else>Cancel</p>
                </button>
                <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" :disabled="requestcashinloading" @click="RequestCashin">
                    <center v-if="requestcashinloading">
                    <i class="fas fa-solid fa-spinner" style="animation:spin 4s linear infinite;"></i>
                    </center>
                    <p v-else>Loan Now</p>
                </button>
                </div>
            </vue-final-modal>
        </div>
        <!--#endregion-->
    </div>
</template>

<script>

import LoanRequestTable from '@/components/Subastanauan/Dashboard/User/Loanrequesttable.vue';

export default{
    data(){
        return {
            //  #region LOAN REQUEST MODAL

            requestmodal: false,
            requestdata: {
                amount: 0
            },
            requestcashinloading: false,

            //  #endregion

            //  #region CASHIN HISTORY

            historyloading: false,
            historylist: [],
            // {
            //     "amount": 200,
            //     "datetopay": null,
            //     "status": "Pending",
            //     "paymentstatus": "none",
            //     "loanid": "67646a2e4a0f4cbc63afbf61",
            //     "fullname": "Jan Bien Gabrielle Daniel"
            // }
            historypagination: {
                page: 0,
                limit: 10,
                totalpage: 1
            }

            //  #endregion
        }
    },
    components: {
        LoanRequestTable
    },
    methods: {
        //  #region REQUEST CASHIN
        ToggleRequestModal(){
            this.requestmodal = !this.requestmodal

            if (this.requestmodal == false){
                this.requestdata = {
                    amount: 0,
                    paymentmethod: "",
                    accountname: "",
                    accountnumber: "",
                    previewImage: null,
                    file: null
                }
            }
        },
        async RequestCashin(){
            this.requestcashinloading = true;

            const response = await fetch(`${process.env.VUE_APP_API_URL}/loan/requestloan`, {
                method: 'POST',
                headers: {
                "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(this.requestdata)
            });

            const responseData = await response.json();

            if (response.status === 400) {
                //  API HERE
                this.$swal({
                    title: responseData.data,
                    icon: "error"
                })

                this.requestcashinloading = false;
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

            this.requestcashinloading = false;
            this.ToggleRequestModal()
            this.CashinHistory()

            this.$swal({
                title: "Cashin successful",
                icon: "success"
            })
        },
        //  #endregion

        //  #region CASHIN HISTORY

        async CashinHistory(){
            this.historyloading = true

            const response = await fetch(`${process.env.VUE_APP_API_URL}/loan/loanhistory?page=${this.historypagination.page}&limit=${this.historypagination.limit}`, {
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
            }

            this.historylist = responseData.data.list
            this.historypagination.totalpage = responseData.data.totalpages <= 0 ? 1 : responseData.data.totalpages

            if (this.historypagination.totalpage - 1 < this.historypagination.page){
                this.historypagination.page -= 1
                this.CashinHistory();
                return;
            }

            this.historyloading = false
        },
        NextPageRequest(){
            this.historypagination.page++
            this.LoadRequestList()
        },
        PreviousePageRequest(){
            this.historypagination.page--;
            this.LoadRequestList()
        },
        //  #endregion
    },
    mounted(){
        this.CashinHistory()
    }
}
</script>

<style scoped>
::v-deep .modal-content {
  width: 50%;
}
.modal__content {
  flex-grow: 1;
  overflow-y: auto;
}
</style>