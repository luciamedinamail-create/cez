import { useParams } from 'react-router-dom';
import { PROJECTS as STATIC_PROJECTS } from '../data/projects';
import { useState, useEffect } from 'react';
import { contentService } from '../services/contentService';
import { useLanguage } from '../contexts/LanguageContext';
import { mapProjectToExtended } from '../lib/projectMapping';
import { ProjectExtended } from '../types/project';

// New Snøhetta-inspired components
import ProjectHero from '../components/project/ProjectHero';
import HeroMedia from '../components/project/HeroMedia';
import BackToProjectsLink from '../components/project/BackToProjectsLink';
import IntroductionSection from '../components/project/IntroductionSection';
import TechnicalDetailsSection from '../components/project/TechnicalDetailsSection';
import EditorialImage from '../components/project/EditorialImage';
import TwoColumnImageRow from '../components/project/TwoColumnImageRow';
import NarrativeChapter from '../components/project/NarrativeChapter';
import QuoteBlock from '../components/project/QuoteBlock';
import PlansSectionsCarousel from '../components/project/PlansSectionsCarousel';
import CreditsSection from '../components/project/CreditsSection';
import RelatedProjects from '../components/project/RelatedProjects';

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState<ProjectExtended | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    async function loadProject() {
      setLoading(true);
      const staticP = STATIC_PROJECTS.find(p => p.id === id);
      
      if (staticP) {
        setProject(mapProjectToExtended(staticP, STATIC_PROJECTS));
      } else if (id) {
        const fbP = await contentService.getProjectById(id);
        if (fbP) {
          setProject(mapProjectToExtended(fbP, STATIC_PROJECTS));
        }
      }
      setLoading(false);
      window.scrollTo(0, 0);
    }
    loadProject();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-[13px] uppercase tracking-[0.2em] font-bold animate-pulse">
        {t('project_loading')}
      </div>
    </div>
  );

  if (!project) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-[13px] uppercase tracking-[0.2em] font-bold">
        {t('project_not_found')}
      </div>
    </div>
  );

  // Split photography into editorial groups
  const firstLargeImage = project.photography[0];
  const moreImages = project.photography.slice(3, 6);
  const remainingImages = project.photography.slice(6);

  return (
    <div className="bg-white min-h-screen selection:bg-black selection:text-white">
      {/* 2. Project Hero Block */}
      <ProjectHero 
        title={project.title}
        subtitle={project.subtitle}
        year={project.year}
        category={project.category}
      />

      {/* 3. Hero Media Area */}
      <HeroMedia 
        src={project.heroImage}
        alt={typeof project.title === 'string' ? project.title : project.title.en}
      />

      {/* 4. Back to Projects Link */}
      <BackToProjectsLink />

      {/* 5. Introduction Section */}
      <IntroductionSection paragraphs={project.introductionParagraphs} />

      {/* 6. Technical Details Section */}
      <TechnicalDetailsSection details={project.technicalDetails} />

      {/* 7. First large image */}
      {firstLargeImage && (
        <EditorialImage 
          src={firstLargeImage.src} 
          alt={firstLargeImage.alt} 
          caption={firstLargeImage.caption}
        />
      )}

      {/* 8. Narrative Chapter 01 */}
      {project.narrativeChapters[0] && (
        <NarrativeChapter 
          title={project.narrativeChapters[0].title}
          paragraphs={project.narrativeChapters[0].paragraphs}
        />
      )}

      {/* 9. Image Sequence (Two column row fallback) */}
      {project.photography.length > 2 && (
        <TwoColumnImageRow 
          leftImage={project.photography[1]} 
          rightImage={project.photography[2]} 
        />
      )}

      {/* 10. Narrative Chapter 02 (if exists, or fallback) */}
      {project.narrativeChapters[1] ? (
        <NarrativeChapter 
          title={project.narrativeChapters[1].title}
          paragraphs={project.narrativeChapters[1].paragraphs}
        />
      ) : (
        <div className="py-12" />
      )}

      {/* 11. Quote or material note */}
      {project.subtitle && (
        <QuoteBlock 
          quote={project.subtitle}
          attribution="Design Philosophy"
        />
      )}

      {/* 12. More images */}
      {moreImages.map((img: any, i: number) => (
        <div key={`more-img-${i}`}>
          <EditorialImage 
            src={img.src}
            alt={img.alt}
            caption={img.caption}
          />
        </div>
      ))}

      {/* 13. Plans and sections carousel */}
      <PlansSectionsCarousel drawings={project.drawings} />

      {/* 14. Credits */}
      <CreditsSection credits={project.credits} />

      {/* 15. Related Projects */}
      <RelatedProjects projects={project.relatedProjects} />
    </div>
  );
}
