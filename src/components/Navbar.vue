<script setup>
import { ref,onMounted,computed, watch } from 'vue';
import { getApi } from '../api/Api';
import router from '../router';
const tokenExists = ref(false);

const searchQuery = ref('');
// const filteredItem= ref([]);
const files = ref([]);

const handleToken = ()=>{
if( tokenExists.value = localStorage.getItem('token') !== null){
    localStorage.removeItem('token')
    router.push ({name: 'home'})
}
}

const getFilesApi = ()=>{
    return getApi.get('/files');
}

const filteredItems = computed(() => {
    if (!searchQuery.value) {
        return searchQuery.value
      } else {
      return files.value.filter(item => item.Name.toLowerCase().includes(searchQuery.value.toLowerCase()) || item.AuthorName.toLowerCase().includes(searchQuery.value.toLowerCase()) || item.UnitCode.toLowerCase().includes(searchQuery.value.toLowerCase()) || item.UnitName.toLowerCase().includes(searchQuery.value.toLowerCase()))
      }
    })

    watch(searchQuery, () => {
      filteredItems.value
    })

onMounted(()=>{
    getFilesApi()
    .then((response)=>{
        files.value = response.data.files;
        console.log(files.value);
        // filteredItems()
        console.log(filteredItems.value);
    })
})


</script>

<template>
    <div class="nav_wrapper">
        <nav>
            <div class="title">
           <h1> 
            <RouterLink :to="{ name: 'home_page' }">
                <img src="data:image/jpeg;base64,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" alt="">
            </RouterLink>
           </h1>
        </div>
        <div class="search_bar">
            <input type="search" v-model="searchQuery" placeholder="Search...">
            <ul>
      <li v-for="item in filteredItems" :key="item.ID">
        {{ item.AuthorName }}
        <a :href= item.Path target="_blank">
            {{ item.Name }}
            <i class="fa-solid fa-download"></i>
        </a>
    </li>
    </ul>
        </div>
        <div class="auth_buttons">
            <RouterLink :to="{ name: 'login'}" v-if="tokenExists">LogIn</RouterLink>
            <RouterLink :to="{ name: 'register'}" v-if="tokenExists">Create Account</RouterLink>
            <button  @click="handleToken" v-if="!tokenExists">Log Out</button>
        </div>
        </nav>
  
    </div>
</template>

<style scoped>
.title  a img{
    height: 3.4em;
    width:12em;
    /* object-fit: cover; */
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.nav_wrapper{
    width:90%;
    margin:auto;
    align-items: center;
    /* background: var(--dim-light-background); */
    padding: 0.5em;
}
.nav_wrapper nav{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 2em;
}
.title h1{
    font-size: 18px;

}
.title h1 a{
    text-decoration: none;
    color: #f8f8f8;
}
.search_bar input{
    border: none;
    border: 1px  solid var(--dim-dark-background);
    border-radius: 6px;
    padding:0.8em;
    width:30em;
    /* font-size:16px; */
    
}
.search_bar input:focus{
    outline: none;
}
.auth_buttons{
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap:2rem;
}
.auth_buttons a{
    text-decoration: none;
    color: #181818;
    /* background: #181818; */
    padding: 0.8rem;
    border: 1px solid #181818;
    border-radius: 12px;
}
.auth_buttons button{
    border:none;
    text-decoration: none;
    color: #f6f6f6;
    background: #181818;
    padding: 0.8rem;
    border: 1px solid #181818;
    border-radius: 12px;
    cursor:pointer;
}
.auth_buttons a:hover, .auth_buttons button:hover{
       background: #181818;
       color: #f8f8f8;
}
</style>