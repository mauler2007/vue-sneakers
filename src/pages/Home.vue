<script setup>
import { reactive, inject, watch, ref, onMounted } from 'vue';

import axios from 'axios';
import debounce from 'lodash.debounce';

import CardList from '../components/CardList.vue';

const { cart, addToCart, removeFromCart } = inject('cart');

const items = ref([]); //ref возвращает обект  со всеми кроссовками {value:[]}

// sorting
const filters = reactive({
  sortBy: 'title', //select
  searchQuery: '' //input
});

const onClickAddPlus = (item) => {
  if (!item.isAdded) {
    addToCart(item);
  } else {
    removeFromCart(item);
  }
  // console.log(cart);
};

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value;
  // console.log(event.target.value)
};

const onChangeSearchInput = debounce((event) => {
  filters.searchQuery = event.target.value;
}, 300);

const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        parentId: item.id,
        item
      };

      item.isFavorite = true;

      const { data } = await axios.post(`https://c0c9e487cd4b59b4.mokky.dev/favorites`, obj);

      item.favoriteId = data.id;
    } else {
      item.isFavorite = false;

      await axios.delete(`https://c0c9e487cd4b59b4.mokky.dev/favorites/${item.favoriteId}`);
      // item.isFavoriteId = null;
    }
  } catch (error) {
    console.log(error);
  }
};

const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get(`https://c0c9e487cd4b59b4.mokky.dev/favorites`);

    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.parentId === item.id);

      if (!favorite) {
        return item;
      }

      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id
      };
    });
    // console.log(items.value);
  } catch (error) {
    console.log(error);
  }
};

const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy
    };

    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`;
    }

    const { data } = await axios.get(`https://c0c9e487cd4b59b4.mokky.dev/items`, { params });

    items.value = data.map((obj) => ({
      ...obj,
      isFavorite: false,
      favoriteId: null,
      isAdded: false
    }));
  } catch (err) {
    console.log(err);
  }
};

onMounted(async () => {
  const localCart = localStorage.getItem('cart');
  cart.value = localCart ? JSON.parse(localCart) : [];

  await fetchItems();
  await fetchFavorites();

  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
  }));
});

watch(cart, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: false
  }));
});

watch(filters, fetchItems);
</script>

<template>
  <div class="flex justify-between items-center">
    <h2 class="text-3xl font-bold mb-8">Все кроссовки</h2>
    <div class="flex gap-4">
      <select @change="onChangeSelect" class="py-2 px-3 border rounded-md ouline-none">
        <option value="name">by name</option>
        <option value="price">low price</option>
        <option value="-price">hight price</option>
      </select>
      <div class="relative">
        <img class="absolute left-4 top-3" src="/search.svg" alt="Search icon" />
        <input
          @input="onChangeSearchInput"
          class="border rounded-md py-2 pl-11 pr-4 outline-none focus:border-grey-400"
          type="text"
          placeholder="search"
        />
      </div>
    </div>
  </div>

  <div classs="mt-10">
    <CardList :items="items" @add-to-favorite="addToFavorite" @add-to-cart="onClickAddPlus" />
  </div>
</template>
