import ProjectsContent from '@/components/pages/ProjectsContent';
import { getCollection } from '@/lib/cms';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Projects',
  description: 'Skilling, simulation, and services projects delivered across clean energy and sustainable mobility — with measurable outcomes.',
};

export default function ProjectsPage() {
  return <ProjectsContent projectsData={getCollection('projects')} testimonialsData={getCollection('testimonials')} />;
}
