<script setup>
import { ref, onMounted } from "vue"
import { getApi } from '../api/Api';

const authorName = ref('');
const newCommentText = ref('');
const comments = ref([]);

// GET COMMENTS
const fetchComments = () => {
    const url = '/comments';
    getApi.get(url)
        .then((response) => {
            console.log(response.data);
            comments.value = response.data.comments;
        })
        .catch((error) => {
            console.log(error)
        });
};

// ADD COMMENT
const addComment = () => {
    const url = '/comment';
    getApi.post(url, {
        AuthorName: authorName.value,
        Body: newCommentText.value,
    })
        .then((response) => {
            comments.value.push(response.data);
            authorName.value = '';
            newCommentText.value = '';
        })
        .catch((error) => {
            console.log(error)
        });
}
// DELETE COMMENT
const deleteComment = (commentId) => {
    const url = `/comment/${commentId}`;
    getApi.delete(url)
        .then((response) => {
            console.log(response.data);
            comments.value = comments.value.filter(comment => comment.ID !== commentId);

        })
        .catch((error) => {
            console.log(error)
        });
}
onMounted(() => {
    fetchComments()
})
</script>

<template>
    <div class="comment_container">

        <h2>Comments ({{ comments.length }})</h2>

        <div class="comments_wrapper">

            <ul>
            <li v-for="comment in comments" :key="comment.ID">
                <!-- <p>{{ comment.AuthorName }}</p> -->
                <span>{{ comment.Body }}</span>
                <div @click="deleteComment(comment.ID)"><i class="fa-solid fa-trash"></i></div>
            </li>
        </ul>
        </div>
      
        <form @submit="addComment">
            <!-- <input type="text" v-model="authorName"> -->
            <label for="comment">Write a comment</label>
            <textarea v-model="newCommentText" cols="8" rows="4" placeholder="Write your comment here.."></textarea>
            <div>

                <button type="submit">Add Comment</button>
            </div>
        </form>
    </div>
</template>
<style scoped>
.comment_container{
    /* background: gold; */
    width:90%;
    margin: auto;
    padding: 0 2em;
    position: relative;
}
.comment_container h2{
    position: fixed;
    background: #f8f8f8;
    padding: 0.5em;
  
    /* width:50%; */
}
.comments_wrapper ul{
    list-style: none;
    display: flex;
    justify-content: space-around;
    align-self: center;
    flex-direction: column;
    gap:1em;
    padding: 2em 0;
}
.comments_wrapper li{
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
.comments_wrapper span{
    margin: 1em 0;
}
.comments_wrapper i{
    padding:0.6em 2em;
    background: #f8f8f8;
    margin: 4px 0;
    cursor: pointer;
}
.comment_container form{
    display: flex;
    flex-direction: column;

}
.comment_container form textarea{
border:none;
border-radius: 6px;
padding: 1em;
font-size: 16px;
outline: none;
}
.comment_container form button{
    border: none;
    background: #f8f8f8;
    color: #181818;
    padding: 0.6em 2em;
    font-size: 16px;
    margin: 1em 0;
    border-radius: 6px;
    cursor: pointer;
}
.comment_container form button:hover{
    background: #181818;
    color:#f8f8f8;
}
</style>