<script setup lang="ts">
  import { DateTime } from 'luxon';
  import { storeToRefs } from 'pinia'

  import { useUserAgentStore } from '../stores/ua';

  const store = useUserAgentStore();
  const { previousUserAgents } = storeToRefs(store);

  store.loadPreviousUserAgents();
</script>

<template>
  <div
    v-if="previousUserAgents.length !== 0"
    class="col-lg-8 offset-lg-2"
  >
    <h2 class="text-secondary">
      Big Browser also watched...
    </h2>
    <div class="list-group mt-4">
      <div
        v-for="ua in previousUserAgents"
        :key="ua.createdAt.toMillis()"
        class="list-group-item"
      >
        <p>{{ ua.ua }}</p>
        <small>{{ ua.createdAt.toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS) }}</small>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
