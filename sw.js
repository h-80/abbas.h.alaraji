// Service Worker - يجعل الموقع قابلاً للتثبيت كتطبيق
const CACHE = "abbas-app-v1";
const ASSETS = ["./", "./index.html", "./qr.html", "./manifest.json"];

self.addEventListener("install", e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS).catch(()=>{}))
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).catch(()=>caches.match("./index.html")))
  );
});