<template>
    <div>
        <div
        class="text-black text-xl uppercase lg:inline-block font-semibold pt-12"
        style="display: flex; "
        >
        WORKS / APPROVAL
        </div>

        <hr/>
        <br/><br/>
        <div class="px-4 mx-auto">
            <div class="flex flex-wrap">
                <div class="w-full w-1/2 px-4 lg:w-9/12">
                <div class="block mb-3 pt-0">
                    <input type="text" placeholder="Search Job Title" class="px-3 py-4 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-none focus:shadow-outline w-full" v-model="search"/>
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

        <div v-if="loading">
            <div style="width: 100%; height: 200px; background-color: white; border-radius: 5px;">
                <ContentLoader viewBox="0 0 250 110">
                    <rect x="2" y="5" rx="3" ry="3" width="50" height="5" />
                    <rect x="2" y="12" rx="3" ry="3" width="100" height="5" />
                    <rect x="2" y="20" rx="3" ry="3" width="100" height="5" />
                </ContentLoader>
            </div>
            <br/>
            <div style="width: 100%; height: 200px; background-color: white; border-radius: 5px;">
                <ContentLoader viewBox="0 0 250 110">
                    <rect x="2" y="5" rx="3" ry="3" width="50" height="5" />
                    <rect x="2" y="12" rx="3" ry="3" width="100" height="5" />
                    <rect x="2" y="20" rx="3" ry="3" width="100" height="5" />
                </ContentLoader>
            </div>
        </div>
        <div v-else>

            <div style="display: flex; gap: 10px; justify-content: center; align-items: center;">
                <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="PreviousePageRequest" :disabled="loading || totalpage <= 0">
                    <i class="fas fa-chevron-left"></i>
                </button>

                <p style="font-size: 1.4rem; font-weight: bold;">{{ currentpage  + 1 }} / {{ totalpage }}</p>

                <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="NextPageRequest" :disabled="loading || currentpage >= totalpage">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>

            <br/>
            
            <Workstable />

        </div>
    </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'

import Workstable from '../../components/UbraAntique/Superadmin/Works/Workstable.vue'

export default {
    name: "user-my-jobs-page",
    components: {
        ContentLoader,
        Workstable
    },
    data() {
        return {
            search: "",
            loading: false,
            currentpage: 0,
            totalpage: 0,
            jobs: []
        }
    },
    methods: {
        formatDate(isoString) {
            const date = new Date(isoString)
            return date.toLocaleString("en-US", {
                year: "numeric",
                month: "long",   // August
                day: "numeric",  // 27
            })
        },
        async GetData() {
            this.loading = true;

            const response = await fetch(`${process.env.VUE_APP_API_URL}/jobs/showapprovelistsa?search=${this.search}&page=${this.currentpage}&limit=10`, {
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

                this.loading = false;
                return;
            }
            else if (response.status == 401){
                this.$swal({
                title: "Authentication Failed! You will now be redirected to the login page",
                icon: "error"
                })

                this.$router.push({path: "/"})
                return;
            }

            this.jobs = responseData.data.jobs
            console.log(this.jobs)
            this.totalpage = responseData.data.totalpage
            this.loading = false;
        },
    },
    mounted() {
        this.GetData()
    }
}
</script>