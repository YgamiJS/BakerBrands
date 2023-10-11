<script setup lang="ts">
import AppBar from "@/components/AppBar.vue";
import NoInternet from "@/components/noInternet.vue";
import { useNetwork } from "@vueuse/core";
import { RouterView } from "vue-router";

import Footer from "./footerLayout.vue";
import Header from "./headerLayout.vue";

const { isOnline } = useNetwork();
</script>

<template>
  <Header></Header>
  <RouterView v-if="isOnline"></RouterView>
  <NoInternet v-else />
  <AppBar/>
  <Footer></Footer>
</template>

<style scoped lang="scss">
.AppBar {
  display: none;

  @media (max-width: 950px) {
    display: block;
  }
}
</style>
