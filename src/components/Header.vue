<script setup>
const emit = defineEmits(['openDrawer']); // функция вызывает событие openDrawer

defineProps({
  totalPrice: Number
});
</script>

<template>
  <header class="flex justify-between border-b border-slate-200 px-10 py-8">
    <router-link to="/">
      <div class="flex items-center gap-4">
        <img src="/logo.png" alt="Logo" class="w-10" />
        <div>
          <h2 class="text-xl font-bold uppercase">vue sneakers</h2>
          <p class="text-slate-400">Best shoes shop</p>
        </div>
      </div></router-link
    >

    <ul class="flex items-center gap-10">
      <li
        @click="() => emit('openDrawer')"
        class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black"
      >
        <img src="/cart.svg" alt="cart" />
        <span>{{ totalPrice }} uah</span>
      </li>

      <router-link to="/favorites">
        <li class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black">
          <img src="/heart.svg" alt="cart" />
          <span>Закладки</span>
        </li></router-link
      >

      <li class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black">
        <img src="/profile.svg" alt="cart" />
        <span>Закладки</span>
      </li>
    </ul>
  </header>
</template>
