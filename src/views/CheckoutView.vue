<script setup>
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import SummaryCard from '../components/SummaryCard.vue'
import PromoCode from '../components/PromoCode.vue'
import BuyerForm from '../components/BuyerForm.vue'
import PaymentMethod from '../components/PaymentMethod.vue'

const router = useRouter()
const store = useCartStore()

function placeOrder() {
  store.placeOrder()
  router.push('/success')
}
</script>

<template>
  <main>
    <div class="breadcrumbs">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
      <span>/</span>
      <router-link to="/">Корзина</router-link>
      <span>/</span>
      <span class="active">Оформление заказа</span>
    </div>

    <div class="page-title page-title--checkout">
      <button type="button" class="back-btn" @click="router.push('/')">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        В корзину
      </button>
      <span class="checkout-title-text">Оформление заказа</span>
    </div>

    <div class="checkout-layout">
      <div class="checkout-forms">
        <div class="checkout-card">
          <div class="checkout-card-title">{{ store.totalQty }} товаров</div>
          <div class="checkout-products-grid">
            <div v-for="item in store.selectedItems" :key="item.id" class="checkout-product-thumb">
              <img :src="item.image" :alt="item.name" />
              <span class="qty-badge">{{ item.qty }}</span>
            </div>
          </div>
          <button type="button" class="btn-back-cart" @click="router.push('/')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            Вернуться в корзину
          </button>
        </div>

        <BuyerForm />
        <PaymentMethod />

        <div class="checkout-actions">
          <button type="button" class="btn-primary" @click="placeOrder">Оформить заказ</button>
          <div class="note">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
            Вы указали все необходимые данные, теперь можно оформить заказ
          </div>
        </div>
      </div>

      <div class="summary-sidebar">
        <SummaryCard title="Ваш заказ:">
          <button type="button" class="checkout-btn" @click="placeOrder">Оформить заказ</button>
        </SummaryCard>
        <PromoCode :initially-open="true" />
      </div>
    </div>
  </main>
</template>
