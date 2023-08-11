<script setup lang="ts">
import GlobalSearch from "@/components/GlobalSearch.vue";
</script>

<template>
  <main class="Search">
    <section class="Search-section">
      <div class="Search-section__container container">
        <GlobalSearch />
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
.Search {
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
