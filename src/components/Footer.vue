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
.footer_wrapper {
  padding: 0.8em 0;
  width: 90%;
  margin: auto;
}
</style>
