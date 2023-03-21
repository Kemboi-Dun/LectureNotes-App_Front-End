<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getApi } from '../api/Api'

const Name = ref('')
const courseType = ref('')
const semester = ref('')
const unitName = ref('')
const unitCode = ref('')
const type = ref('')
// const document = ref('')
const user = ref('')
const route = useRoute()
const router = useRouter()

const file = ref('')
const formData = ref([])
const items = ref([])
const filteredDocs = ref([])
// const filteredPaths = ref([]);

// POST FILE DATA ON SUBMIT

// const postFileApi = () =>{
//     return getApi.post('/file',{
//         Name: Name.value,
//         CourseType: courseType.value,
//         Semester: semester.value,
//         UnitName: unitName.value,
//         UnitCode: unitCode.value.toUpperCase(),
//         Type: type.value.toLowerCase(),
//         Path: filteredDocs.value[0].Path,
//         Year:new Date().getFullYear(),
//         AuthorName: user.value.Username,
//         CourseName: user.value.School,
//         AuthorID: user.value.ID,
//     })
// }

// GET USER DATA
const getUserApi = async () => {
  const id = route.params.id
  return await getApi.get(`/user/${id}`)
}
// GET FILEs
const getFilesApi = async () => {
  return await getApi.get('/files')
}

const onFileChange = () => {
  file.value = event.target.files[0]
  // document.value = event.target.files[0]
  //   console.log('Path of selected file:', selectedFile);
}

const handleSubmit = async () => {
  formData.value = new FormData()
  formData.value.append('Name', Name.value)
  formData.value.append('CourseType', courseType.value)
  formData.value.append('Semester', semester.value)
  formData.value.append('UnitName', unitName.value)
  formData.value.append('UnitCode', unitCode.value.toUpperCase())
  formData.value.append('Type', type.value.toLowerCase())
  formData.value.append('file', file.value)
  formData.value.append('Year', new Date().getFullYear())
  formData.value.append('AuthorName', user.value.Username)
  formData.value.append('CourseName', user.value.School)
  formData.value.append('AuthorID', user.value.ID)
  // formData.value.append('AuthorID', file.value);
  console.log(formData.value)
  try {
    const response = await fetch('http://localhost:3000/file', {
      method: 'POST',
      body: formData.value
    })

    console.log(response)
    // Handle the response from the server as needed
  } catch (error) {
    console.error(error)
  }

  router.push({ name: 'admin' })
  console.log(
    Name.value,
    courseType.value,
    semester.value,
    unitName.value,
    unitCode.value.toUpperCase(),
    file.value,
    type.value
  )
}

onMounted(() => {
  getUserApi().then((response) => {
    console.log(response.data.user)
    user.value = response.data.user
    console.log(user.value.ID)
  })

  getFilesApi().then((response) => {
    console.log(response.data.documents)
    items.value = response.data.documents
    console.log(items.value)

    filteredDocs.value = items.value.filter((item) => item.AuthorID == user.value.ID)
    console.log(filteredDocs.value)
  })
})
</script>
<template>
  <div class="upload_container">
    <div class="upload_wrapper">
      <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
        <!-- FILE NAME -->
        <label for="Name">File Name</label>
        <input type="text" v-model="Name" required />
        <!-- YEAR -->
        <!-- <label for="year">Year</label>
                <input type="date" required> -->
        <!-- CourseType -->
        <label for="courseType">Course Type</label>
        <select name="courseType" v-model="courseType" required>
          <option value="Certificate">Certificate</option>
          <option value="Diploma">Diploma</option>
          <option value="Degree">Degree</option>
        </select>
        <!-- CourseName -->
        <!-- <label for="courseName">Course Name</label>
                <select name="courseName" required>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Education">Education</option>
                    <option value="Bussiness">Bussiness</option>
                </select> -->
        <!-- Semester -->
        <label for="semester">Semester</label>
        <select name="semester" v-model="semester" required>
          <option value="1.1">1.1</option>
          <option value="1.2">1.2</option>
          <option value="2.1">2.1</option>
          <option value="2.2">2.2</option>
          <option value="3.1">3.1</option>
          <option value="3.2">3.2</option>
          <option value="3.3">3.3</option>
          <option value="4.1">4.1</option>
          <option value="4.2">4.2</option>
        </select>
        <!-- UnitName -->
        <label for="unitName">Unit Name</label>
        <input type="text" v-model="unitName" required />
        <!-- UnitCode -->
        <label for="unitCode">Unit Code</label>
        <input type="text" placeholder="BSCS,GUCC..." v-model="unitCode" required />
        <!-- Type -->
        <label for="type">Type</label>
        <!-- <input type="text" placeholder="Notes,Article,PastPaper.." v-model="type" required /> -->
        <select name="type" v-model="type" required>
          <option value="Notes">Notes</option>
          <option value="Past Paper">Past Paper</option>
          <option value="Brochure">Brochure</option>
        </select>

        <!-- FILE -->
        <!-- <label for="document">Doc</label> -->
        <input type="file" @change="onFileChange" name="file" />

        <button type="submit">Upload File</button>
      </form>
    </div>
    <div class="display_file" v-for="item in filteredDocs" :key="item.ID">
      {{ item.Path }}
      <!-- {{ item.AuthorID }} -->
    </div>
  </div>
</template>
