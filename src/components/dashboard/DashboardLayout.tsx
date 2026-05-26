import { ReactNode, useState } from 'react';
import { Menu, X, LogOut, LayoutDashboard, Grid, History, FileText, PenTool, Camera, CheckSquare, Mail, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { motion, AnimatePresence } from 'motion/react';

interface DashboardLayoutProps {
  children: ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function DashboardLayout({ children, activeTab, onTabChange }: DashboardLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: Grid },
    { id: 'updates', label: 'Updates', icon: History },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'drawings', label: 'Drawings', icon: PenTool },
    { id: 'photography', label: 'Photography', icon: Camera },
    { id: 'reviews', label: 'Reviews', icon: CheckSquare },
    { id: 'contact', label: 'Contact', icon: Mail },
    { id: 'account', label: 'Account', icon: User },
  ];

  const NavContent = () => (
    <>
      <div className="mb-12">
        <div className="font-display text-2xl tracking-[0.3em] font-bold text-[#111111]">CEZ</div>
        <div className="text-[#555555] text-[10px] uppercase tracking-[0.5em] mt-1 font-bold">Studio Client</div>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = activeTab.split(':')[0] === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                onTabChange(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all group relative ${
                isActive 
                  ? 'text-[#111111] bg-[#F8F9FA]' 
                  : 'text-[#555555] hover:bg-[#F8F9FA] hover:text-[#111111]'
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-[#111111]" />
              )}
              <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto pt-8 border-t border-[#DADADA]">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-[#555555] hover:text-red-600 transition-colors"
        >
          <LogOut size={18} />
          <span className="text-sm font-medium uppercase tracking-widest">Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-white font-sans text-[#2F2F2F]">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-[260px] fixed h-screen flex-col p-8 border-r border-[#DADADA] bg-white z-50">
        <NavContent />
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-20 bg-white border-b border-[#DADADA] z-[60] flex items-center justify-between px-6">
        <div className="font-display text-xl tracking-[0.3em] font-bold text-[#111111]">CEZ</div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 -mr-2 text-[#111111]"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="lg:hidden fixed inset-0 bg-white z-[55] p-8 flex flex-col pt-28"
          >
            <NavContent />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 lg:ml-[260px] min-h-screen pt-20 lg:pt-0">
        <div className="max-w-7xl mx-auto p-6 md:p-10 lg:p-16">
          {children}
        </div>
      </main>
    </div>
  );
}
