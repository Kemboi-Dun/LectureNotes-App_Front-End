<script setup>
import { onMounted, ref, reactive } from 'vue'
import { RouterLink, useRouter, useRoute } from 'vue-router'
import { getApi } from '../api/Api.js'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import Type from '../components/Type.vue'

const router = useRouter()
const route = useRoute()
const message = ref('')
const units = ref([])
const filteredUnit = ref([])
const filteredParams = ref({
  // studentId : route.params.id,
  year_id: route.params.year_id,
  course_type_id: route.params.course_type_id,
  course_id: route.params.course_id,
  semester_id: route.params.semester_id
})



const users = ref([]);

const getUserApi = async () => {
  const id = route.params.id
  console.log(id);
  return await getApi.get(`/user/${id}`)
}

const redirect_to_folders = (unit_id) => {
  router.push({
    name: 'folders',
    params: {
      studentId : route.params.id,
      year_id: route.params.year_id,
      course_type_id: route.params.course_type_id,
      course_id: route.params.course_id,
      semester_id: route.params.semester_id,
      unit_id: unit_id
    }
  })
}

const loadFoldersApi = () => {
  const url = '/files'
  return getApi.get(url)
}

const filteredUnits = () => {
  const { year_id, course_type_id, course_id, semester_id } = filteredParams.value

  console.log(units.value)
  console.log(
    'Year:' + year_id,
    'Course Type:' + course_type_id,
    'Course:' + course_id,
    'Semester:' + semester_id
  )

  return (filteredUnit.value = units.value.filter(
    (item) =>
      item.Year == year_id &&
      item.CourseType == course_type_id &&
      item.CourseName == course_id &&
      item.Semester == semester_id
  ))
}

onMounted(() => {
  console.log('Start Loader...')

  getUserApi().then((response) => {
    console.log(response.data)
    users.value = response.data.user
    console.log(users.value.ID)
  })

  loadFoldersApi()
    .then((response) => {
      console.log(response.data.documents)
      units.value = response.data.documents
      filteredUnits()

      console.log(filteredUnit.value)

      if (filteredUnit.value.length === 0) {
        message.value = 'No Files Found!'
      } else {
        message.value = ''
      }
    })
    .catch(() => {
      message.value = 'Select all the inputs First..'
    })
})
</script>

<template>
  <div class="units_container">
    <Navbar />

    <div class="back_btn">
      <RouterLink :to="{ name: 'home_page' }">Back</RouterLink>
    </div>

    <div class="units_split">
      <div class="units_wrapper">
        <div class="unit_wrapper">
          <div class="unit_cont_wrapper" v-for="unit in filteredUnit" :key="unit.ID">
            <a @click.prevent="redirect_to_folders(unit.UnitName)">
              <div class="unit_name">
                {{ unit.UnitCode }}

                {{ unit.UnitName }}
              </div>
            </a>
          </div>
        </div>
        <div class="message">
          {{ message }}
        </div>
      </div>

      <Type class="types_cont" />
    </div>
    <Footer />
  </div>
</template>

<style scoped>
.units_container {
  height: 100vh;
  position: relative;
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

.units_wrapper {
  margin: 2em auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.unit_wrapper {
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

.unit_wrapper a {
  width: 10em;
  cursor: pointer;
}

.unit_cont_wrapper {
  height: 8em;
  display: flex;
  justify-content: center;
  align-items: center;
}

.unit_cont_wrapper a {
  height: 100%;
  text-decoration: none;
  color: #f8f8f8;
  background: #181818;
  padding: 1em 2em;
  width: 8em;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  margin: 2em 0;
}

.units_split {
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
