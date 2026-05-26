import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { useEffect, useState } from 'react';
import { contentService } from '../services/contentService';

export default function Studio() {
  const { t } = useLanguage();
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    async function loadSettings() {
      const s = await contentService.getSettings('contact');
      if (s) setSettings(s);
    }
    loadSettings();
  }, []);

  const whoWeAreContent = settings?.whoWeAre || t('studio_intro');
  const historyContent = settings?.history || `${t('studio_history_p1')}\n\n${t('studio_history_p2')}`;
  const approachContent = settings?.approach || `${t('studio_approach_p1')}\n\n${t('studio_approach_p2')}`;
  const team = settings?.teamMembers && settings.teamMembers.length > 0 ? settings.teamMembers : [
    { name: 'username', role: 'Principal Architect', email: 'email@cezstudio.it', image: '' },
    { name: 'username', role: 'Project Architect', email: 'email@cezstudio.it', image: '' },
    { name: 'username', role: 'Interior Designer', email: 'email@cezstudio.it', image: '' },
    { name: 'username', role: 'Collaborator', email: 'email@cezstudio.it', image: '' },
  ];

  return (
    <div className="max-w-[1400px] mx-auto page-padding section-padding min-h-screen">
      <header className="mb-24 md:mb-32 lg:mb-40 max-w-[1100px]">
        <h1 className="display-l mb-12 md:mb-16" dangerouslySetInnerHTML={{ __html: t('studio_who') }}></h1>
        <p className="body-l whitespace-pre-line">
          {whoWeAreContent}
        </p>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-24 gap-y-16 mb-32 md:mb-48 border-t border-line-divider pt-24 lg:pt-32">
        <div className="space-y-12">
          <span className="label-l">{t('studio_history_title')}</span>
          <div className="space-y-8">
            <p className="body-m whitespace-pre-line max-w-[760px]">
              {historyContent}
            </p>
          </div>
        </div>
        <div className="space-y-12">
          <span className="label-l">{t('studio_approach_title')}</span>
          <div className="space-y-8">
            <p className="body-m whitespace-pre-line max-w-[760px]">
              {approachContent}
            </p>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="mb-32 md:mb-48 border-t border-line-divider pt-24 lg:pt-32">
        <span className="label-l block mb-16 md:mb-24">{t('studio_team')}</span>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 md:gap-x-12 gap-y-20 lg:gap-y-24">
          {team.map((member: any, i: number) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.33, 1, 0.68, 1] }}
              className="space-y-8"
            >
              <div className="aspect-[3/4] bg-bg-secondary border border-line-border grayscale hover:grayscale-0 transition-all duration-700 overflow-hidden">
                {member.image ? (
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                  />
                ) : (
                  <div className="w-full h-full bg-[#E5E5E5] flex items-center justify-center">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/10">Image Placeholder</span>
                  </div>
                )}
              </div>
              <div className="space-y-2 px-1">
                <h3 className="h4">{member.name}</h3>
                <p className="metadata-token opacity-60">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Philosophy / Awards placeholder if needed */}
      <section className="border-t border-line-divider pt-24 lg:pt-32 mb-16">
         <div className="max-w-[900px]">
            <h2 className="display-l !text-[44px] mb-12">A culture of precision and restrained elegance.</h2>
            <p className="body-m">CEZ Studio and its partners have been recognized with numerous international awards for sustainable excellence and architectural integrity.</p>
         </div>
      </section>
    </div>
  );
}
