<template>
    <div>
        <a
        class="text-black text-xl uppercase lg:inline-block font-semibold pt-12"
        href="javascript:void(0)"
        >
            Inventory / Items
        </a>
        <hr class="my-4 md:min-w-full" />
        <br/>

        <div>
            <div class="mb-3 pt-0" style="display: flex; gap: 10px;">
                <input type="text" placeholder="Search Items Request" class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline" v-model="requestitemsearch" @input="SearchInventoryRequest"/>
                
                <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="ClearSearchRequest">
                Clear Search
                </button>
            </div>
        </div>
        <br/>
        <div style="display: flex; gap: 10px; justify-content: center; align-items: center;">
            <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="PreviousePageRequest" :disabled="requestpagination.page <= 0 || requestlistloading">
                <i class="fas fa-chevron-left"></i>
            </button>

            <p style="font-size: 1.4rem; font-weight: bold;">{{ requestpagination.page + 1 }} / {{ requestpagination.totalpage }}</p>

            <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="NextPageRequest" :disabled="requestpagination.page >= requestpagination.totalpage - 1 || requestlistloading">
                <i class="fas fa-chevron-right"></i>
            </button>
        </div>
        <br/><br/>
        <Itemrequesttable @approve-item="toggleApproveItem" @denied-item="toggleDeniedItem" @view-image="ViewItemImage" :inventoryitems="requestlist"/>
        <br/>
        <hr class="my-4 md:min-w-full" />
        <br/>
        <div>
            <div class="mb-3 pt-0" style="display: flex; gap: 10px;">
                <input type="text" placeholder="Search Items" class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline" v-model="itemsearch" @input="SearchItemInventory"/>
                
                <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="ClearSearchItem()">
                Clear Search
                </button>
            </div>
        </div>
        <br/>
        <div style="display: flex; gap: 10px; justify-content: center; align-items: center;">
            <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="PreviousePageItem" :disabled="listpagination.page <= 0 || listloading">
                <i class="fas fa-chevron-left"></i>
            </button>

            <p style="font-size: 1.4rem; font-weight: bold;">{{ listpagination.page + 1 }} / {{ listpagination.totalpage }}</p>

            <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="NextPageItem" :disabled="listpagination.page + 1 >= listpagination.totalpage || listloading">
                <i class="fas fa-chevron-right"></i>
            </button>
        </div>
        <br/><br/>
        <Itemlisttable @view-image="ViewItemImage" :inventoryitems="itemlist"/> <!--@edit-store="toggleApproveStore()"-->
        <br/><br/>
        <br/><br/>
    </div>
</template>

