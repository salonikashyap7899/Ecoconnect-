import { getCollection } from '@/lib/cms';

const BASE = 'https://ecoconnectservices.com';

export default async function sitemap() {
  const projects = await getCollection('projects');
  const articles = await getCollection('articles');
  const staticPages = [
    { path: '', priority: 1 },
    { path: '/about', priority: 0.9 },
    { path: '/capabilities', priority: 0.9 },
    { path: '/skilling', priority: 0.9 },
    { path: '/simulation', priority: 0.9 },
    { path: '/services', priority: 0.9 },
    { path: '/projects', priority: 0.8 },
    { path: '/insights', priority: 0.8 },
    { path: '/careers', priority: 0.7 },
    { path: '/contact', priority: 0.8 },
    { path: '/search', priority: 0.4 },
    { path: '/legal', priority: 0.3 },
  ].map(({ path, priority }) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority,
  }));

  const projectPages = projects.map((p) => ({
    url: `${BASE}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const articlePages = articles.map((a) => ({
    url: `${BASE}/insights/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticPages, ...projectPages, ...articlePages];
}
