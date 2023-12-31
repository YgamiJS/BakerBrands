<script setup lang="ts">
import { useField } from "vee-validate";

const props = defineProps<{
  className?: string;
  max?: number | string;
  min?: number | string;
  name: string;
  placeholder?: string;
  type: "email" | "number" | "password" | "text";
  value?: string;
}>();

const { value: inputValue } = useField(props.name, {
  initialValue: ""
});

// inputValue.value = props?.value && props.value;

// eslint-disable-next-line vue/no-setup-props-destructure
props.value && (inputValue.value = props.value);
</script>

<template>
  <input
    class="input"
    :type="props.type"
    :placeholder="props.placeholder"
    :class="props.className"
    :name="props.name"
    :max="max"
    :min="min"
    v-model="inputValue"
  />
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";
.input {
  background: $white;
  color: $whiteGrey;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  border: 1px solid $black;
  width: 100%;
}
</style>
