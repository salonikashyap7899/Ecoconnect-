// Lightweight file-backed CMS store (WRS §20).
// Content collections are seeded from lib/data.js; once an administrator edits
// a collection through /admin, the edited copy is persisted to .data/cms.json
// and served to the public pages instead of the seed. Form submissions
// (enquiries, applications, subscribers) live in the same store.
//
// Note: on serverless hosts the filesystem is ephemeral — point DATA_DIR at a
// mounted volume, or swap this module for a database client, for durable
// production storage. The public pages and admin UI only talk to this API.

import fs from 'fs';
import path from 'path';
import {
  articles, projects, skillingProgrammes, careersJobs, partners,
  projectTestimonials, aboutLeaders, events, announcements,
} from '@/lib/data';

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), '.data');
const DATA_FILE = path.join(DATA_DIR, 'cms.json');

const seeds = {
  articles, projects, programmes: skillingProgrammes, jobs: careersJobs,
  partners, testimonials: projectTestimonials, leaders: aboutLeaders,
  events, announcements,
};

// Field metadata drives the generic admin editor. Types: text (default),
// textarea, lines (newline-separated array), checkbox, select, readonly.
export const collections = {
  articles: {
    label: 'Articles', idKey: 'slug',
    fields: [
      { k: 'slug', required: true }, { k: 'title', required: true },
      { k: 'category', type: 'select', options: ['Blog', 'News', 'Case Study', 'Technical Article', 'Announcement'] },
      { k: 'date' }, { k: 'author' }, { k: 'read', label: 'Reading time' },
      { k: 'excerpt', type: 'textarea' }, { k: 'img', label: 'Featured image URL' },
      { k: 'featured', type: 'checkbox' }, { k: 'content', type: 'lines', label: 'Paragraphs (one per line)' },
    ],
  },
  projects: {
    label: 'Projects', idKey: 'slug',
    fields: [
      { k: 'slug', required: true }, { k: 'title', required: true },
      { k: 'capability', type: 'select', options: ['Skilling', 'Simulation', 'Services'] },
      { k: 'industry' }, { k: 'location' }, { k: 'client' }, { k: 'duration' },
      { k: 'summary', type: 'textarea' }, { k: 'challenge', type: 'textarea' },
      { k: 'solution', type: 'textarea' }, { k: 'outcomes', type: 'textarea' },
      { k: 'technologies', type: 'lines' }, { k: 'img', label: 'Featured image URL' },
      { k: 'gallery', type: 'lines', label: 'Gallery image URLs (one per line)' },
    ],
  },
  programmes: {
    label: 'Training Programmes', idKey: 'name',
    fields: [
      { k: 'name', required: true }, { k: 'category' }, { k: 'duration' },
      { k: 'audience', label: 'Target audience' }, { k: 'overview', type: 'textarea' },
    ],
  },
  jobs: {
    label: 'Job Openings', idKey: 'title',
    fields: [
      { k: 'title', required: true },
      { k: 'dept', label: 'Department', type: 'select', options: ['Skilling', 'Simulation', 'Services', 'Corporate'] },
      { k: 'location' }, { k: 'type', type: 'select', options: ['Full-time', 'Part-time', 'Contract', 'Internship'] },
      { k: 'exp', label: 'Experience' },
    ],
  },
  partners: {
    label: 'Partners', idKey: 'label',
    fields: [
      { k: 'label', label: 'Name', required: true },
      { k: 'group', type: 'select', options: ['Industry', 'Academic', 'Government', 'Technology', 'Startup'] },
    ],
  },
  testimonials: {
    label: 'Testimonials', idKey: 'quote',
    fields: [{ k: 'quote', type: 'textarea', required: true }, { k: 'name' }, { k: 'role', label: 'Organisation / role' }],
  },
  leaders: {
    label: 'Leadership', idKey: 'name',
    fields: [{ k: 'name', required: true }, { k: 'role' }, { k: 'bio', type: 'textarea' }, { k: 'img', label: 'Photo URL' }],
  },
  events: {
    label: 'Events', idKey: 'title',
    fields: [
      { k: 'title', required: true }, { k: 'status', type: 'select', options: ['Upcoming', 'Past'] },
      { k: 'date' }, { k: 'desc', type: 'textarea' }, { k: 'cta', label: 'CTA label' },
      { k: 'primary', type: 'checkbox', label: 'Highlight' },
    ],
  },
  announcements: {
    label: 'Announcements', idKey: 'title',
    fields: [{ k: 'title', required: true }, { k: 'date' }, { k: 'desc', type: 'textarea' }],
  },
};

export const submissionTypes = {
  enquiries: { label: 'Enquiries' },
  applications: { label: 'Career Applications' },
  subscribers: { label: 'Newsletter Subscribers' },
};

function readStore() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch {
    return { overrides: {}, submissions: { enquiries: [], applications: [], subscribers: [] } };
  }
}

function writeStore(store) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(store, null, 2));
}

export function getCollection(name) {
  if (!collections[name]) return null;
  const store = readStore();
  return store.overrides[name] ?? seeds[name] ?? [];
}

export function saveCollection(name, items) {
  if (!collections[name]) throw new Error(`Unknown collection: ${name}`);
  const store = readStore();
  store.overrides[name] = items;
  writeStore(store);
}

export function getSubmissions(type) {
  if (!submissionTypes[type]) return null;
  return readStore().submissions[type] ?? [];
}

export function addSubmission(type, entry) {
  if (!submissionTypes[type]) throw new Error(`Unknown submission type: ${type}`);
  const store = readStore();
  store.submissions[type] = store.submissions[type] ?? [];
  const record = { id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, status: 'New', createdAt: new Date().toISOString(), ...entry };
  store.submissions[type].unshift(record);
  writeStore(store);
  return record;
}

export function updateSubmissionStatus(type, id, status) {
  const store = readStore();
  const entry = (store.submissions[type] ?? []).find((s) => s.id === id);
  if (!entry) return null;
  entry.status = status;
  writeStore(store);
  return entry;
}

export function toCsv(rows) {
  if (!rows.length) return '';
  const keys = [...new Set(rows.flatMap((r) => Object.keys(r)))];
  const esc = (v) => {
    const s = Array.isArray(v) ? v.join(' | ') : String(v ?? '');
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return [keys.join(','), ...rows.map((r) => keys.map((k) => esc(r[k])).join(','))].join('\n');
}
