import { Project } from '../data/projects';
import { ProjectExtended, TechnicalDetail, CreditItem, RelatedProject, Drawing } from '../types/project';

export function mapProjectToExtended(project: Project, allProjects: Project[]): ProjectExtended {
  const technicalDetails: TechnicalDetail[] = Object.entries(project.facts).map(([label, value]) => ({
    label,
    value
  }));

  const credits: CreditItem[] = Object.entries(project.credits).map(([label, value]) => ({
    label,
    value
  }));

  const photography = (project.images || []).map((img, i) => ({
    src: img,
    alt: `Project image ${i + 1}`,
    layout: (i % 3 === 0) ? 'full' : 'two-column' as any
  }));

  const drawings: Drawing[] = [
    ...(project.plans || []).map((src, i) => ({
      src,
      title: `Plan ${i + 1}`,
      type: 'Plan',
      scale: '1:100'
    })),
    ...(project.sections || []).map((src, i) => ({
      src,
      title: `Section ${i + 1}`,
      type: 'Section',
      scale: '1:50'
    }))
  ];

  const relatedProjects: RelatedProject[] = allProjects
    .filter(p => p.id !== project.id)
    .slice(0, 3)
    .map(p => ({
      id: p.id,
      title: p.title,
      category: p.category,
      year: p.year,
      location: p.location,
      image: p.heroImage
    }));

  return {
    id: project.id,
    title: project.title,
    subtitle: project.description,
    year: project.year,
    category: project.category,
    location: project.location,
    status: project.facts['Status'] || 'Completed',
    heroImage: project.heroImage,
    introductionParagraphs: typeof project.description === 'string' 
      ? [project.description] 
      : [project.description.it, project.description.en].filter(Boolean),
    technicalDetails,
    narrativeChapters: project.narrativeChapters || [
      {
        title: project.title,
        paragraphs: typeof project.concept === 'string' ? [project.concept] : [project.concept.it, project.concept.en].filter(Boolean)
      }
    ],
    photography,
    drawings,
    credits,
    relatedProjects
  };
}
