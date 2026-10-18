# Гротеск — интернет-магазин (frontend)

Тестовое задание: frontend на **Vue 3 + Vite**. Корзина и оформление заказа по макету
студии «Гротеск». Данные товаров приходят с API `growtask.ru`.

## Стек

- Vue 3 (Composition API, `<script setup>`)
- Vue Router — маршруты `/` (корзина), `/checkout` (оформление), `/success` (успех)
- Pinia — состояние корзины и заказа (`src/stores/cart.js`)
- Vite — сборка и dev-сервер

## Запуск

```bash
npm install
npm run dev      # http://localhost:5173
```

- Сборка: `npm run build`
- Предпросмотр собранного: `npm run preview`

Требуется Node.js 18+ (в `.nvmrc` указана 20). Перед запуском скрипты проверяют
версию Node и выводят понятную ошибку, если она ниже 18 (`scripts/check-node.mjs`).

## Промокоды

| Код | Скидка |
| --- | ------ |
| `GROWTASK2026` | 10% |

## Структура

```
src/
  main.js              # точка входа
  App.vue              # каркас: header + router-view + footer
  config.js            # URL API, промокоды
  api/products.js      # загрузка товаров (с фолбэком на локальную копию)
  data/fallbackProducts.js  # копия ответа API (для CORS/офлайн)
  stores/cart.js       # корзина, промокод, оплата, покупатель, заказ
  utils/format.js      # форматирование цен
  styles/main.css      # все стили макета
  router/index.js      # маршруты
  components/          # TheHeader, TheFooter, CartItem, SummaryCard, PromoCode, BuyerForm, PaymentMethod
  views/               # CartView, CheckoutView, SuccessView
scripts/
  check-node.mjs       # проверка версии Node перед запуском
```

