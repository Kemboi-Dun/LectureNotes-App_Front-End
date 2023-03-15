<script setup>
import AdminNav from './AdminNav.vue'
import Footer from '../components/Footer.vue';
import { ref,onMounted } from 'vue';
import { getApi } from '../api/Api';
import { useRouter,useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const files = ref([]);
const tokenExists  = ref(false);
const filteredFiles = ref([]);
const filteredParams = ref({
  course_type_id: route.params.id
})

const getFilesApi = ()=>{
    const url = '/files';
    return getApi.get(url);
}


const filteredFile = () => {
  const { course_type_id } = filteredParams.value

  console.log(files.value)
  console.log('Response Files: ' + course_type_id)

  return (filteredFiles.value = files.value.filter((item) => item.CourseName == course_type_id))
}


onMounted(()=>{
    tokenExists.value = localStorage.getItem('token') !== null ? console.log("Token exists.."):  router.push({name:'login'})
    getFilesApi()
    .then((response)=>{
        console.log(response.data.files);
        files.value = response.data.files;
        filteredFile()
        console.log( filteredFiles.value )
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
        <th>Document Name</th>
        <th>Semester</th>
        <th>Course Type</th>
        <th>Uploaded By</th>
        <th> Date Updated</th>
        <th>Download</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in filteredFiles" :key="item.ID">
        <td>{{ item.UnitCode }}</td>
        <td>{{ item.Name }}</td>
        <td>{{ item.Semester }}</td>
        <td>{{ item.CourseType }}</td>
        <td>{{ item.AuthorName }}</td>
        <td>{{ item.UpdatedAt }}</td>
       

            <td>
                <a :href=item.Path>
                    <i class="fa-solid fa-download"></i>
                </a>
            </td>
       
      </tr>
    </tbody>
  </table>
        </div>
       
    </div>
</template>