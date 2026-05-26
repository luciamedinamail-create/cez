import { FormEvent, useState, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, Trash2, FileText, PlusCircle, LogOut, Grid, Edit, Eye, Users, Mail, History,
  LayoutDashboard, TrendingUp, FolderGit2, ArrowRight, ArrowLeft, AlertCircle, X
} from 'lucide-react';
import { Project } from '../../data/projects';
import { NewsArticle } from '../../services/contentService';
import { useLanguage } from '../../contexts/LanguageContext';

interface AdminDashboardProps {
  projects: Project[];
  news: NewsArticle[];
  activeTab: string;
  setActiveTab: (tab: any) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  editingProject: Project | null;
  resetProjectForm: () => void;
  handleSaveProject: (e: FormEvent) => void;
  startEditProject: (p: Project) => void;
  handleDeleteProject: (id: string) => void;
  handleDeleteNews: (id: string) => void;
  handleAddNews: (e: FormEvent) => void;
  handleUpdateContact: (e: FormEvent) => void;
  handleLogout: () => void;
  // Form states
  projectTitle: string; setProjectTitle: (s: string) => void;
  projectCategory: string; setProjectCategory: (s: string) => void;
  projectYear: string; setProjectYear: (s: string) => void;
  projectLocation: string; setProjectLocation: (s: string) => void;
  projectDescription: string; setProjectDescription: (s: string) => void;
  projectConcept: string; setProjectConcept: (s: string) => void;
  projectHeroImage: string; setProjectHeroImage: (s: string) => void;
  projectImages: string[]; setProjectImages: (s: string[]) => void;
  projectStatus: string; setProjectStatus: (s: string) => void;
  tempImage: string; setTempImage: (s: string) => void;
  addImage: () => void;
  handleImageUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  newsTitle: string; setNewsTitle: (s: string) => void;
  newsCategory: string; setNewsCategory: (s: string) => void;
  newsDescription: string; setNewsDescription: (s: string) => void;
  contactEmail: string; setContactEmail: (s: string) => void;
  contactPhone: string; setContactPhone: (s: string) => void;
  contactAddress: string; setContactAddress: (s: string) => void;
  whoWeAre: string; setWhoWeAre: (s: string) => void;
  history: string; setHistory: (s: string) => void;
  teamMembers: any[]; addTeamMember: () => void; removeTeamMember: (i: number) => void;
  tmName: string; setTmName: (s: string) => void;
  tmRole: string; setTmRole: (s: string) => void;
  tmEmail: string; setTmEmail: (s: string) => void;
  tmImage: string; setTmImage: (s: string) => void;
}

