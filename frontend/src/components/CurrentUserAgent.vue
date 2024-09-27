<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useUserAgentStore } from '../stores/ua';

const store = useUserAgentStore();
const { currentUserAgent } = storeToRefs(store);

store.detectCurrentUserAgent();
</script>

<template>
  <div class="col-lg-6 offset-lg-3">
    <!-- Loading -->
    <h1 v-if="!currentUserAgent" class="text-muted">Loading...</h1>

    <!-- Title -->
    <h1 v-if="currentUserAgent && currentUserAgent.ua">Big Browser is watching you</h1>
    <h1 v-if="currentUserAgent && !currentUserAgent.ua">Big Browser cannot watch you</h1>
    <p v-if="currentUserAgent && currentUserAgent.ua" class="lead mt-3">
      {{ currentUserAgent.ua }}
    </p>

    <table
      v-if="
        currentUserAgent &&
        (currentUserAgent.browser ||
          currentUserAgent.cpu ||
          currentUserAgent.device ||
          currentUserAgent.engine ||
          currentUserAgent.os)
      "
      class="table mt-5"
    >
      <tbody>
        <!-- Device -->
        <tr
          v-if="
            currentUserAgent.device &&
            (currentUserAgent.device.vendor || currentUserAgent.device.type)
          "
        >
          <th scope="row" style="width: 50%">Device</th>
          <td>
            <span v-if="currentUserAgent.device.vendor">{{ currentUserAgent.device.vendor }}</span>
            <span v-if="currentUserAgent.device.type">{{ currentUserAgent.device.type }}</span>
          </td>
        </tr>

        <!-- Browser -->
        <tr
          v-if="
            currentUserAgent.browser &&
            (currentUserAgent.browser.name || currentUserAgent.browser.version)
          "
        >
          <th scope="row" style="width: 50%">Browser</th>
          <td>
            <span v-if="currentUserAgent.browser.name">{{ currentUserAgent.browser.name }}</span>
            <span v-if="!currentUserAgent.browser.name" class="text-muted">N/A</span>
          </td>
        </tr>
        <tr v-if="currentUserAgent.browser.version">
          <th scope="row" style="width: 50%">
            <small class="text-secondary">version</small>
          </th>
          <td>
            <small
              ><code>{{ currentUserAgent.browser.version }}</code></small
            >
          </td>
        </tr>

        <!-- OS -->
        <tr v-if="currentUserAgent.os && (currentUserAgent.os.name || currentUserAgent.os.version)">
          <th scope="row" style="width: 50%">Operating System</th>
          <td>
            <span v-if="currentUserAgent.os.name">{{ currentUserAgent.os.name }}</span>
            <span v-if="!currentUserAgent.os.name" class="text-muted">N/A</span>
          </td>
        </tr>
        <tr v-if="currentUserAgent.os.version">
          <th scope="row" style="width: 50%">
            <small class="text-secondary">version</small>
          </th>
          <td>
            <small
              ><code>{{ currentUserAgent.os.version }}</code></small
            >
          </td>
        </tr>

        <!-- Engine -->
        <tr
          v-if="
            currentUserAgent.engine &&
            (currentUserAgent.engine.name || currentUserAgent.engine.version)
          "
        >
          <th scope="row" style="width: 50%">Engine</th>
          <td>
            <span v-if="currentUserAgent.engine.name">{{ currentUserAgent.engine.name }}</span>
            <span v-if="!currentUserAgent.engine.name" class="text-muted">N/A</span>
          </td>
        </tr>
        <tr v-if="currentUserAgent.engine.version">
          <th scope="row" style="width: 50%">
            <small class="text-secondary">version</small>
          </th>
          <td>
            <small
              ><code>{{ currentUserAgent.engine.version }}</code></small
            >
          </td>
        </tr>

        <!-- CPU -->
        <tr v-if="currentUserAgent.cpu.architecture">
          <th scope="row" style="width: 50%">CPU Architecture</th>
          <td>{{ currentUserAgent.cpu.architecture }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
