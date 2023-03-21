<script setup>
import { ref, onMounted } from 'vue'
import { getApi } from '../api/Api'

const files = ref([])
const filteredFiles = ref([])

const getFileApi = async () => {
  return await getApi.get('/files')
}
onMounted(() => {
  getFileApi().then((response) => {
    files.value = response.data.documents
    console.log(files.value)
  })
})
</script>

<template>
  <div class="file_container">
    <div class="file_wrapper" v-for="file in filteredFiles" :key="file.ID">
      {{ file.AuthorName }}
    </div>
  </div>
</template>
