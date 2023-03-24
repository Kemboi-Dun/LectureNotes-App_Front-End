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

const downloadFile = async (fileId) => {
  await getApi.get(`/show/${fileId}`)
}

onMounted(async () => {
  // CHECK FOR TOKEN BEFORE LOADING THE PAGE
  tokenExists.value =
    localStorage.getItem('token') !== null
      ? console.log('Token exists..')
      : router.push({ name: 'login' })

  await getUserApi().then((response) => {
    users.value = response.data.user
    console.log(users.value.School)
  })

  await getFilesApi().then((response) => {
    files.value = response.data.documents
    console.log(files.value)
    // Filter the array based on the type of the "Subject/CourseName" property
    filteredFiles.value = files.value.filter((item) => item.CourseName == users.value.School)
    console.log(filteredFiles.value)
  })
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
            <th>Uploaded By</th>
            <th>Date Updated</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in filteredFiles" :key="item.ID">
            <td>{{ item.UnitCode }}</td>
            <td>{{ item.CourseName }}</td>
            <td>{{ item.Name }}</td>
            <td>{{ item.Semester }}</td>
            <td>{{ item.CourseType }}</td>
            <td>{{ item.AuthorName }}</td>
            <td>{{ item.UpdatedAt }}</td>

            <td>
              <a href="#" @click="downloadFile(item.Name)">
                <i class="fa-solid fa-download"></i>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style>
.dashboard_wrapper {
  width: 100%;
  margin: auto;
  background: #f8f8f8;
}

table,
tr,
th {
  margin: auto;
  border: 1px solid;
  border-radius: 4px;
  padding: 0.3em 0.6em;
  width: 90%;
}
.dashboard_wrapper tbody td {
  border: 1px solid grey;
  padding: 0.3em 0.6em;
  border-radius: 2px;
}
</style>
