<script setup>
import {ref,onMounted} from 'vue'
import { useRoute } from 'vue-router';
import { getApi } from '../api/Api';
const users = ref([])
const route = useRoute();
const updateUsername = ref('');
const updateSchool = ref('');
const updateEmail = ref('');
const updatePassword = ref('');
const updateConfirmPassword = ref('');
const error = ref('')

const getUserApi = async ()=>{
    const id = route.params.id;
    return await getApi.get(`/user/${id}`);
}



// POST USER ON SUBMIT
const postUserApi = async () => {
    const id = route.params.id;
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
  }else{
    postUserApi()
    .then((response)=>{
        console.log(response.data);
    })
  }
}


onMounted(()=>{
    getUserApi()
    .then((response)=>{
        console.log(response.data.user);
        users.value = response.data.user;
        updateUsername.value =users.value.Username;
        updateSchool.value = users.value.School;
        updateEmail.value = users.value.Email;
        updatePassword.value = users.value.Password;
        // console.log(users.value.Username)
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
<input type="text" v-model="updateUsername" >
<label for="school">School: </label>
<input type="text" v-model="updateSchool" >
<!-- <label for="R">Username: </label> -->
<label for="email">Email: </label>
<input type="email" v-model="updateEmail" >
<label for="password">Password: </label>
<input type="text" v-model="updatePassword">
<label for="confirmPassword">Confirm Password: </label>
<input type="text" v-model="updateConfirmPassword">
<div>
        {{ error }}
      </div>
<button  type="submit">Update</button>
        </form>
<!-- {{ user.Username }} -->

<!-- {{ user.Role }} -->


       </div>
    </div>
</template>