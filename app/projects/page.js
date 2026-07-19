import ProjectsContent from '@/components/pages/ProjectsContent';
import { getCollection } from '@/lib/cms';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Projects',
  description: 'Skilling, simulation, and services projects delivered across clean energy and sustainable mobility — with measurable outcomes.',
};

export default async function ProjectsPage() {
  return <ProjectsContent projectsData={await getCollection('projects')} testimonialsData={await getCollection('testimonials')} />;
}
