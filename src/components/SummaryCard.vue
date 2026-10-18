<script setup>
import { useCartStore } from '../stores/cart'
import { formatPrice } from '../utils/format'

defineProps({
  title: { type: String, required: true },
})

const store = useCartStore()
</script>

<template>
  <div class="cart-card">
    <h2 class="cart-title">{{ title }}</h2>

    <div class="cart-row">
      <span class="cart-label">{{ store.totalQty }} товаров:</span>
      <span class="cart-value">{{ formatPrice(store.goodsTotal) }}</span>
    </div>

    <div class="divider"></div>

    <div class="cart-row">
      <span class="cart-label">Скидка:</span>
      <span class="cart-value discount">{{ formatPrice(store.savings) }}</span>
    </div>

    <template v-if="store.appliedPromo">
      <div class="cart-row">
        <span class="cart-label">Промокод {{ store.appliedPromo.code }}:</span>
        <span class="cart-value discount">{{ formatPrice(store.promoDiscount) }}</span>
      </div>
    </template>

    <div class="divider"></div>

    <div class="cart-row total-row">
      <span class="total-label">Итого:</span>
      <span class="total-value">{{ formatPrice(store.total) }}</span>
    </div>

    <slot />
  </div>
</template>
