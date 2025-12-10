<template>
    <div>
        <a
        class="text-black text-xl uppercase lg:inline-block font-semibold pt-12"
        href="javascript:void(0)"
        >
        FORUMS
        </a>
        
        <hr/>
        <br/><br/>
        
        <!-- Header -->
        <div class="px-4 mx-auto">
            <div class="flex flex-wrap">
                <div class="w-full w-1/2 px-4 lg:w-9/12">
                <div class="block mb-3 pt-0">
                    <input type="text" placeholder="Search Discussion Title" class="px-3 py-4 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-none focus:shadow-outline w-full" v-model="search"/>
                </div>
                </div>
                <div class="w-full px-4 lg:w-3/12">
                <div class="block">
                    <button class="w-full bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-base px-12 py-3 rounded shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="() => {
                    currentpage = 0
                    GetData()
                    }">
                    SEARCH
                    </button>
                </div>
                </div>
            </div>
        </div>
        <br/>
    </div>
</template>

<script>

</script>