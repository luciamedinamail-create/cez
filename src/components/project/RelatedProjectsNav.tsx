import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

interface RelatedProject {
  id: string;
  title: string | Record<string, string>;
  category: string;
  location: string;
}

interface RelatedProjectsNavProps {
  prevProject?: RelatedProject;
  nextProject?: RelatedProject;
}

export default function RelatedProjectsNav({ prevProject, nextProject }: RelatedProjectsNavProps) {
  const { t, tCategory, language } = useLanguage();

  const getLocalized = (val: string | any) => {
    if (!val) return '';
    if (typeof val === 'string') return val;
    return val[language] || val.en || val.it || val.de || '';
  };

  return (
    <section className="max-w-[1400px] mx-auto page-padding py-24 border-t border-line-divider">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
        {prevProject && (
          <div className="group opacity-60 hover:opacity-100 transition-all">
            <span className="metadata-token block mb-6">{t('project_previous')}</span>
            <Link to={`/projects/${prevProject.id}`} className="h2 !text-[22px] lg:!text-[28px] block hover:underline transition-all underline-offset-8 decoration-1">
              {getLocalized(prevProject.title)}
            </Link>
            <p className="metadata-token mt-4">{tCategory(prevProject.category)} / {prevProject.location}</p>
          </div>
        )}

        {nextProject && (
          <div className="group text-left md:text-right opacity-60 hover:opacity-100 transition-all">
            <span className="metadata-token block mb-6">{t('project_next')}</span>
            <Link to={`/projects/${nextProject.id}`} className="h2 !text-[22px] lg:!text-[28px] block hover:underline transition-all underline-offset-8 decoration-1">
              {getLocalized(nextProject.title)}
            </Link>
            <p className="metadata-token mt-4">{tCategory(nextProject.category)} / {nextProject.location}</p>
          </div>
        )}
      </div>
    </section>
  );
}
