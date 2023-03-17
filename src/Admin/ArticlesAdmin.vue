<script setup>
import { ref, onMounted } from "vue"
import { getApi } from '../api/Api';
import { useRoute } from 'vue-router';

const route = useRoute();
const tag = ref('');
const title = ref('');
const authorName = ref('');
const newArticleText = ref('');
const articles = ref([]);
const user = ref(null);
const filteredArticles = ref([]);


// GET USER

const getUserApi = async ()=>{
    const id = route.params.id;
    return await getApi.get(`/user/${id}`);
}


// GET Articles
const fetchArticles = async () => {
    const url = '/articles';
    await getApi.get(url)
        .then((response) => {
            console.log(response.data);
            articles.value = response.data.articles;
            filteredArticles.value = articles.value.filter((item) => item.AuthorID == user.value.ID)
    console.log(filteredArticles.value)
        })
        .catch((error) => {
            console.log(error)
        });
};

// ADD article
const addArticle = async () => {
    const url = '/article';
   await getApi.post(url, {
        AuthorID: user.value.ID,
        Tag: tag.value,
        Title: title.value,
        AuthorName: user.value.Username,
        Body: newArticleText.value,
    })
        .then((response) => {
            articles.value.push(response.data);
            tag.value = '';
            title.value = '';
            authorName.value = '';
            newArticleText.value = '';
            // articles.value = articles.value.filter(article => article.ID !== articleId);
        })
        .catch((error) => {
            console.log(error)
        });
}
// DELETE article
const deleteArticle = async (articleId) => {
    const url = `/article/${articleId}`;
   await getApi.delete(url)
        .then((response) => {
            console.log(response.data);
            articles.value = articles.value.filter(article => article.ID !== articleId);

        })
        .catch((error) => {
            console.log(error)
        });
}



// watch(filteredArticles.value,{
// filteredArticles.value
// })


onMounted( async () => {
   await getUserApi()
    .then((response)=>{
        console.log(response.data.user);
        user.value = response.data.user;
        console.log(user.value.ID)
    })


   await fetchArticles()
})
</script>

<template>
    <div class="article_container">

        <h2>Articles ({{ filteredArticles.length }})</h2>

        <div class="articles_wrapper">

            <ul>
            <li v-for="article in filteredArticles" :key="article.ID">
                <span>{{ article.Tag }}</span>
                <span>{{ article.Title }}</span>
                <p>{{ article.AuthorName }}</p>
                <span>{{ article.UpdatedAt }}</span>
                <span>{{ article.Body }}</span>
                <div @click="deleteArticle(article.ID)"><i class="fa-solid fa-trash"></i></div>
            </li>
        </ul>
        </div>
      
                <form @submit="addArticle">
                
                    <label for="title">Title:</label>
                    <input type="text" v-model="title">
                    <label for="article">Write a article</label>
                    <textarea v-model="newArticleText" cols="8" rows="4" placeholder="Write your article here.."></textarea>
                    <label for="tag">Tag:</label>
                    <input type="text" placeholder="Security, food.." v-model="tag">
                    <div>

                        <button type="submit">Add article</button>
                    </div>
                </form>
    </div>
</template>
<style scoped>
.article_container{
    /* background: gold; */
    width:90%;
    margin: auto;
    padding: 0 2em;
    position: relative;
}
.article_container h2{
    /* position: fixed; */
    background: #f8f8f8;
    padding: 0.5em;
  
    /* width:50%; */
}
.articles_wrapper ul{
    list-style: none;
    display: flex;
    justify-content: space-around;
    align-self: center;
    flex-direction: column;
    gap:1em;
    padding: 2em 0;
}
.articles_wrapper li{
    /* background: #f6f6f6; */
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 18px;
    padding: 0.4em 0;
    padding-bottom: 2px;
    /* align-items: center; */
}
.articles_wrapper span{
    margin: 1em 0;
}
.articles_wrapper i{
    padding:0.6em 2em;
    background: #f8f8f8;
    margin: 4px 0;
    cursor: pointer;
}
.article_container form{
    display: flex;
    flex-direction: column;

}
.article_container form textarea{
/* border:none; */
border-radius: 6px;
padding: 1em;
font-size: 16px;
outline: none;
}
.article_container form button{
    /* border: none; */
    background: #f8f8f8;
    color: #181818;
    padding: 0.6em 2em;
    font-size: 16px;
    margin: 1em 0;
    border-radius: 6px;
    cursor: pointer;
}
.article_container form button:hover{
    background: #181818;
    color:#f8f8f8;
}
</style>