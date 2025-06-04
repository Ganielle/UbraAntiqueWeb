<template>
    <div>
        <a
        class="text-black text-xl uppercase lg:inline-block font-semibold pt-12"
        href="javascript:void(0)"
        >
            Loan / Payments
        </a>
        <hr class="my-4 md:min-w-full" />
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
        <PaymentsTable :requestitems="historylist" @view-receipt="ViewItemImage" @approve-loan-payment="toggleApproveItem" @denied-loan-payment="toggleDeniedItem"/>
    </div>
</template>

<script>

import PaymentsTable from '@/components/Subastanauan/Dashboard/Superadmin/loan/Loanpaymenttable.vue';

export default{
    data(){
        return {

            //  #region CASHIN HISTORY

            historyloading: false,
            historylist: [],
            // {
            //     "amount": 200,
            //     "paymentmethod": "GCash",
            //     "accountnumber": "09672852303",
            //     "accountname": "Jan Bien Gabrielle A. Daniel",
            //     "receipt": "uploads\\1734590496235.jpg",
            //     "status": "Pending",
            //     "cashinid": "6763c020bdb2335a570892f4",
            //     "fullname": "Jan Bien Gabrielle Daniel"
            // }
            historypagination: {
                page: 0,
                limit: 10,
                totalpage: 1
            },
            //  #endregion
        }
    },
    components: {
        PaymentsTable
    },
    methods: {
        ViewItemImage(data){
            window.open(`${process.env.VUE_APP_API_URL}/${data}`, '_blank')
        },

        //  #region CASHIN HISTORY
        toggleApproveItem(itemid){
            if (this.historyloading){
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
                        this.ApproveDeniedLoanPayment("Done", itemid)
                    }
                })
            }
        },
        toggleDeniedItem(itemid){
            if (this.historyloading){
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
                        this.ApproveDeniedLoanPayment("Denied", itemid)
                    }
                })
            }
        },
        async ApproveDeniedLoanPayment(isApproved, requestid){
            if (requestid == ""){
                return;
            }

            this.historyloading = true

            const response = await fetch(`${process.env.VUE_APP_API_URL}/loan/approvedenyloanpayment`, {
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
            
            this.historyloading = false

            this.$swal({
                title: `Loan payment successfully ${isApproved}`,
                icon: "success",
                allowOutsideClick: false
            }).then(() => {
                this.CashinHistory()
            })
        },
        async CashinHistory(){
            this.historyloading = true

            const response = await fetch(`${process.env.VUE_APP_API_URL}/loan/loanpaymentslist?page=${this.historypagination.page}&limit=${this.historypagination.limit}`, {
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