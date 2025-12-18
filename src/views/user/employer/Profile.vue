<template>
    <div>
        <a
        class="text-black text-xl uppercase lg:inline-block font-semibold pt-12"
        href="javascript:void(0)"
        >
            MY PROFILE
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
                        {{ name.toUpperCase() }} (EMPLOYER)
                    </div>
                    <div style="font-size: 1.5rem; padding-top: 5px; display: flex; align-items: center; gap: 10px;">
                        <!-- <p :class="status === 'openforwork' ? 'text-green' : 'text-red'" class="m-0">
                            {{ status === 'openforwork' ? 'Open for Work' : 'Not available for Work' }}
                        </p> -->
                        <!-- <button
                        class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button" @click="EditStatus()">
                            Edit Status
                        </button> -->
                    </div>
                </div>
            </div>
        </div>

        <br/><br/>

        <div style="width: 100%; height: 300px; background-color: gainsboro; border-radius: 20px;">
            <div style="padding: 20px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="font-size: 2.5rem;">About Me</div>
                    <button
                        class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                        type="button"
                        @click="EditAboutMe()">
                        Edit
                    </button>
                </div>
                <div style="font-size: 1.2rem; padding-top: 20px;">
                    <p v-if="aboutme == ''">No about me yet!</p>
                    <p v-else>{{ aboutme }}</p>
                </div>
            </div>
        </div>

        <br/><br/>

        <div style="width: 100%; height: 100%; background-color: gainsboro; border-radius: 20px;">
            <div style="padding: 20px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="font-size: 2.5rem;">FEATURED DOCUMENTS</div>
                    <button
                        class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                        type="button" @click="EditDocuments()">
                        Edit
                    </button>
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

        <!-- <div style="width: 100%; height: 300px; background-color: gainsboro; border-radius: 20px;">
            <div style="padding: 20px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="font-size: 2.5rem;">EXPERIENCE</div>
                    <button
                        class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                        type="button"
                        @click="EditExperience()">
                        Edit
                    </button>
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
                    <button
                        class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                        type="button" @click="EditEducation()">
                        Edit
                    </button>
                </div>
                <ContentLoader v-if="loadingdata" viewBox="0 0 250 110">
                    <rect x="0" y="0" rx="3" ry="3" width="250" height="10" />
                    <rect x="0" y="20" rx="3" ry="3" width="220" height="10" />
                </ContentLoader>
                <div v-else style="font-size: 1.2rem; padding-top: 20px;">
                    {{ education }}
                </div>
            </div>
        </div> -->
    </div>
</template>

<script>
import noImage from '@/assets/img/noimage.png'
import Carddocuments from '../../../components/Cards/Carddocuments.vue'
import { ContentLoader } from 'vue-content-loader'

