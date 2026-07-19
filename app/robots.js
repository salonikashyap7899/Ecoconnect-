export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/thank-you'] }],
    sitemap: 'https://ecoconnectservices.com/sitemap.xml',
  };
}
