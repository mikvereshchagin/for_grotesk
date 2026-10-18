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

Требуется Node.js 20 (см. `.nvmrc`).

## Что реализовано

- Загрузка товаров с `GET /test-front/api/products` и отображение в корзине
  (id, name, sku, price, old_price, image, quantity).
- Редактируемая корзина: изменение количества ограничено остатком на складе
  (`quantity` из API); товары с `quantity: 0` показаны как «Нет в наличии».
- Удаление одного товара, множественный выбор и удаление через чекбоксы,
  полная очистка корзины. Чек (сумма и скидка) пересчитывается автоматически.
- Состав корзины сохраняется при переходе на страницу оформления.
- Оформление: данные покупателя и выбранный способ оплаты формируются в массив
  и выводятся в консоль браузера (F12) через `store.placeOrder()`.
- Страница успеха с номером заказа.
- Промокод **`GROWTASK2026`** — скидка 10% (размер задан в `src/config.js`).
- Адаптив под 4 брейкпоинта: FullHD, HD, планшет, телефон.

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
  utils/format.js      # форматирование цен и количеств
  styles/main.css      # все стили макета
  router/index.js      # маршруты
  components/          # TheHeader, TheFooter, CartItem, SummaryCard, PromoCode, BuyerForm, PaymentMethod
  views/               # CartView, CheckoutView, SuccessView
```

## Примечания по API и CORS

- API `growtask.ru` не отдаёт заголовок `Access-Control-Allow-Origin`, поэтому прямой
  `fetch` из браузера блокируется. В dev-режиме запросы идут через прокси Vite
  (`/api/*` → `growtask.ru/test-front/api/*`, см. `vite.config.js`).
- В продакшене (например, GitHub Pages) используется прямой URL; если сервер
  не отдаст CORS, сработает локальная копия данных — корзина всё равно отобразится.
- Картинки приходят по `http://` и редиректятся на `https://`; в коде URL
  нормализуется к `https`, чтобы не было mixed-content.

## Примечание по деплою

Используется history-режим Vue Router. На статическом хостинге нужен SPA-fallback
(все пути → `index.html`), иначе при обновлении `/checkout` будет 404. Для хостинга
без настройки сервера можно переключить `createWebHistory` на
`createWebHashHistory` в `src/router/index.js`.
