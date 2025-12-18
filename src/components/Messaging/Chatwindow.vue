<template>
  <div class="bg-white rounded-lg shadow-lg h-full flex flex-col p-2">
    <!-- Chat Header -->
    <div v-if="selectedConversation" class="p-4 border-b border-gray-200 flex items-center">
      <div class="ml-3">
        <h3 class="font-semibold text-gray-900">{{ selectedConversation.name }}</h3>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="!selectedConversation" class="flex-1 flex items-center justify-center">
      <div class="text-center">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No conversation selected</h3>
        <p class="mt-1 text-sm text-gray-500">Choose a conversation from the sidebar to start messaging.</p>
      </div>
    </div>

    <!-- Messages Area -->
    <div v-if="selectedConversation" class="flex-1 overflow-y-auto p-4 space-y-4">
      <MessageBubble
        v-for="message in messages"
        :key="message.id"
        :message="message"
      />
    </div>

    <!-- Message Input -->
    <div v-if="selectedConversation" class="p-4 border-t border-gray-200">
      <div class="flex items-end space-x-2">
        <div class="flex-1 relative">
          <textarea
            v-model="newMessage"
            @keypress.enter.prevent="sendMessage"
            placeholder="Type a message..."
            rows="1"
            class="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
          ></textarea>
        </div>
        <button 
          style="margin-bottom: 8px; margin-left: 10px;"
          @click="sendMessage"
          :disabled="!newMessage.trim()"
          :class="[
            'p-2 rounded-full transition-colors',
            newMessage.trim() 
              ? 'bg-teal-500 text-white hover:bg-teal-600' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          ]"
        >
          <svg class="w-5 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import MessageBubble from './Messagebubble.vue'
export default {
  name: "user-message-bubble",
  props: {
      selectedConversation: {
          type: Object,
          default: null
      }
  },
  components: {
      MessageBubble
  },
  data() {
      return {
          newMessage: "",
          messages: [],
          sampleMessages: {
              1: [
                  {
                  id: 1,
                  text: "You have been selected for this work!",
                  sender: "Gabrielle Daniel",
                  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
                  timestamp: Date.now() - 600000,
                  isOwn: false
                  },
                  {
                  id: 2,
                  text: "Awesome! I'm available now, when can I start?",
                  sender: "You",
                  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
                  timestamp: Date.now() - 300000,
                  isOwn: true
                  },
                  {
                  id: 3,
                  text: "Good! I will see you tomorrow 8am",
                  sender: "John Smith",
                  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
                  timestamp: Date.now() - 120000,
                  isOwn: false
                  }
              ],
          },
          loading: false
      }
  },
  methods: {
      formatTime(timestamp){
          return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      },
      async sendMessage() {
          if (!this.newMessage || !this.selectedConversation) return

        const response = await fetch(`${process.env.VUE_APP_API_URL}/chat/sendmessage`,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: "include",
            body: JSON.stringify({
              message: this.newMessage,
              conversationid: this.selectedConversation._id,
            })
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

        this.newMessage = ""
        this.GetData()
      },
      async GetData() {
          if (!this.selectedConversation) return

        const response = await fetch(`${process.env.VUE_APP_API_URL}/chat/getchats?chatid=${this.selectedConversation._id}`, {
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

        this.messages = responseData.data
        this.loading = false;
      },
  },
  watch: {
      selectedConversation: {
        async handler(newConversation) {
            if (!newConversation || !newConversation._id) return;

            // fetch messages for this conversation
            await this.GetData();
        },
        immediate: true
      }
  }
};
</script>