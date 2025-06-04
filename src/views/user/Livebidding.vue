<template>
    <div>
        <a
        class="text-black text-xl uppercase lg:inline-block font-semibold pt-12"
        href="javascript:void(0)"
        >
            Live Bidding
        </a>
        <hr class="my-4 md:min-w-full" />
        <br/>

        <div class="container px-6" >
            <div class="flex flex-wrap">
                <div class="w-full px-6 flex-1">
                    <!--#region ITEM PICTURE-->
                    <div style="width: 100%; background-color: gainsboro;">
                        <div style="padding: 10px;">
                            <center v-if="itemdata == null">No Picture Yet!</center>
                            <center v-else>
                                <img 
                                    style=""
                                    :src="GetImage(itemdata.inventoryitem.image)"
                                    :alt="title"
                                />
                            </center>
                        </div>
                    </div>
                    <br/>
                    <!--#region ITEM DESCRIPTION-->
                    <div style="width: 100%; background-color: gainsboro; padding: 10px;">
                        <div style="display: inline-block;">
                            <span style="font-style: italic; font-size: 1.2rem;">ITEM NAME: </span>
                            <span v-if="itemdata != null">{{ itemdata.inventoryitem.itemname }}</span>
                            <span v-else>N/A</span>
                        </div>
                        <br/>
                        <div style="display: inline-block;">
                            <span style="font-style: italic; font-size: 1.2rem;">ITEM SRP: </span>
                            <span v-if="itemdata != null">{{ itemdata.inventoryitem.itemprice }}</span>
                            <span v-else>N/A</span>
                        </div>
                        <br/>
                        <div style="display: inline-block;">
                            <span style="font-style: italic; font-size: 1.2rem;">BREED: </span>
                            <span v-if="itemdata != null">{{ itemdata.inventoryitem.itemtype }}</span>
                            <span v-else>N/A</span>
                        </div>
                        <br/> <br/>
                        <p style="font-style: italic; font-size: 1.2rem;">Description:</p>
                        <div style="height: 200px; overflow-y: auto;">
                            <center v-if="itemdata == null">
                                No Description Yet!
                            </center>
                            <p v-else>{{ itemdata.inventoryitem.itemdescription }}</p>
                        </div>
                    </div>
                    <br/>
                    <!--#region BID STATUS-->
                    <div style="background-color: gainsboro; padding: 10px; display: grid; place-items: center;">
                        <p style="font-size: 1.3rem; text-align: center;">{{ biddingstatus }}</p>
                        <p style="font-size: 1.5rem;">{{ formatTime(timer) }}</p>
                    </div>
                    <br/>
                    <!--#region HIGHEST BIDDER-->
                    <div style="background-color: gainsboro; padding: 10px; display: grid; place-items: center;">
                        <p style="font-size: 1.3rem; text-align: center;">HIGHEST BIDDER:</p>
                        <p style="font-size: 1.5rem;">NONE</p>
                    </div>
                    <br/>
                    <!--#region WALLETS-->
                    <div class="">
                    <div class="flex flex-wrap">
                        <div class="w-full px-4 flex-1">
                            <span class="text-sm block my-4 p-3 text-blueGray-700 rounded border border-solid border-blueGray-100">Current Credit Wallet: 10,000</span>
                        </div>
                        <div class="w-full px-4 flex-1">
                            <span class="text-sm block my-4 p-3 text-blueGray-700 rounded border border-solid border-blueGray-100">Current Bid: 0.00</span>
                        </div>
                    </div>
                    </div>
                    <!--#region LIVE BIDDING CONTROL PANEL-->
                    <div class="container">
                        <div class="flex flex-wrap">
                            <div class="w-10/12">
                                <input type="text" placeholder="Enter your bid amount here" class="px-3 py-4 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-none focus:shadow-outline w-full pl-10" :disabled="itemdata == null"/>
                            </div>
                            <div class="w-full flex-1">
                                <div style="background-color: green; height: 100%; width: 100%; display: grid; place-items: center; cursor: pointer;" :disabled="itemdata == null">
                                    <div style="color: white;">
                                        BID NOW!
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-full px-6 flex-1">
                    <center style="font-size: 1.5rem; font-weight: bold;">
                        CHATBOX
                    </center>
                    <div style="width: 100%; height: 450px; background-color: gainsboro; display: flex; flex-direction: column; gap: 10px; margin: 0 auto; overflow-y: auto; padding: 10px;" ref="chatContainer">
                        <div v-for="value in chathistory" :key="value.name" style="background-color: white; color: black; max-width: 70%; padding: 5px;" :style="value.name != username ? 'align-self: flex-start' : 'align-self: flex-end'">
                            <p style="font-style: italic;" :style="value.name == 'System' ? 'color: green' : value.name == username ? 'color: blue' : 'color: red'">{{ value.name }}</p> 
                            {{ value.message }}
                        </div>
                    </div>
                    <div class="container">
                        <div class="flex flex-wrap">
                            <div class="w-10/12">
                                <input type="text" placeholder="Enter your chat here" class="px-3 py-4 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-none focus:shadow-outline w-full pl-10" v-model="message"/>
                            </div>
                            <div class="w-full flex-1">
                                <div style="background-color: green; height: 100%; width: 100%; display: grid; place-items: center; cursor: pointer;" @click="SendMessage">
                                    <div style="color: white;">
                                        SEND
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { socket } from '@/socket'

