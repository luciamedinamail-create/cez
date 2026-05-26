import { useState } from 'react';
import DashboardLayout from './DashboardLayout';
import Overview from './Overview';
import ProjectWorkspace from './ProjectWorkspace';
import { MOCK_PROJECTS } from '../../data/mockDashboard';
import { ClientProject } from '../../types/dashboard';
import { Grid, Clock, FileText, PenTool, Camera, CheckSquare, Mail, User, ShieldAlert, ArrowLeft } from 'lucide-react';

interface ClientDashboardProps {
  isAdmin?: boolean;
  onExitPreview?: () => void;
}

export default function ClientDashboard({ isAdmin, onExitPreview }: ClientDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const projects = MOCK_PROJECTS;
  const selectedProject = projects.find(p => p.id === selectedProjectId);

  const handleTabChange = (tab: string) => {
    // Check if it's a deep link like reviews:id
    if (tab.includes(':')) {
      const [mainTab, subId] = tab.split(':');
      // For now, just go to the main tab, we can add deep linking later if needed
      setActiveTab(mainTab);
    } else {
      setActiveTab(tab);
    }
    // Most sidebars reset project view unless we are in a sub-nav context
    if (['overview', 'projects', 'account', 'contact'].includes(tab)) {
       setSelectedProjectId(null);
    }
  };

  const handleOpenProject = (id: string, tab: string = 'overview') => {
    setSelectedProjectId(id);
    setActiveTab(`project:${tab}`);
  };

  const renderContent = () => {
    // If a project is selected, show its workspace
    if (selectedProjectId && selectedProject) {
      // Extract sub-tab if any (e.g. project:documents)
      const subTab = activeTab.includes(':') ? activeTab.split(':')[1] : 'overview';
      return (
        <ProjectWorkspace 
          project={selectedProject} 
          onBack={() => {
            setSelectedProjectId(null);
            setActiveTab('projects');
          }}
          initialTab={subTab}
        />
      );
    }

    switch (activeTab) {
      case 'overview':
        return <Overview projects={projects} onOpenProject={(id) => handleOpenProject(id)} onTabChange={handleTabChange} />;
      case 'projects':
        return <ProjectsList projects={projects} onOpenProject={(id) => handleOpenProject(id)} />;
      case 'updates':
        return <GlobalUpdates projects={projects} onOpenProject={(id) => handleOpenProject(id, 'updates')} />;
      case 'documents':
        return <GlobalDocuments projects={projects} onOpenProject={(id) => handleOpenProject(id, 'documents')} />;
      case 'drawings':
        return <GlobalDrawings projects={projects} onOpenProject={(id) => handleOpenProject(id, 'drawings')} />;
      case 'photography':
        return <GlobalPhotography projects={projects} onOpenProject={(id) => handleOpenProject(id, 'photography')} />;
      case 'reviews':
        return <GlobalReviews projects={projects} onOpenProject={(id) => handleOpenProject(id, 'reviews')} />;
      case 'contact':
        return <ContactStudio />;
      case 'account':
        return <AccountSettings />;
      default:
        return <Overview projects={projects} onOpenProject={(id) => handleOpenProject(id)} onTabChange={handleTabChange} />;
    }
  };

  return (
    <DashboardLayout activeTab={activeTab} onTabChange={handleTabChange}>
      {isAdmin && (
        <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3 text-amber-800">
            <ShieldAlert size={18} />
            <span className="text-sm font-medium">Stai visualizzando la Dashboard come Cliente (Anteprima Admin)</span>
          </div>
          <button 
            onClick={onExitPreview}
            className="flex items-center gap-2 px-4 py-2 bg-amber-800 text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-amber-900 transition-colors"
          >
            <ArrowLeft size={14} /> Torna alla Gestione
          </button>
        </div>
      )}
      {renderContent()}
    </DashboardLayout>
  );
}

