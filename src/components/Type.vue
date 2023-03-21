<script setup>
import { ref, onMounted } from 'vue'
import { getApi } from '../api/Api.js'
import router from '../router'

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

const showSubject = () => {
  showSubjects.value = !showSubjects.value
}
const showAuthor = () => {
  showAuthors.value = !showAuthors.value
}
const showType = () => {
  showTypes.value = !showTypes.value
}
const showDate = () => {
  showDates.value = !showDates.value
}

const redirectToType = (file) => {
  console.log(filteredTypes.value)
  // router.push({path: `/types_page/${file.Type}`
  router.push({
    name: 'types',
    params: {
      type: file
    }
  })
}

onMounted(() => {
  getSubjectsApi()
    .then((response) => {
      console.log(response.data.documents)
      files.value = response.data.documents

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
    <div class="type_title">
      <h1>Browse</h1>
    </div>
    <div class="type_wrapper">
      <div class="info">
        <label for="desc">
          <input name="desc" type="checkbox" v-model="showSubjects" />
          <span>
            <p @click="showSubject">Subjects( {{ filteredSubjects.length }})</p>
          </span>
        </label>

        <div
          class="desc_cont"
          v-for="file in filteredSubjects"
          :key="file.ID"
          v-if="showSubjects"
          @click="redirectToType(file.CourseName)"
        >
          <span>
            {{ file.CourseName }}
          </span>
        </div>
      </div>

      <div class="info">
        <label for="desc">
          <input name="desc" type="checkbox" v-model="showAuthors" />
          <span>
            <p @click="showAuthor">Authors/Lecturers ({{ filteredAuthors.length }})</p>
          </span>
        </label>

        <div
          class="desc_cont"
          v-for="file in filteredAuthors"
          :key="file.ID"
          v-if="showAuthors"
          @click="redirectToType(file.AuthorName)"
        >
          <span>
            {{ file.AuthorName }}
          </span>
        </div>
      </div>

      <div class="info">
        <label for="desc">
          <input name="desc" type="checkbox" v-model="showTypes" />
          <span>
            <p @click="showType">Type(s) ({{ filteredTypes.length }})</p>
          </span>
        </label>

        <div
          class="desc_cont"
          v-for="file in filteredTypes"
          :key="file.ID"
          v-if="showTypes"
          @click="redirectToType(file.Type)"
        >
          <span>
            {{ file.Type }}
          </span>
        </div>
      </div>

      <div class="info">
        <label for="desc">
          <input name="desc" type="checkbox" v-model="showDates" />
          <span>
            <p @click="showDate">Date(s) ({{ filteredDates.length }})</p>
          </span>
        </label>

        <div
          class="desc_cont"
          v-for="file in filteredDates"
          :key="file.ID"
          v-if="showDates"
          @click="redirectToType(file.Year)"
        >
          <span>
            {{ file.Year }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.desc_cont span,
.info span {
  /* color:blue; */
  text-decoration: underline;
  cursor: pointer;
}
.type_container {
  position: fixed;
  top: 0;
  left: 0;
  border: 1px solid #212121;
  border-radius: 6px;
}
.type_wrapper {
  position: relative;
  height: 100%;
}
.info {
  /* background: teal; */
  padding: 1em;
}
.info p {
  cursor: pointer;
}
.info label {
  display: flex;
  gap: 1em;
  font-size: 18px;
  font-weight: 700;
}
.info input {
  cursor: pointer;
}

.type_title h1 {
  padding-left: 0.2em;
  position: relative;
}
</style>
