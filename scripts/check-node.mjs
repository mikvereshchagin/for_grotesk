// Проверка версии Node перед запуском. Vite 6 требует Node 18+.
// Скрипт написан на синтаксисе, совместимом со старым Node, чтобы сам
// выдавал понятное сообщение, а не ошибку парсинга.

const major = Number(process.versions.node.split('.')[0])

if (major < 18) {
  console.error('')
  console.error('Ошибка: для запуска нужен Node.js 18+, а сейчас используется v' + process.versions.node + '.')
  console.error('')
  console.error('Установлен nvm? Переключитесь и запустите снова:')
  console.error('  nvm use 20')
  console.error('  npm run dev')
  console.error('')
  console.error('Чтобы Node 20 стал версией по умолчанию:')
  console.error('  nvm alias default 20')
  console.error('')
  process.exit(1)
}
