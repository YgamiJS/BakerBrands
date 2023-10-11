<script setup lang="ts">
import FavoriteIcon from "@/assets/icons/FavoriteIcon.vue";
import HomeIcon from "@/assets/icons/HomeIcon.vue";
import OrderIcon from "@/assets/icons/OrderIcon.vue";
import SearchIcon from "@/assets/icons/SearchIcon.vue";
import ShopIcon from "@/assets/icons/ShopIcon.vue";
import { RouterLink } from 'vue-router';
</script>

<template>
    <nav class="AppBar">
        <ul class="menu">
            <li class="menu__item">
                <RouterLink to="/Shop/" class="menu__link">
                    <HomeIcon class="menu__icon" />
                </RouterLink>
            </li>
            <li class="menu__item">
                <RouterLink class="menu__link" to="/Search/">
                    <SearchIcon class="menu__icon" />
                </RouterLink>
            </li>
            <li class="menu__item">
                <RouterLink to="/Favorites/" class="menu__link">
                  <FavoriteIcon class="menu__icon" />
                </RouterLink>
            </li>
            <li class="menu__item">
                <RouterLink to="/Basket/" class="menu__link">
                  <ShopIcon class="menu__icon" />
                </RouterLink>
            </li>
            <li class="menu__item">
                <RouterLink to="/Bought/" class="menu__link">
                  <OrderIcon class="menu__icon" />
                </RouterLink>
            </li>
        </ul>
    </nav>
</template>


<style scoped lang="scss">
@import "@/assets/scss/App.scss";

:deep(.menu__link:hover .menu__icon path) {
    stroke: $lowspacegrey;
}

:deep(.menu__link.router-link-active .menu__icon path) {
    stroke: $lowspacegrey;
}

.AppBar {
    background: $graySkeleton;
    position: fixed;
    bottom: 0%;
    width: 100%;
    z-index: 7;
}
.menu {
    display: flex;
    justify-content: space-around;
    padding: 20px;
    align-items: center;

    &__item {
        width: 26px;
        height: 24px;
	}
}

</style>