<script setup lang="ts"></script>

<template>
  <div class="locale-changer" @click.stop>
    <select class="select" v-model="$i18n.locale">
      <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">
        {{ locale }}
      </option>
    </select>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";

.select {
  background: $spacegray;
  appearance: none;
  outline: 0;
  border: 0;
  padding: 8px 10px;
  border-radius: 8px;
  color: $white;
  text-transform: uppercase;
}
</style>
