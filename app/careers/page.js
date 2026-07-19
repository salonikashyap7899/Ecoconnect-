import CareersContent from '@/components/pages/CareersContent';
import { getCollection } from '@/lib/cms';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Careers',
  description: 'Open positions, internships, graduate programmes, and the general application — build your career while building the future.',
};

export default function CareersPage() {
  return <CareersContent jobsData={getCollection('jobs')} />;
}
