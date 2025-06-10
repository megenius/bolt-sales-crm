import React from 'react';
import { useAppSelector } from './hooks/useAppSelector';
import { useAppDispatch } from './hooks/useAppDispatch';
import { setActiveTab } from './store/slices/uiSlice';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Contacts from './components/Contacts';
import Deals from './components/Deals';
import Activities from './components/Activities';
import Tasks from './components/Tasks';
import Analytics from './components/Analytics';
import Settings from './components/Settings';
import NotificationToast from './components/ui/NotificationToast';

function App() {
  const activeTab = useAppSelector(state => state.ui.activeTab);
  const dispatch = useAppDispatch();

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'contacts':
        return <Contacts />;
      case 'deals':
        return <Deals />;
      case 'activities':
        return <Activities />;
      case 'tasks':
        return <Tasks />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={(tab) => dispatch(setActiveTab(tab))} 
      />
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          {renderContent()}
        </div>
      </main>
      <NotificationToast />
    </div>
  );
}

export default App;