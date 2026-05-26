import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { RelatedProject } from '../../types/project';

interface RelatedProjectsProps {
  projects: RelatedProject[];
}

export default function RelatedProjects({ projects }: RelatedProjectsProps) {
  const { language, t } = useLanguage();
  
  const getLocalized = (val: any) => {
    if (typeof val === 'string') return val;
    return val[language] || val.en;
  };

  if (!projects.length) return null;

  return (
    <section className="max-w-[1400px] mx-auto px-12 md:px-16 py-24 md:py-32 border-t border-black/10">
      <div className="flex justify-between items-end mb-16">
        <h2 className="text-[13px] uppercase tracking-[0.14em] font-bold text-text-primary">
          PROGETTI CORRELATI
        </h2>
        <Link 
          to="/projects" 
          className="text-[13px] uppercase tracking-[0.14em] font-bold text-text-primary border-b border-black hover:pb-1 transition-all"
        >
          {t('projects_all')}
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
        {projects.map((project) => (
          <Link key={project.id} to={`/projects/${project.id}`} className="group flex flex-col">
            <div className="w-full aspect-[4/3] md:aspect-[16/10] overflow-hidden bg-bg-secondary mb-6">
              <img 
                src={project.image} 
                alt={getLocalized(project.title)} 
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700" 
              />
            </div>
            <h3 className="text-[20px] md:text-[24px] font-normal text-text-primary mb-2">
              {getLocalized(project.title)}
            </h3>
            <div className="text-[12px] md:text-[13px] uppercase tracking-wider text-text-muted font-medium flex gap-3">
              <span>{project.category}</span>
              <span>•</span>
              <span>{project.year}</span>
              <span>•</span>
              <span>{project.location}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
