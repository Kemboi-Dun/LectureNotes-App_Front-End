
<template>
  <div>
    <div v-for="message in messages" :key="message.id">
      {{ message }}
    </div>
    <form @submit.prevent="sendMessage">
      <input type="text" v-model="messageText">
      <button type="submit">Send</button>
    </form>
  </div>
</template>

<script>
import io from "socket.io-client";

export default {
  data() {
    return {
      socket: null,
      messages: [],
      messageText: "",
    };
  },
  mounted() {
    // Connect to chat server using WebSocket
    this.socket = io("ws://localhost:3000/chat");
    // Handle incoming messages
    this.socket.on("message", (message) => {
      this.messages.push(message);
    });
  },
  methods: {
    sendMessage() {
      // Send message to chat server
      this.socket.emit("message", this.messageText);
      this.messageText = "";

      console.log(this.messageText)
    },
  },
};
</script>




<!-- <script setup>
import { onMounted, ref } from 'vue';
import {getApi} from '../api/Api';


const items = ref('');


const getFilesApi = async ()=>{
  return await getApi.get('/files')
}


function viewFile(fileId) {
  window.open(`http://localhost:3000/DOC_DOWNLOAD/${fileId}`, '_blank')
}

function downloadFile(fileId) {
      fetch(`/DOC_DOWNLOAD/${fileId}`)
        .then(response => response.blob())
        .then(blob => {
          const url = window.URL.createObjectURL(new Blob([blob]));
          const a = document.createElement('a');
          a.href = url;
          a.download = fileId;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        })
        .catch(error => {
          console.error(error);
        });
    }

    onMounted(()=>{
      getFilesApi()
      .then((response)=>{
        console.log(response.data.documents);
        items.value = response.data.documents;
        console.log(items.value[0].Path);
      })
    })



</script>

<template>
  <div class="file_container">
    <div class="file_wraper">
        
        
        <div class="items-wrapper" v-for="item in items" :key="item.ID">
          <button @click="viewFile(item.Path)">View File</button>
  {{ item.Path }}
  <button @click="downloadFile(item.Path )">Download File</button>
</div>

    </div>
  </div>
</template> -->
