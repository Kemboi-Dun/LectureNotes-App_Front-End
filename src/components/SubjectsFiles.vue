<script setup>
import { getApi } from '../api/Api.js'
import { ref, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import Navbar from './Navbar.vue'
import Footer from './Footer.vue'
import Type from './Type.vue'

const route = useRoute()
const typeFiles = ref([])
const filteredTypes = ref([])
const filteredParams = ref({
  course_type_id: route.params.type
})

// GET FILES FROM AN API
const getTypesApi = () => {
  const url = '/files'
  return getApi.get(url)
}

const filteredType = () => {
  const { course_type_id } = filteredParams.value

  console.log(typeFiles.value)
  console.log('Course Type:' + course_type_id)

  return (filteredTypes.value = typeFiles.value.filter((item) => item.Type == course_type_id))
}

onMounted(() => {
  getTypesApi().then((response) => {
    console.log(response.data.documents)
    typeFiles.value = response.data.documents
    filteredType()
    console.log(filteredTypes.value)
  })
})
</script>

<template>
  <div class="subjects_container">
    <Navbar />
    <div class="back_btn">
      <RouterLink :to="{ name: 'home_page' }">Back</RouterLink>
    </div>

    <div class="subjects_split">
      <div class="subjects_wrapper">
        <div class="subject_wrapper">
          <div class="type_files_cont" v-for="item in filteredTypes" :key="item.ID">
            {{ item.Name }}
          </div>
        </div>
      </div>

      <Type class="types_cont" />
    </div>
    <Footer />
  </div>
</template>

<style scoped>
.subjects_container {
  height: 100vh;
  position: relative;
}

.back_btn {
  width: 90%;
  margin: auto;
  margin-bottom: 0.6em;
}

.back_btn a {
  text-decoration: none;
  color: #f8f8f8;
  background: #181818;
  padding: 1em 2em;
  width: 8em;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  margin-top: 1em;
}

.subjects_wrapper {
  margin: 2em auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.subject_wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-items: center;
  gap: 2em;
  font-size: 18px;
  padding: 1em 2em;
  position: relative;
  top: 0;
  left: 0;
}

.subject_wrapper a {
  width: 10em;
  cursor: pointer;
}

.type_files_cont {
  height: 8em;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* .type_files_cont a {
  height: 100%;
  text-decoration: none;
  color: #f8f8f8;
  background: #181818;
  padding: 1em 2em;
  width: 8em;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  margin: 2em 0;
} */

.subjects_split {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 65vh;
  width: 98%;
  margin: auto;
}

.types_cont {
  width: 30%;
  position: relative;
  margin: 2em auto;
  height: 100%;
  overflow: auto;
}
</style>
