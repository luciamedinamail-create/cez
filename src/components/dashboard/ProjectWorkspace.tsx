import { useState } from 'react';
import { ClientProject } from '../../types/dashboard';
import { ArrowLeft, Download, ExternalLink, Search, Filter, Grid as GridIcon, List, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProjectWorkspaceProps {
  project: ClientProject;
  onBack: () => void;
  initialTab?: string;
}

export default function ProjectWorkspace({ project, onBack, initialTab = 'overview' }: ProjectWorkspaceProps) {
  const [activeTab, setActiveTab] = useState(initialTab);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'updates', label: 'Updates' },
    { id: 'documents', label: 'Documents' },
    { id: 'drawings', label: 'Drawings' },
    { id: 'photography', label: 'Photography' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="space-y-12">
      {/* Breadcrumbs & Back */}
      <nav className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-widest text-[#555555]">
        <button onClick={onBack} className="hover:text-[#111111] transition-colors flex items-center gap-2">
          <ArrowLeft size={14} /> Dashboard
        </button>
        <span className="text-[#DADADA]">/</span>
        <button onClick={onBack} className="hover:text-[#111111] transition-colors">Projects</button>
        <span className="text-[#DADADA]">/</span>
        <span className="text-[#111111]">{project.name}</span>
      </nav>

      {/* Project Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-[36px] font-semibold text-[#111111] tracking-tight">{project.name}</h1>
          <p className="text-[#555555] text-lg mt-1">{project.location} / {project.year} / {project.status}</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-[#111111] text-white text-[13px] font-bold uppercase tracking-widest h-11 px-8 hover:bg-[#333333] transition-colors">
            Contact Team
          </button>
        </div>
      </header>

      {/* Status Panel */}
      <section className="p-8 border border-[#DADADA] bg-[#FFFFFF] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#555555] block">Current Phase</span>
          <span className="text-[#111111] font-semibold mt-2 block text-lg">{project.phase}</span>
        </div>
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#555555] block">Last Update</span>
          <span className="text-[#111111] mt-2 block text-lg">{project.lastUpdated}</span>
        </div>
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#555555] block">Next Milestone</span>
          <span className="text-[#111111] mt-2 block text-lg">Drawing Review</span>
        </div>
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#555555] block">Pending Actions</span>
          <span className="text-[#111111] mt-2 block text-lg">{project.reviews.filter(r => r.status === 'Pending').length} review(s)</span>
        </div>
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#555555] block">Studio Contact</span>
          <span className="text-[#111111] mt-2 block text-lg underline underline-offset-4 decoration-[#DADADA]">CEZ Team</span>
        </div>
      </section>

      {/* Tabs */}
      <div className="border-b border-[#DADADA]">
        <div className="flex overflow-x-auto no-scrollbar gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 text-[13px] font-bold uppercase tracking-widest whitespace-nowrap transition-all relative ${
                activeTab === tab.id ? 'text-[#111111]' : 'text-[#555555] hover:text-[#111111]'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#111111]" 
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'overview' && <WorkspaceOverview project={project} />}
            {activeTab === 'updates' && <WorkspaceUpdates project={project} />}
            {activeTab === 'documents' && <WorkspaceDocuments project={project} />}
            {activeTab === 'drawings' && <WorkspaceDrawings project={project} />}
            {activeTab === 'photography' && <WorkspacePhotography project={project} />}
            {activeTab === 'reviews' && <WorkspaceReviews project={project} />}
            {activeTab === 'contact' && <WorkspaceContact project={project} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// Sub-components
function WorkspaceOverview({ project }: { project: ClientProject }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
      <div className="lg:col-span-2 space-y-12">
        <div className="aspect-video w-full bg-[#F8F9FA] overflow-hidden">
          <img src={project.heroImage} alt={project.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h2 className="text-[20px] font-semibold text-[#111111] mb-6">About the project</h2>
          <p className="text-[#2F2F2F] text-lg leading-relaxed">
            The project focuses on the integration of sustainable materials and modern architectural forms within the {project.location} landscape.
            Currently in the {project.phase} phase, the design emphasizes clarity, verticality, and natural light.
          </p>
        </div>
      </div>
      <div className="space-y-12">
        <section>
          <h3 className="text-[12px] font-bold uppercase tracking-widest text-[#555555] mb-6 pb-2 border-b border-[#DADADA]">Project Details</h3>
          <dl className="space-y-4">
            <div className="flex justify-between">
              <dt className="text-[#555555] text-sm">Category</dt>
              <dd className="text-[#111111] font-medium text-sm">Residential</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-[#555555] text-sm">Area</dt>
              <dd className="text-[#111111] font-medium text-sm">450 m²</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-[#555555] text-sm">Start Date</dt>
              <dd className="text-[#111111] font-medium text-sm">Jan 2024</dd>
            </div>
          </dl>
        </section>
        
        <section>
          <h3 className="text-[12px] font-bold uppercase tracking-widest text-[#555555] mb-6 pb-2 border-b border-[#DADADA]">Team</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#111111] flex items-center justify-center text-white text-[10px] font-bold">CZ</div>
              <div>
                <p className="text-sm font-semibold text-[#111111]">Carlo E. Zanin</p>
                <p className="text-xs text-[#555555]">Lead Architect</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#DADADA] flex items-center justify-center text-[#111111] text-[10px] font-bold">MB</div>
              <div>
                <p className="text-sm font-semibold text-[#111111]">Marco B.</p>
                <p className="text-xs text-[#555555]">Project Manager</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function WorkspaceUpdates({ project }: { project: ClientProject }) {
  if (project.updates.length === 0) {
    return <EmptyStatus title="No updates yet" message="Updates shared by CEZ Studio will appear here." />;
  }

  return (
    <div className="max-w-4xl space-y-12">
      {project.updates.map((update, idx) => (
        <div key={update.id} className={`${idx !== 0 ? 'pt-12 border-t border-[#DADADA]' : ''} space-y-4`}>
          <div className="flex items-center gap-4">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#555555]">{update.date}</span>
          </div>
          <h3 className="text-[20px] font-semibold text-[#111111]">{update.title}</h3>
          <p className="text-[#2F2F2F] text-lg leading-relaxed">{update.description}</p>
          
          {update.relatedFiles && update.relatedFiles.length > 0 && (
            <div className="pt-4 flex flex-wrap gap-4">
              {update.relatedFiles.map(file => (
                <button key={file} className="flex items-center gap-2 px-4 py-2 border border-[#DADADA] hover:border-[#111111] transition-colors text-sm">
                  <FileText size={14} /> {file}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function WorkspaceDocuments({ project }: { project: ClientProject }) {
  const [search, setSearch] = useState('');
  const filtered = project.documents.filter(d => d.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between gap-6 md:items-center">
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#555555]" />
          <input 
            type="text" 
            placeholder="Search documents"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-12 pl-12 pr-4 bg-[#F8F9FA] border-none focus:ring-1 focus:ring-[#111111] outline-none text-sm"
          />
        </div>
        <div className="flex gap-4">
          <button className="h-12 px-6 border border-[#DADADA] text-sm font-medium flex items-center gap-2 hover:border-[#111111] transition-colors">
            <Filter size={16} /> Filters
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyStatus title="No documents found" message="Try changing the filter or search term." />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-[#DADADA]">
                <th className="pb-4 text-[11px] font-bold uppercase tracking-widest text-[#555555]">File Name</th>
                <th className="pb-4 text-[11px] font-bold uppercase tracking-widest text-[#555555]">Category</th>
                <th className="pb-4 text-[11px] font-bold uppercase tracking-widest text-[#555555]">Type</th>
                <th className="pb-4 text-[11px] font-bold uppercase tracking-widest text-[#555555]">Date</th>
                <th className="pb-4 text-[11px] font-bold uppercase tracking-widest text-[#555555]">Status</th>
                <th className="pb-4 text-right text-[11px] font-bold uppercase tracking-widest text-[#555555]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DADADA]">
              {filtered.map((doc) => (
                <tr key={doc.id} className="hover:bg-[#F8F9FA] transition-colors group">
                  <td className="py-5 pr-4">
                    <div className="flex items-center gap-3">
                      <FileText size={18} className="text-[#555555]" />
                      <span className="text-sm font-medium text-[#111111]">{doc.name}</span>
                    </div>
                  </td>
                  <td className="py-5 px-4 text-sm text-[#2F2F2F]">{doc.category}</td>
                  <td className="py-5 px-4 text-sm text-[#555555]">{doc.type}</td>
                  <td className="py-5 px-4 text-sm text-[#555555]">{doc.dateUploaded}</td>
                  <td className="py-5 px-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-[#F8F9FA] text-[#111111]">
                      {doc.status}
                    </span>
                  </td>
                  <td className="py-5 pl-4 text-right">
                    <div className="flex items-center justify-end gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-[12px] font-bold uppercase tracking-widest text-[#111111]">View</button>
                      <button className="text-[12px] font-bold uppercase tracking-widest text-[#111111] flex items-center gap-1">
                        <Download size={14} /> Download
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function WorkspaceDrawings({ project }: { project: ClientProject }) {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Plans', 'Sections', 'Elevations', 'Details', 'Diagrams'];
  const filtered = filter === 'All' ? project.drawings : project.drawings.filter(d => d.category === filter);

  return (
    <div className="space-y-8">
      <div className="flex overflow-x-auto no-scrollbar gap-4 border-b border-[#DADADA]">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`pb-4 text-[12px] font-bold uppercase tracking-widest whitespace-nowrap transition-all relative ${
              filter === cat ? 'text-[#111111]' : 'text-[#555555] hover:text-[#111111]'
            }`}
          >
            {cat}
            {filter === cat && (
              <motion.div 
                layoutId="drawFilter"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#111111]" 
              />
            )}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyStatus title="No drawings found" message="Try changing the filter or search term." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((drawing) => (
            <div key={drawing.id} className="group border border-[#DADADA] hover:border-[#111111] transition-all p-4 bg-white space-y-4">
              <div className="aspect-[4/3] bg-[#F8F9FA] overflow-hidden flex items-center justify-center p-4">
                <img src={drawing.thumbnail || drawing.url} className="w-full h-full object-contain" alt={drawing.name} />
              </div>
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-semibold text-[#111111]">{drawing.name}</h3>
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-[#F8F9FA] px-2 py-0.5">{drawing.revision || '01'}</span>
                </div>
                <p className="text-xs text-[#555555] mt-1">{drawing.category} • {drawing.scale || 'N/S'} • {drawing.dateUploaded}</p>
              </div>
              <div className="flex gap-2 pt-2 border-t border-[#DADADA]">
                <button className="flex-1 h-10 border border-[#DADADA] hover:border-[#111111] text-[11px] font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2">
                  <Eye size={14} /> View
                </button>
                <button className="flex-1 h-10 bg-[#111111] text-white text-[11px] font-bold uppercase tracking-widest hover:bg-[#333333] transition-colors flex items-center justify-center gap-2">
                  <Download size={14} /> Download
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function WorkspacePhotography({ project }: { project: ClientProject }) {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Exterior', 'Interior', 'Details', 'Site', 'Model'];
  const filtered = filter === 'All' ? project.photography : project.photography.filter(p => p.category === filter);

  return (
    <div className="space-y-8">
       <div className="flex overflow-x-auto no-scrollbar gap-4 border-b border-[#DADADA]">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`pb-4 text-[12px] font-bold uppercase tracking-widest whitespace-nowrap transition-all relative ${
              filter === cat ? 'text-[#111111]' : 'text-[#555555] hover:text-[#111111]'
            }`}
          >
            {cat}
            {filter === cat && (
              <motion.div 
                layoutId="photoFilter"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#111111]" 
              />
            )}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyStatus title="No images yet" message="Photography archive will appear here once images are uploaded." />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((photo) => (
            <div key={photo.id} className="group relative aspect-square bg-[#F8F9FA] overflow-hidden">
               <img src={photo.url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={photo.name} />
               <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
               <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-[#111111]">{photo.name}</p>
                      <p className="text-[10px] text-[#555555]">{photo.category}</p>
                    </div>
                    <button className="p-2 border border-[#DADADA] hover:border-[#111111] transition-colors">
                      <Download size={14} />
                    </button>
                  </div>
               </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function WorkspaceReviews({ project }: { project: ClientProject }) {
  if (project.reviews.length === 0) {
    return <EmptyStatus title="No files need review" message="You are up to date." />;
  }

  return (
    <div className="space-y-8">
      {project.reviews.map((review) => (
        <div key={review.id} className="p-10 border border-[#DADADA] bg-white grid grid-cols-1 lg:grid-cols-4 gap-12 items-center">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 ${
                review.status === 'Pending' ? 'bg-black text-white' : 'bg-[#FAFAF8] text-[#111111]'
              }`}>
                {review.status} Review
              </span>
              {review.dueDate && <span className="text-[11px] font-bold uppercase tracking-widest text-red-600">Due: {review.dueDate}</span>}
            </div>
            <h3 className="text-[24px] font-semibold text-[#111111]">{review.fileName}</h3>
            <div className="space-y-2">
              <p className="text-sm text-[#555555] uppercase tracking-widest font-bold">What changed:</p>
              <p className="text-[#2F2F2F]">{review.whatChanged}</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-[#555555] uppercase tracking-widest font-bold">Requested action:</p>
            <p className="text-[#2F2F2F]">{review.requestedAction}</p>
          </div>

          <div className="flex flex-col gap-3">
            <button className="h-12 border border-[#111111] text-[13px] font-bold uppercase tracking-widest hover:bg-[#F8F9FA] transition-all">
              View File
            </button>
            <button className="h-12 bg-[#111111] text-white text-[13px] font-bold uppercase tracking-widest hover:bg-[#333333] transition-all">
              Approve
            </button>
            <button className="h-12 border border-[#DADADA] text-[#555555] text-[13px] font-bold uppercase tracking-widest hover:border-[#111111] hover:text-[#111111] transition-all">
              Request Changes
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function WorkspaceContact({ project }: { project: ClientProject }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
      <div className="space-y-12">
        <div>
          <h2 className="text-[20px] font-semibold text-[#111111] mb-8">Contact Studio</h2>
          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-widest text-[#555555]">Subject</label>
              <input type="text" className="w-full h-12 px-4 bg-[#F8F9FA] border-none focus:ring-1 focus:ring-[#111111] outline-none text-sm" placeholder="Feedback on drawings..." />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-widest text-[#555555]">Message</label>
              <textarea className="w-full px-4 py-4 bg-[#F8F9FA] border-none focus:ring-1 focus:ring-[#111111] outline-none text-sm min-h-[200px]" placeholder="Type your message here..." />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-widest text-[#555555]">Related File (Optional)</label>
               <select className="w-full h-12 px-4 bg-[#F8F9FA] border-none focus:ring-1 focus:ring-[#111111] outline-none text-sm cursor-pointer">
                  <option>None</option>
                  {project.drawings.map(d => <option key={d.id}>{d.name}</option>)}
               </select>
            </div>
            <button type="submit" className="w-full h-14 bg-[#111111] text-white text-[13px] font-bold uppercase tracking-widest hover:bg-[#333333] transition-all">
              Send Message
            </button>
          </form>
        </div>
      </div>
      
      <div className="space-y-12">
        <div>
          <h2 className="text-[20px] font-semibold text-[#111111] mb-8">Studio Details</h2>
          <div className="p-8 border border-[#DADADA] space-y-8">
            <div className="space-y-4">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#555555]">Office</h3>
              <p className="text-sm font-medium">Brixen, South Tyrol, Italy</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#555555]">Phone</h3>
              <p className="text-sm font-medium">+39 342 098 1234</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#555555]">Email</h3>
              <p className="text-sm font-medium">office@cez-studio.com</p>
            </div>
            <div className="pt-8 border-t border-[#DADADA]">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#555555] mb-4">Project Lead</h3>
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-black rounded-lg" />
                 <div>
                   <p className="text-sm font-bold">Carlo E. Zanin</p>
                   <p className="text-xs text-[#555555]">Lead Architect</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyStatus({ title, message }: { title: string, message: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-20 text-center border border-dashed border-[#DADADA]">
      <h3 className="text-lg font-semibold text-[#111111] mb-2">{title}</h3>
      <p className="text-[#555555] max-w-xs">{message}</p>
    </div>
  );
}

function FileText(props: any) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={props.size || 24} 
      height={props.size || 24} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth={2} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={props.className}
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M9 12h6" />
      <path d="M9 16h6" />
    </svg>
  )
}
