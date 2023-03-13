<script setup>
const date = new Date().getFullYear()
</script>

<template>
    <div class="footer_wrapper">
        <p>|Privacy and Policy.</p>
        <span>{{ date }}</span>
    </div>
</template>

<style scoped>
.footer_wrapper{
    width: 90%;
    margin:auto;
    /* background:lime; */
}
</style>