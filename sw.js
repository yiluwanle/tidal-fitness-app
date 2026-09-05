/* 潮汐训练 Service Worker - 离线优先缓存 */
const VERSION = 'v2.4';
const CACHE = `tidal-${VERSION}`;
const CORE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './assets/manifest.json',
  './assets/zh-names.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-192.png',
  './icons/icon-maskable-512.png'
];
// CDN 主机上的资源（动作帧图）
const CDN_ORIGIN = 'https://cdn.jsdelivr.net';

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // 同源资源：cache-first
  if (url.origin === self.location.origin) {
    e.respondWith(
      caches.match(req).then(cached => {
        if (cached) return cached;
        return fetch(req).then(resp => {
          if (resp && resp.status === 200 && resp.type === 'basic') {
            const copy = resp.clone();
            caches.open(CACHE).then(c => c.put(req, copy));
          }
          return resp;
        }).catch(() => caches.match('./index.html'));
      })
    );
    return;
  }
  // CDN 帧图：cache-first（带回退，失败时仍返回浏览器错误）
  if (url.origin === CDN_ORIGIN) {
    e.respondWith(
      caches.match(req).then(cached => {
        if (cached) return cached;
        return fetch(req).then(resp => {
          if (resp && resp.status === 200) {
            const copy = resp.clone();
            caches.open(CACHE).then(c => c.put(req, copy));
          }
          return resp;
        });
      })
    );
  }
});