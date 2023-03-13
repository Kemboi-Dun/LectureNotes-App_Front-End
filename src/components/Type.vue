<script setup>
import { ref, onMounted } from 'vue'
import { getApi } from '../api/Api.js'

const files = ref([])
const filteredSubjects = ref([])
const filteredAuthors = ref([])
const filteredTypes = ref([])
const filteredDates = ref([])
const showSubjects = ref(false)
const showAuthors = ref(false)
const showTypes = ref(false)
const showDates = ref(false)

// GET FILES FROM ENDPONTS
const getSubjectsApi = () => {
  const url = '/files'
  return getApi.get(url)
}

onMounted(() => {
  getSubjectsApi()
    .then((response) => {
      console.log(response.data.files)
      files.value = response.data.files

      // Filter the array based on the type of the "Subject/CourseName" property
      filteredSubjects.value = files.value.filter(
        (obj, index, self) => index === self.findIndex((t) => t.CourseName === obj.CourseName)
      )
      console.log(filteredSubjects.value)

      // Filter the array based on the type of the "Authors" property
      filteredAuthors.value = files.value.filter(
        (obj, index, self) => index === self.findIndex((t) => t.AuthorName === obj.AuthorName)
      )
      console.log(filteredAuthors.value)

      // Filter the array based on the type of the "Types" property
      filteredTypes.value = files.value.filter(
        (obj, index, self) => index === self.findIndex((t) => t.Type === obj.Type)
      )
      console.log(filteredTypes.value)

      // Filter the array based on the type of the "Date" property
      filteredDates.value = files.value.filter(
        (obj, index, self) => index === self.findIndex((t) => t.Year === obj.Year)
      )
      console.log(filteredDates.value)
    })
    .catch(() => {
      console.log('An Error occured while fetching some files...')
    })
})
</script>

<template>
  <div class="type_container">
    <div class="type_wrapper">
        <h1>Browse</h1>
      <div class="info">
        <label for="desc">
          <input name="desc" type="checkbox" v-model="showSubjects" />
       
          <p >Subjects( {{ filteredSubjects.length }})</p>
        </label>
   

        <div
          class="desc_cont"
          v-for="file in filteredSubjects"
          :key="file.ID"
          v-if="showSubjects"
        >
          {{ file.CourseName }}
        </div>
      </div>

      <div class="info">
        <label for="desc">
          <input name="desc" type="checkbox" v-model="showAuthors" />
         
          <p >Authors/Lecturers ({{ filteredAuthors.length }})</p>
        </label>
      
        <div
          class="desc_cont"
          v-for="file in filteredAuthors"
          :key="file.ID"
          v-if="showAuthors"
        >
          {{ file.AuthorName }}
        </div>
      </div>

      <div class="info">
        <label for="desc">
            <input name="desc" type="checkbox" v-model="showTypes" />
           
          <p>Type(s) ({{ filteredTypes.length }})</p>
        </label>
       

        <div class="desc_cont" v-for="file in filteredTypes" :key="file.ID" v-if="showTypes">
          {{ file.Type }}
        </div>
      </div>

      <div class="info">
        <label for="desc">
            <input name="desc" type="checkbox" v-model="showDates" />
          
          <p name="desc">Date(s) ({{ filteredDates.length }})</p>
        </label>
     

        <div class="desc_cont" v-for="file in filteredDates" :key="file.ID" v-if="showDates">
          {{ file.Year }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.type_container{
    position: fixed;
    top: 0;
  left: 0;
  border:1px solid #212121;
  border-radius: 6px;
}
.type_wrapper{
    position: relative;
    height: 100%;
}
.info{
    /* background: teal; */
    padding: 1em;
    
}
.info label{
display: flex;
gap:1em;
font-size: 18px;
font-weight: 700;
}
.info input{
    cursor: pointer;
}
.type_wrapper h1{
    padding-left: 0.2em;
}
</style>