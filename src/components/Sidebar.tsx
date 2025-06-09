import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Target, 
  Activity, 
  CheckSquare, 
  BarChart3, 
  Settings,
  Zap,
  Bell,
  Search
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'contacts', label: 'Contacts', icon: Users },
    { id: 'deals', label: 'Deals', icon: Target },
    { id: 'activities', label: 'Activities', icon: Activity },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-72 bg-white border-r border-slate-200 flex flex-col shadow-sm">
      {/* Logo */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">SalesCRM</h1>
            <p className="text-xs text-slate-500">Professional Edition</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-slate-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 group ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border border-blue-200 shadow-sm'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                    activeTab === item.id ? 'text-blue-600' : ''
                  }`} />
                  <span className="font-medium">{item.label}</span>
                  {activeTab === item.id && (
                    <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full"></div>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Notifications */}
      <div className="p-4 border-t border-slate-100">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
          <div className="flex items-center space-x-3 mb-2">
            <Bell className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-blue-900">3 New Notifications</span>
          </div>
          <p className="text-sm text-blue-700">You have new leads and deal updates</p>
          <button className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium">
            View all →
          </button>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-slate-200">
        <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
          <div className="w-10 h-10 bg-gradient-to-br from-slate-400 to-slate-600 rounded-full flex items-center justify-center">
            <span className="text-sm font-bold text-white">JD</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-slate-900">John Doe</p>
            <p className="text-xs text-slate-500">Sales Manager</p>
          </div>
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;