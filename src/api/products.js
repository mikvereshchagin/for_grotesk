import { API_BASE_URL } from '../config'
import fallbackProducts from '../data/fallbackProducts'

function normalizeImage(url) {
  if (!url) return ''
  return url.replace(/^http:\/\//, 'https://')
}

export function normalizeProduct(product) {
  return {
    id: product.id,
    name: product.name,
    sku: product.sku,
    price: Number(product.price),
    oldPrice: product.old_price == null ? null : Number(product.old_price),
    image: normalizeImage(product.image),
    stock: Number(product.quantity),
  }
}

export async function fetchProducts() {
  try {
    const response = await fetch(`${API_BASE_URL}/products`)
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const json = await response.json()
    return (json.data ?? []).map(normalizeProduct)
  } catch (error) {
    console.warn('[GROWTASK] Не удалось загрузить товары с API, использую локальную копию:', error)
    return fallbackProducts.map(normalizeProduct)
  }
}
