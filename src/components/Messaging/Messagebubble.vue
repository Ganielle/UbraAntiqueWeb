<template>
  <div :class="['flex mb-4', message.isOwn ? 'justify-end' : 'justify-start']">
    <div :class="[
      'max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow-sm',
      message.isOwn 
        ? 'bg-teal-500 text-white rounded-br-none' 
        : 'bg-white text-gray-800 rounded-bl-none border'
    ]">
      <p class="text-sm">{{ message.text }}</p>
      <p :class="[
        'text-xs mt-1',
        message.isOwn ? 'text-teal-100' : 'text-gray-500'
      ]">
        {{ formatTime(message.timestamp) }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
    name: "user-message-bubble",
    props: {
        message: {
            type: Object,
            required: true
        }
    },
     methods: {
        formatTime(timestamp){
            return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    },
//   mounted() {
//     this.GetData()
//   }
};
</script>