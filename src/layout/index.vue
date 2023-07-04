<script setup lang="ts">
import { RouterView } from "vue-router";

import Footer from "./footer.vue";
import Header from "./header.vue";
</script>
<template>
  <Header></Header>
  <RouterView></RouterView>
  <Footer></Footer>
</template>
