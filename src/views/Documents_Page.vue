<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import CommentsPage from './CommentsPage.vue'
import { RouterLink,useRoute } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import { getApi } from '../api/Api'

const filesrcs = ref([]);
const route = useRoute();
const filteredDocuments = ref([])
const filteredParams = ref({
  year_id: route.params.year_id,
  course_type_id: route.params.course_type_id,
  course_id: route.params.course_id,
  semester_id: route.params.semester_id,
  unit_id: route.params.unit_id,
  folder_id: route.params.folder_id,
});

const users = ref([]);
 
const getUserApi = async () => {
  const id = route.params.id
  console.log(id);
  return await getApi.get(`/user/${id}`)
}

const getDocApi = () => {
  const url = '/files'
  return getApi.get(url)
}

const filtereDocuments = () => {
  const { year_id,course_type_id,course_id,semester_id,unit_id, folder_id } = filteredParams.value

  console.log(unit_id)
  console.log('Year:' + year_id, "Course Type:" + course_type_id, "Course:" + course_id, "Semester:" + semester_id, "Unit:" + unit_id  )

  return filteredDocuments.value = filesrcs.value.filter((item) => item.Year == year_id && item.CourseType == course_type_id && item.CourseName == course_id && item.Semester == semester_id && item.UnitName == unit_id && item.ID == folder_id)
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

const downloadFile = async(fileId)=> {
  await getApi.get(`/DOC_DOWNLOAD/${fileId}`)
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
          console.log("CAN NOT DOWNLOAD FILE..")
          console.error(error);
        });
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
  
      getUserApi().then((response) => {
    console.log(response.data)
    users.value = response.data.user
    console.log(users.value.ID)
  })

  getFile()
})
</script>

<template>
  <div class="download_container">
    <Navbar />

    <div class="back_btn">
      <RouterLink :to="{ name: 'folders' }">Back</RouterLink>
    </div>
    <div class="downloads_split">
      <div class="downloads_wrapper">
        <div class="download_wrapper">
          <ol>
            <li class="download_cont_wrapper" v-for="(filesrc, index) in filteredDocuments" :key="index">
              <div @click.prevent="downloadFile(filesrc.Path)">
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
      <CommentsPage class="comments_cont" />
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
