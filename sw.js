const CACHE_NAME = 'cliff-de-tech-v5'; // Incremented cache version
const urlsToCache = [
  '/',
  '/index.html',
  '/about.html',
  '/portfolio.html',
  '/skills.html',
  '/contact.html',
  '/playground.html',
  '/case-study.html',
  '/case-study-authforge.html',
  '/case-study-cliffpay.html',
  '/case-study-ledgerx.html',
  '/case-study-eventflow.html',
  '/case-study-cedismart.html',
  '/404.html',
  '/manifest.json',
  '/CSS/style.css?v=1.7',
  '/CSS/style.min.css?v=1.0',
  '/JS/main.js?v=1.1',
  '/JS/enhancements.js?v=1.0',
  '/JS/playground.js?v=1.0',
  '/JS/chatbot.js?v=1.0',
  '/assets/logo.webp',
  '/assets/me.webp',
  '/assets/icons/favicon-96x96.png',
  '/assets/icons/apple-touch-icon.png',
  '/assets/icons/web-app-manifest-192x192.png',
  '/assets/icons/web-app-manifest-512x512.png',
  '/assets/70-back-end-web-development-certificate-clifford-opoku-sarkodie.webp',
  '/assets/DE Associate - badge.webp',
  '/assets/DEA0019400538633_page-0001.webp',
  '/assets/datacamp-logo.webp'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const responseToCache = response.clone();
        caches.open(CACHE_NAME)
          .then(cache => {
            cache.put(event.request, responseToCache);
          });
        return response;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});