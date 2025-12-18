<template>
  <div :class="['flex mb-4', message.isSender ? 'justify-end' : 'justify-start']">
    <div :class="[
      'max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow-sm',
      message.isSender 
        ? 'bg-teal-500 text-white rounded-br-none' 
        : 'bg-white text-gray-800 rounded-bl-none border'
    ]">
      <p class="text-sm">{{ message.content }}</p>
      <p :class="[
        'text-xs mt-1',
        message.isSender ? 'text-teal-100' : 'text-gray-500'
      ]">
        {{ formatTime(message.createdAt) }}
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
    }
};
</script>