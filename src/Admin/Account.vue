<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getApi } from '../api/Api'

const users = ref([])
const route = useRoute()
const updateUsername = ref('')
const updateSchool = ref('')
const updateEmail = ref('')
const updatePassword = ref('')
const updateConfirmPassword = ref('')
const error = ref('')

const getUserApi = async () => {
  const id = route.params.id
  return await getApi.get(`/user/${id}`)
}

// POST USER ON SUBMIT
const postUserApi = async () => {
  const id = route.params.id
  return await getApi.put(`/user/${id}`, {
    Username: updateUsername.value,
    School: updateSchool.value,
    Email: updateEmail.value,
    Password: updatePassword.value
  })
}

const handleSubmit = () => {
  if (updatePassword.value !== updateConfirmPassword.value) {
    error.value = 'Passwords do not match !'
  } else {
    postUserApi().then((response) => {
      console.log(response.data)
    })
  }
}

onMounted(() => {
  getUserApi().then((response) => {
    console.log(response.data.user)
    users.value = response.data.user
    updateUsername.value = users.value.Username
    updateSchool.value = users.value.School
    updateEmail.value = users.value.Email
    updatePassword.value = users.value.Password
  })
})
</script>

<template>
  <div class="articles_container">
    <div class="account_title">
      <h1>My Account</h1>
    </div>
    <div class="account_wrapper">
      <form @submit.prevent="handleSubmit">
        <label for="username">Username: </label>
        <input type="text" v-model="updateUsername" />
        <label for="school">School: </label>
        <select name="school" class="select_cont" v-model="updateSchool">
          <option value="Business">SCHOOL OF BUSINESS</option>
          <option value="ComputerScience">SCHOOL OF COMPUTING AND INFORMATICS</option>
          <option value="Education">SCHOOL OF EDUCATION</option>
          <option value="Hospitality">SCHOOL OF HOSPITALITY AND TOURISM</option>
          <option value="Health">SCHOOL OF HEALTH</option>
          <option value="Library">DEPARTMENT OF LIBRARY AND INFORMATION SCIENCE</option>
          <option value="Humanities">SCHOOL OF HUMANITIES AND SOCIAL SCIENCES</option>
          <option value="Kasneb">KASNEB COURSES</option>
          <option value="Knec">KNEC COURSES</option>
        </select>
        <label for="email">Email: </label>
        <input type="email" v-model="updateEmail" />
        <label for="password">Password: </label>
        <input type="text" v-model="updatePassword" />
        <label for="confirmPassword">Confirm Password: </label>
        <input type="text" v-model="updateConfirmPassword" />
        <div>
          {{ error }}
        </div>
        <button type="submit" class="button">
          <span class="button_lg">
            <span class="button_sl"></span>
            <span class="button_text">Update</span>
          </span>
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.articles_container {
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

.account_wrapper {
  width: 50%;
}

.account_wrapper form {
  display: flex;
  flex-direction: column;
  width: 60%;
  font-size: 18px;
  gap: 0.5em;
}

.account_wrapper input {
  height: 30px;
  font-size: 18px;
  padding: 0.4em 0.8em;
  border: 1px solid grey;
  border-radius: 3px;
  outline: none;
}

.account_wrapper select {
  height: 30px;
  outline: none;
  cursor: pointer;
  border: 1px solid grey;
  border-radius: 3px;
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
