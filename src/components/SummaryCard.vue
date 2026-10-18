<script setup>
import { useCartStore } from '../stores/cart'
import { formatPrice } from '../utils/format'

defineProps({
  title: { type: String, required: true },
})

const store = useCartStore()
</script>

<template>
  <div class="summary-card">
    <div class="summary-title">{{ title }}</div>
    <div class="summary-row">
      <span>{{ store.totalQty }} товаров:</span>
      <span>{{ formatPrice(store.goodsTotal) }}</span>
    </div>
    <div class="summary-row discount">
      <span>Скидка:</span>
      <span>{{ formatPrice(store.savings) }}</span>
    </div>
    <div v-if="store.appliedPromo" class="summary-row discount">
      <span>Промокод {{ store.appliedPromo.code }}:</span>
      <span>{{ formatPrice(store.promoDiscount) }}</span>
    </div>
    <div class="summary-row total">
      <span>Итого:</span>
      <span>{{ formatPrice(store.total) }}</span>
    </div>
    <slot />
  </div>
</template>