export default{
    name: "profile",
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

            const response = await fetch(`${process.env.VUE_APP_API_URL}/users/getuserdata`, {
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

            this.name = responseData.data.name
            this.aboutme = responseData.data.aboutme
            this.status = responseData.data.status
            this.experience = responseData.data.experience
            this.education = responseData.data.education
            this.documents = responseData.data.documents
            this.loadingdata = false;
        },
        EditAboutMe(){
            this.$swal({
                title: "Edit your about me section",
                input: "textarea",
                inputAttributes: {
                    autocapitalize: "off"
                },
                showCancelButton: true,
                confirmButtonText: "Submit",
                showLoaderOnConfirm: true,

                preConfirm: async (aboutme) => {
                    try {
                        const response = await fetch(`${process.env.VUE_APP_API_URL}/users/editaboutme`,{
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/json"
                            },
                            credentials: "include",
                            body: JSON.stringify({
                                "aboutme": aboutme
                            })
                        });

                        if (!response.ok) {
                            return this.$swal.showValidationMessage(`
                                ${response.data}
                            `);
                        }
                        return response.json();
                        } catch (error) {
                        this.$swal.showValidationMessage(`
                            Request failed: ${error}
                        `);
                    }
                },
                allowOutsideClick: () => !this.$swal.isLoading()
            }).then((tempresponse) => {

                if (tempresponse.isConfirmed){

                    this.GetData()

                    return this.$swal({
                        title: "Successfully edited!",
                        icon: "success",
                        allowOutsideClick: false
                    })
                }
            })
        },
        EditExperience(){
            this.$swal({
                title: "Edit your experience section",
                input: "textarea",
                inputAttributes: {
                    autocapitalize: "off"
                },
                showCancelButton: true,
                confirmButtonText: "Submit",
                showLoaderOnConfirm: true,

                preConfirm: async (experience) => {
                    try {
                        const response = await fetch(`${process.env.VUE_APP_API_URL}/users/editexperience`,{
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/json"
                            },
                            credentials: "include",
                            body: JSON.stringify({
                                "experience": experience
                            })
                        });

                        if (!response.ok) {
                            return this.$swal.showValidationMessage(`
                                ${response.data}
                            `);
                        }
                        return response.json();
                        } catch (error) {
                        this.$swal.showValidationMessage(`
                            Request failed: ${error}
                        `);
                    }
                },
                allowOutsideClick: () => !this.$swal.isLoading()
            }).then((tempresponse) => {

                if (tempresponse.isConfirmed){

                    this.GetData()

                    return this.$swal({
                        title: "Successfully edited!",
                        icon: "success",
                        allowOutsideClick: false
                    })
                }
            })
        },
        EditEducation(){
            this.$swal({
                title: "Edit your education section",
                input: "textarea",
                inputAttributes: {
                    autocapitalize: "off"
                },
                showCancelButton: true,
                confirmButtonText: "Submit",
                showLoaderOnConfirm: true,

                preConfirm: async (education) => {
                    try {
                        const response = await fetch(`${process.env.VUE_APP_API_URL}/users/editeducation`,{
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/json"
                            },
                            credentials: "include",
                            body: JSON.stringify({
                                "education": education
                            })
                        });

                        if (!response.ok) {
                            return this.$swal.showValidationMessage(`
                                ${response.data}
                            `);
                        }
                        return response.json();
                        } catch (error) {
                        this.$swal.showValidationMessage(`
                            Request failed: ${error}
                        `);
                    }
                },
                allowOutsideClick: () => !this.$swal.isLoading()
            }).then((tempresponse) => {

                if (tempresponse.isConfirmed){

                    this.GetData()

                    return this.$swal({
                        title: "Successfully edited!",
                        icon: "success",
                        allowOutsideClick: false
                    })
                }
            })
        },
        EditStatus(){
            this.$swal({
                title: "Edit your education section",
                input: "select",
                inputOptions: {
                    openforwork: "Open for Work",
                    notavailableforwork: "Not available for Work"
                },
                inputPlaceholder: "Select a status",
                showCancelButton: true,
                confirmButtonText: "Submit",
                showLoaderOnConfirm: true,

                preConfirm: async (status) => {
                    try {
                        const response = await fetch(`${process.env.VUE_APP_API_URL}/users/editstatus`,{
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/json"
                            },
                            credentials: "include",
                            body: JSON.stringify({
                                "status": status
                            })
                        });

                        if (!response.ok) {
                            return this.$swal.showValidationMessage(`
                                ${response.data}
                            `);
                        }
                        return response.json();
                        } catch (error) {
                        this.$swal.showValidationMessage(`
                            Request failed: ${error}
                        `);
                    }
                },
                allowOutsideClick: () => !this.$swal.isLoading()
            }).then((tempresponse) => {
                if (tempresponse.isConfirmed){

                    this.GetData()

                    return this.$swal({
                        title: "Successfully edited!",
                        icon: "success",
                        allowOutsideClick: false
                    })
                }
            })
        },
        EditDocuments(){
            this.$swal({
                title: "Featured Document(s)",
                html: `
                    <center>
                    <input type="file" id="fileInput" accept="image/*,application/pdf,.doc,.docx" class="swal2-input" style="display: flex; width: 70%; height: 2.6rem"/>
                    <input type="text" id="titleInput" placeholder="File title" class="swal2-input" style="display: flex; width: 70%;" />
                    <textarea autocapitalize="off" id="descInput" placeholder="File description" class="swal2-textarea" style="display: flex;  width: 70%;"></textarea>
                    <center/>
                `,
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: "Submit",
                showLoaderOnConfirm: true,

                preConfirm: async () => {
                    try {

                        const file = document.getElementById('fileInput').files[0];
                        const title = document.getElementById('titleInput').value;
                        const desc = document.getElementById('descInput').value;
                        
                        const formData = new FormData()
                        formData.append("file", file)
                        formData.append("title", title)
                        formData.append("description", desc)

                        const response = await fetch(`${process.env.VUE_APP_API_URL}/users/editfeatureddocuments`,{
                            method: 'POST',
                            headers: {
                            'Accept': 'application/json',
                            },
                            credentials: "include",
                            body: formData
                        });

                        if (!response.ok) {
                            return this.$swal.showValidationMessage(`
                                ${response.data}
                            `);
                        }
                        return response.json();
                        } catch (error) {
                        this.$swal.showValidationMessage(`
                            Request failed: ${error}
                        `);
                    }
                },
                allowOutsideClick: () => !this.$swal.isLoading()
            }).then((tempresponse) => {
                if (tempresponse.isConfirmed){

                    this.GetData()

                    return this.$swal({
                        title: "Successfully edited!",
                        icon: "success",
                        allowOutsideClick: false
                    })
                }
            })
        }
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