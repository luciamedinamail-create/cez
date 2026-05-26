import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function BackToProjectsLink() {
  const { t } = useLanguage();
  
  return (
    <div className="max-w-[1400px] mx-auto px-12 md:px-16 pt-32 -mb-20 relative z-10">
      <Link 
        to="/projects" 
        className="inline-flex items-center gap-2 group"
      >
        <ArrowLeft size={16} className="text-text-primary group-hover:-translate-x-1 transition-transform" />
        <span className="text-[13px] uppercase tracking-[0.08em] text-text-primary border-b border-transparent group-hover:border-text-primary transition-all pb-0.5 mt-0.5">
          {t('projects_back_to')}
        </span>
      </Link>
    </div>
  );
}