export default function AdminDashboard(props: AdminDashboardProps) {
  const { t } = useLanguage();
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);

  const NavItem = ({ tab, label, icon: Icon }: { tab: string, label: string, icon: any }) => (
    <button
      onClick={() => {
        props.setActiveTab(tab);
        props.setIsSidebarOpen(false);
      }}
      className={`w-full flex items-center gap-4 px-6 py-4 rounded-full transition-all duration-300 group ${
        props.activeTab === tab 
          ? 'bg-white text-studio-ink-heavy shadow-lg' 
          : 'text-white/60 hover:text-white hover:bg-white/5'
      }`}
    >
      <Icon size={18} className={props.activeTab === tab ? 'text-studio-ink-heavy' : 'group-hover:scale-110 transition-transform'} />
      <span className="font-sans text-sm font-medium tracking-wide uppercase">{label}</span>
    </button>
  );

  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
      {/* Sidebar */}
      <aside className={`w-[320px] bg-studio-ink-heavy fixed h-screen flex flex-col p-8 z-50 transition-transform duration-500 lg:translate-x-0 ${props.isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="mb-16 pl-6 hidden lg:block">
          <div className="text-white font-display text-2xl tracking-[0.3em] font-bold">CEZ</div>
          <div className="text-white/40 text-[10px] uppercase tracking-[0.5em] mt-1">Management</div>
        </div>

        <nav className="flex-1 space-y-4 pt-10 lg:pt-0">
          <NavItem tab="overview" label="Database Progetti" icon={LayoutDashboard} />
          
          <div className="pt-6 pb-2">
            <div className="h-[1px] bg-white/10 w-full mb-2"></div>
            <div className="px-6 py-2 text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold">Content</div>
          </div>

          <NavItem tab="add_project" label={props.editingProject ? "Modifica Progetto" : "Aggiungi Progetto"} icon={PlusCircle} />
          <NavItem tab="news" label="Add News/Newsletter" icon={FileText} />
          <NavItem tab="contact" label="Add Contact/Studio" icon={Users} />
          
          <div className="pt-6 pb-2">
            <div className="h-[1px] bg-white/10 w-full mb-6"></div>
            <NavItem tab="manage_projects" label="Database Progetti" icon={Grid} />
          </div>
        </nav>

        <div className="mt-auto pt-8 border-t border-white/10">
          <button 
            onClick={props.handleLogout}
            className="w-full flex items-center gap-4 px-6 py-4 text-white/50 hover:text-red-400 transition-colors group"
          >
            <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-sans text-sm font-medium uppercase tracking-widest">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 lg:p-20 overflow-y-auto w-full lg:ml-[320px] pt-8 lg:pt-20">
        <header className="mb-12 lg:mb-16 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/50 backdrop-blur-sm p-6 lg:p-8 rounded-[32px] border border-black/5 shadow-sm">
          <div className="flex items-center gap-6">
            {props.activeTab !== 'overview' && (
              <button 
                onClick={() => props.setActiveTab('overview')}
                className="w-12 h-12 flex items-center justify-center bg-white border border-[#DADADA] rounded-2xl text-studio-ink-heavy hover:border-studio-ink-heavy transition-all shadow-sm hover:scale-105 active:scale-95"
                title="Torna alla Dashboard"
              >
                <ArrowLeft size={18} />
              </button>
            )}
            <div>
              <h1 className="text-xl lg:text-2xl font-display font-bold text-studio-ink-heavy tracking-tight leading-tight">
                {props.activeTab === 'overview' && 'Database Progetti'}
                {props.activeTab === 'add_project' && (props.editingProject ? 'Modifica Progetto' : 'Nuovo Progetto')}
                {props.activeTab === 'manage_projects' && 'Database Progetti'}
                {props.activeTab === 'news' && 'Gestione News'}
                {props.activeTab === 'contact' && 'Info Studio & Contatti'}
              </h1>
              <p className="text-studio-ink-heavy/30 font-sans text-[10px] font-bold uppercase tracking-[0.2em] mt-1">
                {props.activeTab === 'overview' && 'Benvenuto nel pannello di controllo.'}
                {props.activeTab === 'add_project' && 'Nuovo inserimento portfolio.'}
                {props.activeTab === 'manage_projects' && 'Archivio completo opere.'}
                {props.activeTab === 'news' && 'Comunicazione e bacheca.'}
                {props.activeTab === 'contact' && 'Identità pubblica dello studio.'}
              </p>
            </div>
          </div>
          
          {/* Removed Vista Cliente button */}
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={props.activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {props.activeTab === 'overview' && (
              <div className="space-y-12">
                {/* Primary Task Actions at Top */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <button 
                    onClick={() => props.setActiveTab('add_project')}
                    className="flex flex-col items-start p-8 rounded-3xl bg-white border border-black/5 shadow-md hover:border-studio-ink-heavy hover:bg-[#F7F7F7] transition-all group"
                  >
                    <PlusCircle size={32} className="mb-6 text-studio-ink-heavy/20 group-hover:text-studio-ink-heavy transition-colors" />
                    <div className="text-left">
                      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-studio-ink-heavy/40 mb-1">Portfolio</div>
                      <div className="text-lg font-bold text-studio-ink-heavy">Aggiungi Progetto</div>
                    </div>
                  </button>

                  <button 
                    onClick={() => props.setActiveTab('news')}
                    className="flex flex-col items-start p-8 rounded-3xl bg-white border border-black/5 shadow-md hover:border-studio-ink-heavy hover:bg-[#F7F7F7] transition-all group"
                  >
                    <FileText size={32} className="mb-6 text-studio-ink-heavy/20 group-hover:text-studio-ink-heavy transition-colors" />
                    <div className="text-left">
                      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-studio-ink-heavy/40 mb-1">Aggiornamenti</div>
                      <div className="text-lg font-bold text-studio-ink-heavy">Add News/Newsletter</div>
                    </div>
                  </button>

                  <button 
                    onClick={() => props.setActiveTab('contact')}
                    className="flex flex-col items-start p-8 rounded-3xl bg-white border border-black/5 shadow-md hover:border-studio-ink-heavy hover:bg-[#F7F7F7] transition-all group"
                  >
                    <Users size={32} className="mb-6 text-studio-ink-heavy/20 group-hover:text-studio-ink-heavy transition-colors" />
                    <div className="text-left">
                      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-studio-ink-heavy/40 mb-1">Informazioni</div>
                      <div className="text-lg font-bold text-studio-ink-heavy">Modifica Studio/Contatti</div>
                    </div>
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                   {/* Recent Projects */}
                   <div className="lg:col-span-2 bg-white p-8 lg:p-10 rounded-3xl border border-black/5 shadow-sm">
                    <div className="flex justify-between items-center mb-8">
                      <h3 className="text-xl font-display font-bold text-studio-ink-heavy">Database Progetti</h3>
                      <button 
                        onClick={() => props.setActiveTab('manage_projects')}
                        className="text-[11px] font-bold uppercase tracking-widest text-studio-ink-heavy/40 flex items-center gap-2 hover:text-studio-ink-heavy transition-colors"
                      >
                        Database completo <ArrowRight size={14} />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {props.projects.slice(0, 4).map(p => (
                        <div key={p.id} className="flex items-center gap-5 group bg-[#FBFBFB] p-4 rounded-[24px] border border-black/[0.03] hover:border-black/10 transition-all">
                          <div 
                            className="w-20 h-24 rounded-2xl overflow-hidden bg-black/5 shrink-0 shadow-sm relative cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(`/projects/${p.id}`, '_blank');
                            }}
                          >
                            <img src={p.heroImage} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Eye size={20} className="text-white" />
                            </div>
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="font-bold text-studio-ink-heavy truncate">{typeof p.title === 'string' ? p.title : p.title.en}</h4>
                            <p className="text-[10px] text-studio-ink-heavy/40 uppercase tracking-widest mt-1">{p.category}</p>
                            <div className="mt-4 flex items-center gap-2">
                              <button 
                                onClick={() => props.startEditProject(p)}
                                className="flex items-center gap-2 px-3 py-1.5 bg-studio-ink-heavy text-white rounded-lg text-xs font-bold transition-all hover:scale-105 active:scale-95"
                              >
                                <Edit size={12} /> Modifica
                              </button>
                              <button 
                                onClick={() => setProjectToDelete(p.id!)}
                                className="p-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all hover:scale-105 active:scale-95"
                                title="Elimina"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Activity Feed / System */}
                  <div className="bg-[#FFFFFF]/50 p-8 lg:p-10 rounded-3xl border border-black/5">
                    <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-studio-ink-heavy/40 mb-8 pb-4 border-b border-black/[0.03]">Sistema</h3>
                    <div className="space-y-8">
                       <div className="flex gap-4">
                          <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5" />
                          <div>
                            <p className="text-sm font-bold text-studio-ink-heavy">Connessione sicura</p>
                            <p className="text-xs text-studio-ink-heavy/40 mt-1 tracking-wide">Tutti i sistemi sono operativi e sincronizzati con il database Firebase.</p>
                          </div>
                       </div>
                       <div className="flex gap-4">
                          <div className="w-2 h-2 rounded-full bg-studio-ink-heavy/10 mt-1.5" />
                          <div>
                            <p className="text-sm font-bold text-studio-ink-heavy">Workspace V2.4</p>
                            <p className="text-xs text-studio-ink-heavy/40 mt-1 tracking-wide">Redesign Dashboard completato. UX focalizzato su precisione e gestione rapida.</p>
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {props.activeTab === 'add_project' && (
              <div className="bg-white p-8 lg:p-12 rounded-3xl shadow-sm border border-black/5 max-w-4xl">
                <form onSubmit={props.handleSaveProject} className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <label className="text-xs font-bold uppercase tracking-widest text-studio-ink-heavy/40">Nome Progetto</label>
                      <input 
                        type="text" value={props.projectTitle} onChange={e => props.setProjectTitle(e.target.value)} required
                        className="w-full bg-[#F3F3F3] border-none rounded-2xl p-5 font-sans outline-none focus:ring-2 focus:ring-studio-ink-heavy/10 placeholder:text-studio-ink-heavy/40"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-xs font-bold uppercase tracking-widest text-studio-ink-heavy/40">Categoria</label>
                      <select 
                        value={props.projectCategory} onChange={e => props.setProjectCategory(e.target.value)}
                        className="w-full bg-[#F3F3F3] border-none rounded-2xl p-5 font-sans outline-none cursor-pointer"
                      >
                        <option value="Residential">{t('cat_res')}</option>
                        <option value="Landscape">{t('cat_land')}</option>
                        <option value="Schools">{t('cat_schools')}</option>
                        <option value="Public / Civic">{t('cat_public')}</option>
                        <option value="Competitions">{t('cat_comp')}</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <label className="text-xs font-bold uppercase tracking-widest text-studio-ink-heavy/40">Luogo</label>
                      <input 
                        type="text" value={props.projectLocation} onChange={e => props.setProjectLocation(e.target.value)}
                        className="w-full bg-[#F3F3F3] border-none rounded-2xl p-5 font-sans outline-none placeholder:text-studio-ink-heavy/40"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-xs font-bold uppercase tracking-widest text-studio-ink-heavy/40">Anno</label>
                      <input 
                        type="text" value={props.projectYear} onChange={e => props.setProjectYear(e.target.value)}
                        className="w-full bg-[#F3F3F3] border-none rounded-2xl p-5 font-sans outline-none placeholder:text-studio-ink-heavy/40"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-xs font-bold uppercase tracking-widest text-studio-ink-heavy/40">Descrizione</label>
                    <textarea 
                      value={props.projectDescription} onChange={e => props.setProjectDescription(e.target.value)}
                      className="w-full bg-[#F3F3F3] border-none rounded-2xl p-5 font-sans min-h-[140px] outline-none placeholder:text-studio-ink-heavy/40"
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="text-xs font-bold uppercase tracking-widest text-studio-ink-heavy/40">Concept Architettonico</label>
                    <textarea 
                      value={props.projectConcept} onChange={e => props.setProjectConcept(e.target.value)}
                      className="w-full bg-[#F3F3F3] border-none rounded-2xl p-5 font-sans min-h-[140px] outline-none placeholder:text-studio-ink-heavy/40"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <label className="text-xs font-bold uppercase tracking-widest text-studio-ink-heavy/40">Immagine Hero (URL)</label>
                      <div className="relative group">
                        <input 
                          type="url" value={props.projectHeroImage} onChange={e => props.setProjectHeroImage(e.target.value)} required
                          className="w-full bg-[#F3F3F3] border-none rounded-2xl p-5 pr-14 font-sans outline-none placeholder:text-studio-ink-heavy/40"
                          placeholder="Incolla URL o carica file..."
                        />
                        <label className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer p-2 rounded-xl hover:bg-black/5 text-studio-ink-heavy/40 hover:text-studio-ink-heavy transition-all">
                          <PlusCircle size={20} />
                          <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => props.setProjectHeroImage(reader.result as string);
                              reader.readAsDataURL(file);
                            }
                          }} />
                        </label>
                      </div>
                    </div>
                  <div className="space-y-4">
                      <label className="text-xs font-bold uppercase tracking-widest text-studio-ink-heavy/40">Stato Progetto</label>
                      <select 
                        value={props.projectStatus} onChange={e => props.setProjectStatus(e.target.value)}
                        className="w-full bg-[#F3F3F3] border-none rounded-2xl p-5 font-sans outline-none cursor-pointer"
                      >
                        <option value="Published">Pubblicato</option>
                        <option value="Draft">Bozza</option>
                        <option value="Archived">Archiviato</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <label className="text-xs font-bold uppercase tracking-widest text-studio-ink-heavy/40">Galleria Immagini</label>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1 relative group">
                        <input 
                          type="url" value={props.tempImage} onChange={e => props.setTempImage(e.target.value)}
                          className="w-full bg-[#F3F3F3] border-none rounded-2xl p-5 pr-14 font-sans outline-none placeholder:text-studio-ink-heavy/40"
                          placeholder="Incolla URL o carica file..."
                        />
                        <label className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer p-2 rounded-xl hover:bg-black/5 text-studio-ink-heavy/40 hover:text-studio-ink-heavy transition-all">
                          <PlusCircle size={20} />
                          <input type="file" className="hidden" accept="image/*" onChange={props.handleImageUpload} />
                        </label>
                      </div>
                      <button 
                        type="button" onClick={props.addImage}
                        className="bg-studio-ink-heavy/5 border border-studio-ink-heavy/10 text-studio-ink-heavy px-8 py-5 rounded-2xl hover:bg-studio-ink-heavy hover:text-white transition-all flex items-center justify-center gap-2 shadow-sm font-bold uppercase tracking-widest text-xs"
                      ><Plus size={18} /> Add to Gallery</button>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                      {props.projectImages.map((img, idx) => (
                        <div key={idx} className="relative group aspect-square rounded-xl overflow-hidden shadow-sm">
                          <img src={img} className="w-full h-full object-cover" />
                          <button 
                            type="button"
                            onClick={() => props.setProjectImages(props.projectImages.filter((_, i) => i !== idx))}
                            className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          ><Trash2 size={16} /></button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="sticky bottom-8 lg:bottom-12 mt-12 bg-white/90 backdrop-blur-xl p-6 lg:p-8 rounded-[32px] border border-black/5 shadow-2xl flex flex-col sm:flex-row gap-4 z-30">
                    <button 
                      type="submit"
                      className="flex-[2] bg-[#9CA3AF] hover:bg-black text-white font-bold uppercase tracking-[0.2em] text-sm py-6 rounded-[28px] shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                      {props.editingProject ? 'Salva Modifiche' : 'Salva Progetto nel Database'}
                    </button>
                    {props.editingProject && (
                      <button 
                        type="button" onClick={props.resetProjectForm}
                        className="flex-1 bg-red-50 text-red-600 px-10 py-6 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-red-100 transition-colors"
                      >Annulla Modifiche</button>
                    )}
                  </div>
                </form>
              </div>
            )}

            {props.activeTab === 'manage_projects' && (
              <div className="bg-white rounded-3xl lg:rounded-[40px] shadow-sm border border-black/5 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse min-w-[800px]">
                    <thead>
                      <tr className="bg-[#FBFBFB] text-left text-studio-ink-heavy/40 uppercase text-[10px] tracking-[0.3em] font-bold">
                        <th className="py-8 px-10">ID</th>
                        <th className="py-8 px-10">Nome Progetto</th>
                        <th className="py-8 px-10">Categoria</th>
                        <th className="py-8 px-10">Luogo</th>
                        <th className="py-8 px-10 text-center">Anno</th>
                        <th className="py-8 px-10 text-center">Stato</th>
                        <th className="py-8 px-10 text-right">Azioni</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/[0.03]">
                      {props.projects.map((p, idx) => (
                        <tr key={p.id} className={`group hover:bg-studio-ink-heavy/5 transition-colors cursor-default ${props.editingProject?.id === p.id ? 'bg-studio-ink-heavy/10 animate-pulse' : ''}`}>
                          <td className="py-6 px-10 font-mono text-[10px] text-studio-ink-heavy/30">#00{idx + 1}</td>
                          <td className="py-6 px-10">
                            <div className="flex items-center gap-6">
                              <div className="w-12 aspect-[3/4] rounded-lg overflow-hidden bg-black/5 shrink-0">
                                <img src={p.heroImage} className="w-full h-full object-cover" />
                              </div>
                              <span className="font-sans font-bold text-studio-ink-heavy">{typeof p.title === 'string' ? p.title : p.title.en}</span>
                            </div>
                          </td>
                          <td className="py-6 px-10 text-xs font-medium text-studio-ink-heavy/60">{p.category}</td>
                          <td className="py-6 px-10 text-xs text-studio-ink-heavy/60 italic">{p.location}</td>
                          <td className="py-6 px-10 text-xs text-center font-bold text-studio-ink-heavy/40">{p.year}</td>
                          <td className="py-6 px-10 text-center">
                            {/* @ts-ignore */}
                            <span className={`text-[9px] uppercase tracking-widest font-bold px-3 py-1 rounded-full ${p.status === 'Draft' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                              {/* @ts-ignore */}
                              {p.status || 'Published'}
                            </span>
                          </td>
                          <td className="py-6 px-10">
                            <div className="flex items-center justify-end gap-3 transition-opacity">
                              <button 
                                onClick={() => props.startEditProject(p)}
                                className="p-3 bg-white shadow-sm border border-black/5 rounded-xl text-studio-ink-heavy hover:bg-studio-ink-heavy hover:text-white transition-all shadow-md"
                              >
                                <Edit size={14} />
                              </button>
                              <button 
                                onClick={() => window.open(`/projects/${p.id}`, '_blank')}
                                className="p-3 bg-white shadow-sm border border-black/5 rounded-xl text-studio-ink-heavy hover:bg-studio-ink-heavy hover:text-white transition-all shadow-md"
                              >
                                <Eye size={14} />
                              </button>
                              <button 
                                onClick={() => setProjectToDelete(p.id!)}
                                className="p-3 bg-white shadow-sm border border-black/5 rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-md"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {props.activeTab === 'news' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                <div className="bg-white p-8 lg:p-12 rounded-3xl shadow-sm border border-black/5">
                  <h2 className="text-xl font-display font-medium mb-10">Scrivi nuova News</h2>
                  <form onSubmit={props.handleAddNews} className="space-y-8">
                    <div className="space-y-4">
                      <label className="text-xs font-bold uppercase tracking-widest text-studio-ink-heavy/40">Titolo News</label>
                      <input 
                        type="text" value={props.newsTitle} onChange={e => props.setNewsTitle(e.target.value)} required
                        className="w-full bg-[#F3F3F3] border-none rounded-2xl p-5 font-sans outline-none placeholder:text-studio-ink-heavy/40"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-xs font-bold uppercase tracking-widest text-studio-ink-heavy/40">Categoria</label>
                      <select 
                        value={props.newsCategory} onChange={e => props.setNewsCategory(e.target.value)}
                        className="w-full bg-[#F3F3F3] border-none rounded-2xl p-5 font-sans outline-none"
                      >
                        <option value="News">News</option>
                        <option value="Awards">Awards</option>
                        <option value="Exhibitions">Exhibitions</option>
                        <option value="Publication">Publication</option>
                      </select>
                    </div>
                    <div className="space-y-4">
                      <label className="text-xs font-bold uppercase tracking-widest text-studio-ink-heavy/40">Contenuto Articolo</label>
                      <textarea 
                        value={props.newsDescription} onChange={e => props.setNewsDescription(e.target.value)} required
                        className="w-full bg-[#F3F3F3] border-none rounded-2xl p-5 font-sans min-h-[240px] outline-none placeholder:text-studio-ink-heavy/40"
                      />
                    </div>
                    <button 
                      type="submit"
                      className="w-full bg-[#9CA3AF] hover:bg-black text-white font-bold uppercase tracking-widest text-sm py-6 rounded-2xl shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >Pubblica News / Newsletter</button>
                  </form>
                </div>

                <div className="space-y-8">
                  <h2 className="text-xl font-display font-medium mb-4">News Pubblicate</h2>
                  <div className="grid grid-cols-1 gap-6">
                    {props.news.map(n => (
                      <div key={n.id} className="bg-white p-8 rounded-3xl border border-black/5 flex flex-col sm:flex-row justify-between items-start sm:items-center group gap-4">
                        <div className="flex-1">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-studio-ink-heavy/40">{n.category}</span>
                          <h3 className="text-lg font-bold mt-2">{n.title}</h3>
                          <p className="text-xs opacity-40 mt-1">{n.date}</p>
                        </div>
                        <button 
                          onClick={() => props.handleDeleteNews(n.id!)}
                          className="p-4 rounded-2xl text-red-300 hover:bg-red-50 hover:text-red-500 transition-all sm:opacity-0 group-hover:opacity-100"
                        ><Trash2 size={18} /></button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {props.activeTab === 'contact' && (
              <div className="bg-white p-8 lg:p-12 rounded-3xl lg:rounded-[40px] shadow-sm border border-black/5 max-w-5xl">
                <form onSubmit={props.handleUpdateContact} className="space-y-16">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div className="space-y-10">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-studio-ink-heavy opacity-30 flex items-center gap-3">
                        <Mail size={14} /> Contatti base
                      </h3>
                      <div className="space-y-8">
                        <div className="space-y-4">
                          <label className="text-xs font-bold uppercase tracking-widest text-studio-ink-heavy/40">Email Studio</label>
                          <input type="email" value={props.contactEmail} onChange={e => props.setContactEmail(e.target.value)} className="w-full bg-[#F3F3F3] border-none rounded-2xl p-5 placeholder:text-studio-ink-heavy/40" />
                        </div>
                        <div className="space-y-4">
                          <label className="text-xs font-bold uppercase tracking-widest text-studio-ink-heavy/40">Telefono</label>
                          <input type="text" value={props.contactPhone} onChange={e => props.setContactPhone(e.target.value)} className="w-full bg-[#F3F3F3] border-none rounded-2xl p-5 placeholder:text-studio-ink-heavy/40" />
                        </div>
                        <div className="space-y-4">
                          <label className="text-xs font-bold uppercase tracking-widest text-studio-ink-heavy/40">Indirizzo Sede</label>
                          <input type="text" value={props.contactAddress} onChange={e => props.setContactAddress(e.target.value)} className="w-full bg-[#F3F3F3] border-none rounded-2xl p-5 placeholder:text-studio-ink-heavy/40" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-10">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-studio-ink-heavy opacity-30 flex items-center gap-3">
                        <History size={14} /> Storia & Studio
                      </h3>
                      <div className="space-y-8">
                        <div className="space-y-4">
                          <label className="text-xs font-bold uppercase tracking-widest text-studio-ink-heavy/40">Chi Siamo (Breve)</label>
                          <textarea value={props.whoWeAre} onChange={e => props.setWhoWeAre(e.target.value)} className="w-full bg-[#F3F3F3] border-none rounded-2xl p-5 min-h-[120px] placeholder:text-studio-ink-heavy/40" />
                        </div>
                        <div className="space-y-4">
                          <label className="text-xs font-bold uppercase tracking-widest text-studio-ink-heavy/40">Storia dello Studio</label>
                          <textarea value={props.history} onChange={e => props.setHistory(e.target.value)} className="w-full bg-[#F3F3F3] border-none rounded-2xl p-5 min-h-[200px] placeholder:text-studio-ink-heavy/40" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-10 border-t border-black/5 space-y-10">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-studio-ink-heavy opacity-30 flex items-center gap-3">
                      <Users size={14} /> Team del Studio
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="bg-[#FBFAFA] p-8 rounded-3xl space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <input placeholder="Nome" value={props.tmName} onChange={e => props.setTmName(e.target.value)} className="bg-[#F3F3F3] p-4 rounded-xl border border-black/5 text-sm placeholder:text-studio-ink-heavy/40" />
                          <input placeholder="Ruolo" value={props.tmRole} onChange={e => props.setTmRole(e.target.value)} className="bg-[#F3F3F3] p-4 rounded-xl border border-black/5 text-sm placeholder:text-studio-ink-heavy/40" />
                        </div>
                        <input placeholder="Email" value={props.tmEmail} onChange={e => props.setTmEmail(e.target.value)} className="w-full bg-[#F3F3F3] p-4 rounded-xl border border-black/5 text-sm placeholder:text-studio-ink-heavy/40" />
                        <div className="relative group">
                          <input placeholder="URL Foto" value={props.tmImage} onChange={e => props.setTmImage(e.target.value)} className="w-full bg-[#F3F3F3] p-4 rounded-xl border border-black/5 text-sm placeholder:text-studio-ink-heavy/40 pr-12" />
                          <label className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer p-1.5 rounded-lg hover:bg-black/5 text-studio-ink-heavy/40 hover:text-studio-ink-heavy transition-all">
                            <PlusCircle size={16} />
                            <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => props.setTmImage(reader.result as string);
                                reader.readAsDataURL(file);
                              }
                            }} />
                          </label>
                        </div>
                        <button type="button" onClick={props.addTeamMember} className="w-full bg-studio-ink-heavy text-white py-4 rounded-xl font-bold uppercase tracking-widest text-[10px]">Aggiungi Membro</button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                         {props.teamMembers.map((m, i) => (
                          <div key={i} className="bg-white p-4 rounded-2xl border border-black/5 flex items-center gap-4 group">
                             <div className="w-10 h-10 rounded-full bg-black/5 overflow-hidden shrink-0">
                               {m.image ? (
                                 <img src={m.image} className="w-full h-full object-cover" />
                               ) : (
                                 <div className="w-full h-full bg-black/10 flex items-center justify-center text-[10px] text-black/20 font-bold uppercase">Img</div>
                               )}
                             </div>
                             <div className="flex-1 overflow-hidden">
                               <p className="text-xs font-bold truncate">{m.name}</p>
                               <p className="text-[10px] opacity-40 truncate">{m.role} • {m.email}</p>
                             </div>
                             <button type="button" onClick={() => props.removeTeamMember(i)} className="ml-auto sm:opacity-0 group-hover:opacity-100 text-red-400 p-2"><Trash2 size={12} /></button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-[#9CA3AF] hover:bg-black text-white font-bold uppercase tracking-[0.3em] text-sm py-8 lg:py-10 rounded-3xl shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >Salva Informazioni Studio</button>
                </form>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {projectToDelete && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setProjectToDelete(null)}
              className="absolute inset-0 bg-studio-ink-heavy/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[40px] p-8 lg:p-12 shadow-2xl border border-white/10"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-3xl bg-red-50 flex items-center justify-center text-red-500 mb-8">
                  <AlertCircle size={40} />
                </div>
                <h3 className="text-2xl font-display font-bold text-studio-ink-heavy mb-4">Sei sicuro di voler eliminare?</h3>
                <p className="text-studio-ink-heavy/40 text-sm leading-relaxed mb-10">
                  Questa azione è irreversibile. Il progetto verrà rimosso permanentemente dal Database e dal portfolio pubblico.
                </p>
                <div className="w-full flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => {
                      props.handleDeleteProject(projectToDelete);
                      setProjectToDelete(null);
                    }}
                    className="flex-1 bg-red-500 text-white font-bold uppercase tracking-widest text-xs py-5 rounded-2xl shadow-lg shadow-red-500/20 hover:bg-red-600 transition-all hover:-translate-y-1"
                  >
                    Sì, Elimina permanentemente
                  </button>
                  <button 
                    onClick={() => setProjectToDelete(null)}
                    className="flex-1 bg-studio-ink-heavy/5 text-studio-ink-heavy font-bold uppercase tracking-widest text-xs py-5 rounded-2xl hover:bg-studio-ink-heavy/10 transition-all"
                  >
                    Annulla
                  </button>
                </div>
              </div>
              <button 
                onClick={() => setProjectToDelete(null)}
                className="absolute top-8 right-8 text-studio-ink-heavy/20 hover:text-studio-ink-heavy transition-colors"
              >
                <X size={24} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
