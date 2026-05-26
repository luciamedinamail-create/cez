import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { auth, db } from '../lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { contentService, NewsArticle } from '../services/contentService';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, Trash2, Image as ImageIcon, Send, LayoutList, FileText, 
  Mail, PlusCircle, Settings, ExternalLink, LayoutDashboard, 
  LogOut, User as UserIcon, Users, MapPin, History, Info, 
  Grid, Briefcase, Eye, Edit, Menu, X
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Project } from '../data/projects';
import { signOut } from 'firebase/auth';

type Tab = 'overview' | 'add_project' | 'manage_projects' | 'news' | 'contact';

import AdminDashboard from '../components/dashboard/AdminDashboard';
import ClientDashboard from '../components/dashboard/ClientDashboard';

export default function Dashboard() {
  const [user, setUser] = useState(auth.currentUser);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { language, t } = useLanguage();

  // Lists
  const [projects, setProjects] = useState<Project[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);

  // Editing state
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Project Form State
  const [projectTitle, setProjectTitle] = useState('');
  const [projectCategory, setProjectCategory] = useState('Residential');
  const [projectYear, setProjectYear] = useState(new Date().getFullYear().toString());
  const [projectLocation, setProjectLocation] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectConcept, setProjectConcept] = useState('');
  const [projectHeroImage, setProjectHeroImage] = useState('');
  const [projectImages, setProjectImages] = useState<string[]>([]);
  const [projectStatus, setProjectStatus] = useState('Published');
  
  const [tempImage, setTempImage] = useState('');

  // News Form State
  const [newsTitle, setNewsTitle] = useState('');
  const [newsCategory, setNewsCategory] = useState('News');
  const [newsDescription, setNewsDescription] = useState('');

  // Contact Settings State
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactAddress, setContactAddress] = useState('');
  const [whoWeAre, setWhoWeAre] = useState('');
  const [history, setHistory] = useState('');
  const [contactInstagram, setContactInstagram] = useState('');
  const [contactLinkedin, setContactLinkedin] = useState('');
  const [contactTwitter, setContactTwitter] = useState('');
  const [teamMembers, setTeamMembers] = useState<any[]>([]);

  // Team Form temp
  const [tmName, setTmName] = useState('');
  const [tmRole, setTmRole] = useState('');
  const [tmEmail, setTmEmail] = useState('');
  const [tmImage, setTmImage] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (u) => {
      setUser(u);
      if (u) {
        const userRef = doc(db, 'users', u.uid);
        const userSnap = await getDoc(userRef);
        
        let currentRole = null;
        if (userSnap.exists()) {
          currentRole = userSnap.data().role;
          setRole(currentRole);
        } else {
          const isAdminEmail = u.email === 'blommaavmystik@gmail.com';
          currentRole = isAdminEmail ? 'admin' : 'client';
          const newProfile = {
            userId: u.uid,
            email: u.email,
            role: currentRole,
            createdAt: serverTimestamp()
          };
          await setDoc(userRef, newProfile);
          setRole(currentRole);
        }
        
        loadData();
      } else {
        navigate('/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const loadData = async () => {
    const [p, n, s] = await Promise.all([
      contentService.getProjects(),
      contentService.getNews(),
      contentService.getSettings('contact')
    ]);
    if (p) setProjects(p);
    if (n) setNews(n);
    if (s) {
      setContactEmail(s.email || '');
      setContactPhone(s.phone || '');
      setContactAddress(s.address || '');
      setWhoWeAre(s.whoWeAre || '');
      setHistory(s.history || '');
      if (s.socials) {
        setContactInstagram(s.socials.instagram || '');
        setContactLinkedin(s.socials.linkedin || '');
        setContactTwitter(s.socials.twitter || '');
      }
      setTeamMembers(s.teamMembers || []);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  const handleSaveProject = async (e: FormEvent) => {
    e.preventDefault();
    if (!projectTitle || !projectHeroImage) return;

    const projectData = {
      title: projectTitle,
      category: projectCategory as any,
      year: projectYear,
      location: projectLocation,
      description: projectDescription,
      concept: projectConcept,
      heroImage: projectHeroImage,
      images: projectImages,
      facts: {},
      credits: {},
      // @ts-ignore
      status: projectStatus
    };

    if (editingProject) {
      await contentService.updateProject(editingProject.id!, projectData);
      setEditingProject(null);
    } else {
      await contentService.addProject(projectData);
    }

    resetProjectForm();
    loadData();
    alert(editingProject ? 'Project updated!' : 'Project published!');
    setActiveTab('manage_projects');
  };

  const resetProjectForm = () => {
    setProjectTitle('');
    setProjectLocation('');
    setProjectDescription('');
    setProjectConcept('');
    setProjectHeroImage('');
    setProjectImages([]);
    setProjectStatus('Published');
    setEditingProject(null);
  };

  const startEditProject = (p: Project) => {
    setEditingProject(p);
    setProjectTitle(typeof p.title === 'string' ? p.title : (p.title[language] || p.title.en));
    setProjectCategory(p.category);
    setProjectYear(p.year);
    setProjectLocation(p.location);
    setProjectDescription(typeof p.description === 'string' ? p.description : (p.description[language] || p.description.en));
    setProjectConcept(p.concept || '');
    setProjectHeroImage(p.heroImage);
    setProjectImages(p.images || []);
    // @ts-ignore
    setProjectStatus(p.status || 'Published');
    setActiveTab('add_project');
  };

  const handleAddNews = async (e: FormEvent) => {
    e.preventDefault();
    if (!newsTitle || !newsDescription) return;

    await contentService.addNews({
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      category: newsCategory,
      title: newsTitle,
      description: newsDescription
    });

    setNewsTitle('');
    setNewsDescription('');
    loadData();
    alert('News article added!');
  };

  const handleUpdateContact = async (e: FormEvent) => {
    e.preventDefault();
    await contentService.updateSettings('contact', {
      email: contactEmail,
      phone: contactPhone,
      address: contactAddress,
      whoWeAre,
      history,
      socials: {
        instagram: contactInstagram,
        linkedin: contactLinkedin,
        twitter: contactTwitter
      },
      teamMembers
    });
    alert('Contact settings saved!');
  };

  const handleDeleteProject = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      await contentService.deleteProject(id);
      loadData();
    }
  };

  const handleDeleteNews = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this news article?')) {
      await contentService.deleteNews(id);
      loadData();
    }
  };

  const addImage = () => {
    if (tempImage && !projectImages.includes(tempImage)) {
      setProjectImages([...projectImages, tempImage]);
      setTempImage('');
    }
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addTeamMember = () => {
    if (tmName && tmRole) {
      setTeamMembers([...teamMembers, { name: tmName, role: tmRole, email: tmEmail, image: tmImage }]);
      setTmName('');
      setTmRole('');
      setTmEmail('');
      setTmImage('');
    }
  };

  const removeTeamMember = (idx: number) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== idx));
  };

  if (loading) return <div className="h-screen flex items-center justify-center font-display text-2xl uppercase tracking-[0.2em]">{t('dashboard_loading')}</div>;

  if (role === 'admin') {
    return (
      <AdminDashboard 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        projects={projects}
        news={news}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        editingProject={editingProject}
        resetProjectForm={resetProjectForm}
        handleSaveProject={handleSaveProject}
        startEditProject={startEditProject}
        handleDeleteProject={handleDeleteProject}
        handleDeleteNews={handleDeleteNews}
        handleAddNews={handleAddNews}
        handleUpdateContact={handleUpdateContact}
        handleLogout={handleLogout}
        projectTitle={projectTitle} setProjectTitle={setProjectTitle}
        projectCategory={projectCategory} setProjectCategory={setProjectCategory}
        projectYear={projectYear} setProjectYear={setProjectYear}
        projectLocation={projectLocation} setProjectLocation={setProjectLocation}
        projectDescription={projectDescription} setProjectDescription={setProjectDescription}
        projectConcept={projectConcept} setProjectConcept={setProjectConcept}
        projectHeroImage={projectHeroImage} setProjectHeroImage={setProjectHeroImage}
        projectImages={projectImages} setProjectImages={setProjectImages}
        projectStatus={projectStatus} setProjectStatus={setProjectStatus}
        tempImage={tempImage} setTempImage={setTempImage}
        addImage={addImage}
        handleImageUpload={handleImageUpload}
        newsTitle={newsTitle} setNewsTitle={setNewsTitle}
        newsCategory={newsCategory} setNewsCategory={setNewsCategory}
        newsDescription={newsDescription} setNewsDescription={setNewsDescription}
        contactEmail={contactEmail} setContactEmail={setContactEmail}
        contactPhone={contactPhone} setContactPhone={setContactPhone}
        contactAddress={contactAddress} setContactAddress={setContactAddress}
        whoWeAre={whoWeAre} setWhoWeAre={setWhoWeAre}
        history={history} setHistory={setHistory}
        teamMembers={teamMembers} addTeamMember={addTeamMember} removeTeamMember={removeTeamMember}
        tmName={tmName} setTmName={setTmName}
        tmRole={tmRole} setTmRole={setTmRole}
        tmEmail={tmEmail} setTmEmail={setTmEmail}
        tmImage={tmImage} setTmImage={setTmImage}
      />
    );
  }

  return <ClientDashboard isAdmin={false} onExitPreview={() => {}} />;
}

