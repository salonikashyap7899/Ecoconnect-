import { NextResponse } from 'next/server';
import { isValidSession, SESSION_COOKIE } from '@/lib/adminAuth';
import { collections, getCollection, saveCollection } from '@/lib/cms';

function unauthorized(request) {
  return !isValidSession(request.cookies.get(SESSION_COOKIE)?.value);
}

export async function GET(request, { params }) {
  if (unauthorized(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { name } = await params;
  const items = await getCollection(name);
  if (items === null) return NextResponse.json({ error: 'Unknown collection' }, { status: 404 });
  return NextResponse.json({ schema: collections[name], items });
}

export async function PUT(request, { params }) {
  if (unauthorized(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { name } = await params;
  if (!collections[name]) return NextResponse.json({ error: 'Unknown collection' }, { status: 404 });
  const { items } = await request.json().catch(() => ({}));
  if (!Array.isArray(items)) return NextResponse.json({ error: 'items must be an array' }, { status: 400 });
  await saveCollection(name, items);
  return NextResponse.json({ ok: true, count: items.length });
}
