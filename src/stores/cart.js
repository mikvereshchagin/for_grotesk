import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { fetchProducts } from '../api/products'
import { PROMO_CODES } from '../config'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  const loaded = ref(false)
  const loading = ref(false)
  const error = ref(null)

  const appliedPromo = ref(null)
  const paymentMethod = ref('online')
  const buyer = ref({ name: '', surname: '', phone: '', email: '', comment: '' })
  const orderNumber = ref('')

  async function loadProducts() {
    loading.value = true
    error.value = null
    try {
      const products = await fetchProducts()
      items.value = products.map((product) => ({
        ...product,
        qty: product.stock > 0 ? 1 : 0,
        selected: product.stock > 0,
      }))
      loaded.value = true
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  const selectedItems = computed(() => items.value.filter((item) => item.selected))

  const availableItems = computed(() => items.value.filter((item) => item.stock > 0))

  const totalQty = computed(() =>
    selectedItems.value.reduce((sum, item) => sum + item.qty, 0),
  )

  const goodsTotal = computed(() =>
    selectedItems.value.reduce((sum, item) => sum + item.price * item.qty, 0),
  )

  const savings = computed(() =>
    selectedItems.value.reduce(
      (sum, item) =>
        sum + (item.oldPrice ? Math.max(0, item.oldPrice - item.price) * item.qty : 0),
      0,
    ),
  )

  const promoDiscount = computed(() => {
    if (!appliedPromo.value) return 0
    return Math.round((goodsTotal.value * appliedPromo.value.percent) / 100)
  })

  const discount = computed(() => savings.value + promoDiscount.value)

  const total = computed(() => Math.max(0, goodsTotal.value - discount.value))

  const allSelected = computed(
    () =>
      availableItems.value.length > 0 &&
      availableItems.value.every((item) => item.selected),
  )

  function changeQty(id, delta) {
    const item = items.value.find((entry) => entry.id === id)
    if (!item || item.stock <= 0) return
    item.qty = Math.min(item.stock, Math.max(1, item.qty + delta))
  }

  function removeItem(id) {
    items.value = items.value.filter((item) => item.id !== id)
  }

  function clearCart() {
    items.value = []
  }

  function toggleSelect(id) {
    const item = items.value.find((entry) => entry.id === id)
    if (!item || item.stock <= 0) return
    item.selected = !item.selected
  }

  function toggleSelectAll() {
    const next = !allSelected.value
    items.value.forEach((item) => {
      if (item.stock > 0) item.selected = next
    })
  }

  function applyPromo(code) {
    const normalized = String(code || '').trim().toUpperCase()
    if (!normalized) return { ok: false, message: 'Введите промокод' }
    const percent = PROMO_CODES[normalized]
    if (!percent) return { ok: false, message: 'Промокод не найден' }
    appliedPromo.value = { code: normalized, percent }
    return { ok: true, message: `Промокод применён: скидка ${percent}%` }
  }

  function clearPromo() {
    appliedPromo.value = null
  }

  function setPayment(method) {
    paymentMethod.value = method
  }

  function placeOrder() {
    const customer = {
      name: buyer.value.name,
      surname: buyer.value.surname,
      phone: buyer.value.phone,
      email: buyer.value.email,
    }

    const order = [
      {
        customer,
        payment_method: paymentMethod.value,
        comment: buyer.value.comment,
      },
      ...selectedItems.value.map((item) => ({
        id: item.id,
        name: item.name,
        sku: item.sku,
        price: item.price,
        old_price: item.oldPrice,
        image: item.image,
        quantity: item.qty,
      })),
    ]

    console.log('[GROWTASK] Данные заказа:', order)

    const counter = Number(window.localStorage.getItem('grotesk-order-counter') || '0') + 1
    window.localStorage.setItem('grotesk-order-counter', String(counter))
    orderNumber.value = String(counter).padStart(3, '0')

    return order
  }

  return {
    items, loaded, loading, error, appliedPromo, paymentMethod, buyer, orderNumber,
    selectedItems, availableItems, totalQty, goodsTotal, savings, promoDiscount, discount, total, allSelected,
    loadProducts, changeQty, removeItem, clearCart,
    toggleSelect, toggleSelectAll, applyPromo, clearPromo, setPayment, placeOrder,
  }
})
