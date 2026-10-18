<script setup>
import { computed } from 'vue'
import { formatPrice } from '../utils/format'

const props = defineProps({
  item: { type: Object, required: true },
})

defineEmits(['toggle', 'change-qty', 'remove'])

const inStock = computed(() => props.item.stock > 0)
const lineTotal = computed(() => props.item.price * props.item.qty)
const oldLineTotal = computed(() =>
  props.item.oldPrice ? props.item.oldPrice * props.item.qty : null,
)
</script>

<template>
  <div class="cart-item" :class="{ 'cart-item--out': !inStock }">
    <div class="cart-item-img-wrapper">
      <input
          type="checkbox"
          class="custom-checkbox"
          :checked="item.selected"
          :disabled="!inStock"
          @change="$emit('toggle')"
      />
      <img class="cart-item-img" :src="item.image" :alt="item.name" />
    </div>
    <div class="cart-item-info">
      <div class="cart-item-article">{{ item.sku }}</div>
      <div class="cart-item-title">{{ item.name }}</div>
      <span v-if="!inStock" class="cart-item-out-label">Нет в наличии</span>
      <span v-else class="cart-item-stock">Доступно: {{ item.stock }} шт.</span>
    </div>
    <div class="cart-item-price-col">
      <div class="cart-item-price">{{ formatPrice(lineTotal) }}</div>
      <div v-if="oldLineTotal" class="cart-item-old-price">{{ formatPrice(oldLineTotal) }}</div>
      <div class="cart-item-price-info">
        <div class="quantity-control-wrapper">
          <div class="quantity-control">
            <button type="button" :disabled="!inStock || item.qty <= 1" @click="$emit('change-qty', -1)">−</button>
            <input type="text" :value="item.qty" readonly />
            <button type="button" :disabled="!inStock || item.qty >= item.stock" @click="$emit('change-qty', 1)">+</button>
          </div>
          <div class="price-per-item">{{ formatPrice(item.price) }}</div>
        </div>
        <button type="button" class="btn-delete" @click="$emit('remove')">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 3C19.5523 3 20 3.44772 20 4C20 4.55228 19.5523 5 19 5H17.9355L17.2969 14.5859C17.2453 15.359 17.2029 15.997 17.127 16.5146C17.0492 17.0444 16.926 17.5293 16.6689 17.9805C16.2688 18.6827 15.6648 19.2471 14.9375 19.5996C14.4703 19.826 13.979 19.9166 13.4453 19.959C12.9238 20.0004 12.2845 20 11.5098 20H8.49023C7.71551 20 7.07621 20.0004 6.55469 19.959C6.02098 19.9166 5.52973 19.826 5.0625 19.5996C4.33518 19.2471 3.7312 18.6827 3.33105 17.9805C3.07401 17.5293 2.95083 17.0444 2.87305 16.5146C2.79705 15.997 2.75466 15.359 2.70312 14.5859L2.06445 5H1C0.447715 5 0 4.55228 0 4C0 3.44772 0.447715 3 1 3H19ZM4.69922 14.4531C4.75287 15.2579 4.78976 15.8037 4.85156 16.2246C4.91159 16.6334 4.98552 16.8431 5.06934 16.9902C5.26941 17.3413 5.57098 17.6236 5.93457 17.7998C6.08696 17.8736 6.30099 17.9331 6.71289 17.9658C7.13698 17.9995 7.68369 18 8.49023 18H11.5098C12.3163 18 12.863 17.9995 13.2871 17.9658C13.699 17.9331 13.913 17.8736 14.0654 17.7998C14.429 17.6236 14.7306 17.3413 14.9307 16.9902C15.0145 16.8431 15.0884 16.6334 15.1484 16.2246C15.2102 15.8037 15.2471 15.2579 15.3008 14.4531L15.9307 5H4.06934L4.69922 14.4531ZM13 0C13.5523 0 14 0.447715 14 1C14 1.55228 13.5523 2 13 2H7C6.44772 2 6 1.55228 6 1C6 0.447715 6.44772 0 7 0H13Z" fill="#2B2B2B"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
