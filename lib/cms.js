// CMS store (WRS §20) with two storage drivers:
//
//   1. PostgreSQL — used when DATABASE_URL is set. Durable storage for
//      production (Neon / Vercel Postgres / Supabase / self-hosted).
//      Tables are created automatically on first use.
//   2. File-backed JSON (.data/cms.json) — automatic fallback for local
//      development and Node hosts with a persistent disk.
//
// Content collections are seeded from lib/data.js; once an administrator
// edits a collection through /admin, the edited copy is persisted and served
// to the public pages instead of the seed. Form submissions (enquiries,
// applications, subscribers) live in the same store. All accessors are async
// so the driver can be swapped without touching pages or API routes.

import fs from 'fs';
import path from 'path';
import {
  articles, projects, skillingProgrammes, careersJobs, partners,
  projectTestimonials, aboutLeaders, events, announcements,
} from '@/lib/data';

const DB_URL = process.env.DATABASE_URL;
const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), '.data');
const DATA_FILE = path.join(DATA_DIR, 'cms.json');

const seeds = {
  articles, projects, programmes: skillingProgrammes, jobs: careersJobs,
  partners, testimonials: projectTestimonials, leaders: aboutLeaders,
  events, announcements,
};

// Field metadata drives the generic admin editor. Types: text (default),
// textarea, lines (newline-separated array), checkbox, select.
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

function newId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/* ---------- PostgreSQL driver ---------- */

let pool = null;
let schemaReady = null;

async function getPool() {
  if (!pool) {
    const { Pool } = await import('pg');
    const local = /localhost|127\.0\.0\.1/.test(DB_URL);
    const ssl = process.env.DATABASE_SSL === 'false' || local ? false : { rejectUnauthorized: false };
    pool = new Pool({ connectionString: DB_URL, ssl, max: 5 });
  }
  if (!schemaReady) {
    schemaReady = pool.query(`
      CREATE TABLE IF NOT EXISTS cms_collections (
        name TEXT PRIMARY KEY,
        items JSONB NOT NULL,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
      CREATE TABLE IF NOT EXISTS cms_submissions (
        id TEXT PRIMARY KEY,
        type TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'New',
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        data JSONB NOT NULL
      );
      CREATE INDEX IF NOT EXISTS cms_submissions_type_idx ON cms_submissions (type, created_at DESC);
    `);
  }
  await schemaReady;
  return pool;
}

const pgDriver = {
  async getCollection(name) {
    const db = await getPool();
    const { rows } = await db.query('SELECT items FROM cms_collections WHERE name = $1', [name]);
    return rows[0]?.items ?? seeds[name] ?? [];
  },
  async saveCollection(name, items) {
    const db = await getPool();
    await db.query(
      `INSERT INTO cms_collections (name, items, updated_at) VALUES ($1, $2, now())
       ON CONFLICT (name) DO UPDATE SET items = EXCLUDED.items, updated_at = now()`,
      [name, JSON.stringify(items)],
    );
  },
  async getSubmissions(type) {
    const db = await getPool();
    const { rows } = await db.query(
      'SELECT id, status, created_at, data FROM cms_submissions WHERE type = $1 ORDER BY created_at DESC',
      [type],
    );
    return rows.map((r) => ({ id: r.id, status: r.status, createdAt: r.created_at.toISOString(), ...r.data }));
  },
  async addSubmission(type, entry) {
    const db = await getPool();
    const record = { id: newId(), status: 'New', createdAt: new Date().toISOString(), ...entry };
    const { id, status, createdAt, ...data } = record;
    await db.query(
      'INSERT INTO cms_submissions (id, type, status, created_at, data) VALUES ($1, $2, $3, $4, $5)',
      [id, type, status, createdAt, JSON.stringify(data)],
    );
    return record;
  },
  async updateSubmissionStatus(type, id, status) {
    const db = await getPool();
    const { rows } = await db.query(
      'UPDATE cms_submissions SET status = $1 WHERE id = $2 AND type = $3 RETURNING id, status, created_at, data',
      [status, id, type],
    );
    if (!rows[0]) return null;
    const r = rows[0];
    return { id: r.id, status: r.status, createdAt: r.created_at.toISOString(), ...r.data };
  },
};

/* ---------- File driver (local development fallback) ---------- */

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

const fileDriver = {
  async getCollection(name) {
    return readStore().overrides[name] ?? seeds[name] ?? [];
  },
  async saveCollection(name, items) {
    const store = readStore();
    store.overrides[name] = items;
    writeStore(store);
  },
  async getSubmissions(type) {
    return readStore().submissions[type] ?? [];
  },
  async addSubmission(type, entry) {
    const store = readStore();
    store.submissions[type] = store.submissions[type] ?? [];
    const record = { id: newId(), status: 'New', createdAt: new Date().toISOString(), ...entry };
    store.submissions[type].unshift(record);
    writeStore(store);
    return record;
  },
  async updateSubmissionStatus(type, id, status) {
    const store = readStore();
    const entry = (store.submissions[type] ?? []).find((s) => s.id === id);
    if (!entry) return null;
    entry.status = status;
    writeStore(store);
    return entry;
  },
};

const driver = DB_URL ? pgDriver : fileDriver;

/* ---------- Public API ---------- */

export async function getCollection(name) {
  if (!collections[name]) return null;
  return driver.getCollection(name);
}

export async function saveCollection(name, items) {
  if (!collections[name]) throw new Error(`Unknown collection: ${name}`);
  return driver.saveCollection(name, items);
}

export async function getSubmissions(type) {
  if (!submissionTypes[type]) return null;
  return driver.getSubmissions(type);
}

export async function addSubmission(type, entry) {
  if (!submissionTypes[type]) throw new Error(`Unknown submission type: ${type}`);
  return driver.addSubmission(type, entry);
}

export async function updateSubmissionStatus(type, id, status) {
  return driver.updateSubmissionStatus(type, id, status);
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
