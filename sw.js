self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('securityplus-quiz-cache').then(cache => {
      return cache.addAll([
        './',
        './index.html',
        './css/style.css',
        './js/script.js',
        './manifest.json',
        './icons/favicon-32x32.png',
        './icons/favicon-16x16.png',
        './icons/apple-touch-icon.png'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});