// Sub-page components for Global views
function ProjectsList({ projects, onOpenProject }: { projects: ClientProject[], onOpenProject: (id: string) => void }) {
  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-[36px] font-semibold text-[#111111] tracking-tight">Projects</h1>
        <p className="text-[#555555] text-lg mt-1">Manage and access your ongoing architectural works.</p>
      </header>
      
      <div className="border-t border-[#DADADA]">
        {projects.map(project => (
           <div 
           key={project.id} 
           onClick={() => onOpenProject(project.id)}
           className="flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-[#DADADA] hover:bg-[#F8F9FA] px-4 -mx-4 transition-colors cursor-pointer group"
         >
           <div className="flex items-center gap-6 flex-1 min-w-0">
             <div className="w-16 h-20 bg-[#F8F9FA] overflow-hidden shrink-0">
               <img src={project.heroImage} className="w-full h-full object-cover" />
             </div>
             <div className="min-w-0">
               <h3 className="text-xl font-semibold text-[#111111] truncate">{project.name}</h3>
               <p className="text-sm text-[#555555] mt-1">{project.location} / {project.year}</p>
             </div>
           </div>
           <div className="flex flex-col md:flex-row md:items-center gap-10 md:gap-20 mt-6 md:mt-0 text-sm">
             <div>
               <span className="text-[11px] font-bold uppercase tracking-widest text-[#555555] block">Phase</span>
               <span className="text-[#2F2F2F] mt-1 block">{project.phase}</span>
             </div>
             <div>
               <span className="text-[11px] font-bold uppercase tracking-widest text-[#555555] block">Status</span>
               <span className="text-[#2F2F2F] mt-1 block font-medium">{project.status}</span>
             </div>
             <button className="bg-[#111111] text-white text-[13px] font-bold uppercase tracking-widest h-12 px-10 hover:bg-[#333333] transition-colors shrink-0">
               Open Workspace
             </button>
           </div>
         </div>
        ))}
      </div>
    </div>
  );
}

