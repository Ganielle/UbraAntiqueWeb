<template>
  <div class="bg-white rounded-lg shadow-lg h-full">
    <div class="p-4 border-b border-gray-200">
      <h2 class="text-xl font-semibold text-gray-800">Messages</h2>
      <div class="mt-3">
        <input
          type="text"
          placeholder="Search conversations..."
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          v-model="searchQuery"
        />
        <br/><br/>
        <button
        class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button" @click="GetData()">
          Search
        </button>
      </div>

    </div>
    
    <div class="overflow-y-auto h-full">

      <div v-if="conversations.length <= 0">
        <br/>
        <center>
          No Conversations Yet!
        </center>
      </div>
      <div v-else>
        <div
          v-for="conversation in conversations"
          :key="conversation._id"
          @click="selectConversation(conversation)"
          :class="[
            'flex items-center p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors',
            selectedConversation?.id === conversation.id ? 'bg-teal-50 border-l-4 border-l-teal-500' : ''
          ]"
        >
          <!-- <div class="relative">
            <div 
              v-if="conversation.isOnline"
              class="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"
            ></div>
          </div> -->
          
          <div class="ml-3 flex-1 min-w-0">
            <div class="flex justify-between items-baseline">
              <h3 class="text-sm font-medium text-gray-900 truncate">
                {{ conversation.title }}
              </h3>
              <span class="text-xs text-gray-500">
                {{ formatTime(conversation.createdAt) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
    name: "user-messaging-list",
    emits: ['conversation-selected'],
    props:{
      conversation: {
        type: Array,
        default: () => []
      }
    },
    data() {
        return {
            searchQuery: "",
            selectedConversation: null,
            conversations: [],
            loading: false
            // conversations: [
            //     {
            //         id: 1,
            //         name: 'Gabrielle Daniel',
            //         avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
            //         lastMessage: 'Good! I will see you tomorrow 8am',
            //         lastMessageTime: Date.now() - 300000,
            //         unreadCount: 2,
            //         isOnline: true
            //     },
            // ]
        }
    },
     methods: {
      selectConversation(conversation) {
          this.selectedConversation = conversation
          this.$emit('conversation-selected', conversation)
      },
      formatTime(timestamp){
          const now = Date.now()
          const diff = now - timestamp
          
          if (diff < 60000) return 'now'
          if (diff < 3600000) return `${Math.floor(diff / 60000)}m`
          if (diff < 86400000) return `${Math.floor(diff / 3600000)}h`
          return new Date(timestamp).toLocaleDateString()
      },
      async GetData() {
        this.loading = true;

        const response = await fetch(`${process.env.VUE_APP_API_URL}/chat/getconversations?search=${this.searchQuery}`, {
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

        this.conversations = responseData.data
        this.loading = false;
      },
    },
    mounted() {
      this.GetData()
    }
};
</script>