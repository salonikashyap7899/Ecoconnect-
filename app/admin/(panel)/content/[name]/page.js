import { notFound } from 'next/navigation';
import { collections } from '@/lib/cms';
import CollectionManager from '@/components/admin/CollectionManager';

export const dynamic = 'force-dynamic';

export default async function AdminCollectionPage({ params }) {
  const { name } = await params;
  if (!collections[name]) notFound();
  return <CollectionManager key={name} name={name} />;
}
