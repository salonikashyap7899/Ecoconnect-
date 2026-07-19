import { Suspense } from 'react';
import InsightsContent from '@/components/pages/InsightsContent';
import { getCollection } from '@/lib/cms';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Insights',
  description: 'Blog, news, events, and announcements from Ecoconnect Services — thinking that powers the clean energy transition.',
};

export default function InsightsPage() {
  return (
    <Suspense>
      <InsightsContent
        articlesData={getCollection('articles')}
        eventsData={getCollection('events')}
        announcementsData={getCollection('announcements')}
      />
    </Suspense>
  );
}
