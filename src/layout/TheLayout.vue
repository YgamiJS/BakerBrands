<script setup lang="ts">
import { RouterView } from "vue-router";

import Footer from "./footerLayout.vue";
import Header from "./headerLayout.vue";
</script>

<template>
  <Header></Header>
  <RouterView></RouterView>
  <Footer></Footer>
</template>
