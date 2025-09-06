// Service Worker для кеширования ресурсов
const CACHE_NAME = 'taxi-app-v1';
const STATIC_CACHE = 'taxi-static-v1';
const DYNAMIC_CACHE = 'taxi-dynamic-v1';

// Ресурсы для предварительного кеширования
const STATIC_ASSETS = [
  '/',
  '/favicon.ico',
  '/manifest.json',
  // Добавьте другие критические ресурсы
];

// Установка Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Активация Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE)
          .map((cacheName) => caches.delete(cacheName))
      );
    }).then(() => self.clients.claim())
  );
});

// Обработка запросов
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Кеширование API запросов
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      caches.open(DYNAMIC_CACHE).then((cache) => {
        return fetch(request).then((response) => {
          // Кешируем успешные ответы
          if (response.status === 200) {
            cache.put(request, response.clone());
          }
          return response;
        }).catch(() => {
          // Возвращаем кешированный ответ при ошибке сети
          return cache.match(request);
        });
      })
    );
  }
  // Кеширование статических ресурсов
  else if (
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'image' ||
    request.destination === 'font'
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return caches.open(DYNAMIC_CACHE).then((cache) => {
          return fetch(request).then((response) => {
            // Кешируем статические ресурсы
            if (response.status === 200) {
              cache.put(request, response.clone());
            }
            return response;
          });
        });
      })
    );
  }
  // Для HTML страниц используем стратегию Network First
  else if (request.destination === 'document') {
    event.respondWith(
      fetch(request).then((response) => {
        // Обновляем кеш для HTML страниц
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(request, responseClone);
          });
        }
        return response;
      }).catch(() => {
        // Возвращаем кешированную версию при ошибке сети
        return caches.match(request);
      })
    );
  }
});

// Очистка старого кеша при обновлении
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});