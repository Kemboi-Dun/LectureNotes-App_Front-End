<script setup>
import { ref,onMounted } from 'vue'
import { useRoute } from 'vue-router';
import { getApi } from '../api/Api';

const Name = ref('')
const courseType = ref('')
const semester = ref('')
const unitName = ref('')
const unitCode = ref('')
const type = ref('')
const document = ref('')
const user = ref('');
const route = useRoute();

// POST FILE DATA ON SUBMIT

const postFileApi = () =>{
    return getApi.post('/file',{
        Name: Name.value,
        CourseType: courseType.value,
        Semester: semester.value,
        UnitName: unitName.value,
        UnitCode: unitCode.value.toUpperCase(),
        Type: type.value.toLowerCase(),
        Path: document.value,
        Year:new Date().getFullYear(),
        AuthorName: user.value.Username,
        CourseName: user.value.School,
    })
}

// GET USER DATA
const getUserApi = async ()=>{
    const id = route.params.id;
    return await getApi.get(`/user/${id}`);
}


const onFileChange = () => {
  document.value = event.target.files[0]
  //   console.log('Path of selected file:', selectedFile);
}

const handleSubmit = () => {

    postFileApi()
    .then((response)=>{
        console.log(response.data);

    })

  console.log(
    Name.value,
    courseType.value,
    semester.value,
    unitName.value,
    unitCode.value.toUpperCase(),
    type.value,
    document.value
  )
}


onMounted(()=>{
    getUserApi()
    .then((response)=>{
        console.log(response.data.user);
        user.value = response.data.user;
        console.log(user.value.Username);
    })
})

</script>
<template>
  <div class="upload_container">
    <div class="upload_wrapper">
      <form @submit.prevent="handleSubmit">
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
        <input type="file" @change="onFileChange" />

        <button type="submit">Upload File</button>
      </form>
    </div>
  </div>
</template>
