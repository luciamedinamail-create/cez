import { ClientProject, ProjectUpdate, ReviewItem, ProjectFile } from '../../types/dashboard';
import { ArrowRight, Clock, AlertCircle, FileText } from 'lucide-react';

interface OverviewProps {
  projects: ClientProject[];
  onOpenProject: (projectId: string) => void;
  onTabChange: (tab: string) => void;
}

export default function Overview({ projects, onOpenProject, onTabChange }: OverviewProps) {
  const awaitingReview = projects.flatMap(p => p.reviews.filter(r => r.status === 'Pending'));
  const recentUpdates = projects.flatMap(p => p.updates).sort((a, b) => b.createdAt.seconds - a.createdAt.seconds).slice(0, 5);
  const latestFiles = projects.flatMap(p => [...p.documents, ...p.drawings, ...p.photography]).sort((a, b) => new Date(b.dateUploaded).getTime() - new Date(a.dateUploaded).getTime()).slice(0, 5);

  return (
    <div className="space-y-16">
      {/* Header */}
      <header>
        <h1 className="text-[36px] font-semibold text-[#111111] tracking-tight">Client Dashboard</h1>
        <p className="text-[#555555] text-lg mt-1">Private project workspace for CEZ Studio clients.</p>
      </header>

      {/* Summary Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button 
          onClick={() => onTabChange('projects')}
          className="p-8 border border-[#DADADA] hover:border-[#111111] transition-colors text-left group"
        >
          <div className="flex justify-between items-start mb-6">
            <span className="text-[#555555] text-[12px] font-bold uppercase tracking-widest">Active Projects</span>
            <ArrowRight size={16} className="text-[#DADADA] group-hover:text-[#111111] transition-colors" />
          </div>
          <div className="text-4xl font-semibold text-[#111111]">{projects.length}</div>
        </button>

        <button 
          onClick={() => onTabChange('reviews')}
          className="p-8 border border-[#DADADA] hover:border-[#111111] transition-colors text-left group"
        >
          <div className="flex justify-between items-start mb-6">
            <span className="text-[#555555] text-[12px] font-bold uppercase tracking-widest">Awaiting Review</span>
            <AlertCircle size={16} className="text-[#DADADA] group-hover:text-[#111111] transition-colors" />
          </div>
          <div className="text-4xl font-semibold text-[#111111]">{awaitingReview.length}</div>
        </button>

        <button 
          onClick={() => onTabChange('updates')}
          className="p-8 border border-[#DADADA] hover:border-[#111111] transition-colors text-left group"
        >
          <div className="flex justify-between items-start mb-6">
            <span className="text-[#555555] text-[12px] font-bold uppercase tracking-widest">Recent Updates</span>
            <Clock size={16} className="text-[#DADADA] group-hover:text-[#111111] transition-colors" />
          </div>
          <div className="text-4xl font-semibold text-[#111111]">{recentUpdates.length}</div>
        </button>
      </div>

      {/* Active Projects List */}
      <section>
        <h2 className="text-[20px] font-semibold text-[#111111] mb-8">Active Projects</h2>
        <div className="border-t border-[#DADADA]">
          {projects.map(project => (
            <div 
              key={project.id} 
              onClick={() => onOpenProject(project.id)}
              className="flex flex-col md:flex-row md:items-center justify-between py-6 border-b border-[#DADADA] hover:bg-[#F8F9FA] px-4 -mx-4 transition-colors cursor-pointer group"
            >
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-[#111111] truncate">{project.name}</h3>
                <p className="text-sm text-[#555555] mt-1">{project.location} / {project.year}</p>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-16 mt-4 md:mt-0 text-sm">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#555555] block">Phase</span>
                  <span className="text-[#2F2F2F] mt-1 block">{project.phase}</span>
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#555555] block">Status</span>
                  <span className={`mt-1 block font-medium ${project.status === 'Review needed' ? 'text-[#111111]' : 'text-[#2F2F2F]'}`}>
                    {project.status}
                  </span>
                </div>
                <div className="min-w-[120px]">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#555555] block">Last Updated</span>
                  <span className="text-[#2F2F2F] mt-1 block">{project.lastUpdated}</span>
                </div>
                <button className="bg-[#111111] text-white text-[13px] font-bold uppercase tracking-widest h-11 px-8 hover:bg-[#333333] transition-colors shrink-0">
                  Open Project
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Needs Review Shortcut */}
      {awaitingReview.length > 0 && (
        <section>
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-[20px] font-semibold text-[#111111]">Needs Review</h2>
            <button onClick={() => onTabChange('reviews')} className="text-sm border-b border-[#111111] pb-0.5 hover:opacity-70 transition-opacity">View all</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {awaitingReview.slice(0, 2).map((review) => (
              <div key={review.id} className="p-8 border border-[#DADADA] bg-[#FFFFFF]">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#555555]">Action Needed</span>
                <h3 className="text-lg font-semibold text-[#111111] mt-2">{review.fileName}</h3>
                <p className="text-[#2F2F2F] mt-2 mb-6">{review.whatChanged}</p>
                <div className="flex items-center justify-between pt-6 border-t border-[#DADADA]">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#555555]">Due: {review.dueDate || 'N/A'}</span>
                  <button onClick={() => onTabChange(`reviews:${review.id}`)} className="text-[13px] font-bold uppercase tracking-widest py-2 px-4 border border-[#111111] hover:bg-[#111111] hover:text-white transition-all">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Latest Files & Contact */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <section>
          <h2 className="text-[20px] font-semibold text-[#111111] mb-8">Latest Files</h2>
          <div className="space-y-4">
            {latestFiles.map((file) => (
              <div key={file.id} className="flex items-center justify-between py-4 border-b border-[#DADADA]">
                <div className="flex items-center gap-4">
                  <FileText size={20} className="text-[#555555]" />
                  <div>
                    <p className="text-sm font-medium text-[#111111]">{file.name}</p>
                    <p className="text-xs text-[#555555]">{file.category} • {file.dateUploaded}</p>
                  </div>
                </div>
                <button className="text-[12px] font-bold uppercase tracking-widest border-b border-transparent hover:border-[#111111] transition-all">Download</button>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#FAFAF8] p-10 flex flex-col justify-center items-center text-center">
          <h2 className="text-[20px] font-semibold text-[#111111] mb-2">Need assistance?</h2>
          <p className="text-[#555555] mb-8 max-w-xs">Contact CEZ Studio for any technical questions or project inquiries.</p>
          <button 
            onClick={() => onTabChange('contact')}
            className="w-full max-w-sm bg-[#111111] text-white text-[13px] font-bold uppercase tracking-widest h-12 hover:bg-[#333333] transition-colors"
          >
            Contact Studio
          </button>
        </section>
      </div>
    </div>
  );
}
