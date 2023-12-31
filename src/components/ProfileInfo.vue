<script setup lang="ts">
import type { IProfileForm, IUser } from "@/types";

import { useForm } from "vee-validate";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import * as yup from "yup";

import Button from "./UI/Button.vue";
import InputForm from "./UI/InputForm.vue";

const props = defineProps<{ user: IUser }>();

const isEditing = ref<boolean>(false);

const emit = defineEmits<{
  (e: "changeAvatar", event: Event): void;
  (e: "changeInfo", data: IProfileForm): void;
}>();

const toggleIsEditing = () => {
  isEditing.value = !isEditing.value;
};

const { t } = useI18n();

const schema = yup.object({
  name: yup
    .string()
    .required(t("Profile.requiredfield"))
    .min(1, t("Profile.minlength"))
    .max(16, t("Profile.maxlength")),
  surname: yup
    .string()
    .required(t("Profile.requiredfield"))
    .min(1, t("Profile.minlength"))
    .max(16, t("Profile.maxlength"))
});

const { errors, handleSubmit, meta } = useForm<IProfileForm>({
  validationSchema: schema
});

const onSubmit = handleSubmit((data) => {
  toggleIsEditing();

  if (data.name == props.user.name && data.surname == props.user.surname) return;
  emit("changeInfo", data);
});
</script>

<template>
  <div class="ProfileInfo">
    <label for="avatar">
      <img
        class="ProfileInfo__avatar"
        :src="props?.user?.avatar"
        :alt="`${props.user.name} ${props.user.surname}`"
      />
    </label>
    <input
      class="ProfileInfo__file"
      type="file"
      id="avatar"
      accept="image/*"
      @change="(event) => emit('changeAvatar', event)"
    />
    <div class="ProfileInfo__wrap">
      <div class="ProfileInfo__wrap" v-if="!isEditing">
        <h2 class="ProfileInfo__name">{{ props.user.name }}</h2>
        <p class="ProfileInfo__surname">{{ props.user.surname }}</p>
      </div>
      <form class="ProfileInfo__editform" @submit.prevent="onSubmit" v-else>
        <InputForm
          class-name="ProfileInfo__field ProfileInfo__field_name"
          type="text"
          :placeholder="$t('Profile.name')"
          :max="16"
          :min="3"
          name="name"
          :value="props.user?.name"
        />
        <InputForm
          class-name="ProfileInfo__field ProfileInfo__field_surname"
          type="text"
          :placeholder="$t('Profile.surname')"
          :max="16"
          :min="3"
          name="surname"
          :value="props.user.surname"
        />
        <Button
          class="ProfileInfo__saveButton"
          type="submit"
          :class="{ error: errors.name || errors.surname }"
          :disabled="!meta.valid"
          >{{ $t("SaveButton.save") }}</Button
        >
      </form>
      <Button class="ProfileInfo__editbutton" @click="toggleIsEditing" v-if="!isEditing">{{
        $t("EditButtons.edit")
      }}</Button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";

.ProfileInfo {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;

  &__avatar {
    cursor: pointer;
    border-radius: 50%;
    display: block;
    width: 200px;
    height: 200px;

    @media (max-width: 400px) {
      width: 100%;
      height: min(100%, 300px);
    }
  }

  &__wrap {
    @media (min-width: 500px) {
      margin-top: 20px;
    }
  }

  &__name {
    @include adaptiv-font(32, 22);
    font-weight: 900;

    &::first-letter {
      text-transform: uppercase;
    }
  }

  &__surname {
    @include adaptiv-font(26, 20);

    &::first-letter {
      text-transform: uppercase;
    }
  }

  &__editbutton {
    margin-top: 5px;
  }

  &__file {
    display: none;
  }

  &__editform {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  &__field {
    border-radius: 5px;
    width: 250px;
    padding: 5px;
    font-size: 17px;
    font-weight: 500;
  }
}
</style>
