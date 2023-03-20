<script setup>
import Navbar from '../components/Navbar.vue'
import Select_Options from '../components/Select_Options.vue';
import CommentsPage from '../views/CommentsPage.vue'
import Footer from '../components/Footer.vue';
import { onMounted, ref } from 'vue';
import {useRouter,useRoute} from 'vue-router';
import Type from '../components/Type.vue';
import { getApi } from '../api/Api';

const tokenExists  = ref(false);
const router = useRouter();
const users = ref([]);
const route = useRoute()

const getUserApi = async () => {
  const id = route.params.id
  return await getApi.get(`/user/${id}`)
}

onMounted(()=>{
    tokenExists.value = localStorage.getItem('token') !== null ? console.log("Token exists.."):  router.push({name:'login'})

    getUserApi().then((response) => {
    // console.log(response.data)
    users.value = response.data.user
    console.log(users.value)
  })

})

</script>

<template>
    <div class="home_container">
        <div class="home_wrapper">
        <Navbar/>
        <div class="select_cont">

            <Select_Options/>
            <Type class="types_cont" />
        </div>
</div>
<Footer/>
    </div>


 <!-- <CommentsPage/> -->
</template>
<style scoped>
.select_cont{
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    height: 70vh;
    width:90%;
    margin: 1em auto;
    
}
.types_cont {
    width: 30%;
    position: relative;
    margin: 2em auto;
    height: 100%;
    overflow: auto;
}
.home_container{
    height: 100vh;
    /* background:teal; */
    position: relative;
    margin:0;
    padding: 0;
    box-sizing: border-box;
}
.home_wrapper{
    height: 90%;
    /* background: #181818; */
    /* background: teal; */
}

</style>