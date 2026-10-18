<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from './stores/cart'
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'

const route = useRoute()
const store = useCartStore()

const isCheckout = computed(() => route.name === 'checkout')

onMounted(() => {
  store.loadProducts()
})
</script>

<template>
  <div class="app-container" :class="{ 'checkout-page': isCheckout }">
    <TheHeader />
    <router-view />
  </div>
  <TheFooter />
</template>
