import { NextResponse } from 'next/server';
import { isValidSession, SESSION_COOKIE } from '@/lib/adminAuth';
import { getSubmissions, submissionTypes, toCsv, updateSubmissionStatus } from '@/lib/cms';

function unauthorized(request) {
  return !isValidSession(request.cookies.get(SESSION_COOKIE)?.value);
}

export async function GET(request, { params }) {
  if (unauthorized(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { type } = await params;
  const items = getSubmissions(type);
  if (items === null) return NextResponse.json({ error: 'Unknown submission type' }, { status: 404 });

  if (new URL(request.url).searchParams.get('format') === 'csv') {
    return new NextResponse(toCsv(items), {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${type}-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  }
  return NextResponse.json({ label: submissionTypes[type].label, items });
}

export async function PATCH(request, { params }) {
  if (unauthorized(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { type } = await params;
  if (!submissionTypes[type]) return NextResponse.json({ error: 'Unknown submission type' }, { status: 404 });
  const { id, status } = await request.json().catch(() => ({}));
  if (!id || !['New', 'In Progress', 'Closed'].includes(status)) {
    return NextResponse.json({ error: 'id and a valid status are required' }, { status: 400 });
  }
  const entry = updateSubmissionStatus(type, id, status);
  if (!entry) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ ok: true, entry });
}
