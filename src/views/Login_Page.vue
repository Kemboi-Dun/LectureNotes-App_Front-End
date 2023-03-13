<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";

const log_in_data = reactive({
    email: '',
    password: '',
});

const allowedEmail = ref("john@gmail.com");
const allowedPassword = ref("password");

const router = useRouter();
const error = ref('');


const handle_submit = () => {
    if (log_in_data.email === allowedEmail.value && log_in_data.password === allowedPassword.value) {

        localStorage.setItem('token', 123456789)
        router.push({
            name: 'home_page',
        });
        console.log(log_in_data);
        console.log(localStorage)
    } else {

        error.value = 'Invalid credentials!';
        setTimeout(() => {
            error.value = '';
        }, 3000)
        console.log(error.value);
    }
};
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
            <input type="text" v-model="log_in_data.email" placeholder="johndoe@gmail.com" required />

            <label for="password">Password</label>
            <input type="password" v-model="log_in_data.password" placeholder="Enter your password" required />

            <div>
                {{ error }}

            </div>

            <button :disabled="!log_in_data.email && !log_in_data.password" type="submit">Log In</button>


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