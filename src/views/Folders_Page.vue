<script setup>
import { getApi } from '../api/Api';
import { ref, onMounted } from 'vue';
import { RouterLink, useRouter, useRoute } from 'vue-router';
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue';
import Type from '../components/Type.vue';

const folders = ref([]);
const router = useRouter();
const route = useRoute();
const message = ref('');
const filteredFolder = ref([])
const filteredParams = ref({
  year_id: route.params.year_id,
  course_type_id: route.params.course_type_id,
  course_id: route.params.course_id,
  semester_id: route.params.semester_id,
  unit_id: route.params.unit_id,
})


 
const redirect_to_document = (folder_id) => {
   router.push({
      name: "documents",
      params: {
         year_id: route.params.year_id,
         course_type_id: route.params.course_type_id,
         course_id: route.params.course_id,
         semester_id: route.params.semester_id,
         unit_id: route.params.unit_id,
         folder_id: folder_id,
      }
   });
};
const loadDocumentsApi = () => {
   const url = "/files";
   return getApi.get(url)}

// const loadDocumentsApi = () => {
//    const url = "/files";
//    return getApi.get(url, {
//       params: {
//          year_id: route.params.year_id,
//          course_type_id: route.params.course_type_id,
//          course_id: route.params.course_id,
//          semester_id: route.params.semester_id,
//          unit_id: route.params.unit_id,
//          folder_id: route.params.folder_id,
//       }
//    })
// }

const filteredFolders = () => {
  const { year_id,course_type_id,course_id,semester_id,unit_id } = filteredParams.value

  console.log(unit_id)
  console.log('Year:' + year_id, "Course Type:" + course_type_id, "Course:" + course_id, "Semester:" + semester_id, "Unit:" + unit_id  )

  return filteredFolder.value = folders.value.filter((item) => item.Year == year_id && item.CourseType == course_type_id && item.CourseName == course_id && item.Semester == semester_id && item.UnitName == unit_id)
}



onMounted(() => {
   console.log("Start Loader...");
   loadDocumentsApi()
      .then((response) => {
         console.log(response.data.files)

         folders.value = response.data.files
         filteredFolders()

         console.log(filteredFolder.value)

         if (filteredFolder.value.length === 0) {
            message.value = "No Folders Found!";
         } else {
            message.value = "";
         }
      })
      .catch((error) => {
         message.value = "Select a  Unit First..."
      });
})

</script>
<template>
   <div class="folders_container">

      <Navbar/>

      <div class="back_btn">
         <RouterLink :to="{ name: 'units' }">Back</RouterLink>
      </div>

      <div class="folders_split">

         <div class="folders_wrapper">

<div class="folder_wrapper">
<div class="folder_cont_wrapper" v-for="folder in filteredFolder" :key="folder.ID">
   <a @click="redirect_to_document(folder.ID)">
      <i class="fa-solid fa-folder">
      </i>
      <span>
         {{ folder.AuthorName }}
      </span>
      </a>
</div>
</div>
<div class="message">
                    {{ message }}
                </div>
</div>
<Type class="types_cont" />

      </div>

   
   <Footer/>
</div>
</template>

<style scoped>
.folders_container{
    height: 100vh;
    position: relative;
}
.folders_wrapper{
   margin: 2em auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    width: 100%;
    height: 100%;
    overflow: auto;

}
.folders_wrapper a{
    text-decoration: none;
    color: #f8f8f8;
    background: #181818;
    padding: 1em 2em;
    width: 8em;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    margin-top: 2em;
}
.folder_wrapper{
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
.folder_wrapper a{
    width:10em;
    cursor: pointer;
    height: 100%;
}
.folder_cont_wrapper{
   height:8em;
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
}
.folder_cont_wrapper a{
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   align-items: center;
   gap:4px;
   width: 100%;
}
.folder_cont_wrapper a span{
   width:100%;
}
.folder_cont_wrapper i{
   padding: 0 0.3em;
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
.folders_split {
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