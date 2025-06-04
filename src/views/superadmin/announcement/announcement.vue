<template>
    <div>
        <a
        class="text-black text-xl uppercase lg:inline-block font-semibold pt-12"
        href="javascript:void(0)"
        >
            Announcement
        </a>
        <hr class="my-4 md:min-w-full" />
        <br/><br/>
        <p style="font-size: 1.5rem;">Title</p>
        <div class="mb-3 pt-0">
            <input type="text" placeholder="Enter Title Announcement" class="px-3 py-4 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-none focus:shadow-outline w-full" v-model="title"/>
        </div>
        <br/>
        <p style="font-size: 1.5rem;">Content</p>
        <textarea
            type="text"
            class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
            rows="4"
            v-model="content"
        >
        </textarea>
        <br/>
        <div style="position: relative; width: 100%;">
            <div style="float: right;">
                <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="Save()" :disabled="loadingapi">
                    <center v-if="loadingapi">
                        <i class="fas fa-solid fa-spinner" style="animation:spin 4s linear infinite;"></i>
                    </center>
                    <p v-else>Save</p>
                </button>
            </div>
        </div>
    </div>
</template>

<script>


export default {
    name: "",
    data(){
        return {
            title: "",
            content: "",
            loadingapi: false
        }
    },
    methods: {
        Save(){
            if (this.title == ''){
                this.$swal({
                    title: "Please enter title first",
                    icon: "warning"
                })

                return;
            }
            else if (this.content == ''){
                this.$swal({
                    title: "Please enter content first",
                    icon: "warning"
                })

                return;
            }

            this.$swal({
                title: "Are you sure you want to save this?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Save it!"
            }).then(async data => {
                if (data.isConfirmed == true){
                    this.loadingapi = true
                    const response = await fetch(`${process.env.VUE_APP_API_URL}/announcement/saveannouncement`, {
                        method: 'POST',
                        headers: {
                        "Content-Type": "application/json"
                        },
                        credentials: "include",
                        body: JSON.stringify({
                            "title": this.title,
                            "content": this.content
                        })
                    });

                    const responseData = await response.json();

                    if (response.status === 400) {
                        //  API HERE
                        this.$swal({
                        title: responseData.data,
                        icon: "error"
                        })

                        this.loadingapi = false

                        return;
                    }
                    else if (response.status == 401){
                        this.$swal({
                        title: "Authentication Failed! You will now be redirected to the login page",
                        icon: "error"
                        })

                        this.$router.push({path: "/"})
                    }
                    else{
                        this.$swal({
                            title: "Announcement successfully save",
                            icon: "success",
                            allowOutsideClick: false
                        }).then(() => {
                            
                            if (this.pagination.totalpage - 1 < this.pagination.page){
                            this.pagination.page -= 1
                            }

                            this.loadingapi = false

                            this.selecteduserid = ""
                            this.listUsers()
                        })
                    }
                }
            })
        }
    }
}
</script>