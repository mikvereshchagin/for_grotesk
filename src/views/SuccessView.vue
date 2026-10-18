<script setup>
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'

const router = useRouter()
const store = useCartStore()
</script>

<template>
  <main class="success-page">
    <div class="success-icon">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
    </div>
    <h2 class="success-title">Заказ №{{ store.orderNumber }} успешно создан</h2>
    <p class="success-text">Статус заказа вы можете отслеживать в личном кабинете</p>
    <button type="button" class="btn-primary" @click="router.push('/')">В корзину</button>
  </main>
</template>
