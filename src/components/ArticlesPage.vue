
<script setup>
import {ref, onMounted} from 'vue'
import { getApi } from '../api/Api';
const articles = ref([])

const getArticlesApi = async() =>{
    const url = '/articles'
    return await getApi.get(url)
}

onMounted( async()=>{
    await getArticlesApi()
    .then((response)=>{
        console.log(response.data.articles)
        articles.value = response.data.articles
    })
})


</script>

<template>
    <div class="article_body_cont">

      
    <div class="articles_container">
       
        <div class="articles_wrapper" v-for="article in articles" :key="article.id">
            <span>{{ article.Tag }}</span>
            <a href= "" target="_blank">
                <div class="title">
                    <!-- {{ article.url}} -->
{{article.Title }}
</div>
            </a>
          
            <div class="author_date">
                {{ article.AuthorName }}
                {{ article.UpdatedAt }}
            </div>
            <div class="description">
                {{ article.Body }}
            </div>
        </div>
    </div>
      </div>
</template>

<style scoped>
.article_body_cont{
    /* display: none; */
    position: fixed;
    top: 0;
  left: 0;
  width: 50%;
  /* height: 80%; */
  
}
.articles_container{
    /* height: 60%; */
   
    /* background: firebrick; */
    position: relative;
}
.articles_wrapper{
    
    /* position: relative; */
    /* background: #f1f1f1; */
    padding: 1em;
}
</style>