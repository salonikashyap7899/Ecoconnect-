import { Suspense } from 'react';
import InsightsContent from '@/components/pages/InsightsContent';

export const metadata = {
  title: 'Insights',
  description: 'Blog, news, events, and announcements from Ecoconnect Services — thinking that powers the clean energy transition.',
};

export default function InsightsPage() {
  return (
    <Suspense>
      <InsightsContent />
    </Suspense>
  );
}
