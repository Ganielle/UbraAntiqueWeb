<template>
    <div>
        <a
        class="text-black text-xl uppercase lg:inline-block font-semibold pt-12"
        href="javascript:void(0)"
        >
            MANAGE ACCOUNTS / USER / {{ path }}'s Profile
        </a>
        <hr class="my-4 md:min-w-full" />
        <br/><br/>

        <div style="width: 100%; height: 100%; background-color: gainsboro; border-radius: 20px;">
            <div style="padding: 20px;">
                <ContentLoader v-if="loadingdata" viewBox="0 0 250 110">
                    <rect x="0" y="0" rx="3" ry="3" width="250" height="10" />
                    <rect x="0" y="20" rx="3" ry="3" width="220" height="10" />
                </ContentLoader>
                <div v-else>
                    <div style="font-size: 2.5rem;">
                        {{ name.toUpperCase() }}
                    </div>
                    <div style="font-size: 1.5rem; padding-top: 5px; display: flex; align-items: center; gap: 10px;">
                        <p :class="status === 'Open for Work' ? 'text-green' : 'text-red'" class="m-0">
                            {{ status === 'Open for Work' ? 'Open for Work' : 'Not available for Work' }}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <br/><br/>

        <div style="width: 100%; height: 300px; background-color: gainsboro; border-radius: 20px;">
            <div style="padding: 20px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="font-size: 2.5rem;">About Me</div>
                </div>
                <div style="font-size: 1.2rem; padding-top: 20px;">
                    {{ aboutme }}
                </div>
            </div>
        </div>

        <br/><br/>

        <div style="width: 100%; height: 100%; background-color: gainsboro; border-radius: 20px;">
            <div style="padding: 20px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="font-size: 2.5rem;">FEATURED DOCUMENTS</div>
                </div>
                <ContentLoader v-if="loadingdata" viewBox="0 0 250 110">
                    <rect x="0" y="0" rx="3" ry="3" width="250" height="10" />
                    <rect x="0" y="20" rx="3" ry="3" width="220" height="10" />
                </ContentLoader>
                
                <div
                    v-else
                    class="scroll-container"
                >
                    <div v-if="documents.length <= 0">
                        <br/>
                        <p>No featured documents saved yet!</p>
                    </div>
                    <div
                    v-else
                    v-for="docu in documents"
                    :key="docu.id"
                    class="card-wrapper"
                    >
                    <Carddocuments
                        :itemid="docu.id"
                        :path="docu.path"
                        :type="docu.type"
                        :title="docu.title"
                        :description="docu.description"
                        @refresh-docu-delete="GetData"
                    />
                    </div>
                </div>
            </div>
        </div>

        <br/><br/>

        <div style="width: 100%; height: 300px; background-color: gainsboro; border-radius: 20px;">
            <div style="padding: 20px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="font-size: 2.5rem;">EXPERIENCE</div>
                </div>
                <ContentLoader v-if="loadingdata" viewBox="0 0 250 110">
                    <rect x="0" y="0" rx="3" ry="3" width="250" height="10" />
                    <rect x="0" y="20" rx="3" ry="3" width="220" height="10" />
                </ContentLoader>
                <div v-else style="font-size: 1.2rem; padding-top: 20px;">
                    {{ experience }}
                </div>
            </div>
        </div>

        <br/><br/>

        <div style="width: 100%; height: 300px; background-color: gainsboro; border-radius: 20px;">
            <div style="padding: 20px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="font-size: 2.5rem;">EDUCATION</div>
                </div>
                <ContentLoader v-if="loadingdata" viewBox="0 0 250 110">
                    <rect x="0" y="0" rx="3" ry="3" width="250" height="10" />
                    <rect x="0" y="20" rx="3" ry="3" width="220" height="10" />
                </ContentLoader>
                <div v-else style="font-size: 1.2rem; padding-top: 20px;">
                    {{ education }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import noImage from '@/assets/img/noimage.png'
import Carddocuments from '../../components/Cards/Carddocuments.vue'
import { ContentLoader } from 'vue-content-loader'

export default{
    name: "profile",
    props: {
        color: {
            default: "light",
            validator: function (value) {
                // The value must match one of these strings
                return ["light", "dark"].indexOf(value) !== -1;
            },
        },
        id: {
            type: String,
            default: () => "", // Set an empty array as the default value
        },
        path: {
            type: String,
            default: () => ""
        }
    },
    data() {
        return {
            noImage,
            name: "",
            status: "",
            documents: [],
            experience: "",
            education: "",
            loadingdata: false,
            showexperiencemodal: false,
        }
    },
    components: {
        ContentLoader,
        Carddocuments,
    },
    methods: {
        async GetData(){

            this.loadingdata = true;

            const response = await fetch(`${process.env.VUE_APP_API_URL}/users/getuserdatasa?id=${this.id}`, {
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

                this.loadingdata = false;
                return;
            }
            else if (response.status == 401){
                this.$swal({
                title: "Authentication Failed! You will now be redirected to the login page",
                icon: "error"
                })

                this.$router.push({path: "/"})
            }

            console.log(responseData.data)

            this.name = responseData.data.name
            this.aboutme = responseData.data.aboutme
            this.status = responseData.data.status
            this.experience = responseData.data.experience
            this.education = responseData.data.education
            this.documents = responseData.data.documents
            this.loadingdata = false;
        },
    },
    mounted(){
        this.GetData()
    }
}
</script>

<style>
.text-green{
    color: green
}
.text-red{
    color: red;
}
.scroll-container {
  display: flex;
  overflow-x: auto;
  gap: 1rem;
  padding-bottom: 1rem;
  scrollbar-width: thin;
}

.card-wrapper {
  flex: 0 0 auto; /* Prevent shrinking, keep fixed width */
  width: 250px;    /* Adjust based on your card size */
}
</style>