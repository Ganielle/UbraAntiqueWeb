<template>
    <div>
        <a
        class="text-black text-xl uppercase lg:inline-block font-semibold pt-12"
        href="javascript:void(0)"
        >
            Marketplace
        </a>
        <hr class="my-4 md:min-w-full" />
        <br/><br/>
        <p style="font-weight: bold; font-size: 1.2rem;">Filters:</p>
        <br/>
        <div style="display: flex; gap: 10px;">
            <select
                  type="text"
                  class="border-1 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
                  v-model="criterias.pricerange"
            >
                  <option value="">Please select your price range</option>
                  <option value="1">₱5,000 - ₱10,000</option>
                  <option value="2">₱15,000 - ₱30,000</option>
                  <option value="3">₱50,000 - ₱100,000</option>
            </select>
            <!---->
            <select
                type="text"
                class="border-1 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
                v-model="criterias.livestock"
            >
                <option value="">Please select your preferred livestock</option>
                <option value="1">Cattle</option>
                <option value="2">Hogs</option>
                <option value="3">Swine</option>
                <option value="4">Carabao</option>
                <option value="5">Goat</option>
            </select>

            <!--@click="GoBack()"-->
            <button
              class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              @click="GetItemList()"
            >
              Apply Filters
            </button>

            <button
              class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              @click="GetCriterias()"
            >
              Reset Filters
            </button>
        </div>
        
        <br/><br/>
        <p style="font-weight: bold; font-size: 1.3rem;">MARKETPLACE ITEMS</p>
        <br/>
        <div style="display: flex; gap: 10px; justify-content: center; align-items: center;">
            <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                <i class="fas fa-chevron-left"></i>
            </button>

            <p style="font-size: 1.4rem; font-weight: bold;">1 / 1</p>

            <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                <i class="fas fa-chevron-right"></i>
            </button>
        </div>
        <br/><br/>
        
        <center v-if="itemlist.length <= 0">
            <p style="font-weight: bold; font-size: 1.5rem;">No Items Yet!</p>
        </center>
        <div v-else class="px-4 mx-auto">
            <div class="flex flex-wrap">
                <div v-for="(item, index) in itemlist" :key="item._id" class="w-1/4 px-4 flex-1" style="padding-bottom: 50px;">
                    
                    <div v-if="(index + 1) % 4 === 0" class="w-full"></div>
                    <CardItem v-else :image="item.image" :title="item.itemname" :stock="item.itemqty > 0 ? 'Available' : 'Out of Stock'" :description="item.itemdescription" />
                </div>
            </div>
        </div>

        <!---->
    </div>
</template>

<script>

import CardItem from '@/components/Cards/CardStoreItem.vue'

export default{
    name: 'user-marketplace',
    data(){
        return{

            //  #region CRITERIAS

            criterias: {
                pricerange: "",
                livestock: ""
            },
            loadingcriteria: false,

            //  #endregion

            //  #region GET ITEMS

            itemlistpagination: {
                page: 0,
                totalpage: 1,
                limit: 10
            },
            itemlistloading: false,
            itemlist: [] 
            /**
                {
                    "_id": "6737a16a2c0cae1ef384535d",
                    "itemname": "Yukie Boi",
                    "itemqty": 21,
                    "itemprice": 3000,
                    "itemtype": "Goat",
                    "itemdescription": "Best boi ever forever",
                    "image": "uploads\\1731956505351.jpg",
                    "status": "Approved",
                    "store": {
                        "name": "MomCy's Cakes and Pastries",
                        "address": "84 Mayon Street Libis Binangonan Ri",
                        "contactnumber": "09672852303",
                        "status": "Approved"
                    },
                    "owner": {
                        "name": "Gabrielle Daniel",
                        "verifiedid": "Approved",
                        "emailverified": true
                    }
                }
            */

            //  #endregion
        }
    },
    components: {
        CardItem
    },
    methods: {

        //  #region CRITERIAS

        async GetCriterias(){
            this.loadingcriteria = true
            const response = await fetch(`${process.env.VUE_APP_API_URL}/criteria/getcriteria`, {
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

                this.loadingcriteria = false
                return;
            }
            else if (response.status == 401){
                this.$swal({
                title: "Authentication Failed! You will now be redirected to the login page",
                icon: "error"
                })

                this.$router.push({path: "/"})
            }

            this.criterias = responseData.data.criterias
            this.loadingcriteria = false

            this.GetItemList()
        },

        //  #endregion

        //  #region GET ITEMS

        async GetItemList(){
            this.itemlistloading = true

            const response = await fetch(`${process.env.VUE_APP_API_URL}/inventory/getmarketplaceitem?price=${this.criterias.pricerange}&livestock=${this.criterias.livestock}&page=${this.itemlistpagination.page}&limit=10`, {
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

                this.itemlistloading = false
                return;
            }
            else if (response.status == 401){
                this.$swal({
                title: "Authentication Failed! You will now be redirected to the login page",
                icon: "error"
                })

                this.$router.push({path: "/"})
            }

            this.itemlist = responseData.data.list
            this.itemlistpagination.totalpage = responseData.data.totalpages <= 0 ? 1 : responseData.data.totalpages

            if (this.itemlistpagination.totalpage - 1 < this.itemlistpagination.page){
                this.itemlistpagination.page -= 1
                this.getitemlist();
                return;
            }

            this.itemlistloading = false
        }

        //  #endregion
    },
    mounted(){
        this.GetCriterias()
    }
}
</script>