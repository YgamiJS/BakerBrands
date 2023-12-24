<script setup lang="ts">
import type { IProfileForm } from "@/types";

import GoBackButton from "@/components/GoBackButton.vue";
import Loader from "@/components/Loader.vue";
import Location from "@/components/Location.vue";
import LogoutButton from "@/components/LogoutButton.vue";
import ProfileInfo from "@/components/ProfileInfo.vue";
import ProfileLinks from "@/components/ProfileLinks.vue";
import { useAuthenticationStore } from "@/store/authentication";
import { useFavoritesStore } from "@/store/favorites";
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const { changeAvatar, changeUserInfo, getUserInfo } = useUserStore();
const { loading, userData } = storeToRefs(useUserStore());

const router = useRouter();

const { logout } = useAuthenticationStore();
const { clearFavoritesData } = useFavoritesStore();

const logoutFromAccount = () => {
  logout();
  router.replace("/");
  clearFavoritesData();
};

const changeAvata = (event: Event) => {
  let inputElement = (event.target as HTMLInputElement).files?.[0];

  if (!inputElement) return;

  changeAvatar(inputElement);
};

const changeInfo = async (data: IProfileForm) => {
  await changeUserInfo(data);
};

onMounted(async () => {
  await getUserInfo();
});
</script>

<template>
  <main class="Profile">
    <section class="UserProfile">
      <div class="UserProfile__container container">
        <Location />
        <GoBackButton />
        <h1 class="UserProfile__h1">{{ $t("Profile.profile") }}</h1>
        <Loader class="UserProfile__loader" v-if="loading" />
        <template v-else>
          <LogoutButton class="UserProfile__logoutbutton" @click="logoutFromAccount" />
          <ProfileInfo
            class="UserProfile__info"
            :user="userData"
            @change-avatar="changeAvata"
            @change-info="changeInfo"
          />
          <ProfileLinks class="UserProfile__links" />
        </template>
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";

.Profile {
  flex: 1 0 auto;
  min-height: 90vh;
}

.UserProfile {
  &__container {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  &__h1 {
    font-weight: 400;
    @include adaptiv-font(32, 24);
    line-height: 23px;
    color: $black;
    margin: 25px 0;
  }

  &__loader {
    width: 100%;
    height: 60vh;
  }

  &__logoutbutton {
    margin-top: 20px;
    align-self: flex-end;
  }

  &__info {
    margin-bottom: 20px;
  }
}
</style>
