<script setup>
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import CartItem from '../components/CartItem.vue'
import SummaryCard from '../components/SummaryCard.vue'
import PromoCode from '../components/PromoCode.vue'

const router = useRouter()
const store = useCartStore()
</script>

<template>
  <main>
    <div class="breadcrumbs">
      <span class="breadcrumbs-icon">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      </span>
      <span class="breadcrumbs-sep">/</span>
      <span>Корзина</span>
    </div>

    <h1 class="page-title">Корзина <span class="count">{{ store.totalQty }} шт.</span></h1>

    <div class="cart-layout">
      <div class="cart-items-section">
        <div v-if="store.loading" class="cart-empty">Загрузка товаров…</div>
        <div v-else-if="store.items.length === 0" class="cart-empty">Корзина пуста</div>

        <template v-else>
          <div class="cart-actions">
            <label class="checkbox-label btn-clear">
              <input type="checkbox" class="custom-checkbox" :checked="store.allSelected" @change="store.toggleSelectAll()" />
              Выбрать все
            </label>
            <div class="cart-actions-right">
              <button type="button" class="btn-clear" @click="store.clearCart()">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 3C19.5523 3 20 3.44772 20 4C20 4.55228 19.5523 5 19 5H17.9355L17.2969 14.5859C17.2453 15.359 17.2029 15.997 17.127 16.5146C17.0492 17.0444 16.926 17.5293 16.6689 17.9805C16.2688 18.6827 15.6648 19.2471 14.9375 19.5996C14.4703 19.826 13.979 19.9166 13.4453 19.959C12.9238 20.0004 12.2845 20 11.5098 20H8.49023C7.71551 20 7.07621 20.0004 6.55469 19.959C6.02098 19.9166 5.52973 19.826 5.0625 19.5996C4.33518 19.2471 3.7312 18.6827 3.33105 17.9805C3.07401 17.5293 2.95083 17.0444 2.87305 16.5146C2.79705 15.997 2.75466 15.359 2.70312 14.5859L2.06445 5H1C0.447715 5 0 4.55228 0 4C0 3.44772 0.447715 3 1 3H19ZM4.69922 14.4531C4.75287 15.2579 4.78976 15.8037 4.85156 16.2246C4.91159 16.6334 4.98552 16.8431 5.06934 16.9902C5.26941 17.3413 5.57098 17.6236 5.93457 17.7998C6.08696 17.8736 6.30099 17.9331 6.71289 17.9658C7.13698 17.9995 7.68369 18 8.49023 18H11.5098C12.3163 18 12.863 17.9995 13.2871 17.9658C13.699 17.9331 13.913 17.8736 14.0654 17.7998C14.429 17.6236 14.7306 17.3413 14.9307 16.9902C15.0145 16.8431 15.0884 16.6334 15.1484 16.2246C15.2102 15.8037 15.2471 15.2579 15.3008 14.4531L15.9307 5H4.06934L4.69922 14.4531ZM13 0C13.5523 0 14 0.447715 14 1C14 1.55228 13.5523 2 13 2H7C6.44772 2 6 1.55228 6 1C6 0.447715 6.44772 0 7 0H13Z" fill="#2B2B2B"/>
                </svg>
                Очистить корзину
              </button>
            </div>
          </div>

          <CartItem
            v-for="item in store.items"
            :key="item.id"
            :item="item"
            @toggle="store.toggleSelect(item.id)"
            @change-qty="(delta) => store.changeQty(item.id, delta)"
            @remove="store.removeItem(item.id)"
          />
        </template>
      </div>

      <div class="summary-sidebar">
        <SummaryCard title="Ваша корзина:">
          <button type="button" class="checkout-btn" :disabled="store.selectedItems.length === 0" @click="router.push('/checkout')">
            К оформлению
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.00023 6.99992L12.5862 6.99992L7.2932 1.70696C6.90268 1.31643 6.90268 0.683418 7.2932 0.292893C7.68373 -0.097631 8.31674 -0.097631 8.70727 0.292893L15.7073 7.29289L15.7756 7.36907C16.096 7.76184 16.0734 8.34084 15.7073 8.70696L8.70727 15.707C8.31674 16.0975 7.68373 16.0975 7.2932 15.707C6.90268 15.3164 6.90268 14.6834 7.2932 14.2929L12.5862 8.99992L1.00023 8.99992C0.44795 8.99992 0.000234706 8.55221 0.000234699 7.99992C0.000234693 7.44764 0.447949 6.99992 1.00023 6.99992Z" fill="white"/>
            </svg>
          </button>
        </SummaryCard>
        <PromoCode />
      </div>
    </div>
  </main>
</template>
