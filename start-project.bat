@echo off
echo 🚗 Запуск Такси Сервиса Крыма
echo.

echo 📦 Установка зависимостей сервера...
cd server-side
call npm install
if %errorlevel% neq 0 (
    echo ❌ Ошибка установки зависимостей сервера
    pause
    exit /b 1
)
echo ✅ Зависимости сервера установлены

echo 📦 Установка зависимостей клиента...
cd ../client-side
call npm install
if %errorlevel% neq 0 (
    echo ❌ Ошибка установки зависимостей клиента
    pause
    exit /b 1
)
echo ✅ Зависимости клиента установлены

echo 🚀 Запуск сервера Strapi...
start "Strapi Server" cmd /k "cd ../server-side && npm run develop"

timeout /t 10 /nobreak > nul

echo 🌐 Открываем админку Strapi...
start http://localhost:1337/admin

echo 💡 Инструкции:
echo 1. В браузере откроется админка Strapi
echo 2. Создайте первого пользователя администратора
echo 3. Запомните email и пароль
echo 4. Измените их в файлах scripts/setup-content-types.js и scripts/create-demo-data.js
echo 5. Запустите скрипты настройки
echo.

echo 🚀 Запуск клиентской части...
start "Next.js Client" cmd /k "npm run dev"

echo ✅ Проект запущен!
echo 📱 Клиент: http://localhost:3000
echo 🛠️ Админка: http://localhost:1337/admin
echo 📚 Документация: README.md

pause