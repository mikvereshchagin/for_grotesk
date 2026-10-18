const priceFormatter = new Intl.NumberFormat('ru-RU')

export function formatPrice(value) {
  return `${priceFormatter.format(Math.round(Number(value) || 0))} ₽`
}
