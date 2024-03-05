<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import axios from 'axios';

import { ref, inject, computed } from 'vue';

import DrawerHead from './DrawerHead.vue';
import CartsListItem from './CartsListItem.vue';
import InfoBlock from './InfoBlock.vue';

const props = defineProps({
  totalPrice: Number,
  vatPrice: Number
});

const { cart, closeDrawer } = inject('cart');

const isCreating = ref(false);
const orderId = ref(null);

const createOrder = async () => {
  try {
    isCreating.value = true;
    const { data } = await axios.post('https://c0c9e487cd4b59b4.mokky.dev/orders', {
      items: cart.value,
      totalPrice: props.totalPrice.value
    });

    cart.value = [];
    orderId.value = data.id;

    return data;
  } catch (error) {
    console.log(error);
  } finally {
    isCreating.value = true;
  }
};

const cartIsEmpty = computed(() => cart.value.length === 0);
const buttonDisabled = computed(() => isCreating.value || cartIsEmpty.value);
</script>

<template>
  <div>
    <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
    <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8">
      <DrawerHead />

      <div v-if="!totalPrice || orderId" class="flex h-full items-center">
        <InfoBlock
          v-if="!totalPrice && !orderId"
          title="Cart is empty"
          description="Please add some product to cart, for ordering"
          image-url="/package-icon.png"
        />
        <InfoBlock
          v-if="orderId"
          title="Order Complete"
          :description="`Your order #${orderId} will send to delivery department`"
          image-url="/order-success-icon.png"
        />
      </div>

      <div v-else>
        <CartsListItem />

        <!-- если totalPrice есть -->
        <div class="flex flex-col gap-4 my-7">
          <div class="flex gap-2">
            <span>total:</span>
            <div class="flex-1 border-b border-dashed"></div>
            <b>{{ totalPrice }} $</b>
          </div>

          <div class="flex gap-2">
            <span>tax: 5%</span>
            <div class="flex-1 border-b border-dashed"></div>
            <b>{{ vatPrice }} $</b>
          </div>

          <button
            :disabled="buttonDisabled"
            @click="createOrder"
            class="mt-4 transition bg-lime-500 w-full rounded-xl py-3 text-white disabled:bg-slate-300 hover:bg-lime-600 active:bg-lime-700 cursor-pointer"
          >
            order
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
