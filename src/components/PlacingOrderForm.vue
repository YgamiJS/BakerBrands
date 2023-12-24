<script setup lang="ts">
import type { IDeliveryMethod, IPlacingOrder } from "@/types";

import { deliveryOrganizations } from "@/types/enums/deliveryOrganizations";
import { useForm } from "vee-validate";
import { useI18n } from "vue-i18n";
import * as yup from "yup";

import ButtonForm from "./UI/ButtonForm.vue";
import InputForm from "./UI/InputForm.vue";

interface PlacingOrder {
  cardcvv: number;
  cardnumber: string;
  cardvalidity: string;
}

const emit = defineEmits<{
  (e: "setDeliveryMethod", name: deliveryOrganizations): void;
  (e: "submit"): void;
}>();

const props = defineProps<{
  currentDeviveryMethod: deliveryOrganizations;
  deliveryMethods: IDeliveryMethod[];
  sum: IPlacingOrder["sum"];
}>();

const { t } = useI18n();

const schema = yup.object({
  cardcvv: yup
    .number()
    .required(t("PlacingOrder.ThisCardCVVFieldRequired"))
    .transform((val) => (Number.isInteger(val) ? val : 0)),
  cardnumber: yup
    .string()
    .min(16, t("PlacingOrder.minLengthCardNumbers", { minLengthCardNumbers: 16 }))
    .max(32, t("PlacingOrder.maxLengthCardNumbers", { maxLengthCardNumbers: 32 }))
    .required(t("PlacingOrder.ThisCardNumberFieldRequired")),
  cardvalidity: yup
    .string()
    .required(t("PlacingOrder.ThisCardValidityFieldRequired"))
    .min(4, t("PlacingOrder.minLengthCardValidity", { minLengthCardValidity: 4 }))
    .max(4, t("PlacingOrder.maxLengthCardValidity", { maxLengthCardValidity: 4 }))
});

const { errors, meta } = useForm<PlacingOrder>({
  validationSchema: schema
});
</script>

<template>
  <form class="placingorder-form" @submit.prevent="emit('submit')">
    <InputForm
      type="text"
      :placeholder="$t('PlacingOrder.cardNumber')"
      class-name="placingorder-form__cardnumber placingorder-form__field"
      name="cardnumber"
    />
    <p class="placingorder-form__errorMessage" v-if="errors.cardnumber">{{ errors.cardnumber }}</p>
    <div class="placingorder-form__wrap">
      <div class="placingorder-form__wrap">
        <InputForm
          type="text"
          :placeholder="$t('PlacingOrder.cardValidity')"
          class-name="placingorder-form__cardvalidity placingorder-form__field"
          name="cardvalidity"
        />
        <p class="placingorder-form__errorMessage" v-if="errors.cardvalidity">
          {{ errors.cardvalidity }}
        </p>
      </div>
      <div class="placingorder-form__wrap">
        <InputForm
          type="text"
          :placeholder="$t('PlacingOrder.cardCVV')"
          class-name="placingorder-form__cardcvv placingorder-form__field"
          name="cardcvv"
        />
        <p class="placingorder-form__errorMessage" v-if="errors.cardcvv">
          {{ errors.cardcvv }}
        </p>
      </div>
    </div>
    <div class="delivery-method">
      <div
        class="delivery-method__wrap"
        :class="{ 'delivery-method__wrap_active': props.currentDeviveryMethod == method.name }"
        v-for="method of props.deliveryMethods"
        :key="method.id"
        @click.prevent="emit('setDeliveryMethod', method.name)"
      >
        <button class="delivery-method__method">
          <img
            class="delivery-method__img"
            :src="method.img"
            :alt="$t(`DeliveryMethods.${method.name}`)"
          />
          <span class="delivery-method__name">{{ $t(`DeliveryMethods.${method.name}`) }}</span>
        </button>
      </div>
    </div>
    <ButtonForm
      class-name="placingorder-form__button"
      :class="{ error: errors.cardnumber }"
      type="submit"
      :disabled="!meta.valid"
    >
      {{ $t("PlacingOrder.paySum", { sum: props.sum }) }} {{ $t("PayСurrency") }}
    </ButtonForm>
  </form>
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";

.placingorder-form {
  max-width: 400px;
  width: 100%;

  :deep(.placingorder-form__field) {
    padding: 14px 30px 14px 30px;
    margin-bottom: 10px;
  }

  :deep(.placingorder-form__button) {
    padding: 12px;
  }

  &__p {
    color: $black;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  &__errorMessage {
    color: $black;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-bottom: 20px;
  }
}

.delivery-method {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  &__wrap {
    display: inline-block;
    flex: 1;
    padding: 8px;

    &_active {
      padding: 5px;
      border: 3px solid $black;
      border-radius: 8px;
    }
  }

  &__method {
    background: none;
    outline: none;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    gap: 5px;
    cursor: pointer;
  }

  &__img {
    width: 50px;
    height: 50px;
  }

  &__name {
    font-weight: 500;
    @include adaptiv-font(30, 25);
  }
}
</style>
