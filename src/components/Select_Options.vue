<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getApi } from '../api/Api'
const router = useRouter()
const route = useRoute()

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

const files = ref([])
const filteredYears = ref([])
const filteredCourseType = ref([])
const filteredCourseName = ref([])
const filteredSemester = ref([])

const users = ref([])

const message = ref('')

const getUserApi = async () => {
  const id = route.params.id
  return await getApi.get(`/user/${id}`)
}

// FETCH FILES DATA FROM API
const getFilesApi = () => {
  const url = '/files'
  return getApi.get(url)
}

const redirectToUnitsPage = () => {
  router.push({
    name: 'units',
    params: {
      id: route.params.id,
      year_id: selectedYearId.value,
      course_id: selectedCourseId.value,
      course_type_id: selectedCourseTypeId.value,
      semester_id: selectedSemesterNameId.value
    }
  })
}

// FETCH SELECT OPTIONS DATA FROM THE STORE

onMounted(() => {
  getUserApi().then((response) => {
    // console.log(response.data)
    users.value = response.data.user
    console.log(users.value.Username)
  })

  getFilesApi().then((response) => {
    console.log(response.data.documents)
    files.value = response.data.documents

    // Filter the array based on "YEAR" property
    filteredYears.value = files.value.filter(
      (obj, index, self) => index === self.findIndex((t) => t.Year === obj.Year)
    )
    console.log(filteredYears.value)

    // Filter the array based on "COURSE TYPE" property
    filteredCourseType.value = files.value.filter(
      (obj, index, self) => index === self.findIndex((t) => t.CourseType === obj.CourseType)
    )
    console.log(filteredCourseType.value)

    // Filter the array based on "COURSE NAME" property
    filteredCourseName.value = files.value.filter(
      (obj, index, self) => index === self.findIndex((t) => t.CourseName === obj.CourseName)
    )
    console.log(filteredCourseName.value)

    // Filter the array based on "SEMESTER" property
    filteredSemester.value = files.value.filter(
      (obj, index, self) => index === self.findIndex((t) => t.Semester === obj.Semester)
    )
    console.log(filteredSemester.value)
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
          <option :value="year.Year" v-for="year in filteredYears" :key="year.ID">
            {{ year.Year }}
          </option>
        </select>
      </div>
      <!-- *? Course Type -->
      <div class="select_option">
        <label for="select">Course Type:</label>
        <!-- <Loader v-if="isCourseTypesLoading" /> -->
        <select name="course_type" id="select" class="select-class" v-model="selectedCourseTypeId">
          <!-- ADDED A KEY -->
          <option
            :value="course_type.CourseType"
            v-for="course_type in filteredCourseType"
            :key="course_type.ID"
          >
            {{ course_type.CourseType }}
          </option>
        </select>
      </div>

      <!-- *? Course Name -->
      <div class="select_option">
        <label for="select">Course Name:</label>
        <!-- <Loader v-if="isCoursesLoading" /> -->
        <select name="course" id="select" class="select-class" v-model="selectedCourseId">
          <!-- ADDED A KEY -->
          <option :value="course.CourseName" v-for="course in filteredCourseName" :key="course.ID">
            {{ course.CourseName }}
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
          <option
            :value="semester.Semester"
            v-for="semester in filteredSemester"
            :key="semester.ID"
          >
            {{ semester.Semester }}
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
