import React, { useState, useMemo, useEffect } from 'react';
import { Settings, Briefcase, Plus, Heart, LayoutDashboard, Users, Menu, X } from 'lucide-react';
import { Participant, ToastMessage, ProgramType, PaymentStatus } from './types';
import { INITIAL_PARTICIPANTS, INITIAL_METRICS, INITIAL_ACTIVITIES, COLORS } from './constants';
import DashboardView from './components/DashboardView';
import ParticipantsView from './components/ParticipantsView';
import ToastContainer from './components/ToastContainer';
import ParticipantModal from './components/ParticipantModal';
import ChatBot from './components/ChatBot';
import HeaderProfile from './components/HeaderProfile';
import ProfileModal from './components/ProfileModal';
import ProgramsView from './components/ProgramsView';
import SettingsView from './components/SettingsView';

/**
 * High-fidelity SVG recreation of the Iron Lady geometric logo.
 * Uses the requested brand maroon color #812107.
 */
const AppLogo = () => (
  <img
    src="/image.png"
    alt="Iron Lady Logo"
    width={40}   // adjust as needed
    height={40}
    className="transform group-hover:rotate-3 transition-transform"
  />
);


const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'participants' | 'programs' | 'settings'>('dashboard');
  const [participants, setParticipants] = useState<Participant[]>(INITIAL_PARTICIPANTS);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [editingParticipant, setEditingParticipant] = useState<Participant | null>(null);
  const [filterType, setFilterType] = useState<string | null>(null);
  const [programFilter, setProgramFilter] = useState<ProgramType | 'All'>('All');
  
  const [currentUser, setCurrentUser] = useState({
    name: 'Admin User',
    email: 'admin@ironlady.com',
    role: 'Super Administrator',
    avatar: 'https://picsum.photos/seed/admin/100/100'
  });

  useEffect(() => {
    if (currentView !== 'participants') {
      setFilterType(null);
    }
    setIsMobileMenuOpen(false);
  }, [currentView]);

  const addToast = (message: string, type: 'success' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const handleUpdateProfile = (updatedUser: typeof currentUser) => {
    setCurrentUser(updatedUser);
    addToast('Profile updated successfully.');
  };

  const handleAddParticipant = (data: Omit<Participant, 'id' | 'createdAt' | 'avatar'>) => {
    if (editingParticipant) {
      setParticipants(prev => prev.map(p => p.id === editingParticipant.id ? { ...p, ...data } : p));
      addToast(`Updated ${data.name} successfully.`);
    } else {
      const newParticipant: Participant = {
        ...data,
        id: Math.random().toString(36).substring(2, 9),
        createdAt: new Date().toISOString(),
        avatar: `https://picsum.photos/seed/${encodeURIComponent(data.name)}/100/100`,
      };
      setParticipants((prev) => [newParticipant, ...prev]);
      addToast(`Enrolled ${data.name} successfully.`);
    }
    setIsModalOpen(false);
    setEditingParticipant(null);
  };

  const handleDeleteParticipant = (id: string) => {
    setParticipants((prev) => prev.filter((p) => p.id !== id));
    addToast('Participant record deleted.', 'error');
  };

  const handleEditParticipant = (p: Participant) => {
    setEditingParticipant(p);
    setIsModalOpen(true);
  };

  const handleMetricClick = (id: string) => {
    setFilterType(id);
    setProgramFilter('All');
    setCurrentView('participants');
  };

  const handleProgramEnrollmentView = (program: ProgramType) => {
    setProgramFilter(program);
    setFilterType(null);
    setCurrentView('participants');
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'participants', label: 'Participants', icon: Users },
    { id: 'programs', label: 'Programs', icon: Briefcase },
    { id: 'settings', label: 'Settings', icon: Settings },
  ] as const;

  return (
    <div className="min-h-screen bg-[#f7f6e4] text-[#2D0101] flex flex-col font-sans">
      {/* Premium Deep Maroon Header */}
      <header className="sticky top-0 z-50 bg-[#2D0101] border-b border-white/5 shadow-2xl">
        <div className="max-w-[1600px] mx-auto px-6 h-20 md:h-24 flex items-center justify-between">
          
          {/* Branding Section */}
          <div 
            className="flex items-center gap-4 cursor-pointer group shrink-0" 
            onClick={() => setCurrentView('dashboard')}
          >
            <div className="bg-white p-0.5 rounded-lg shadow-xl shadow-black/20 overflow-hidden">
              <AppLogo />
            </div>
            <div className="hidden sm:block">
              <span className="block font-black text-xl tracking-tighter text-white uppercase italic leading-none">
                IRON LADY
              </span>
              <span className="block text-[7px] font-bold text-[#D31027] tracking-[0.4em] uppercase mt-1">
                Management Hub
              </span>
            </div>
          </div>

          {/* Navigational Links (Desktop) */}
          <nav className="hidden md:flex items-center bg-white/5 rounded-2xl px-2 py-1.5 ml-8 mr-auto">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-2.5 ${
                    isActive 
                      ? 'bg-white text-[#2D0101] shadow-lg' 
                      : 'text-white/40 hover:text-white'
                  }`}
                >
                  <item.icon size={14} className={isActive ? 'text-[#D31027]' : ''} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Global Actions & Profile */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setEditingParticipant(null);
                setIsModalOpen(true);
              }}
              className="hidden lg:flex items-center gap-2 bg-[#D31027] text-white px-6 py-3.5 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-[#b00d20] transition-all active:scale-95 shadow-lg shadow-red-900/40"
            >
              <Plus size={16} />
              Enroll New
            </button>
            
            <HeaderProfile user={currentUser} onOpenProfile={() => setIsProfileModalOpen(true)} />

            {/* Mobile Navigation Toggle */}
            <button 
              className="md:hidden p-2 text-white/60 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 bg-[#2D0101] border-t border-white/5 ${isMobileMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="p-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  currentView === item.id ? 'bg-[#D31027] text-white' : 'text-white/40 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Viewport */}
      <main className="flex-1 max-w-[1600px] mx-auto w-full p-6 md:p-10 lg:p-12">
        <header className="mb-12 flex justify-between items-end animate-in fade-in slide-in-from-top-4 duration-700">
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-[#2D0101] uppercase italic leading-none">
              {currentView}
            </h1>
            <p className="text-[10px] font-black text-[#D31027] uppercase tracking-[0.4em] mt-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D31027] animate-pulse" />
              Strategic Operations Dashboard
            </p>
          </div>
        </header>

        <section className="min-h-[calc(100vh-320px)]">
          {currentView === 'dashboard' && (
            <DashboardView 
              participants={participants} 
              onMetricClick={handleMetricClick}
              activities={INITIAL_ACTIVITIES}
            />
          )}
          
          {currentView === 'participants' && (
            <ParticipantsView 
              participants={participants} 
              onDelete={handleDeleteParticipant}
              onEdit={handleEditParticipant}
              initialFilter={filterType}
              initialProgramFilter={programFilter}
            />
          )}

          {currentView === 'programs' && (
            <ProgramsView 
              participants={participants} 
              onViewEnrollment={handleProgramEnrollmentView} 
            />
          )}

          {currentView === 'settings' && (
            <SettingsView 
              onSave={(msg) => addToast(msg)} 
            />
          )}
        </section>

        {/* Brand Footer */}
        <footer className="mt-24 pb-12 pt-12 border-t border-black/[0.03] flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <p>© 2024 IRON LADY PROGRAM. ALL RIGHTS RESERVED.</p>
            <span className="hidden md:inline text-black/5">/</span>
            <p className="flex items-center gap-2 text-[#2D0101]">
              ENGINEERED WITH <Heart size={12} className="text-[#D31027] fill-[#D31027]" /> FOR EXECUTIVE LEADERSHIP
            </p>
          </div>
          <div className="flex items-center gap-8">
            <a href="#" className="hover:text-[#D31027] transition-colors">PRIVACY POLICY</a>
            <a href="#" className="hover:text-[#D31027] transition-colors">COMPLIANCE</a>
            <span className="text-black/5">/</span>
            <p className="text-[#2D0101] bg-white/40 px-3 py-1 rounded-md">BUILD v2.4.1</p>
          </div>
        </footer>
      </main>

      {/* Modals & Overlays */}
      <ParticipantModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddParticipant}
        editingParticipant={editingParticipant}
      />

      <ProfileModal 
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        userData={currentUser}
        onUpdate={handleUpdateProfile}
      />

      <ChatBot />

      <ToastContainer 
        toasts={toasts} 
        onClose={(id) => setToasts(prev => prev.filter(t => t.id !== id))} 
      />
    </div>
  );
};

export default App;
 