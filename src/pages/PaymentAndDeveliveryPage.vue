<script setup lang="ts">
import Location from "@/components/Location.vue";
</script>

<template>
  <main class="PaymentAndDevelivery">
    <section class="PaymentAndDevelivery-info">
      <div class="PaymentAndDevelivery-info__container container">
        <Location />
        <h1 class="PaymentAndDevelivery-info__h1">
          {{ $t("PaymentAndDevelivery.paymentAndDevelivery") }}
        </h1>
        <ul class="PaymentAndDevelivery-info__info">
          <ul class="PaymentAndDevelivery-info-list">
            <li class="PaymentAndDevelivery-info-list__head">
              {{ $t("PaymentAndDevelivery.Pay.youCanPayAnywayByMethod") }}
            </li>
            <li class="PaymentAndDevelivery-info-list__item">
              {{ $t("PaymentAndDevelivery.Pay.paymentVisaMasterCard") }}
            </li>
            <li class="PaymentAndDevelivery-info-list__item">
              {{ $t("PaymentAndDevelivery.Pay.prepaymentTelegram") }}
            </li>
          </ul>
          <ul class="PaymentAndDevelivery-info-list">
            <li class="PaymentAndDevelivery-info-list__head">
              {{ $t("PaymentAndDevelivery.Develivery.weReadyGiveSomeVariants") }}
            </li>
            <li class="PaymentAndDevelivery-info-list__item">
              {{ $t("PaymentAndDevelivery.Develivery.russiaMail") }}
            </li>
            <li class="PaymentAndDevelivery-info-list__item">
              {{ $t("PaymentAndDevelivery.Develivery.cdek") }}
            </li>
            <li class="PaymentAndDevelivery-info-list__item">
              {{ $t("PaymentAndDevelivery.Develivery.momentalDevelivery") }}
            </li>
          </ul>
        </ul>
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";

.PaymentAndDevelivery {
  flex: 1 0 auto;
}
.PaymentAndDevelivery-info {
  &__h1 {
    color: $black;
    font-size: 20px;
    font-weight: 400;
    line-height: normal;
    margin-top: 30px;
    margin-bottom: 20px;
  }

  &__info {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 20px;
  }
}
.PaymentAndDevelivery-info-list {
  &__head {
    color: $black;
    font-size: 16px;
    font-weight: 400;
  }

  &__item {
    color: $spacegray;
    font-size: 16px;
    font-weight: 300;

    &::before {
      content: "•";
      margin-right: 3px;
    }
  }
}
</style>
