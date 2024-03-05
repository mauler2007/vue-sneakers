<script setup>
import { ref, provide, watch, computed } from 'vue';

import Header from './components/Header.vue';
import Drawer from './components/Drawer.vue';

/* cart start*/
const cart = ref([]); // список товаров корзины

const drawerOpen = ref(false);

const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0)); // computed  позволяет   работать с реактивной переменной  которую нужно  переиспользовать в другой реактивной переменной
const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100));

const closeDrawer = () => {
  drawerOpen.value = false;
};

const openDrawer = () => {
  drawerOpen.value = true;
};

const addToCart = (item) => {
  if (!item.isAdded) {
    cart.value.push(item);
    item.isAdded = true;
  }
};

const removeFromCart = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1);
  item.isAdded = false;
};

watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value));
  },
  { deep: true }
); // deep:true дает возможность вглубь следить за изменением  вложенных в корзину обьеоктов, свойств, состояний)

provide('cart', {
  cart,
  closeDrawer,
  openDrawer,
  addToCart,
  removeFromCart
});
/* cart end*/
</script>

<template>
  <div>
    <Drawer v-if="drawerOpen" :total-price="totalPrice" :vat-price="vatPrice" />

    <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
      <Header :total-price="totalPrice" @open-drawer="openDrawer" />

      <div class="p-10">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
