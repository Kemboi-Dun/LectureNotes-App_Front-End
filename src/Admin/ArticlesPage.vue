<script setup>
import { ref, onMounted } from 'vue'
import { getApi } from '../api/Api'

const articles = ref([])

// get articles from an api

const getArticlesApi = async () => {
  const url = '/articles'
  return getApi.get(url)
}

onMounted(() => {
  getArticlesApi().then((response) => {
    console.log(response.data)
    articles.value = response.data.articles
    console.log(articles.value)
  })
})
</script>
<template>
  <div class="article_container">
    <div class="article_wrapper">
      <h2>Articles ({{ articles.length }})</h2>

      <div class="articles_wrapper">
        <ul>
          <li v-for="article in articles" :key="article.ID">
            <span>{{ article.Tag }}</span>
            <span>{{ article.Title }}</span>
            <p>{{ article.AuthorName }}</p>
            <span>{{ article.UpdatedAt }}</span>
            <span>{{ article.Body }}</span>
            <!-- <div @click="deleteArticle(article.ID)"><i class="fa-solid fa-trash"></i></div> -->
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
