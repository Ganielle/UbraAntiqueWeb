<template>
    <div class="mx-auto bg-white rounded-lg shadow-md overflow-hidden" style="width: 250px;">
    <img
      class="object-cover" style="width: 100%; height: 10rem;"
      :src="!image ? noImage : GetImage(image)"
      :alt="title"
    />
    <div class="p-4">
      <h2 class="text-xl font-semibold text-gray-800">{{ title }}</h2>
      <h2 class="text-m font-semibold " :class="stock == 'Available' ? 'text-emerald-500' : 'text-red-500'">{{ stock }}</h2>
      <p class="mt-2 text-gray-600 text-sm">{{ truncatedDescription }}</p>
      <div class="mt-4 flex justify-between items-center">
        <button
          @click="$emit('buy-item', itemid)"
          class="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Buy Me!
        </button>
        <span class="text-gray-700 font-medium">{{ footerText }}</span>
      </div>
    </div>
  </div>
</template>

<script>

import noImage from '@/assets/img/noimage.png'

export default {
  name: "Card",
  props: {
    itemid: {
        type: String,
        required: true
    },
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    stock: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      required: true,
    },
    buttonText: {
      type: String,
      default: "Learn More",
    },
    footerText: {
      type: String,
      default: "",
    },
  },
  data(){
    return {
        noImage
    }
  },
  methods: {
    GetImage(data){
        return new URL(`${process.env.VUE_APP_API_URL}/${data}`, import.meta.url).href
    },
    onButtonClick() {
      this.$emit("button-click");
    },
  },
  computed: {
    truncatedDescription() {
      return this.description.length > 30
        ? this.description.substring(0, 30) + "..."
        : this.description;
    },
  },
};
</script>