function GlobalUpdates({ projects, onOpenProject }: { projects: ClientProject[], onOpenProject: (id: string) => void }) {
  const allUpdates = projects.flatMap(p => p.updates.map(u => ({ ...u, projectName: p.name, projectId: p.id }))).sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);

  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-[36px] font-semibold text-[#111111] tracking-tight">Recent Updates</h1>
        <p className="text-[#555555] text-lg mt-1">Timeline of changes and additions across all projects.</p>
      </header>
      
      <div className="space-y-12 max-w-4xl">
        {allUpdates.map((update, idx) => (
          <div key={`${update.projectId}-${update.id}`} className={`${idx !== 0 ? 'pt-12 border-t border-[#DADADA]' : ''} space-y-4`}>
             <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#555555]">{update.date}</span>
                <button onClick={() => onOpenProject(update.projectId)} className="text-[11px] font-bold uppercase tracking-widest text-[#111111] bg-[#F8F9FA] px-3 py-1 hover:bg-[#DADADA] transition-colors">
                  {update.projectName}
                </button>
             </div>
             <h3 className="text-[20px] font-semibold text-[#111111]">{update.title}</h3>
             <p className="text-[#2F2F2F] text-lg">{update.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function GlobalDocuments({ projects, onOpenProject }: { projects: ClientProject[], onOpenProject: (id: string) => void }) {
  const docs = projects.flatMap(p => p.documents.map(d => ({ ...d, projectName: p.name, projectId: p.id })));
  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-[36px] font-semibold text-[#111111] tracking-tight">Documents</h1>
        <p className="text-[#555555] text-lg mt-1">Archive of contracts, planning, and reports.</p>
      </header>
      <div className="p-20 text-center border border-dashed border-[#DADADA]">
        <FileText size={40} className="mx-auto mb-4 text-[#DADADA]" />
        <p className="text-[#555555]">Document filtering and global search coming soon.</p>
        <div className="mt-8">
           {projects.map(p => (
             <button key={p.id} onClick={() => onOpenProject(p.id)} className="px-4 py-2 text-sm border border-[#DADADA] mx-2 hover:border-[#111111]">
               View {p.name} Docs
             </button>
           ))}
        </div>
      </div>
    </div>
  );
}

function GlobalDrawings({ projects, onOpenProject }: { projects: ClientProject[], onOpenProject: (id: string) => void }) {
  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-[36px] font-semibold text-[#111111] tracking-tight">Drawings</h1>
        <p className="text-[#555555] text-lg mt-1">Review plans, sections, and technical details.</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map(p => (
          <div key={p.id} className="border border-[#DADADA] p-6 space-y-4">
             <div className="aspect-video bg-[#F8F9FA] overflow-hidden">
                <img src={p.heroImage} className="w-full h-full object-cover opacity-50" />
             </div>
             <h3 className="text-lg font-semibold text-[#111111]">{p.name} Drawings</h3>
             <p className="text-sm text-[#555555]">{p.drawings.length} files available</p>
             <button onClick={() => onOpenProject(p.id)} className="w-full h-10 border border-[#111111] text-[12px] font-bold uppercase tracking-widest hover:bg-[#111111] hover:text-white transition-all">
                Open Project Archive
             </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function GlobalPhotography({ projects, onOpenProject }: { projects: ClientProject[], onOpenProject: (id: string) => void }) {
  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-[36px] font-semibold text-[#111111] tracking-tight">Photography</h1>
        <p className="text-[#555555] text-lg mt-1">Visual record of project progress and completion.</p>
      </header>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {projects.flatMap(p => p.photography).map((photo, i) => (
          <div key={i} className="aspect-square bg-[#F8F9FA] overflow-hidden">
            <img src={photo.url} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

function GlobalReviews({ projects, onOpenProject }: { projects: ClientProject[], onOpenProject: (id: string) => void }) {
  const reviews = projects.flatMap(p => p.reviews.map(r => ({ ...r, projectName: p.name, projectId: p.id })));
  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-[36px] font-semibold text-[#111111] tracking-tight">Reviews & Approvals</h1>
        <p className="text-[#555555] text-lg mt-1">Files requiring your attention or confirmation.</p>
      </header>
      
      <div className="space-y-6">
        {reviews.map(review => (
          <div key={review.id} className="p-8 border border-[#DADADA] flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-widest bg-[#111111] text-white px-2 py-1">Pending</span>
                <span className="text-[11px] font-bold text-[#555555]">{review.projectName}</span>
              </div>
              <h3 className="text-xl font-semibold text-[#111111]">{review.fileName}</h3>
              <p className="text-sm text-[#555555] mt-1">{review.whatChanged}</p>
            </div>
            <button onClick={() => onOpenProject(review.projectId)} className="h-12 px-8 bg-[#111111] text-white text-[13px] font-bold uppercase tracking-widest hover:bg-[#333333] transition-colors">
              Go to review
            </button>
          </div>
        ))}
        {reviews.length === 0 && (
          <div className="p-20 text-center border border-[#DADADA] bg-[#FAFAF8]">
             <h3 className="text-lg font-semibold">All caught up</h3>
             <p className="text-[#555555]">No files currently awaiting your review.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ContactStudio() {
  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-[36px] font-semibold text-[#111111] tracking-tight">Contact Studio</h1>
        <p className="text-[#555555] text-lg mt-1">Get in touch with the team directly.</p>
      </header>
      <div className="max-w-2xl bg-[#FAFAF8] p-12 border border-[#DADADA] space-y-10">
        <div className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#555555]">General Inquiries</h2>
          <p className="text-xl font-medium">office@cez-studio.com</p>
          <p className="text-xl font-medium">+39 342 098 1234</p>
        </div>
        <div className="space-y-4 pt-10 border-t border-[#DADADA]">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#555555]">Visit Us</h2>
          <p className="text-xl font-medium leading-relaxed">
            St.-Alban-Anlage 16<br />
            Brixen, IT
          </p>
        </div>
      </div>
    </div>
  );
}

function AccountSettings() {
  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-[36px] font-semibold text-[#111111] tracking-tight">Account Settings</h1>
        <p className="text-[#555555] text-lg mt-1">Manage your profile and notification preferences.</p>
      </header>
      <div className="max-w-2xl space-y-10">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-widest text-[#555555]">First Name</label>
              <input type="text" className="w-full h-12 px-4 border border-[#DADADA] focus:border-[#111111] outline-none text-sm" placeholder="John" />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-widest text-[#555555]">Last Name</label>
              <input type="text" className="w-full h-12 px-4 border border-[#DADADA] focus:border-[#111111] outline-none text-sm" placeholder="Doe" />
            </div>
         </div>
         <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-widest text-[#555555]">Email Address</label>
            <input type="email" className="w-full h-12 px-4 border border-[#DADADA] focus:border-[#111111] outline-none text-sm disabled:bg-[#F8F9FA] text-[#555555]" value="client@example.com" disabled />
         </div>
         <button className="h-12 px-8 bg-[#111111] text-white text-[13px] font-bold uppercase tracking-widest hover:bg-[#333333] transition-colors">
           Save Changes
         </button>
      </div>
    </div>
  );
}
