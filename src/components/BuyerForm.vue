<script setup>
import { useCartStore } from '../stores/cart'

const store = useCartStore()
</script>

<template>
  <div class="checkout-card">
    <div class="checkout-card-title">Покупатель</div>
    <div class="checkout-subtitle">Укажите свои данные для покупки наших товаров</div>

    <div class="form-grid">
      <div class="form-group">
        <label>Имя*</label>
        <div class="field-wrap">
          <input v-model="store.buyer.name" type="text" class="input-field" placeholder="Иван" />
          <button type="button" class="field-clear" @click="store.buyer.name = ''">×</button>
        </div>
      </div>
      <div class="form-group">
        <label>Фамилия*</label>
        <div class="field-wrap">
          <input v-model="store.buyer.surname" type="text" class="input-field" placeholder="Иванов" />
          <button type="button" class="field-clear" @click="store.buyer.surname = ''">×</button>
        </div>
      </div>
      <div class="form-group">
        <label>Телефон</label>
        <div class="field-wrap">
          <input v-model="store.buyer.phone" type="tel" class="input-field" placeholder="+7 800 555 35 35" />
          <button type="button" class="field-clear" @click="store.buyer.phone = ''">×</button>
        </div>
      </div>
      <div class="form-group">
        <label>Почта</label>
        <div class="field-wrap">
          <input v-model="store.buyer.email" type="email" class="input-field" placeholder="mail@example.com" />
          <button type="button" class="field-clear" @click="store.buyer.email = ''">×</button>
        </div>
      </div>
    </div>

    <div class="form-alert">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
      Внимательно проверьте контактные данные, они нужны для получения заказа
    </div>

    <div class="form-group">
      <label>Комментарий к заказу</label>
      <textarea v-model="store.buyer.comment" class="input-field" placeholder="Напишите свои пожелания..."></textarea>
    </div>
  </div>
</template>
