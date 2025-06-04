<template>
    <div>
        <a
        class="text-black text-xl uppercase lg:inline-block font-semibold pt-12"
        href="javascript:void(0)"
        >
            Load (Cash-in)
        </a>
        <hr class="my-4 md:min-w-full" />
        <br/>

        <div>
            <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="ToggleRequestModal">
                Request Load (Cash-in)
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
        <Loadtable :requestitems="historylist" @view-receipt="ViewItemImage"/>

        <!--#region APPLY STORE-->
        <div>
            <vue-final-modal v-model="requestmodal" classes="modal-container"  :clickToClose="false" :escToClose="false" content-class="modal-content">
                <button class="modal__close" @click="ToggleRequestModal()">
                <mdi-close></mdi-close>
                </button>
                <span class="modal__title">Request Load Form</span>
                <br/>
                <div class="modal__content">
                    <p>Payment Method:</p>
                        <input type="text" placeholder="Enter Payment Method (e.g. GCash, BDO, EastWest, etc.)" class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full" v-model="requestdata.paymentmethod"/>
                    <br/>
                    
                    <p class="mt-3">Account Number:</p>
                    <div class="relative flex w-full flex-wrap items-stretch mb-3">
                        <input type="text" placeholder="Enter Account Number" class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pr-10" id="autocomplete" v-model="requestdata.accountnumber"/>
                    </div>
                    <p class="mt-3">Account Name:</p>
                    <input type="text" placeholder="Enter Account Name" class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full" v-model="requestdata.accountname"/>
                    <p class="mt-3">Cashin Amount:</p>
                    <input type="text" placeholder="Enter Cashin Amount (Minimum of 200 pesos)" class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full" v-model="requestdata.amount"/>
                    <br/><br/>
                    <div class="relative w-full mb-3">
                        <label
                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                        >
                            Upload Receipt Here:
                        </label>
                        <img class="uploading-image" :src="requestdata.previewImage"/>
                        <input type="file" accept="image/jpeg" @change=UploadImage>
                    </div>
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
                    <p v-else>Load Now</p>
                </button>
                </div>
            </vue-final-modal>
        </div>
        <!--#endregion-->
    </div>
</template>

<script>

import Loadtable from '@/components/Subastanauan/Dashboard/User/Loadtable.vue';

export default{
    data(){
        return {
            //  #region LOAN REQUEST MODAL

            requestmodal: false,
            requestdata: {
                amount: 0,
                paymentmethod: "",
                accountname: "",
                accountnumber: "",
                previewImage: null,
                file: null
            },
            requestcashinloading: false,

            //  #endregion

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
        Loadtable
    },
    methods: {
        ViewItemImage(data){
            window.open(`${process.env.VUE_APP_API_URL}/${data}`, '_blank')
        },
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

            const formData = new FormData()

            formData.append("amount", this.requestdata.amount)
            formData.append("paymentmethod", this.requestdata.paymentmethod)
            formData.append("accountname", this.requestdata.accountname)
            formData.append("accountnumber", this.requestdata.accountnumber)

            if (this.requestdata.file) {
                formData.append("file", this.requestdata.file);
            }

            const response = await fetch(`${process.env.VUE_APP_API_URL}/cashin/requestcashin`, {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                },
                credentials: "include",
                body: formData
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
        UploadImage(e) {
            const image = e.target.files[0];
            if (image) {
                    this.requestdata.file = image; // Store the file object directly
                    const reader = new FileReader();
                    reader.readAsDataURL(image);
                    reader.onload = e => {
                    this.requestdata.previewImage = e.target.result; // Base64 string for preview
                };
            }
        },
        //  #endregion

        //  #region CASHIN HISTORY

        async CashinHistory(){
            this.historyloading = true

            const response = await fetch(`${process.env.VUE_APP_API_URL}/cashin/requestcashinuserhistory?page=${this.historypagination.page}&limit=${this.historypagination.limit}`, {
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