import { Mail, Phone, MapPin, Instagram, Linkedin, Twitter } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { useEffect, useState } from 'react';
import { contentService } from '../services/contentService';

export default function Contact() {
  const { t } = useLanguage();
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    async function loadSettings() {
      const s = await contentService.getSettings('contact');
      if (s) setSettings(s);
    }
    loadSettings();
  }, []);

  const contactEmail = settings?.email || 'info@cezstudio.it';
  const contactPhone = settings?.phone || '+39 02 1234567';
  const contactAddress = settings?.address || ' Bastioni Maggiori 18, 39042 Bressanone (BZ)';
  const socials = settings?.socials || {
    instagram: 'https://instagram.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com'
  };

  const whoWeAreContent = settings?.whoWeAre || t('studio_intro');
  const historyContent = settings?.history || `${t('studio_history_p1')}\n\n${t('studio_history_p2')}`;
  const team = settings?.teamMembers && settings.teamMembers.length > 0 ? settings.teamMembers : [
    { name: 'username', email: 'email@cezstudio.it', image: '' },
    { name: 'username', email: 'email@cezstudio.it', image: '' },
    { name: 'username', email: 'email@cezstudio.it', image: '' },
    { name: 'username', email: 'email@cezstudio.it', image: '' },
  ];

  return (
    <div className="max-w-[1400px] mx-auto page-padding section-padding min-h-screen">
      <header className="mb-24 md:mb-32 lg:mb-40 max-w-[1100px]">
        <h1 className="display-l mb-12 md:mb-16" dangerouslySetInnerHTML={{ __html: t('contact_talk') }}></h1>
        <p className="body-l !leading-[1.4] text-text-body">
          {t('contact_subtitle')}
        </p>
      </header>

      <div className="space-y-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-x-24 lg:gap-x-32 gap-y-20 border-t border-line-divider pt-24 lg:pt-32">
          <div className="lg:col-span-12">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24">
              <div className="space-y-12">
                <span className="label-l">{t('contact_offices')}</span>
                <div className="space-y-8">
                  <address className="not-italic body-m space-y-4">
                    <span className="block font-bold">Studio Milano</span>
                    {contactAddress}
                  </address>
                </div>
              </div>

              <div className="space-y-12">
                <span className="label-l">{t('contact_digital')}</span>
                <div className="space-y-8">
                  <a href={`mailto:${contactEmail}`} className="block h2 !text-[32px] md:!text-[36px] hover:text-text-secondary transition-all">
                     {contactEmail}
                  </a>
                  <a href={`tel:${contactPhone}`} className="block h2 !text-[32px] md:!text-[36px] hover:text-text-secondary transition-all">
                     {contactPhone}
                  </a>
                </div>
              </div>

              <div className="space-y-12">
                <span className="label-l">{t('contact_socials')}</span>
                <div className="flex gap-10">
                  <a href={socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:opacity-40 transition-opacity">
                    <Instagram size={24} strokeWidth={1.5} />
                  </a>
                  <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:opacity-40 transition-opacity">
                    <Linkedin size={24} strokeWidth={1.5} />
                  </a>
                  <a href={socials.twitter} target="_blank" rel="noopener noreferrer" className="hover:opacity-40 transition-opacity">
                    <Twitter size={24} strokeWidth={1.5} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="border-t border-line-divider pt-24 lg:pt-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 lg:mb-24">
            <div className="max-w-[600px]">
              <span className="label-l mb-8 block uppercase tracking-[0.2em]">{t('contact_team_title') || 'People'}</span>
              <h2 className="display-m !tracking-tight">Collaborators</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {team.map((member: any, i: number) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="group"
              >
                <div className="aspect-[3/4] bg-bg-secondary overflow-hidden mb-8 relative">
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
                <div className="space-y-1">
                  <h3 className="body-m font-bold uppercase tracking-[0.15em]">{member.name || 'username'}</h3>
                  <p className="body-m text-text-muted mt-2">{member.role}</p>
                  <p className="body-s text-text-muted/60 mt-1">{member.email}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="border-t border-line-divider pt-24 lg:pt-32">
          <div className="aspect-[21/9] md:aspect-[16/7] lg:aspect-[21/7] bg-bg-secondary border border-line-border overflow-hidden relative opacity-90 transition-all hover:opacity-100 duration-1000 grayscale hover:grayscale-0">
             {/* Map Placeholder */}
             <div className="absolute inset-0 flex items-center justify-center p-12 text-center z-10 bg-white/40 backdrop-blur-[2px]">
                <div className="space-y-4">
                   <MapPin size={32} strokeWidth={1} className="mx-auto text-text-primary" />
                   <p className="metadata-token">{t('contact_map_pending')}</p>
                </div>
             </div>
             <img src="https://picsum.photos/seed/map-cez/1600/600?blur=5" alt="Map" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}
