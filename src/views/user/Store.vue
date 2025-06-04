<template>
    <div>
        <a
        class="text-black text-xl uppercase lg:inline-block font-semibold pt-12"
        href="javascript:void(0)"
        >
            Store
        </a>
        <hr class="my-4 md:min-w-full" />
        <br/>
        <div v-if="storestatusloading">
            <center>
                <i  class="fas fa-solid fa-spinner" style="animation:spin 4s linear infinite; font-size: 3rem;"></i>
            </center>
        </div>
        <div v-else>
            <center v-if="idstatus == '' || idstatus == 'Pending'">
                <p style="font-weight: bold; font-size: 2rem">To Unlock the store, <br/>You need to wait for your ID verification.</p>
            </center>
            <center v-else-if="status == 'none'">
                <p style="font-weight: bold; font-size: 2rem">To Unlock the store, <br/>You need to apply your current store.</p>
                <br/><br/>
                <button
                class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-4 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                @click="toggleStoreApplicationForm()"
                >
                    Apply Your Store Now!
                </button>
            </center>
            <center v-else-if="status == 'Pending'">
                <p style="font-weight: bold; font-size: 2rem">Your store is currently under <br/>approval phase. Please wait for your store<br/>to be approved!</p>
            </center>
            <div v-else-if="status == 'Approved'">
                <!--STORE DETAILS-->
                <div style="margin: 10px; background-color: gainsboro; border-radius: 2px;">
                    <p style="font-size: 2rem; text-transform: uppercase; margin: 10px;">{{ detailsdata[0].storename }}</p>
                    <br/>
                    <div class="container px-6">
                        <div class="flex flex-wrap">
                            <div class="w-full px-6 flex-1">
                                <p style="font-size: 1.2rem;">Address:</p>
                                <p style="font-size: 1.2rem;">{{ detailsdata[0].storeaddress }}</p>
                            </div>
                            <div class="w-full px-6 flex-1">
                                <p style="font-size: 1.2rem;">Contact Number:</p>
                                <p style="font-size: 1.2rem;">{{ detailsdata[0].storecontactnumber }}</p>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div class="container px-6 ">
                        <div class="flex flex-wrap">
                            <div class="w-full px-6 flex-1">
                                <p style="font-size: 1.2rem;">Owner:</p>
                                <p style="font-size: 1.2rem;">{{ detailsdata[0].ownername }}</p>
                            </div>
                            <div class="w-full px-6 flex-1">
                                <p style="font-size: 1.2rem;">Email:</p>
                                <p style="font-size: 1.2rem;">{{ detailsdata[0].owneremail }}</p>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div class="container px-6">
                        <div class="flex flex-wrap">
                            <div class="w-full px-6 flex-1">
                                <p style="font-size: 1.2rem;">Verified Email: {{ detailsdata[0].verifiedemail ? 'Verified' : 'Not verified' }}</p>
                            </div>
                            <div class="w-full px-6 flex-1">
                                <p style="font-size: 1.2rem;">Verified ID: {{ detailsdata[0].verifiedbyid }}</p>
                            </div>
                        </div>
                    </div>
                    <br/>
                </div>
                <br>
                <!--NAVIGATION STORE-->
                <div style="display: flex; gap: 10%;">
                    <p style="font-size: 1.3rem; cursor: pointer;" :class="storenavigation == 'Inventory' ? 'selected-navigation' : ''" @click="() => storenavigation = 'Inventory'">Inventory</p>
                    <p style="font-size: 1.3rem; cursor: pointer;" :class="storenavigation == 'Map' ? 'selected-navigation' : ''" @click="() => storenavigation = 'Map'">Map</p>
                    <p style="font-size: 1.3rem; cursor: pointer;" :class="storenavigation == 'Transactions' ? 'selected-navigation' : ''" @click="() => storenavigation = 'Transactions'">Transactions</p>
                </div>
                <hr class="my-4 md:min-w-full" />
                <br/>
                <div v-if="storenavigation == 'Inventory'">
                    <!--REQUEST LIST-->
                    <!--SEARCH ITEM-->
                    <div>
                        <div class="mb-3 pt-0" style="display: flex; gap: 10px;">
                            <input type="text" placeholder="Search Item Name" class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline" @input="searchStoreRequestList" v-model="requestlistsearch">
                            
                            <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" 
                            @click="searchStoreRequestList()" :disabled="requestlistloading">
                            Clear Search
                            </button>
                        </div>
                    </div>
                    <br/>
                    <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="toggleCreateItem()">
                        Create Item
                    </button>
                    <br/><br/><br/>
                    <!--PAGINATION-->
                    <div style="display: flex; gap: 10px; justify-content: center; align-items: center;">
                        <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" :disabled="requestlistloading || requestlistpagination.page <= 0" @click="nextPageRequestList()">
                            <i class="fas fa-chevron-left"></i>
                        </button>

                        <p style="font-size: 1.4rem; font-weight: bold;">{{ requestlistpagination.page + 1 }} / {{ requestlistpagination.totalpage }}</p>

                        <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" :disabled="requestlistloading || requestlistpagination.page >= requestlistpagination.totalpage - 1" @click="previousePageRequestList()">
                            <i class="fas fa-chevron-right"></i>
                        </button>
                    </div>
                    <br/><br/>
                    <center v-if="requestlistloading">
                        <i class="fas fa-solid fa-spinner" style="animation:spin 4s linear infinite; font-size: 2rem;"></i>
                    </center>
                    <!--TABLE-->
                    <InventoryTable v-else :storeitems="requestlist"/>
                    <br/>
                    <hr class="my-4 md:min-w-full" />
                    <br/>
                    <!--APPROVED LIST-->
                    <!--SEARCH ITEM-->
                    <div>
                        <div class="mb-3 pt-0" style="display: flex; gap: 10px;">
                            <input type="text" placeholder="Search Item Name" class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline" @input="searchStoreItemList" v-model="itemlistsearch">
                            
                            <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" 
                            @click="searchStoreItemList()" :disabled="itemlistloading">
                            Clear Search
                            </button>
                        </div>
                    </div>
                    <br/>
                    <!--PAGINATION-->
                    <div style="display: flex; gap: 10px; justify-content: center; align-items: center;">
                        <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" :disabled="itemlistloading || itemlistpagination.page <= 0" @click="nextPageItemList()">
                            <i class="fas fa-chevron-left"></i>
                        </button>

                        <p style="font-size: 1.4rem; font-weight: bold;">{{ itemlistpagination.page + 1 }} / {{ itemlistpagination.totalpage }}</p>

                        <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" :disabled="itemlistloading || itemlistpagination.page >= itemlistpagination.totalpage - 1" @click="previousePageItemList()">
                            <i class="fas fa-chevron-right"></i>
                        </button>
                    </div>
                    <center v-if="itemlistloading">
                        <br/><br/>
                        <i class="fas fa-solid fa-spinner" style="animation:spin 4s linear infinite; font-size: 2rem;"></i>
                    </center>
                    <!--TABLE-->
                    <InventoryItemTable v-else :storeitems="itemlist" @item-edit="toggleEditItem" @live-bidding="AddToLiveBidding"/>
                </div>
                <div v-else-if="storenavigation == 'Map'">
                    <GMapMap
                        :center="{ lat: Number(detailsdata[0].lat), lng: Number(detailsdata[0].lang) }"
                        :zoom="15" 
                        map-type-id="terrain" 
                        style="width: 100%; height: 30rem"
                        :options="{
                            zoomControl: true,
                            mapTypeControl: true,
                            scaleControl: true,
                            streetViewControl: true,
                            rotateControl: true,
                            fullscreenControl: true
                        }"
                    >
                        <GMapMarker
                            :position="storeposition"
                        />
                    </GMapMap>
                </div>
                <br/>
            </div>
        </div>

        <!--#region APPLY STORE-->
        <div>
            <vue-final-modal v-model="openStoreApplication" classes="modal-container"  :clickToClose="false" :escToClose="false" content-class="modal-content">
                <button class="modal__close" @click="toggleStoreApplicationForm()">
                <mdi-close></mdi-close>
                </button>
                <span class="modal__title">Store Application Form</span>
                <br/>
                <div class="modal__content">
                <p>Store Name:</p>
                <input type="text" placeholder="Enter store name" class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full" v-model="application.storename"/>
                <br/>
                
                <p class="mt-3">Store Address:</p>
                <div class="relative flex w-full flex-wrap items-stretch mb-3">
                    <input type="text" placeholder="Search Store Address or Use the pin on the right for auto address search" class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pr-10"  v-model="application.address" id="autocomplete"/>
                    <span class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-2 py-1" @click="locatorButtonPressed">
                        <i class="fas fa-location-pin" style="color: red; cursor: pointer;"></i>
                    </span>
                </div>
                <p>Contact Number:</p>
                <input type="number" placeholder="Enter store contact number" class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full" v-model="application.contactnumber"/>
                <br/><br/>
                </div>
                <div class="modal__action">
                <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="toggleStoreApplicationForm()" :disabled="storeapplicationloading">
                    <center v-if="storeapplicationloading">
                    <i class="fas fa-solid fa-spinner" style="animation:spin 4s linear infinite;"></i>
                    </center>
                    <p v-else>Cancel</p>
                </button>
                <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="storeApplication()" :disabled="storeapplicationloading">
                    <center v-if="storeapplicationloading">
                    <i class="fas fa-solid fa-spinner" style="animation:spin 4s linear infinite;"></i>
                    </center>
                    <p v-else>Apply Now</p>
                </button>
                </div>
            </vue-final-modal>
        </div>

        <!--#region CREATE STORE-->
        <div>
            <vue-final-modal v-model="opencreatemodal" classes="modal-container" :clickToClose="false" :escToClose="false" content-class="modal-content absolute inset-0 h-full overflow-auto">
                <span class="modal__title">Create Item</span>
                <br/>
                <div class="modal__content">
                    <p>Item Name:</p>
                    <input type="text" placeholder="Enter item name" class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full" v-model="itemcreate.itemname"/>
                    <br/><br/>
                    
                    <div class="relative w-full mb-3">
                        <label
                            class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                        >
                        Item Type:
                        </label>
                        <select
                            type="text"
                            class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            v-model="itemcreate.itemtype"
                        >
                            <option value="">Please select item type</option>
                            <option value="Cattle">Cattle</option>
                            <option value="Hogs">Hogs</option>
                            <option value="Swine">Swine</option>
                            <option value="Carabao">Carabao</option>
                            <option value="Goat">Goat</option>
                        </select>
                    </div>
                    <br/>
                    <p>Item Price:</p>
                    <input type="number" placeholder="Enter item price" class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full" v-model="itemcreate.itemprice"/>
                    <br/><br/>
                    <p>Item Qty:</p>
                    <input type="number" placeholder="Enter item quantity" class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full" v-model="itemcreate.itemqty"/>
                    <br/><br/>
                    <p>Item Description:</p>
                    <textarea type="text" row="10" placeholder="Enter item description" class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full" v-model="itemcreate.itemdescription"/>
                    <br/><br/>
                    <div class="relative w-full mb-3">
                        <label
                            class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                        >
                            Item Image:
                        </label>
                        <img :src="itemcreate.previewImage" class="uploading-image" />
                        <input type="file" accept="image/jpeg" @change=uploadImage>
                    </div>
                </div>
                <div class="modal__action">
                    <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="toggleCreateItem()" :disabled="createitemloading">
                        <center v-if="createitemloading">
                        <i class="fas fa-solid fa-spinner" style="animation:spin 4s linear infinite;"></i>
                        </center>
                        <p v-else>Cancel</p>
                    </button>
                    <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="createItem()" :disabled="createitemloading">
                        <center v-if="createitemloading">
                        <i class="fas fa-solid fa-spinner" style="animation:spin 4s linear infinite;"></i>
                        </center>
                        <p v-else>Create Item</p>
                    </button>
                </div>
            </vue-final-modal>
        </div>

         <!--#region EDIT ITEM STORE-->
        <div>
            <vue-final-modal v-model="edititemmodal" classes="modal-container" :clickToClose="false" :escToClose="false" content-class="modal-content absolute inset-0 h-full overflow-auto">
                <span class="modal__title">Edit Item</span>
                <br/>
                <div class="modal__content">
                    <p>Item Name:</p>
                    <input type="text" placeholder="Enter item name" class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full" v-model="edititemlist.itemname"/>
                    <br/><br/>
                    
                    <div class="relative w-full mb-3">
                        <label
                            class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                        >
                        Item Type:
                        </label>
                        <select
                            type="text"
                            class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            v-model="edititemlist.itemtype"
                        >
                            <option value="">Please select item type</option>
                            <option value="Cattle">Cattle</option>
                            <option value="Hogs">Hogs</option>
                            <option value="Swine">Swine</option>
                            <option value="Carabao">Carabao</option>
                            <option value="Goat">Goat</option>
                        </select>
                    </div>
                    <br/>
                    <p>Item Price:</p>
                    <input type="number" placeholder="Enter item price" class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full" v-model="edititemlist.itemprice"/>
                    <br/><br/>
                    <p>Item Qty:</p>
                    <input type="number" placeholder="Enter item quantity" class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full" v-model="edititemlist.itemqty"/>
                    <br/><br/>
                    <p>Item Description:</p>
                    <textarea type="text" row="10" placeholder="Enter item description" class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full" v-model="edititemlist.itemdescription"/>
                    <br/><br/>
                    <div class="relative w-full mb-3">
                        <label
                            class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                        >
                            Item Image:
                        </label>
                        <img :src="edititemlist.previewImage == null ? GetImage(edititemlist.image) : edititemlist.previewImage" class="uploading-image" />
                        <input type="file" accept="image/jpeg" @change=uploadEditImage>
                    </div>
                </div>
                <div class="modal__action">
                    <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="toggleEditItem()" :disabled="edititemloading">
                        <center v-if="edititemloading">
                        <i class="fas fa-solid fa-spinner" style="animation:spin 4s linear infinite;"></i>
                        </center>
                        <p v-else>Cancel</p>
                    </button>
                    <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="editItem()" :disabled="edititemloading">
                        <center v-if="edititemloading">
                        <i class="fas fa-solid fa-spinner" style="animation:spin 4s linear infinite;"></i>
                        </center>
                        <p v-else>Edit Item</p>
                    </button>
                </div>
            </vue-final-modal>
        </div>
    </div>