<script>
import Itemrequesttable from "@/components/Subastanauan/Dashboard/Superadmin/Inventory/Itemrequesttable.vue";
import Itemlisttable from "@/components/Subastanauan/Dashboard/Superadmin/Inventory/Itemlisttable.vue";
export default {
    name: "inventory-store-page",
    data(){
        return{

            //  #region ITEM REQUEST LIST
            requestlist:[], 
        //     "list": [
        //     {
        //         "itemid": "675385b6caae7fec561df06e",
        //         "itemname": "Brahman Male",
        //         "itemowner": "jene alba",
        //         "storename": "jene's Farm",
        //         "itemimage": "uploads/1733526966419.jpg"
        //     }
        // ]
            requestpagination: {
                page: 0,
                limit: 10,
                totalpage: 1
            },
            requestlistloading: false,
            requestitemsearch: "",
            debounceTimeoutRequest: null,
            //  #endregion

            //  #region ITEM LIST
            itemlist: [],
            //     "list": [
            //     {
            //         "itemid": "675385b6caae7fec561df06e",
            //         "itemname": "Brahman Male",
            //         "itemowner": "jene alba",
            //         "storename": "jene's Farm",
            //         "itemimage": "uploads/1733526966419.jpg"
            //     }
            // ]
            listpagination: {
                page: 0,
                limit: 10,
                totalpage: 1
            },
            listloading: false,
            itemsearch: "",
            debounceListTimeoutRequest: null,
            //  #endregion
        }
    },
    components: {
        Itemrequesttable,
        Itemlisttable
    },
    methods: {
        toggleApproveItem(itemid){
            if (this.requestlistloading){
                return
            }

            if (itemid){
                this.$swal({
                    title: "Are you sure you want to approve this item?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, approve it!"
                }).then((data) => {
                    if (data.isConfirmed){
                        this.ApproveDeniedStore("Approved", itemid)
                    }
                })
            }
        },
        toggleDeniedItem(itemid){
            if (this.requestlistloading){
                return
            }

            if (itemid){
                this.$swal({
                    title: "Are you sure you want to denied this item?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, denied it!"
                }).then((data) => {
                    if (data.isConfirmed){
                        this.ApproveDeniedStore("Denied", itemid)
                    }
                })
            }
        },
        toggleDeleteItem(){
            this.$swal({
                title: "Are you sure you want to delete this item?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then(() => {

            })
        },

        //  #region REQUEST LIST

        async GetRequestList(){
            this.requestloading = true

            const response = await fetch(`${process.env.VUE_APP_API_URL}/inventory/listrequestitems?status=Pending&itemname=${this.requestitemsearch}&page=${this.requestpagination.page}&limit=10`, {
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
        ViewItemImage(data){
            window.open(`${process.env.VUE_APP_API_URL}/${data}`, '_blank')
        },
        SearchInventoryRequest(){
            if (this.requestlistloading){
                return
            }

            clearTimeout(this.debounceTimeoutRequest);
            this.debounceTimeoutRequest = setTimeout(() => {
                this.requestpagination.page = 0
                this.GetRequestList();
            }, 500);
        },
        ClearSearchRequest(){
            if (this.requestlistloading){
                return
            }

            clearTimeout(this.debounceTimeoutRequest);
            this.requestpagination.page = 0
            this.requestitemsearch = ""

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
        async ApproveDeniedStore(isApproved, itemid){
            if (itemid == ""){
                return;
            }

            this.requestlistloading = true

            const response = await fetch(`${process.env.VUE_APP_API_URL}/inventory/approverequestitems`, {
                method: 'POST',
                headers: {
                "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    itemid: itemid,
                    approvestatus: isApproved
                })
            });

            const responseData = await response.json();

            if (response.status === 400) {
                //  API HERE
                this.$swal({
                title: responseData.data,
                icon: "error"
                })

                this.requestlistloading = false
                return;
            }
            else if (response.status == 401){
                this.$swal({
                title: "Authentication Failed! You will now be redirected to the login page",
                icon: "error"
                })

                this.$router.push({path: "/"})
            }

            this.requestlistloading = false

            this.$swal({
                title: `Item successfully ${isApproved}`,
                icon: "success",
                allowOutsideClick: false
            }).then(() => {
                this.GetRequestList()
                this.GetItemList()
            })
        },

        //  #endregion

        //  #region ITEM LIST

        async GetItemList(){
            this.listloading = true

            const response = await fetch(`${process.env.VUE_APP_API_URL}/inventory/listrequestitems?status=Approved&itemname=${this.itemsearch}&page=${this.listpagination.page}&limit=10`, {
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

                this.listloading = false
                return;
            }
            else if (response.status == 401){
                this.$swal({
                title: "Authentication Failed! You will now be redirected to the login page",
                icon: "error"
                })

                this.$router.push({path: "/"})
            }

            this.listpagination.totalpage = responseData.data.totalpages <= 0 ? 1 : responseData.data.totalpages
            
            if (this.listpagination.totalpage - 1 < this.listpagination.page){
                this.listpagination.page -= 1
                this.GetItemList();
                return;
            }
            
            this.itemlist = responseData.data.list

            this.listloading = false
        },
        SearchItemInventory(){
            if (this.listloading){
                return
            }

            clearTimeout(this.debounceListTimeoutRequest);
            this.debounceListTimeoutRequest = setTimeout(() => {
                this.listpagination.page = 0
                this.GetItemList();
            }, 500);
        },
        ClearSearchItem(){
            if (this.listloading){
                return
            }

            clearTimeout(this.debounceListTimeoutRequest);
            this.listpagination.page = 0
            this.itemsearch = ""

            this.GetItemList()
        },
        NextPageItem(){
            this.listpagination.page++
            this.GetItemList()
        },
        PreviousePageItem(){
            this.listpagination.page--;
            this.GetItemList()
        },

        //  #endregion
    },
    mounted(){
        this.GetRequestList()
        this.GetItemList()
    }
}
</script>