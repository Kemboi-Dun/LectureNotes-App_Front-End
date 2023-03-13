<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const sign_in_data = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})
const error = ref('')

const handle_submit = () => {
  if (sign_in_data.password !== sign_in_data.confirmPassword) {
    error.value = 'Passwords do not match !'
  } else {
    router.push({ name: 'home' })
  }
  console.log(sign_in_data)
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
      <label for="username">Username</label>
      <input type="text" v-model="sign_in_data.username" placeholder="Username00" required />
      <label for="role">Role</label>
<select name="role" class="select_cont">
    <option value="lecturer">Lecturer</option>
    <option value="student">Student</option>
</select>

      <label for="email">Email</label>
      <input type="email" v-model="sign_in_data.email" placeholder="johndoe@gmail.com" required />


      <label for="password">Password</label>
      <input
        type="password"
        v-model="sign_in_data.password"
        placeholder="Enter your password"
        required
      />
      <label for="confirmPassword">Confirm Password</label>
      <input
        type="password"
        v-model="sign_in_data.confirmPassword"
        placeholder="Confirm your password"
        required
      />
      <div>
        {{ error }}
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<style scoped>
.select_cont{
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
  justify-content: center;
  border: 1px solid #181818;
  background: transparent;
  border-radius: 8px;
  padding: 4rem;
  gap: 0.5rem;
}

.card_container form label {
  font-size: 18px;
  text-transform: capitalize;
  font-weight: 700;
}

.card_container form input {
  height: 30px;
  border-radius: 4px;
  border: none;
  padding: 1.5rem 0.5rem;
  font-size: 16px;
  background: #ececec;
}

.card_container button {
  background: #212121;
  border: none;
  border-radius: 6px;
  color: #f8f8f8;
  padding: 1rem;
  font-size: 18px;
  margin-top: 0.2rem;
  cursor: pointer;
}
</style>
