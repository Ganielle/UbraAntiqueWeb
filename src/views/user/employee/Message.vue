<template>
  <div class="min-h-screen bg-gray-100 p-4">
    <!-- Header -->
    <div class="mb-6">
      <div class="bg-white rounded-lg shadow-sm p-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">MESSAGING</h1>
            <p class="text-gray-600 mt-1">Stay connected with your employers</p>
          </div>
        </div>
      </div>
    </div>

    <div class="px-4 mx-auto">
      <div class="flex flex-wrap gap-2 items-stretch">
        <div class="w-full sm:w-10/12 md:w-7/12 lg:w-6/12 xl:w-4/12 min-h-[100px] p-5 relative flex flex-col">
          <!-- Conversations List -->
          <div class="block">
            <MessageList @conversation-selected="handleConversationSelected" />
          </div>
        </div>
        <div class="w-full sm:w-10/12 lg:w-6/12 xl:w-8/12 min-h-[100px] p-5 relative flex flex-col">
          <!-- Chat Window -->
          <div class="block">
            <ChatWindow :selected-conversation="selectedConversation" />
          </div>
        </div>
      </div>
    </div>

    <!-- Main Messaging Interface -->
    <div class="grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
      
      
    </div>
  </div>
</template>

<script>
import MessageList from '@/components/Messaging/Messagelist.vue'
import ChatWindow from '@/components/Messaging/Chatwindow.vue'

export default {
  name: "employer-messaging-page",
  components: {
    MessageList,
    ChatWindow
  },
  data() {
    return {
      selectedConversation: null
    }
  },
  methods: {
    handleConversationSelected(conversation) {
        this.selectedConversation = conversation
    },
},
//   mounted() {
//     this.GetData()
//   }
};
</script>