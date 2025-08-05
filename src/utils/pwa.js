import { registerSW } from 'virtual:pwa-register'

// Register service worker
export const updateSW = registerSW({
  onNeedRefresh() {
    console.log('New content available, click on reload button to update.');
    // You can show a toast/notification here
    window.dispatchEvent(new CustomEvent('sw-need-refresh'));
  },
  onOfflineReady() {
    console.log('App ready to work offline.');
    // You can show a toast/notification here
    window.dispatchEvent(new CustomEvent('sw-offline-ready'));
  },
})