</template>

<script>
import { socket } from '@/socket'

import InventoryTable from "@/components/Subastanauan/Dashboard/User/Inventorytable.vue";
import InventoryItemTable from "@/components/Subastanauan/Dashboard/User/Inventoryapprovetable.vue";

export default{
    name: "user-store",
    data() {
        return{
            //  #region STORE APPLICATION
            openStoreApplication: false,
            storestatusloading: false,
            storeapplicationloading: false,
            application: {
                storename: "",
                address: "",
                contactnumber: "",
                lang: "",
                lat: ""
            },
            idstatus: "",
            status: "none",
            //  #endregion
            
            //  #region STORE DETAILS
            storeid: "",
            detailsdata: [
                {
                    _id: "",
                    storename: "",
                    storeaddress: "",
                    storecontactnumber: "",
                    ownername: "",
                    owneremail: "",
                    verifiedemail: false,
                    verifiedbyid: "",
                    lang: "",
                    lat: ""
                }
            ],
            storeposition: {
                lat: "",
                lng: ""
            },
            //  #endregion
            
            //  #region CREATE ITEM

            createitemloading: false,
            opencreatemodal: false,
            itemcreate: {
                storeid: "",
                itemname: "",
                itemqty: 0,
                itemprice: 0,
                itemtype: "",
                itemdescription: "",
                previewImage: null,
                file: null
            },

            //  #endregion

            //  #region REQUEST LIST

            requestlistloading: false,
            requestlistsearch: "",
            requestlistpagination: {
                page: 0,
                limit: 10,
                totalpage: 1
            },
            requestlist: [], /**
                {
                    _id: "",
                    storeowner: "",
                    itemname: "",
                    itemqty: 0,
                    itemprice: 0,
                    itemtype: "",
                    itemdescription: "",
                    image: "",
                    status: ""
                }
             */

            //  #endregion

            //  #region ITEM LIST

            itemlistloading: false,
            itemlistsearch: "",
            itemlistpagination: {
                page: 0,
                limit: 10,
                totalpage: 1
            },
            itemlist: [], /**
                {
                    _id: "",
                    storeowner: "",
                    itemname: "",
                    itemqty: 0,
                    itemprice: 0,
                    itemtype: "",
                    itemdescription: "",
                    image: "",
                    status: ""
                }
             */

            //  #endregion

            //  #region EDIT ITEMS
            edititemmodal: false,
            edititemloading: false,
            edititemlist: {
                    _id: "",
                    storeowner: "",
                    itemname: "",
                    itemqty: 0,
                    itemprice: 0,
                    itemtype: "",
                    itemdescription: "",
                    image: "",
                    previewImage: null,
                    file: null
                }, /**
                {
                    _id: "",
                    storeowner: "",
                    itemname: "",
                    itemqty: 0,
                    itemprice: 0,
                    itemtype: "",
                    itemdescription: "",
                    image: "",
                    status: ""
                }
             */
            //  #endregion

            storenavigation: "Inventory"
        }
    },
    components: {
        InventoryTable,
        InventoryItemTable
    },
    methods: {
        GetImage(data){
            return new URL(`${process.env.VUE_APP_API_URL}/${data}`, import.meta.url).href
        },
        //  #region APPLICATION
        toggleStoreApplicationForm(){
            if (this.storeapplicationloading) return

            this.openStoreApplication = !this.openStoreApplication
        },
        async checkStoreStatus(){
            this.storestatusloading = true
            const response = await fetch(`${process.env.VUE_APP_API_URL}/store/getstorestatus`, {
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

                this.storestatusloading = false
                return;
            }
            else if (response.status == 401){
                this.$swal({
                title: "Authentication Failed! You will now be redirected to the login page",
                icon: "error"
                })

                this.$router.push({path: "/"})
            }

            this.idstatus = responseData.data.idstatus
            this.status = responseData.data.status
            this.storeid = responseData.data.storeid

            if (this.idstatus == "Approved" && this.status == "Approved"){
                socket.connect();
                this.getStoreDetails()
            }

            this.storestatusloading = false
        },
        async storeApplication(){
            this.storeapplicationloading = true

            const response = await fetch(`${process.env.VUE_APP_API_URL}/store/applystore`, {
                method: 'POST',
                headers: {
                "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(this.application)
            });

            const responseData = await response.json();

            if (response.status === 400) {
                //  API HERE
                this.$swal({
                title: responseData.data,
                icon: "error"
                })

                this.storeapplicationloading = false
                return;
            }
            else if (response.status == 401){
                this.$swal({
                title: "Authentication Failed! You will now be redirected to the login page",
                icon: "error"
                })

                this.$router.push({path: "/"})
            }

            this.$swal({
                title: `Congratulations! You have applied your store!`,
                icon: "success",
            })
            .then(data => {
                if (data.isConfirmed){
                    this.storeapplicationloading = false
                    this.toggleStoreApplicationForm()
                    this.checkStoreStatus()
                }
            })
        },
        locatorButtonPressed() {
            navigator.geolocation.getCurrentPosition(
                position => {
                    this.getAddressFrom(position.coords.latitude, position.coords.longitude)
                },
                error => {
                    this.$swal({
                        title: error.message,
                        icon: "error"
                    })
                },
            )
        },
        async getAddressFrom(lat, long){
            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyCDuoNto3I8FpZ1b1wwA0CiZsGjxAEirR8`, {
                method: 'GET'
            });

            const responseData = await response.json();

            if (response.status === 400) {
                //  API HERE
                this.$swal({
                title: responseData.data.error_message,
                icon: "error"
                })
                return;
            }
            else if (response.status == 401){
                this.$swal({
                title: "Authentication Failed! You will now be redirected to the login page",
                icon: "error"
                })

                this.$router.push({path: "/"})
            }

            this.application.address = responseData.results[0].formatted_address
            this.application.lat = lat
            this.application.lang = long
        },
        //  #endregion

        //  #region STORE DETAILS

        async getStoreDetails(){
            this.detailsLoading = true

            const response = await fetch(`${process.env.VUE_APP_API_URL}/store/getownedstoredetails?storeid=${this.storeid}`, {
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

                this.detailsLoading = false
                return;
            }
            else if (response.status == 401){
                this.$swal({
                title: "Authentication Failed! You will now be redirected to the login page",
                icon: "error"
                })

                this.$router.push({path: "/"})
            }

            this.detailsdata = responseData.data
            this.storeposition.lat = Number(this.detailsdata[0].lat)
            this.storeposition.lng = Number(this.detailsdata[0].lang)
            this.detailsLoading = false
            
            this.getrequestlist()
            this.getitemlist()
        },

        //  #endregion
    
        //  #region CREATE ITEM

        async createItem(){
            this.createitemloading = true

            const formData = new FormData()

            formData.append("storeid", this.detailsdata[0]._id)
            formData.append("itemname", this.itemcreate.itemname)
            formData.append("itemqty", this.itemcreate.itemqty)
            formData.append("itemprice", this.itemcreate.itemprice)
            formData.append("itemtype", this.itemcreate.itemtype)
            formData.append("itemdescription", this.itemcreate.itemdescription)

            if (this.itemcreate.file) {
                formData.append("file", this.itemcreate.file);
            }

            const response = await fetch(`${process.env.VUE_APP_API_URL}/inventory/createitem`, {
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
                this.createitemloading = false
                return;
            }
            else if (response.status == 401){
                this.$swal({
                title: "Authentication Failed! You will now be redirected to the login page",
                icon: "error"
                })

                this.$router.push({path: "/"})
            }

            this.$swal({
                title: "Item created successfully",
                icon: "success"
            })
            .then((action) => {
                if (action.isConfirmed){
                    this.createitemloading = false
                    this.toggleCreateItem()
                }
            })
        },
        uploadImage(e) {
            const image = e.target.files[0];
            if (image) {
                    this.itemcreate.file = image; // Store the file object directly
                    const reader = new FileReader();
                    reader.readAsDataURL(image);
                    reader.onload = e => {
                    this.itemcreate.previewImage = e.target.result; // Base64 string for preview
                };
            }
        },
        toggleCreateItem(){
            if (this.createitemloading){
                return
            }

            this.itemcreate = {
                storeid: "",
                itemname: "",
                itemqty: 0,
                itemprice: 0,
                itemtype: "",
                itemdescription: "",
                previewImage: null,
                file: null
            }

            this.opencreatemodal = !this.opencreatemodal
        },

        //  #endregion
    
        //  #region REQUEST LIST

        async getrequestlist(){
            this.requestlistloading = true

            const response = await fetch(`${process.env.VUE_APP_API_URL}/inventory/inventorylist?storeid=${this.detailsdata[0]._id}&statusfilter=Pending&itemnamefilter=${this.requestlistsearch}&page=${this.requestlistpagination.page}&limit=10`, {
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

            this.requestlist = responseData.data.list
            this.requestlistpagination.totalpage = responseData.data.totalpages <= 0 ? 1 : responseData.data.totalpages

            if (this.requestlistpagination.totalpage - 1 < this.requestlistpagination.page){
                this.requestlistpagination.page -= 1
                this.getrequestlist();
                return;
            }

            this.requestlistloading = false
        },
        searchStoreRequestList(){
            if (this.requestlistloading){
                return
            }

            clearTimeout(this.debounceTimeoutList);
            this.debounceTimeoutList = setTimeout(() => {
                this.requestlistpagination.page = 0
                this.getrequestlist();
            }, 500);
        },
        clearSearchRequestList(){
            if (this.requestlistloading){
                return
            }
            this.requestlistpagination.page = 0
            this.requestlistsearch = ""

            this.getrequestlist()
        },
        nextPageRequestList(){
            this.requestlistpagination.page++
            this.getrequestlist()
        },
        previousePageRequestList(){
            this.requestlistpagination.page--;
            this.getrequestlist()
        },

        //  #endregion
        
        //  #region ITEM LIST

        async getitemlist(){
            this.itemlistloading = true

            const response = await fetch(`${process.env.VUE_APP_API_URL}/inventory/inventorylist?storeid=${this.detailsdata[0]._id}&statusfilter=Approved&itemnamefilter=${this.itemlistsearch}&page=${this.itemlistpagination.page}&limit=10`, {
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
        },
        searchStoreItemList(){
            if (this.itemlistloading){
                return
            }

            clearTimeout(this.debounceTimeoutList);
            this.debounceTimeoutList = setTimeout(() => {
                this.itemlistpagination.page = 0
                this.getitemlist();
            }, 500);
        },
        clearSearchItemList(){
            if (this.itemlistloading){
                return
            }
            this.itemlistpagination.page = 0
            this.itemlistsearch = ""

            this.getitemlist()
        },
        nextPageItemList(){
            this.requestlistpagination.page++
            this.getrequestlist()
        },
        previousePageItemList(){
            this.itemlistpagination.page--;
            this.getitemlist()
        },

        //  #endregion
        
        //  #region EDIT ITEM LIST

        toggleEditItem(itemid){
            if (this.edititemloading){
                return
            }

            if (itemid){
                this.edititemid = itemid
                this.getitemdata(itemid)
            }
            else{
                this.edititemlist = {
                    _id: "",
                    storeowner: "",
                    itemname: "",
                    itemqty: 0,
                    itemprice: 0,
                    itemtype: "",
                    itemdescription: "",
                    image: "",
                    previewImage: null,
                    file: null
                }
            }

            this.edititemmodal = !this.edititemmodal
        },
        async getitemdata (itemid){
            this.edititemloading = true

            const response = await fetch(`${process.env.VUE_APP_API_URL}/inventory/getinventoryitemdata?itemid=${itemid}`, {
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

                this.edititemloading = false
                return;
            }
            else if (response.status == 401){
                this.$swal({
                title: "Authentication Failed! You will now be redirected to the login page",
                icon: "error"
                })

                this.$router.push({path: "/"})
            }

            this.edititemlist = responseData.data.edititemlist
            this.edititemloading = false
        },
        uploadEditImage(e) {
            const image = e.target.files[0];
            if (image) {
                    this.edititemlist.file = image; // Store the file object directly
                    const reader = new FileReader();
                    reader.readAsDataURL(image);
                    reader.onload = e => {
                    this.edititemlist.previewImage = e.target.result; // Base64 string for preview
                };
            }
        },
        async editItem(){
            this.edititemloading = true

            const formData = new FormData()

            formData.append("itemid", this.edititemlist._id)
            formData.append("itemname", this.edititemlist.itemname)
            formData.append("itemqty", this.edititemlist.itemqty)
            formData.append("itemprice", this.edititemlist.itemprice)
            formData.append("itemtype", this.edititemlist.itemtype)
            formData.append("itemdescription", this.edititemlist.itemdescription)
            formData.append("image", this.edititemlist.image)

            if (this.edititemlist.file) {
                formData.append("file", this.edititemlist.file);
            }

            const response = await fetch(`${process.env.VUE_APP_API_URL}/inventory/edititem`, {
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
                this.edititemloading = false
                return;
            }
            else if (response.status == 401){
                this.$swal({
                title: "Authentication Failed! You will now be redirected to the login page",
                icon: "error"
                })

                this.$router.push({path: "/"})
            }

            this.$swal({
                title: "Item edited successfully",
                icon: "success"
            })
            .then((action) => {
                if (action.isConfirmed){
                    this.edititemloading = false
                    this.toggleEditItem()
                    this.getitemlist()
                }
            })
        },

        //  #endregion

        //  #region ADD TO LIVE BIDDING

        AddToLiveBidding(data) {
            if (!data){
                this.$swal({
                    title: "Please select a valid item",
                    icon: "error"
                })
                return;
            }

            this.$swal({
                title: "Are you sure you want to add this to the live bidding?",
                icon: "warning",
                allowOutsideClick: false,
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Add it!"
            })
            .then(async value => {
                if (value.isConfirmed){
                    this.itemlistloading = true;

                    const response = await fetch(`${process.env.VUE_APP_API_URL}/livebidding/additemtolivebidding`, {
                        method: 'POST',
                        headers: {
                        "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            "itemid": data
                        }),
                        credentials: "include"
                    });

                    const responseData = await response.json();

                    if (response.status === 400) {
                        //  API HERE
                        this.$swal({
                            title: responseData.data,
                            icon: "error"
                        })

                        this.itemlistloading = false;
                        return;
                    }
                    else if (response.status == 401){
                        this.$swal({
                        title: "Authentication Failed! You will now be redirected to the login page",
                        icon: "error"
                        })

                        this.$router.push({path: "/"})
                    }

                    this.$swal({
                        title: "Successfully added to live bidding",
                        icon: "success"
                    })

                    socket.emit("add-to-live-bid")

                    this.getitemlist();
                }
            })
        }

        //  #endregion
    },
    mounted(){
        this.checkStoreStatus()
        let autocomplete = new window.google.maps.places.Autocomplete(
            document.getElementById("autocomplete")
        )

        autocomplete.addListener("place_changed", () => {
            let place = autocomplete.getPlace();

            this.application.lat = place.geometry.location.lat()
            this.application.lang = place.geometry.location.lng()
        })
    }
}
</script>

<style scoped>
::v-deep .modal-content {
  width: 50%;
}

.pac-icon{
    display: none
}

.pac-item{
    padding: 10px;
    font-size: 16px;
    cursor: pointer
}

.pac-item:hover{
    background-color: #ececec;
}

.pac-item-query{
    font-size: 16px;
}

.selected-navigation{
    color: rgb(33, 145, 33);
}
</style>