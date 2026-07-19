export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/thank-you', '/admin', '/api'] }],
    sitemap: 'https://ecoconnectservices.com/sitemap.xml',
  };
}
