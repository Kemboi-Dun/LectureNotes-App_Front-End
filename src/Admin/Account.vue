<script setup>
import {ref,onMounted} from 'vue'
import { useRoute } from 'vue-router';
import { getApi } from '../api/Api';
const users = ref([])
const route = useRoute();

const getUserApi = async ()=>{
    const id = route.params.id;
    return await getApi.get(`/user/${id}`);
}

onMounted(()=>{
    getUserApi()
    .then((response)=>{
        console.log(response.data.user);
        users.value = response.data;
    })
})

</script>

<template>
    <div class="articles_container">
       <div class="account_title">
        <h1>My Account</h1>
       </div>
       <div class="account_wrapper" v-for="user in users" :key="user">
{{ user.Username }}
{{ user.School }}
{{ user.Role }}
{{ user.Email }}
{{ user.Password }}
       </div>
    </div>
</template>