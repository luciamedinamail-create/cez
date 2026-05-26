import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { PROJECTS as STATIC_PROJECTS, Project } from '../data/projects';
import { contentService } from '../services/contentService';
import { useLanguage } from '../contexts/LanguageContext';

const CATEGORIES = [
  { id: 'all', label: 'cat_all' },
  { id: 'Residential', label: 'cat_res' },
  { id: 'Landscape', label: 'cat_land' },
  { id: 'Schools', label: 'cat_schools' },
  { id: 'Public / Civic', label: 'cat_public' },
  { id: 'Competitions', label: 'cat_comp' },
] as const;

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [projects, setProjects] = useState<Project[]>(STATIC_PROJECTS);
  const [loading, setLoading] = useState(true);
  const { language, t, tCategory } = useLanguage();

  const getLocalized = (val: string | any) => {
    if (!val) return '';
    if (typeof val === 'string') return val;
    return val[language] || val.en || val.it || val.de || '';
  };

  useEffect(() => {
    async function loadProjects() {
      const fbProjects = await contentService.getProjects();
      if (fbProjects && fbProjects.length > 0) {
        // Merge or replace. For this studio, let's merge them so the initial demo data stays until replaced.
        // We'll put newest uploaded projects at the top.
        setProjects([...fbProjects, ...STATIC_PROJECTS]);
      }
      setLoading(false);
    }
    loadProjects();
  }, []);

   const filteredProjects = projects.filter(project => 
    activeCategory === 'all' || project.category === activeCategory
  );

  return (
    <div className="max-w-[1400px] mx-auto page-padding section-padding">
      <header className="mb-20 md:mb-32">
        <h1 className="display-l mb-12 md:mb-16">{t('projects_title')}</h1>
        <div className="flex flex-wrap gap-x-10 lg:gap-x-12 gap-y-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`label-s transition-colors relative pb-2 ${
                activeCategory === cat.id ? 'text-text-primary' : 'text-text-secondary'
              }`}
            >
              {t(cat.label)}
              {activeCategory === cat.id && (
                <motion.div 
                  layoutId="underline" 
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-text-primary" 
                />
              )}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-24 lg:gap-y-32">
        {filteredProjects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05, ease: [0.33, 1, 0.68, 1], duration: 0.8 }}
            className="group"
          >
            <Link to={`/projects/${project.id}`}>
              <div className="aspect-[4/3] overflow-hidden mb-8 md:mb-10 lg:mb-12 bg-bg-secondary border border-line-border">
                <img 
                  src={project.heroImage} 
                  alt={getLocalized(project.title)} 
                  className="w-full h-full object-cover transition-all duration-[1s] group-hover:scale-[1.05]"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-left space-y-5">
                <div className="flex items-center gap-3">
                  <span className="metadata-token">{project.location}</span>
                  <span className="w-1 h-1 rounded-full bg-line-divider"></span>
                  <span className="metadata-token">{project.year}</span>
                </div>
                <h2 className="h3 group-hover:text-text-primary transition-colors underline-offset-8 group-hover:underline">
                  {getLocalized(project.title)}
                </h2>
                <div className="inline-block label-s px-3 py-1 border border-line-divider text-[10px]">
                  {tCategory(project.category)}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
