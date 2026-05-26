import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Instagram, Mail, Phone, MapPin, User as UserIcon, Globe } from 'lucide-react';
import { useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { auth } from '../lib/firebase';
import { User } from 'firebase/auth';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

export default function Layout({ children }: { children: ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  const navLinks = [
    { name: t('nav_studio'), path: '/studio' },
    { name: t('nav_projects'), path: '/projects' },
    { name: t('nav_news'), path: '/news' },
    { name: t('nav_contact'), path: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-[#DADADA] flex items-center h-[72px] md:h-[88px] lg:h-[94px]">
        <div className="w-full page-padding max-w-[2810px] mx-auto flex items-center justify-between">
          {/* Logo Section */}
          <Link to="/" className="flex items-center group py-2">
            <img 
              src="/src/assets/images/LogoCEZ-1.png" 
              alt="CEZ Studio" 
              className="h-[46px] md:h-[56px] lg:h-[64px] w-auto object-contain transition-all"
              referrerPolicy="no-referrer"
            />
            <div className="ml-4 md:ml-6 flex flex-col justify-center border-l border-[#DADADA] pl-4 md:pl-6 h-8 md:h-12">
              <span className="font-sans text-[15px] md:text-[16px] lg:text-[18px] uppercase tracking-[0.1em] font-bold text-[#111111] leading-none">CEZ Studio</span>
              <span className="font-sans text-[10px] md:text-[11px] lg:text-[11px] uppercase tracking-[0.08em] text-[#555555] mt-1.5 leading-none font-semibold">Architecture & Design</span>
            </div>
          </Link>

           {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10 lg:gap-14">
            <div className="flex items-center gap-8 lg:gap-12">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `nav-link-token transition-colors hover:text-[#555555] ${
                      isActive ? 'text-[#111111] font-semibold' : 'text-[#111111]'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            {/* Language Selector */}
            <div className="border-l border-[#DADADA] pl-8 lg:pl-12">
              <LanguageSwitcher />
            </div>
            
            <Link 
              to={user ? "/dashboard" : "/login"}
              className={`font-sans text-[13px] uppercase tracking-[0.14em] font-semibold border border-[#DADADA] px-6 py-3 transition-all flex items-center gap-2 ${
                user ? 'bg-[#111111] text-white border-[#111111]' : 'text-[#111111] hover:border-[#111111] hover:bg-[#FAFAF8]'
              }`}
            >
              {user ? (
                <><UserIcon size={12} /> {user.displayName?.split(' ')[0] || t('nav_dashboard')}</>
              ) : (
                t('nav_login')
              )}
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden flex items-center gap-2 text-[14px] font-bold uppercase tracking-[0.16em] text-[#111111] p-2 -mr-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Menu</span>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden overflow-y-auto"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-4xl font-display tracking-tight text-black"
                >
                  {link.name}
                </Link>
              ))}
              <div className="mt-4 border-t border-black/5 pt-8">
                <Link 
                  to={user ? "/dashboard" : "/login"}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-black/50"
                >
                  {user ? (
                    <><UserIcon size={18} /> {user.displayName || t('nav_dashboard')}</>
                  ) : (
                    t('nav_login')
                  )}
                </Link>

                <div className="flex flex-col gap-4 mt-8 pt-6 border-t border-black/5">
                  <span className="text-[10px] uppercase tracking-widest font-bold opacity-30">Change Language</span>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => { setLanguage('it'); setIsMenuOpen(false); }}
                      className={`font-sans text-xs uppercase tracking-widest ${language === 'it' ? 'text-black font-bold' : 'text-black/30'}`}
                    >
                      Italiano
                    </button>
                    <button 
                      onClick={() => { setLanguage('de'); setIsMenuOpen(false); }}
                      className={`font-sans text-xs uppercase tracking-widest ${language === 'de' ? 'text-black font-bold' : 'text-black/30'}`}
                    >
                      Deutsch
                    </button>
                    <button 
                      onClick={() => { setLanguage('en'); setIsMenuOpen(false); }}
                      className={`font-sans text-xs uppercase tracking-widest ${language === 'en' ? 'text-black font-bold' : 'text-black/30'}`}
                    >
                      English
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#FFFFFF] border-t border-[#DADADA] section-padding mt-auto">
        <div className="max-w-[1400px] mx-auto page-padding grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-32">
          <div className="space-y-6">
            <h3 className="label-s">{t('nav_studio')}</h3>
            <p className="body-s max-w-sm">
              {t('footer_studio_desc')}
            </p>
          </div>
          
          <div className="space-y-6">
            <h3 className="label-s">{t('footer_services')}</h3>
            <ul className="body-s space-y-3">
              <li>{t('footer_service_res')}</li>
              <li>{t('footer_service_pub')}</li>
              <li>{t('footer_service_land')}</li>
              <li>{t('footer_service_edu')}</li>
            </ul>
          </div>
 
          <div className="space-y-6">
            <h3 className="label-s">{t('footer_contact')}</h3>
            <div className="body-s space-y-3">
              <p>Via Giuseppe Verdi 42</p>
              <p>20121 Milano, Italia</p>
              <p className="pt-4 font-semibold text-[#111111]">info@cezstudio.it</p>
            </div>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto page-padding mt-24 pt-10 border-t border-[#DADADA] flex justify-between items-center text-[12px] text-[#555555] font-sans uppercase tracking-[0.08em] font-semibold">
          <p>© 2026 CEZ Studio</p>
          <p>Milano, Italia</p>
        </div>
      </footer>
    </div>
  );
}
