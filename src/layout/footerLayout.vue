<script setup lang="ts">
import { images } from "@/assets/images";
import { RouterLink } from "vue-router";
</script>

<template>
  <footer class="footer">
    <div class="footer__container container">
      <div class="footer__links">
        <ul class="info">
          <div class="faq-item">
            <label class="faq-title info__info-head" for="faq-1">{{ $t("footer.company") }}</label>
            <input class="faq-input" type="checkbox" name="faq" id="faq-1" />
            <ul class="faq-text">
              <li class="info__info">
                <RouterLink class="info__link" to="#">{{ $t("footer.aboutUs") }}</RouterLink>
              </li>
              <li class="info__info">
                <RouterLink class="info__link" to="#">{{ $t("footer.contacts") }}</RouterLink>
              </li>
            </ul>
          </div>
        </ul>
        <ul class="info">
          <div class="faq-item">
            <label class="faq-title info__info-head" for="faq-2">{{ $t("footer.usefull") }}</label>
            <input class="faq-input" type="checkbox" name="faq" id="faq-2" />
            <ul class="faq-text">
              <li class="info__info">
                <RouterLink class="info__link" to="/PayAndDevelivery">{{
                  $t("footer.payAndDelivery")
                }}</RouterLink>
              </li>
            </ul>
          </div>
        </ul>
        <ul class="info">
          <div class="faq-item">
            <label class="faq-title info__info-head" for="faq-3">{{
              $t("footer.toTheBuyer")
            }}</label>
            <input class="faq-input" type="checkbox" name="faq" id="faq-3" />
            <ul class="faq-text">
              <li class="info__info">
                <RouterLink class="info__link" to="/Favorites/">{{
                  $t("footer.favorites")
                }}</RouterLink>
              </li>
              <li class="info__info">
                <RouterLink class="info__link" to="">{{ $t("footer.policy") }}</RouterLink>
              </li>
            </ul>
          </div>
        </ul>
        <ul class="info">
          <div class="faq-item">
            <label class="faq-title info__info-head" for="faq-4">{{ $t("footer.contacts") }}</label>
            <input class="faq-input" type="checkbox" name="faq" id="faq-4" />
            <ul class="faq-text">
              <li class="info__info">
                <RouterLink class="info__link" to="/Contacts">{{
                  $t("footer.contacts")
                }}</RouterLink>
              </li>
              <li class="info__info">
                <a class="info__link" href="#">
                  <img class="info__img" :src="images.telegram" title="Telegram" alt="Telegram" />
                  Telegram
                </a>
              </li>
              <li class="info__info">
                <a href="tel:+71234566789" class="info__link" to="">+7 ( 123) 456-67-89</a>
              </li>
            </ul>
          </div>
        </ul>
      </div>
      <p class="footer__copyright">&#169; BAKERBRANDS</p>
    </div>
  </footer>
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";
.footer {
  flex-shrink: 0;
  padding: 60px 15px 25px 15px;

  @media (max-width: 767px) {
    padding: 60px 15px 90px 15px;
    &__container {
      padding: 0;
    }
  }

  &__links {
    display: flex;
    @media (max-width: 767px) {
      flex-direction: column;
    }

    justify-content: space-between;
    gap: 46px;
  }

  &__copyright {
    text-align: center;

    @media (max-width: 767px) {
      margin-top: 25px;
    }
  }
}

.info {
  @media (max-width: 767px) {
    padding-bottom: 5px;
    border-bottom: 1px solid $grey20;
    text-align: center;
  }

  &__info-head {
    font-weight: 400;
    font-size: 24px;
    line-height: 28.8px;
    color: $black;
  }
  &__link {
    font-weight: 300;
    font-size: 16px;
    line-height: 28px;
    color: $black;
    transition: all 300ms ease;
    &:hover {
      text-decoration: underline;
    }
  }
}

.faq-input {
  appearance: none;
  height: 0;
  width: 0;
}

.faq-input:checked + .faq-text {
  display: block;
}

.faq-text {
  @media (max-width: 767px) {
    display: none;
  }
}
</style>
