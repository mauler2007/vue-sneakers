<script setup>
import { ref, onMounted } from 'vue';

import axios from 'axios';

import CardList from '../components/CardList.vue';

const favorites = ref([]);

onMounted(async () => {
  try {
    const { data } = await axios.get('https://c0c9e487cd4b59b4.mokky.dev/favorites'); // получаем "не плоский обьект" поэтому карточки тянуться битыми.

    favorites.value = data.map((obj) => obj.item); //
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <h2 class="text-3xl font-bold mb-8">My favorites</h2>

  <CardList :items="favorites" is-favorites />
</template>
