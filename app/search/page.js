import { Suspense } from 'react';
import SearchContent from '@/components/pages/SearchContent';

export const metadata = {
  title: 'Search',
  description: 'Search Ecoconnect Services — pages, projects, articles, events, programmes, and job openings.',
};

export default function SearchPage() {
  return (
    <Suspense>
      <SearchContent />
    </Suspense>
  );
}
