<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import { getApi } from '../api/Api'
import ArticlesPage from '../components/ArticlesPage.vue'

const filesrcs = ref([])
const route = useRoute()
const filteredDocuments = ref([])
const filteredParams = ref({
  // id: route.params.id,
  course_type_id: route.params.type
})

const getDocApi = () => {
  const url = '/files'
  return getApi.get(url)
}

const filtereDocuments = () => {
  const { course_type_id } = filteredParams.value

  console.log(course_type_id)
  console.log('Course Type:' + course_type_id)

  return (filteredDocuments.value = filesrcs.value.filter(
    (item) =>
      // item.ID == course_type_id ||
      item.CourseName == course_type_id ||
      item.AuthorName == course_type_id ||
      item.Type == course_type_id ||
      item.Year == course_type_id
  ))
}

const getFile = () => {
  getDocApi()
    .then((response) => {
      console.log(response.data)
      filesrcs.value = response.data.documents
      filtereDocuments()
      console.log(filteredDocuments.value)
    })
    .catch(() => {
      console.log('An Error occured while fetching documents..')
    })
}

const downloadFile = async (fileId) => {
  await getApi.get(`/show/${fileId}`)
}
// const forceFileDownload = (response, item) => {
//   var headers = response.headers
//   var extension = item.Path.substring(item.Path.lastIndexOf('.') + 1)
//   var blob = new Blob([response.data], { type: headers['content-type'] })
//   var link = document.createElement('a')
//   link.href = window.URL.createObjectURL(blob)
//   link.download = `${item.name}.${extension}`
//   link.click()
//   link.remove()
// }

// const downloadFile = (item) => {
//   axios({
//     method: 'get',
//     url: item.Path,
//     responseType: 'blob'
//   })
//     .then((response) => {
//       forceFileDownload(response, item)
//     })
//     .catch(() => {
//       console.log('An error occured....')
//     })
// }
onMounted(() => {
  getFile()
})
</script>

<template>
  <div class="download_container">
    <Navbar />

    <div class="back_btn">
      <RouterLink :to="{ name: 'home_page' }">Back</RouterLink>
    </div>
    <div class="downloads_split">
      <div class="downloads_wrapper">
        <div class="download_wrapper">
          <ol>
            <li
              class="download_cont_wrapper"
              v-for="(filesrc, index) in filteredDocuments"
              :key="index"
            >
              <div @click.prevent="downloadFile(filesrc.Name)">
                <a :href="filesrc.Path" target="_blank" class="download_doc">
                  <span>
                    {{ filesrc.Name }}
                  </span>
                  <i class="fa-solid fa-download"></i>
                </a>
              </div>
            </li>
          </ol>
        </div>
      </div>

      <ArticlesPage class="comments_cont" />

      <!-- <Type class="comments_cont" /> -->
    </div>

    <Footer />
  </div>
</template>

<style scoped>
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

.downloads_split {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 65vh;
  width: 98%;
  margin: auto;
}

.comments_cont {
  background: #f8f8f8;
  width: 50%;
  position: relative;
  margin: 2em auto;
  height: 100%;
  overflow: auto;
}

.download_container {
  height: 100%;
  position: relative;
}

.downloads_wrapper {
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.downloads_wrapper a {
  text-decoration: none;
  color: #f8f8f8;
  background: #181818;
  padding: 0.2em 1em;
  width: 8em;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 4px;
  margin-top: 2em;
}

.download_wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  gap: 2em;
  font-size: 18px;
  padding: 1em 2em;
  position: relative;
  top: 0;
  left: 0;
}

.download_wrapper ol {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-items: center;
  gap: 2em;
  font-size: 18px;
  padding: 1em;
  position: relative;
  top: 0;
  left: 0;
}

.download_cont_wrapper {
  display: flex;
}

.download_doc {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
  height: 6.5em;
}

.download_doc i {
  padding: 0 0.3em;
  width: 100%;
  text-align: end;
}
</style>
