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

        <div class="container px-6">
            <div class="flex flex-wrap">
                <div class="w-full px-6 flex-1">
                    <!--#region ITEM PICTURE-->
                    <div style="width: 100%; background-color: gainsboro;">
                        <div style="padding: 10px;">
                            <center>No Picture Yet!</center>
                        </div>
                    </div>
                    <br/>
                    <!--#region ITEM DESCRIPTION-->
                    <div style="width: 100%; background-color: gainsboro; padding: 10px;">
                        <p style="font-style: italic; font-size: 1.2rem;">Description:</p>
                        <div style="height: 200px; overflow-y: auto;">
                            <center>
                                No Description Yet! No Description Yet!No Description Yet!No Description Yet!No Description Yet!No Description Yet!No Description Yet!No Description Yet!No Description Yet!No Description Yet!No Description Yet!No Description Yet!No Description Yet!No Description Yet!No Description Yet!No Description Yet!No Description Yet!No Description Yet!No Description Yet!No Description Yet!No Description Yet!No Description Yet!No Description Yet!No Description Yet!No Description Yet!No Description Yet!No Description Yet!No Description Yet!No Description Yet!No Description Yet!No Description Yet!No Description Yet!No Description Yet!No Description Yet!No Description Yet!No Description Yet!No Description Yet!No Description Yet!No Description Yet!No Description Yet!No Description Yet!No Description Yet!
                            </center>
                        </div>
                    </div>
                    <!--#region LIVE BIDDING CONTROL PANEL-->
                    <div class="container px-4 mx-auto">
                        <div class="flex flex-wrap">
                            <div class="w-full px-4 flex-1">
                                <span class="text-sm block my-4 p-3 text-blueGray-700 rounded border" style="background-color: green; text-align: center; color: white; cursor: pointer; height: 100%; width: 100%;  display: grid; place-items: center;">Turn On Live Bidding</span>
                            </div>
                            <!-- <div class="w-full px-4 flex-1">
                                <span class="text-sm block my-4 p-3 text-blueGray-700 rounded border" style="background-color: yell; text-align: center; color: white; cursor: pointer; height: 100%; width: 100%;  display: grid; place-items: center;">Start Countdown</span>
                            </div> -->
                            <div class="w-full px-4 flex-1">
                                <span class="text-sm block my-4 p-3 text-blueGray-700 rounded border" style="background-color: blue; text-align: center; color: white; cursor: pointer; height: 100%; width: 100%;  display: grid; place-items: center;">Next Item</span>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <!--#region BID STATUS-->
                    <div style="background-color: gainsboro; padding: 10px; display: grid; place-items: center;">
                        <p style="font-size: 1.3rem;">BIDDING COUNTDOWN</p>
                        <p style="font-size: 1.5rem;">10</p>
                    </div>
                    <!--#region BID HISTORY-->
                </div>
                <div class="w-full px-6 flex-1">
                    <center style="font-size: 1.5rem; font-weight: bold;">
                        CHATBOX
                    </center>
                    <div style="width: 100%; height: 450px; background-color: gainsboro; display: flex; flex-direction: column; gap: 10px; margin: 0 auto; overflow-y: auto; padding: 10px;">
                        <div style="background-color: white; color: black; max-width: 70%; padding: 5px; align-self: flex-start;">
                            <p style="font-style: italic; color: green;">System:</p> 
                            Welcome user to the live bidding! Enjoy your stay
                        </div>
                        <div style="background-color: white; color: black; max-width: 70%; padding: 5px; align-self: flex-end;">
                            <p style="font-style: italic; color: blue;">Me:</p> 
                            Hello guys!
                        </div>
                        <div style="background-color: white; color: black; max-width: 70%; padding: 5px; align-self: flex-end;">
                            <p style="font-style: italic; color: blue;">Me:</p> 
                            Wtf is this shit! I'm currently bidding the highest but the system doesn't recognize my bid
                        </div>
                        <div style="background-color: white; color: black; max-width: 70%; padding: 5px; align-self: flex-start;">
                            <p style="font-style: italic; color: red;">Ganielle:</p> 
                            Stay calm! Keep bidding buddy
                        </div>
                        <div style="background-color: white; color: black; max-width: 70%; padding: 5px; align-self: flex-start;">
                            <p style="font-style: italic; color: red;">Ganielle:</p> 
                            Stay calm! Keep bidding buddy
                        </div>
                        <div style="background-color: white; color: black; max-width: 70%; padding: 5px; align-self: flex-start;">
                            <p style="font-style: italic; color: red;">Ganielle:</p> 
                            Stay calm! Keep bidding buddy
                        </div>
                        <div style="background-color: white; color: black; max-width: 70%; padding: 5px; align-self: flex-start;">
                            <p style="font-style: italic; color: red;">Ganielle:</p> 
                            Stay calm! Keep bidding buddy
                        </div>
                    </div>
                    <div class="container">
                        <div class="flex flex-wrap">
                            <div class="w-10/12">
                                <input type="text" placeholder="Enter your chat here" class="px-3 py-4 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-none focus:shadow-outline w-full pl-10"/>
                            </div>
                            <div class="w-full flex-1">
                                <div style="background-color: green; height: 100%; width: 100%; display: grid; place-items: center; cursor: pointer;">
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

export default{
    name: "live-bidding",
    components: {
    },
    methods: {
        
    }
}
</script>