<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getApi } from '../api/Api'
const router = useRouter()

const years = ref([])
// const isYearsLoading = ref(false);
const selectedYearId = ref('')
const course_types = ref([])
// const isCourseTypesLoading = ref(false);
const selectedCourseTypeId = ref('')
const courses = ref([])
// const isCoursesLoading = ref(false);
const selectedCourseId = ref('')
const semesters = ref([])
const isSemestersLoading = ref(false)
const selectedSemesterNameId = ref('')

const message = ref('')

const redirectToUnitsPage = () => {
  console.log(selectedYearId.value)

  router.push({
    name: 'units',
    params: {
      year_id: selectedYearId.value,
      course_id: selectedCourseId.value,
      course_type_id: selectedCourseTypeId.value,
      semester_id: selectedSemesterNameId.value
    }
  })
}

// FETCH SELECT OPTIONS DATA FROM THE STORE

const getYearsApi = () => {
  const url = '/years'
  return getApi.get(url)
}
const getCourseTypesApi = () => {
  const url = '/courseTypes'
  return getApi.get(url)
}

const getCourseNameApi = () => {
  const url = '/courses'
  return getApi.get(url)
}
const semesterFilterApi = () => {
  const url = '/semesterNames'
  return getApi.get(url, {
    params: {
      course_id: selectedCourseId.value,
      course_type_id: selectedCourseTypeId.value
    }
  })
}

onMounted(() => {
  getYearsApi()
    .then((response) => {
      console.log(response.data)
      years.value = response.data.years
    })
    .catch((error) => {
      const error_data = error.response.data
      console.log(error_data)
    })

  getCourseTypesApi()
    .then((response) => {
      console.log(response.data)
      course_types.value = response.data.courseTypes
    })
    .catch((error) => {
      const error_data = error.response.data
      console.log(error_data)
    })

  getCourseNameApi()
    .then((response) => {
      console.log(response.data)
      courses.value = response.data.courses
    })
    .catch((error) => {
      const error_data = error.response.data
      console.log(error_data)
    })
  semesterFilterApi()
    .then((response) => {
      console.log(response.data)
      semesters.value = response.data.semesterNames
      isSemestersLoading.value = false
      console.log('Stop Loader...')
    })
    .catch((error) => {
      const error_data = error.response.data
      console.log(error_data)
    })
})
</script>

<template>
  <div class="select_container">
    <div class="select_wrapper">
      <!-- *?YEAR -->
      <div class="select_option">
        <label for="select">Year:</label>
        <!-- <Loader v-if="isYearsLoading" /> -->
        <select name="year" id="select" class="select-class" v-model="selectedYearId">
          <!-- ADDED A KEY -->
          <option :value="year.ID" v-for="year in years" :key="year.ID">
            {{ year.Name }}
          </option>
        </select>
      </div>
      <!-- *? Course Type -->
      <div class="select_option">
        <label for="select">Course Type:</label>
        <!-- <Loader v-if="isCourseTypesLoading" /> -->
        <select name="course_type" id="select" class="select-class" v-model="selectedCourseTypeId">
          <!-- ADDED A KEY -->
          <option :value="course_type.ID" v-for="course_type in course_types" :key="course_type.ID">
            {{ course_type.Name }}
          </option>
        </select>
      </div>

      <!-- *? Course Name -->
      <div class="select_option">
        <label for="select">Course Name:</label>
        <!-- <Loader v-if="isCoursesLoading" /> -->
        <select name="course" id="select" class="select-class" v-model="selectedCourseId">
          <!-- ADDED A KEY -->
          <option :value="course.ID" v-for="course in courses" :key="course.ID">
            {{ course.Name }}
          </option>
        </select>
      </div>

      <!-- *? Semester -->
      <div class="select_option">
        <label for="select">Semester:</label>
        <!-- <Loader v-if="isSemestersLoading" /> -->
        <select
          name="semester"
          id="select"
          class="select-class"
          v-model="selectedSemesterNameId"
          :disabled="!selectedCourseId && selectedCourseTypeId"
        >
          <!-- ADDED A KEY -->
          <option :value="semester.ID" v-for="semester in semesters" :key="semester.ID">
            {{ semester.Name }}
          </option>
        </select>
      </div>
    </div>
    <div class="error_message">
      {{ message }}
    </div>
    <!-- *? LOAD UNITS BUTTON -->
    <div class="mini_select_nav_btn">
      <button @click="redirectToUnitsPage">Load Units</button>
    </div>
  </div>
</template>

<style scoped>
.select_container {
  /* background: blue; */
  width: 90%;
  margin: 2em auto;
  height: 50%;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
}
.select_wrapper {
  /* background: blue; */
  width: 90%;
  margin: 2em auto;
  height: 50%;
  display: flex;
  justify-content: space-around;
  /* flex-direction: column; */
  /* justify-content: center; */
  align-items: center;
}
.select_option {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 1em;
  /* background: lime; */
}
.select_option label {
  font-size: 20px;
}
.select_option select {
  border: 1px solid #212121;
  font-size: 16px;
  border-radius: 6px;
  width: 12em;
  padding: 0.6em;
  cursor: pointer;
  outline: none;
}
.mini_select_nav_btn button {
  border: none;
  border-radius: 8px;
  padding: 1em 2em;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
}
</style>
