<template>
    <div class="card">
        <img v-if="type == 'jpg' || type == 'png'"
            class="object-cover" style="width: 100%; height: 10rem;"
            :src="!path ? noImage : GetImage(path)"
            :alt="title"
        />
        <img v-else-if="type == 'pdf'"
            class="object-cover" style="width: 100%; height: 10rem;"
            :src="pdfImage"
            :alt="title"
        />
        <img v-else-if="type == 'docx'"
            class="object-cover" style="width: 100%; height: 10rem;"
            :src="docxImage"
            :alt="title"
        />
        <div class="container">
            <h4><b>{{ title }}</b></h4> 
            <br/>
            <p style="word-wrap: break-word;">{{ truncatedDescription }}</p> 
        </div>
         <div style="position: absolute; bottom: 10px; right: 10px; display: flex; gap: 8px;">
            <button
                style="padding: 6px 12px; background-color: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer;"
                @click="DeleteDocument()"
                >
                Delete
            </button>
            <button
                style="padding: 6px 12px; background-color: #22c55e; color: white; border: none; border-radius: 4px; cursor: pointer;"
                @click="ViewDocument()"
                >
                View
            </button>
        </div>
    </div>
</template>

<script>
import noImage from '@/assets/img/noimage.png'
import pdfImage from '@/assets/img/pdf.webp'
import docxImage from '@/assets/img/docx.png'
export default {
  name: "Card",
  props: {
    itemid: {
        type: String,
        required: true
    },
    path: {
      type: String,
      required: true,
    },
    type: {
        type: String
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  data(){
    return {
        noImage,
        pdfImage,
        docxImage
    }
  },
  methods: {
    GetImage(data){
        return new URL(`${process.env.VUE_APP_API_URL}/${data}`, import.meta.url).href
    },
    onButtonClick() {
      this.$emit("button-click");
    },
    ViewDocument(){
        window.open(new URL(`${process.env.VUE_APP_API_URL}/${this.path}`, import.meta.url).href, '_blank');
    },
    DeleteDocument(){
        this.$swal({
            title: `Are you sure you want to delete ${this.title}`,
            showCancelButton: true,
            confirmButtonText: "Yes",
            showLoaderOnConfirm: true,

            preConfirm: async () => {
                try {
                    const response = await fetch(`${process.env.VUE_APP_API_URL}/users/deletefeatureddocuments`,{
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        credentials: "include",
                        body: JSON.stringify({
                            "docuid": this.itemid
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

                this.$emit('refresh-docu-delete')

                return this.$swal({
                    title: "Successfully deleted!",
                    icon: "success",
                    allowOutsideClick: false
                })
            }
        })
    }
  },
  computed: {
    truncatedDescription() {
      return this.description.length > 100
        ? this.description.substring(0, 100) + "..."
        : this.description;
    },
  },
};
</script>

<style>
.card {
    background-color: rgb(248, 248, 248);
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 100%;
  height: 350px;
  border-radius: 5px;
  position: relative;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

img {
  border-radius: 5px 5px 0 0;
}

.container {
  padding: 2px 16px;
}
</style>