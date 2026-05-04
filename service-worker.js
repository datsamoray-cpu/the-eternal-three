const CACHE_NAME = 'eternal-three-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './sounds/achievement.ogg',
  './sounds/alpha_warning.ogg',
  './sounds/battle_start.ogg',
  './sounds/battlepass_tier.ogg',
  './sounds/burst_loss.ogg',
  './sounds/burst_shield.ogg',
  './sounds/burst_spell.ogg',
  './sounds/burst_strike.ogg',
  './sounds/burst_win.ogg',
  './sounds/button_tap.ogg',
  './sounds/clash.ogg',
  './sounds/crit.ogg',
  './sounds/defeat.ogg',
  './sounds/equip.ogg',
  './sounds/level_up.ogg',
  './sounds/loot_drop.ogg',
  './sounds/modal_open.ogg',
  './sounds/round_loss.ogg',
  './sounds/round_win.ogg',
  './sounds/salvage.ogg',
  './sounds/tab_switch.ogg',
  './sounds/victory.ogg',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
