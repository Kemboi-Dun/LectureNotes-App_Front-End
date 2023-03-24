<script setup>
import { ref, onMounted } from 'vue'
import { getApi } from '../api/Api'
import { useRoute } from 'vue-router'

const route = useRoute()
const tag = ref('')
const title = ref('')
const authorName = ref('')
const newArticleText = ref('')
const articles = ref([])
const user = ref(null)
const filteredArticles = ref([])

// GET USER

const getUserApi = async () => {
  const id = route.params.id
  return await getApi.get(`/user/${id}`)
}

// GET Articles
const fetchArticles = async () => {
  const url = '/articles'
  await getApi
    .get(url)
    .then((response) => {
      console.log(response.data)
      articles.value = response.data.articles
      filteredArticles.value = articles.value.filter((item) => item.AuthorID == user.value.ID)
      console.log(filteredArticles.value)
    })
    .catch((error) => {
      console.log(error)
    })
}

// ADD article
const addArticle = async () => {
  const url = '/article'
  await getApi
    .post(url, {
      AuthorID: user.value.ID,
      Tag: tag.value,
      Title: title.value,
      AuthorName: user.value.Username,
      Body: newArticleText.value
    })
    .then((response) => {
      articles.value.push(response.data)
      tag.value = ''
      title.value = ''
      authorName.value = ''
      newArticleText.value = ''
    })
    .catch((error) => {
      console.log(error)
    })
}
// DELETE article
const deleteArticle = async (articleId) => {
  const url = `/article/${articleId}`
  await getApi
    .delete(url)
    .then((response) => {
      console.log(response.data)
      articles.value = articles.value.filter((article) => article.ID !== articleId)
    })
    .catch((error) => {
      console.log(error)
    })
}

onMounted(async () => {
  await getUserApi().then((response) => {
    console.log(response.data.user)
    user.value = response.data.user
    console.log(user.value.ID)
  })

  await fetchArticles()
})
</script>

<template>
  <div class="article_container">
    <h2>My Articles ({{ filteredArticles.length }})</h2>
    <div class="article_split">
      <div class="articles_wrapper">
        <ul>
          <li v-for="article in filteredArticles" :key="article.ID">
            <i class="tag">{{ article.Tag }}</i>
            <span class="title">{{ article.Title }}</span>
            <span>{{ article.UpdatedAt }}</span>
            <span class="body">{{ article.Body }}</span>
            <button class="trash">
              <div @click="deleteArticle(article.ID)"><i class="fa-solid fa-trash"></i></div>
            </button>
          </li>
        </ul>
      </div>

      <form @submit="addArticle">
        <label for="title">Title:</label>
        <input type="text" v-model="title" />
        <label for="article">Write a article</label>
        <textarea
          v-model="newArticleText"
          cols="8"
          rows="4"
          placeholder="Write your article here.."
        ></textarea>
        <label for="tag">Tag:</label>
        <input type="text" placeholder="Security, food.." v-model="tag" />
        <div>
          <button type="submit" class="button">
            <span class="button_lg">
              <span class="button_sl"></span>
              <span class="button_text">Add article</span>
            </span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<style scoped>
.articles_wrapper li {
  list-style: none;
  display: flex;
  flex-direction: column;
}
.tag {
  text-transform: capitalize;
}
.title {
  font-weight: 700;
}
.trash {
  width: 12em;
  padding: 0.3em;
  margin: 0.6em 0;
  cursor: pointer;
}
.body {
  font-size: 18px;
}

.article_split {
  display: flex;
  flex-direction: row-reverse;
  gap: 4em;
}
.article_container {
  background: #f8f8f8;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: auto;
  height: 70vh;
  width: 70%;
  padding: 0.6em 2em;
  border-radius: 4px;
}
.articles_wrapper {
  width: 50%;
}
.article_container form {
  display: flex;
  flex-direction: column;
  width: 60%;
  font-size: 18px;
  gap: 0.5em;
}
.article_container input {
  height: 30px;
  font-size: 18px;
  padding: 0.4em 0.8em;
  border: 1px solid grey;
  border-radius: 3px;
  outline: none;
}
.article_container textarea {
  font-size: 18px;
  padding: 0.4em 0.8em;
  border: 1px solid grey;
  border-radius: 3px;
  outline: none;
}

.button {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  border: none;
  background: none;
  color: #0f1923;
  cursor: pointer;
  position: relative;
  padding: 8px;
  margin-bottom: 20px;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 14px;
  transition: all 0.15s ease;
}

.button::before,
.button::after {
  content: '';
  display: block;
  position: absolute;
  right: 0;
  left: 0;
  height: calc(50% - 5px);
  border: 1px solid #7d8082;
  transition: all 0.15s ease;
}

.button::before {
  top: 0;
  border-bottom-width: 0;
}

.button::after {
  bottom: 0;
  border-top-width: 0;
}

.button:active,
.button:focus {
  outline: none;
}

.button:active::before,
.button:active::after {
  right: 3px;
  left: 3px;
}

.button:active::before {
  top: 3px;
}

.button:active::after {
  bottom: 3px;
}

.button_lg {
  position: relative;
  display: block;
  padding: 10px 20px;
  color: #fff;
  background-color: #0f1923;
  overflow: hidden;
  box-shadow: inset 0px 0px 0px 1px transparent;
}

.button_lg::before {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 2px;
  height: 2px;
  background-color: #0f1923;
}

.button_lg::after {
  content: '';
  display: block;
  position: absolute;
  right: 0;
  bottom: 0;
  width: 4px;
  height: 4px;
  background-color: #0f1923;
  transition: all 0.2s ease;
}

.button_sl {
  display: block;
  position: absolute;
  top: 0;
  bottom: -1px;
  left: -8px;
  width: 0;
  background-color: #047a67;
  transform: skew(-15deg);
  transition: all 0.2s ease;
}

.button_text {
  position: relative;
}

.button:hover {
  color: #0f1923;
}

.button:hover .button_sl {
  width: calc(100% + 15px);
}

.button:hover .button_lg::after {
  background-color: #fff;
}
</style>
