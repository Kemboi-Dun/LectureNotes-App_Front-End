<script setup>
import { ref, onMounted } from 'vue'
import { getApi } from '../api/Api'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const tokenExists = ref(false)
const users = ref([])
const files = ref([])
const filteredFiles = ref([])

// GET FILES FROM API
const getFilesApi = async () => {
  const url = '/files'
  return await getApi.get(url)
}
//  GET USER FROM PARAM
const getUserApi = async () => {
  const id = route.params.id
  return await getApi.get(`/user/${id}`)
}

// DELETE FILE FROM RECORDS

// const deleteFileApi = async (file_id)=>{

// }

const deleteFile = (file_id) => {
  const id = file_id
  console.log(id)
   getApi.delete(`/file/${id}`)
   .then((response)=>{
    console.log(response.data);
    filteredFiles.value = filteredFiles.value.filter(file => file.ID !== file_id);
   })
}



onMounted(() => {
  // CHECK FOR TOKEN BEFORE LOADING THE PAGE
  tokenExists.value =
    localStorage.getItem('token') !== null
      ? console.log('Token exists..')
      : router.push({ name: 'login' })

  getUserApi().then((response) => {
    // console.log(response.data)
    users.value = response.data.user
    console.log(users.value.Username)
  })

  getFilesApi().then((response) => {
    // console.log(response.data.files)
    files.value = response.data.documents
    console.log(files.value)
    // Filter the array based on the type of the "Subject/CourseName" property
    filteredFiles.value = files.value.filter((item) => item.AuthorID == users.value.ID)
    console.log(filteredFiles.value)
  })
//   deleteFile()
})
</script>

<template>
  <div class="dashboard_container">
    <div class="dashboard_wrapper">
      <table>
        <thead>
          <tr>
            <th>Unit Code</th>
            <th>Course Name</th>
            <th>Document Name</th>
            <th>Semester</th>
            <th>Course Type</th>
            <th>File Type</th>
            <th>Uploaded By</th>
            <th>Date Updated</th>
            <th>Download</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in filteredFiles" :key="item.ID">
            <td>{{ item.UnitCode }}</td>
            <td>{{ item.CourseName }}</td>
            <td>{{ item.Name }}</td>
            <td>{{ item.Semester }}</td>
            <td>{{ item.CourseType }}</td>
            <td>{{ item.Type }}</td>
            <td>{{ item.AuthorName }}</td>
            <td>{{ item.UpdatedAt }}</td>

            <td>
              <a :href="item.Path">
                <i class="fa-solid fa-download"></i>
              </a>
            </td>
            <td>
              <i @click="deleteFile(item.ID)" class="fa-solid fa-trash"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
