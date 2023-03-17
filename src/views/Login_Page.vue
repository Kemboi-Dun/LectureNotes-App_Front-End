<script setup>
import { ref,onMounted } from "vue";
import { useRouter } from "vue-router";
import { getApi } from "../api/Api";

// const log_in_data = reactive({
//     email: '',
//     password: '',
// });


const selectedEmail = ref(null);
const selectedPassword = ref(null)
const allowedEmail = ref(null);
const allowedPassword = ref(null);
const verifiedUser = ref([]);
const allowedRole = ref(null)

const router = useRouter();
const error = ref('');
const user = ref([]);

// get users from API 

const getUsersApi = async()=>{
    const url = '/users';
    return await getApi.get(url);
}


const handle_submit = () => {

   verifiedUser.value = user.value.filter((item) => item.Email == selectedEmail.value && item.Password == selectedPassword.value)
console.log(verifiedUser.value[0].Username)

allowedEmail.value =verifiedUser.value[0].Email
allowedPassword.value = verifiedUser.value[0].Password
allowedRole.value = verifiedUser.value[0].Role
 
if ( selectedEmail.value === allowedEmail.value && selectedPassword.value === allowedPassword.value) {

localStorage.setItem('token', 123456789)
if(allowedRole.value == "lecturer"){
    router.push({
    name: 'admin',
    params: {
          id: verifiedUser.value[0].ID
        }
});
}else if(allowedRole.value == "student"){
    router.push({
    name: 'home_page',
});
}
console.log(localStorage)
console.log(allowedRole.value);

} else {

error.value = 'Invalid credentials!';
setTimeout(() => {
    error.value = '';
}, 3000)
console.log(error.value);
}

};


onMounted(()=>{
    getUsersApi()
    .then((response)=>{
        console.log(response.data.users);
        user.value = response.data.users;
    })
})

</script>

<template>
    <div class="card_container">
        <div class="info_cont">
            <h1>SIGN IN</h1>
            <p>Do not have an account?</p>
            <div class="info_links">
                <RouterLink :to="{ name: 'register' }" class="register_link">Create Account</RouterLink>
                <RouterLink :to="{ name: 'home' }">Forgot Password?</RouterLink>
            </div>
        </div>
        <form @submit.prevent="handle_submit">
            <label for="email">Email</label>
            <input type="text" v-model="selectedEmail" placeholder="johndoe@gmail.com" required />

            <label for="password">Password</label>
            <input type="password" v-model="selectedPassword" placeholder="Enter your password" required />

            <div>
                {{ error }}

            </div>

            <button :disabled="!selectedEmail && !selectedPassword" type="submit">Log In</button>


        </form>
    </div>
</template>

<style scoped>
.card_container {
    /* background: #1B2430; */
    height: 100vh;
    display: flex;
    justify-content: space-around;
    align-items: center;
    /* color: #f8f8f8; */
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

.register_link {
    background: #212121;
    /* border: 1px solid teal; */
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
    /* align-items: center; */
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