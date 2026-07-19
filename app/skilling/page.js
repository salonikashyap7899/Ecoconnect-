import SkillingContent from '@/components/pages/SkillingContent';
import { getCollection } from '@/lib/cms';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Skilling',
  description: 'Industry-aligned training programmes, Centres of Excellence, and placement support building the workforce behind the energy transition.',
};

export default function SkillingPage() {
  return <SkillingContent programmesData={getCollection('programmes')} />;
}
