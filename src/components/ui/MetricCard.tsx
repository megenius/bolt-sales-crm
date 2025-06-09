import React from 'react';
import { DivideIcon as LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: LucideIcon;
  color: 'green' | 'blue' | 'purple' | 'red';
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, trend, icon: Icon, color }) => {
  const colorClasses = {
    green: 'from-green-500 to-emerald-600',
    blue: 'from-blue-500 to-cyan-600',
    purple: 'from-purple-500 to-violet-600',
    red: 'from-red-500 to-rose-600'
  };

  const trendColors = {
    up: 'text-green-600 bg-green-50 border-green-200',
    down: 'text-red-600 bg-red-50 border-red-200'
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition-all duration-300 group">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-slate-600">{title}</p>
          <p className="text-3xl font-bold text-slate-900 mt-2 group-hover:scale-105 transition-transform">
            {value}
          </p>
        </div>
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
      </div>
      <div className="flex items-center">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${trendColors[trend]}`}>
          {trend === 'up' ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
          {change}
        </span>
        <span className="text-sm text-slate-500 ml-3">vs last month</span>
      </div>
    </div>
  );
};

export default MetricCard;