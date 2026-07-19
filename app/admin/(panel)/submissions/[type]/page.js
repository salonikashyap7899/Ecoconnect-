import { notFound } from 'next/navigation';
import { submissionTypes } from '@/lib/cms';
import SubmissionsManager from '@/components/admin/SubmissionsManager';

export const dynamic = 'force-dynamic';

export default async function AdminSubmissionsPage({ params }) {
  const { type } = await params;
  if (!submissionTypes[type]) notFound();
  return <SubmissionsManager key={type} type={type} />;
}
