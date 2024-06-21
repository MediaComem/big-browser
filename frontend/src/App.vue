<script setup lang="ts">
import CurrentUserAgent from './components/CurrentUserAgent.vue'
import PreviousUserAgents from './components/PreviousUserAgents.vue'
</script>

<template>
  <div class="text-center mb-5">
    <CurrentUserAgent />
    <PreviousUserAgents class="mt-5" />
  </div>
</template>

<style scoped>
</style>
