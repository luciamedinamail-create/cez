import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface ProjectHeroInfoProps {
  title: string;
  subtitle: string;
  year: string;
  category: string;
  location: string;
  status?: string;
}

export default function ProjectHeroInfo({ title, subtitle, year, category, location, status }: ProjectHeroInfoProps) {
  const { t, tCategory } = useLanguage();

  return (
    <header id="overview" className="max-w-[1400px] mx-auto page-padding pt-24 lg:pt-32 pb-20">
      <div className="mb-12 lg:mb-20">
        <Link 
          to="/projects" 
          className="inline-flex items-center gap-3 text-text-muted hover:text-text-primary transition-colors group"
        >
          <div className="w-10 h-10 rounded-full border border-black/5 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
            <ArrowLeft size={16} />
          </div>
          <span className="label-s !text-[12px] uppercase tracking-[0.2em]">{t('project_back')}</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Title & Subtitle */}
        <div className="lg:col-span-8 space-y-10 lg:space-y-14">
          <h1 className="display-l">
            {title}
          </h1>
          <p className="body-l !leading-[1.45] text-text-body max-w-[760px]">
            {subtitle}
          </p>
        </div>

        {/* Right Column: Metadata */}
        <div className="lg:col-start-10 lg:col-span-3 space-y-10">
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-10">
            <div className="space-y-3">
              <span className="label-s !text-[12px]">{t('project_year')}</span>
              <p className="body-m !text-[16px] text-text-primary">{year}</p>
            </div>
            <div className="space-y-3">
              <span className="label-s !text-[12px]">{t('project_discipline') || 'Discipline'}</span>
              <p className="body-m !text-[16px] text-text-primary">{tCategory(category)}</p>
            </div>
            <div className="space-y-3">
              <span className="label-s !text-[12px]">{t('project_location') || 'Location'}</span>
              <p className="body-m !text-[16px] text-text-primary">{location}</p>
            </div>
            <div className="space-y-3">
              <span className="label-s !text-[12px]">{t('project_status') || 'Status'}</span>
              <p className="body-m !text-[16px] text-text-primary">{status || 'Completed'}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
