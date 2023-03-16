<script setup>
import { ref, onMounted } from "vue"
import { getApi } from '../api/Api';

const authorName = ref('');
const newArticleText = ref('');
const Articles = ref([]);

// GET Articles
const fetchArticles = () => {
    const url = '/Articles';
    getApi.get(url)
        .then((response) => {
            console.log(response.data);
            Articles.value = response.data.Articles;
        })
        .catch((error) => {
            console.log(error)
        });
};

// ADD article
const addArticle = () => {
    const url = '/article';
    getApi.post(url, {
        AuthorName: authorName.value,
        Body: newArticleText.value,
    })
        .then((response) => {
            Articles.value.push(response.data);
            authorName.value = '';
            newArticleText.value = '';
        })
        .catch((error) => {
            console.log(error)
        });
}
// DELETE article
const deleteArticle = (articleId) => {
    const url = `/article/${articleId}`;
    getApi.delete(url)
        .then((response) => {
            console.log(response.data);
            Articles.value = Articles.value.filter(article => article.ID !== articleId);

        })
        .catch((error) => {
            console.log(error)
        });
}
onMounted(() => {
    fetchArticles()
})
</script>

<template>
    <div class="article_container">

        <h2>Articles ({{ Articles.length }})</h2>

        <div class="articles_wrapper">

            <ul>
            <li v-for="article in Articles" :key="article.ID">
                <!-- <p>{{ article.AuthorName }}</p> -->
                <span>{{ article.Body }}</span>
                <div @click="deleteArticle(article.ID)"><i class="fa-solid fa-trash"></i></div>
            </li>
        </ul>
        </div>
      
        <form @submit="addArticle">
            <!-- <input type="text" v-model="authorName"> -->
            <label for="article">Write a article</label>
            <textarea v-model="newArticleText" cols="8" rows="4" placeholder="Write your article here.."></textarea>
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
    position: fixed;
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
border:none;
border-radius: 6px;
padding: 1em;
font-size: 16px;
outline: none;
}
.article_container form button{
    border: none;
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