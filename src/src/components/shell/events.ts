export const sessionExpiryEvents = new EventTarget(); export function triggerSessionExpiry() { sessionExpiryEvents.dispatchEvent(new Event('expire')); }
