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
      </div>
    </div>
    
    <div class="overflow-y-auto h-full">
      <div
        v-for="conversation in filteredConversations"
        :key="conversation.id"
        @click="selectConversation(conversation)"
        :class="[
          'flex items-center p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors',
          selectedConversation?.id === conversation.id ? 'bg-teal-50 border-l-4 border-l-teal-500' : ''
        ]"
      >
        <div class="relative">
          <div 
            v-if="conversation.isOnline"
            class="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"
          ></div>
        </div>
        
        <div class="ml-3 flex-1 min-w-0">
          <div class="flex justify-between items-baseline">
            <h3 class="text-sm font-medium text-gray-900 truncate">
              {{ conversation.name }}
            </h3>
            <span class="text-xs text-gray-500">
              {{ formatTime(conversation.lastMessageTime) }}
            </span>
          </div>
          <p class="text-sm text-gray-600 truncate mt-1">
            {{ conversation.lastMessage }}
          </p>
          <div v-if="conversation.unreadCount > 0" class="flex justify-end mt-1">
            <span class="bg-teal-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
              {{ conversation.unreadCount }}
            </span>
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
    data() {
        return {
            searchQuery: "",
            selectedConversation: null,
            conversations: [
                {
                    id: 1,
                    name: 'Gabrielle Daniel',
                    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
                    lastMessage: 'Good! I will see you tomorrow 8am',
                    lastMessageTime: Date.now() - 300000,
                    unreadCount: 2,
                    isOnline: true
                },
            ]
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
        }
    },
    computed: {
        filteredConversations() {
            if (!this.searchQuery) return this.conversations
            return this.conversations.filter(conv => 
                conv.name.toLowerCase().includes(this.searchQuery.toLowerCase()))
        }
    }
//   mounted() {
//     this.GetData()
//   }
};
</script>