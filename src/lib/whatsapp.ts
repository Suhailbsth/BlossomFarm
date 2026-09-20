/**
 * Generates an encoded WhatsApp direct link (`https://wa.me/...`) with an optional prefilled message.
 */
export function buildWhatsAppLink(message?: string, overrideNumber?: string | null): string {
  const number = overrideNumber
  if (message && message.trim()) {
    return `https://wa.me/${number}?text=${encodeURIComponent(message.trim())}`;
  }
  return `https://wa.me/${number}`;
}
