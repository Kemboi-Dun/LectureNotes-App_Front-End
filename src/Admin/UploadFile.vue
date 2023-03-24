<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getApi } from '../api/Api'

// const Name = ref('')
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
  // formData.value.append('Name', Name.value)
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
    alert('File uploaded succesfully!')
    courseType.value = ''
    semester.value = ''
    unitName.value = ''
    unitCode.value = ''
    type.value = ''
    file.value = ''

    console.log(response)
    // Handle the response from the server as needed
  } catch (error) {
    console.error(error)
  }

  router.push({ name: 'admin' })
  console.log(
    // Name.value,
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
    <h1>Upload File</h1>

    <div class="upload_wrapper">
      <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
        <label for="courseType">Course Type</label>
        <select name="courseType" v-model="courseType" required>
          <option value="Certificate">Certificate</option>
          <option value="Diploma">Diploma</option>
          <option value="Degree">Degree</option>
        </select>

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
        <input class="file_input" type="file" @change="onFileChange" name="file" />
        <button type="submit" class="button">
          <span class="button_lg">
            <span class="button_sl"></span>
            <span class="button_text">Upload File</span>
          </span>
        </button>
        <!-- <button type="submit">Upload File</button> -->
      </form>
    </div>
  </div>
</template>
<style scoped>
.upload_container {
  background: #f8f8f8;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  margin: auto;
  height: 70vh;
  width: 70%;
  padding: 0.6em 2em;
  border-radius: 4px;
}
.upload_wrapper {
  width: 50%;
}
.upload_wrapper form {
  display: flex;
  flex-direction: column;
  width: 60%;
  font-size: 18px;
  gap: 0.5em;
}
.upload_wrapper input {
  height: 30px;
  font-size: 18px;
  padding: 0.4em 0.8em;
  border: 1px solid grey;
  border-radius: 3px;
  outline: none;
}
.upload_wrapper select {
  height: 30px;
  outline: none;
  cursor: pointer;
  border: 1px solid grey;
  border-radius: 3px;
  font-size: 18px;
}
.file_input {
  padding: 0.1em !important;
  cursor: pointer;
}

.button {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  border: none;
  background: none;
  color: #0f1923;
  cursor: pointer;
  position: relative;
  padding: 8px;
  margin-bottom: 20px;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 14px;
  transition: all 0.15s ease;
}

.button::before,
.button::after {
  content: '';
  display: block;
  position: absolute;
  right: 0;
  left: 0;
  height: calc(50% - 5px);
  border: 1px solid #7d8082;
  transition: all 0.15s ease;
}

.button::before {
  top: 0;
  border-bottom-width: 0;
}

.button::after {
  bottom: 0;
  border-top-width: 0;
}

.button:active,
.button:focus {
  outline: none;
}

.button:active::before,
.button:active::after {
  right: 3px;
  left: 3px;
}

.button:active::before {
  top: 3px;
}

.button:active::after {
  bottom: 3px;
}

.button_lg {
  position: relative;
  display: block;
  padding: 10px 20px;
  color: #fff;
  background-color: #0f1923;
  overflow: hidden;
  box-shadow: inset 0px 0px 0px 1px transparent;
}

.button_lg::before {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 2px;
  height: 2px;
  background-color: #0f1923;
}

.button_lg::after {
  content: '';
  display: block;
  position: absolute;
  right: 0;
  bottom: 0;
  width: 4px;
  height: 4px;
  background-color: #0f1923;
  transition: all 0.2s ease;
}

.button_sl {
  display: block;
  position: absolute;
  top: 0;
  bottom: -1px;
  left: -8px;
  width: 0;
  background-color: #047a67;
  transform: skew(-15deg);
  transition: all 0.2s ease;
}

.button_text {
  position: relative;
}

.button:hover {
  color: #0f1923;
}

.button:hover .button_sl {
  width: calc(100% + 15px);
}

.button:hover .button_lg::after {
  background-color: #fff;
}
</style>
