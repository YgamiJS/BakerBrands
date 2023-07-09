<script setup lang="ts">
import { images } from "@/assets/images";
import Location from "@/components/Location.vue";
</script>

<template>
  <main class="Contacts">
    <section class="Contacts-info">
      <div class="Contacts-info__container container">
        <Location />
        <h1 class="Contacts-info__h1">{{ $t("Contacts.feedback") }}</h1>
        <ul class="Contacts-info__info">
          <ul class="Contacts-info-list__list">
            <li class="Contacts-info-list__head">{{ $t("Contacts.social-net.social") }}</li>
            <li class="Contacts-info-list__item">
              <a class="Contacts-info-list__link" href="#">
                <img class="Contacts-info-list__img" :src="images.telegram" alt="Telegram" />
              </a>
            </li>
          </ul>
          <ul class="Contacts-info-list__list">
            <li class="Contacts-info-list__head">{{ $t("Contacts.byNumber.byNumber") }}</li>
            <li class="Contacts-info-list__item">
              <a class="Contacts-info-list__link" href="tel:+7123456789">
                {{ $t("Contacts.byNumber.number") }}
              </a>
            </li>
          </ul>
          <ul class="Contacts-info-list__list">
            <li class="Contacts-info-list__head">{{ $t("Contacts.byMail.byMail") }}</li>
            <li class="Contacts-info-list__item">
              <a class="Contacts-info-list__link" href="mailto:bakerbrands@gmail.com">
                {{ $t("Contacts.byMail.mail") }}
              </a>
            </li>
          </ul>
        </ul>
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";

.Contacts {
  scroll-snap-stop: always;
  flex: 1 0 auto;
}
.Contacts-info {
  &__h1 {
    color: $black;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-top: 30px;
    margin-bottom: 30px;
  }

  &__info {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 20px;
    list-style: none;
  }
}

.Contacts-info-list {
  &__list {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }

  &__head {
    color: $black;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  &__item {
    color: $spacegray;
    font-size: 16px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
  }

  &__link {
    color: $spacegray;
  }
}
</style>
