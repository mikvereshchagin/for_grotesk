<script setup>
import { ref } from 'vue'
import { useCartStore } from '../stores/cart'

const props = defineProps({
  initiallyOpen: { type: Boolean, default: false },
})

const store = useCartStore()
const open = ref(props.initiallyOpen)
const code = ref('')
const message = ref('')
const isError = ref(false)

function apply() {
  const result = store.applyPromo(code.value)
  message.value = result.message
  isError.value = !result.ok
}

function clear() {
  code.value = ''
  store.clearPromo()
  message.value = ''
  isError.value = false
}
</script>

<template>
  <div class="promo-card">
    <div class="promo-header" @click="open = !open">
      <div class="promo-header-left">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
        Промокод
      </div>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :style="{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }"><polyline points="6 9 12 15 18 9"></polyline></svg>
    </div>
    <div class="promo-body" :class="{ active: open }">
      <span class="promo-label">Промокод</span>
      <div class="promo-input-group">
        <input v-model="code" type="text" class="input-field" placeholder="Введите промокод" @keyup.enter="apply" />
        <button type="button" class="promo-clear" @click="clear">×</button>
      </div>
      <button type="button" class="btn-dark" @click="apply">Применить</button>
      <div v-if="message" class="promo-message" :class="{ 'promo-message--error': isError }">{{ message }}</div>
    </div>
  </div>
</template>
