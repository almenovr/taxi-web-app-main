#!/bin/bash

echo "🚗 Запуск Такси Сервиса Крыма"
echo ""

echo "📦 Установка зависимостей сервера..."
cd server-side
npm install
if [ $? -ne 0 ]; then
    echo "❌ Ошибка установки зависимостей сервера"
    exit 1
fi
echo "✅ Зависимости сервера установлены"

echo "📦 Установка зависимостей клиента..."
cd ../client-side
npm install
if [ $? -ne 0 ]; then
    echo "❌ Ошибка установки зависимостей клиента"
    exit 1
fi
echo "✅ Зависимости клиента установлены"

echo "🚀 Запуск сервера Strapi..."
cd ../server-side
npm run develop &
STRAPI_PID=$!

echo "⏳ Ожидание запуска сервера..."
sleep 10

echo "🌐 Открываем админку Strapi..."
if command -v xdg-open &> /dev/null; then
    xdg-open http://localhost:1337/admin
elif command -v open &> /dev/null; then
    open http://localhost:1337/admin
else
    echo "📱 Откройте браузер и перейдите: http://localhost:1337/admin"
fi

echo ""
echo "💡 Инструкции:"
echo "1. В браузере откроется админка Strapi"
echo "2. Создайте первого пользователя администратора"
echo "3. Запомните email и пароль"
echo "4. Измените их в файлах scripts/setup-content-types.js и scripts/create-demo-data.js"
echo "5. Запустите скрипты настройки"
echo ""

echo "🚀 Запуск клиентской части..."
cd ../client-side
npm run dev &
CLIENT_PID=$!

echo ""
echo "✅ Проект запущен!"
echo "📱 Клиент: http://localhost:3000"
echo "🛠️ Админка: http://localhost:1337/admin"
echo "📚 Документация: README.md"
echo ""
echo "Нажмите Ctrl+C для остановки всех процессов"

# Функция для остановки процессов при завершении
cleanup() {
    echo ""
    echo "🛑 Остановка процессов..."
    kill $STRAPI_PID 2>/dev/null
    kill $CLIENT_PID 2>/dev/null
    exit 0
}

# Обработчик сигнала завершения
trap cleanup SIGINT SIGTERM

# Ожидание завершения
wait