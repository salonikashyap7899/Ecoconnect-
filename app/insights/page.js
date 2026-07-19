import { Suspense } from 'react';
import InsightsContent from '@/components/pages/InsightsContent';
import { getCollection } from '@/lib/cms';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Insights',
  description: 'Blog, news, events, and announcements from Ecoconnect Services — thinking that powers the clean energy transition.',
};

export default async function InsightsPage() {
  return (
    <Suspense>
      <InsightsContent
        articlesData={await getCollection('articles')}
        eventsData={await getCollection('events')}
        announcementsData={await getCollection('announcements')}
      />
    </Suspense>
  );
}