import noImage from '@/assets/img/noimage.png'

export default{
    name: "live-bidding",
    data() {
        return {
            detailsloading: false,
            username: "",
            message: "",
            chathistory:[],
            timer: 0,
            biddingstatus: "",
            itemdata: null,
            noImage
        }
    },
    components: {
    },
    methods: {
        GetImage(data){
            return new URL(`${process.env.VUE_APP_API_URL}/${data}`, import.meta.url).href
        },
        formatTime(seconds) {
            const minutes = Math.floor(seconds / 60); // Calculate full minutes
            const remainingSeconds = Math.floor(seconds % 60); // Calculate remaining seconds
            return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`; // Format as mm:ss
        },
        scrollToBottom() {
            const chatContainer = this.$refs.chatContainer;
            if (chatContainer) {
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }
        },
        limitChatHistory() {
            // Ensure the history does not exceed 50 messages
            if (this.chathistory.length > 50) {
                this.chathistory.shift(); // Remove the oldest message
            }
        },
        async ConnectToRoom(){
            console.log("connecting to room")
            this.detailsloading = true

            const response = await fetch(`${process.env.VUE_APP_API_URL}/users/getuserdetails`, {
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

                this.detailsloading = false
                return;
            }
            else if (response.status == 401){
                this.$swal({
                title: "Authentication Failed! You will now be redirected to the login page",
                icon: "error"
                })

                this.$router.push({path: "/"})
            }

            this.username = responseData.data.owner.username

            socket.connect();

            socket.on('connect', () => {
                this.chathistory.push({
                    name: "System",
                    message: "Welcome user to the live bidding! Enjoy your stay"
                })
            })

            socket.emit("join_room", { roomId: "live-bidding", name: responseData.data.owner.username})

            socket.on("queue-item", (data) => {
                console.log("queue-item", data)
                this.itemdata = data
            })

            socket.on("receive-message", (data) => {
                this.chathistory.push(data.data.content)
                this.limitChatHistory()
                this.$nextTick(() => {
                    this.scrollToBottom(); // Scroll after DOM updates
                });
            })

            socket.on("bidding-status", (data) => {
                this.biddingstatus = data.status
            })

            socket.on("timer-update", (data) => {
                this.timer = data.timerValue
            })
        },
        async SendMessage(){
            if (this.message == ""){
                return;
            }

            this.chathistory.push({
                name: this.username,
                message: this.message
            })

            socket.emit("send-message", { roomId: "live-bidding", content: {
                    name: this.username,
                    message: this.message
                }
            })
            this.message = ""
            this.limitChatHistory()
            this.$nextTick(() => {
                this.scrollToBottom(); // Scroll after DOM updates
            });
        }
    },
    mounted(){
        this.ConnectToRoom()
    },
    beforeUnmount() {
        // Clean up listeners to prevent memory leaks
        socket.off("connect");
        socket.off("receive-message");
        socket.off("bidding-status")
        socket.off("timer-update")
    },
}
</script>