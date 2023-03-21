<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { getApi } from '../api/Api'

const router = useRouter()
const username = ref('')
const role = ref('')
const school = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const user = ref('')
// const user = ref('USER000');
const error = ref('')

// POST USER ON SUBMIT
const postUserApi = () => {
  return getApi.post('/user', {
    Username: username.value,
    Role: role.value,
    School: school.value,
    Email: email.value,
    Password: password.value
  })
}

const handle_submit = () => {
  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match !'
  } else if (role.value === 'lecturer') {
    postUserApi().then((response) => {
      console.log(response.data)
      user.value = response.data.user
      console.log(user.value.ID)
      localStorage.setItem('token', 123456789)
      router.push({
        name: 'admin',
        params: {
          id: user.value.ID
        }
      })
    })
  } else if (role.value === 'student') {
    postUserApi().then((response) => {
      console.log(response.data)
      user.value = response.data.user
      console.log(user.value.ID)
      localStorage.setItem('token', 123456789)
      router.push({
        name: 'home_page',
        params: {
          id: user.value.ID
        }
      })
    })

    // localStorage.setItem('token', 123456789)
    // router.push({ name: 'home_page' })
  }
  console.log(
    username.value,
    role.value,
    school.value,
    email.value,
    password.value,
    confirmPassword.value
  )
}
</script>

<template>
  <div class="card_container">
    <div class="info_cont">
      <h1>REGISTER</h1>
      <p>Already have an account?</p>
      <div class="info_links">
        <RouterLink :to="{ name: 'login' }" class="login_link">Log In</RouterLink>
      </div>
    </div>
    <form @submit.prevent="handle_submit">
      <div class="form_wrap">
        <div>
          <label for="username">Username</label>
          <input type="text" v-model="username" placeholder="Username00" required />
        </div>

        <div>
          <label for="role">Role</label>
          <select name="role" class="select_cont" v-model="role">
            <option value="lecturer">Lecturer</option>
            <option value="student">Student</option>
          </select>
        </div>

        <div>
          <label for="school" v-if="role == 'lecturer'">Department</label>
          <select name="school" class="select_cont" v-model="school" v-if="role == 'lecturer'">
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
        </div>

        <div>
          <label for="email">Email</label>
          <input type="email" v-model="email" placeholder="johndoe@gmail.com" required />
        </div>

        <div>
          <label for="password">Password</label>
          <input type="password" v-model="password" placeholder="Enter your password" required />
        </div>
        <div>
          <label for="confirmPassword">Confirm Password</label>
          <input
            type="password"
            v-model="confirmPassword"
            placeholder="Confirm your password"
            required
          />
        </div>
        <div>
          -
          <button type="submit">Register</button>
        </div>
      </div>
      <div>
        {{ error }}
      </div>
    </form>
  </div>
</template>

<style scoped>
.select_cont {
  /* border:none; */
  /* background: #f8f8f8; */
  height: 3em;
  padding: 0.5em;
  border-radius: 4px;
  border: none;
  /* padding: 1.5rem 0.5rem; */
  font-size: 16px;
  background: #ececec;
  outline: none;
  /* color: #181818; */
}
.card_container {
  height: 100vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.info_cont p {
  margin: 0.5rem;
}

.info_links {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 1.2rem;
}

.login_link {
  background: #212121;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: #f8f8f8;
  font-weight: 700;
  padding: 0.4rem;
}
.card_container form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  /* background: lime; */
  height: 50vh;
  width: 55%;
}

.card_container .form_wrap {
  /* background: gold; */
  position: relative;
  display: flex;
  flex-wrap: wrap;
  /* flex-direction: column; */
  justify-content: start;
  align-items: center;
  border: 1px solid #181818;
  /* background: transparent; */
  border-radius: 8px;
  padding: 4rem;
  gap: 0.6rem;
  /* width:70%; */
  height: 100%;
}
.card_container .form_wrap div {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-content: center;
  /* background: blue; */
}
.card_container form label {
  font-size: 18px;
  text-transform: capitalize;
  font-weight: 700;
}
.form_wrap select {
  cursor: pointer;
}
.card_container form input,
select {
  height: 30px;
  border-radius: 4px;
  border: none;
  padding: 1.5rem 0.5rem;
  font-size: 16px;
  background: #ececec;
  width: 14em;
}

.card_container button {
  background: #212121;
  border: none;
  border-radius: 6px;
  color: #f8f8f8;
  /* height: 30px; */
  padding: 0.8rem;
  font-size: 18px;
  margin-top: 0.2rem;
  cursor: pointer;
}
</style>
