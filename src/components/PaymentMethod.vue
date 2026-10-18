<script setup>
import { useCartStore } from '../stores/cart'

const store = useCartStore()

const options = [
  { value: 'online', title: 'Онлайн', description: 'Visa, Mastercard, Мир, SberPay' },
  { value: 'onDelivery', title: 'При получении', description: 'Наличными или картой при получении' },
]
</script>

<template>
  <div class="checkout-card">
    <div class="checkout-card-title">Способ оплаты</div>
    <div class="checkout-subtitle">Выберите удобный способ оплаты заказа</div>

    <div
      v-for="option in options"
      :key="option.value"
      class="payment-option"
      :class="{ active: store.paymentMethod === option.value }"
      @click="store.setPayment(option.value)"
    >
      <div class="payment-radio"></div>
      <div class="payment-info">
        <h4>{{ option.title }}</h4>
        <p>{{ option.description }}</p>
      </div>
    </div>

    <div class="form-alert form-alert--payment">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
      При оформлении заказа вы будете перенаправлены на страницу платёжной системы
    </div>
  </div>
</template>
