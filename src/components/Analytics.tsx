import React from 'react';
import { TrendingUp, Target, Users, DollarSign, Calendar, BarChart3 } from 'lucide-react';

const Analytics: React.FC = () => {
  const salesData = [
    { month: 'Jan', revenue: 85000, deals: 12, leads: 145 },
    { month: 'Feb', revenue: 92000, deals: 15, leads: 168 },
    { month: 'Mar', revenue: 78000, deals: 10, leads: 132 },
    { month: 'Apr', revenue: 105000, deals: 18, leads: 189 },
    { month: 'May', revenue: 88000, deals: 13, leads: 156 },
    { month: 'Jun', revenue: 115000, deals: 21, leads: 203 }
  ];

  const conversionRates = {
    leadToOpportunity: 65,
    opportunityToDeal: 45,
    dealToClosed: 78
  };

  const topPerformers = [
    { name: 'Sarah Johnson', deals: 24, revenue: '$185,000', conversion: '82%' },
    { name: 'Mike Chen', deals: 18, revenue: '$142,000', conversion: '75%' },
    { name: 'Emma Davis', deals: 15, revenue: '$98,000', conversion: '68%' },
    { name: 'Robert Wilson', deals: 12, revenue: '$87,000', conversion: '63%' }
  ];

  const maxRevenue = Math.max(...salesData.map(d => d.revenue));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Analytics</h1>
        <p className="text-slate-600 mt-2">Comprehensive sales performance insights and reporting</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Revenue</p>
              <p className="text-2xl font-bold text-slate-900 mt-2">$563K</p>
              <p className="text-sm text-green-600 mt-1">+18.2% vs last period</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Deals Closed</p>
              <p className="text-2xl font-bold text-slate-900 mt-2">89</p>
              <p className="text-sm text-blue-600 mt-1">+12.5% vs last period</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">New Leads</p>
              <p className="text-2xl font-bold text-slate-900 mt-2">1,193</p>
              <p className="text-sm text-purple-600 mt-1">+24.8% vs last period</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Avg Deal Size</p>
              <p className="text-2xl font-bold text-slate-900 mt-2">$6,325</p>
              <p className="text-sm text-orange-600 mt-1">+8.9% vs last period</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Revenue Trend</h3>
          <div className="space-y-4">
            <div className="flex items-end space-x-2 h-48">
              {salesData.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-slate-100 rounded-t-md overflow-hidden" style={{ height: '160px' }}>
                    <div 
                      className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-md transition-all duration-500 hover:from-blue-600 hover:to-blue-500"
                      style={{ 
                        height: `${(item.revenue / maxRevenue) * 100}%`,
                        marginTop: `${100 - (item.revenue / maxRevenue) * 100}%`
                      }}
                    />
                  </div>
                  <p className="text-xs text-slate-600 mt-2 font-medium">{item.month}</p>
                </div>
              ))}
            </div>
            <div className="text-center">
              <p className="text-sm text-slate-500">Monthly revenue performance</p>
            </div>
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Conversion Funnel</h3>
          <div className="space-y-4">
            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-900">Leads to Opportunities</span>
                <span className="text-sm font-semibold text-blue-600">{conversionRates.leadToOpportunity}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3">
                <div 
                  className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${conversionRates.leadToOpportunity}%` }}
                />
              </div>
            </div>

            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-900">Opportunities to Deals</span>
                <span className="text-sm font-semibold text-green-600">{conversionRates.opportunityToDeal}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3">
                <div 
                  className="bg-green-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${conversionRates.opportunityToDeal}%` }}
                />
              </div>
            </div>

            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-900">Deals to Closed Won</span>
                <span className="text-sm font-semibold text-purple-600">{conversionRates.dealToClosed}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3">
                <div 
                  className="bg-purple-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${conversionRates.dealToClosed}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Top Performers</h3>
          <div className="space-y-4">
            {topPerformers.map((performer, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">
                      {performer.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{performer.name}</p>
                    <p className="text-sm text-slate-500">{performer.deals} deals closed</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-slate-900">{performer.revenue}</p>
                  <p className="text-sm text-green-600">{performer.conversion} conversion</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Breakdown */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Monthly Breakdown</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-2 font-medium text-slate-900">Month</th>
                  <th className="text-right py-2 font-medium text-slate-900">Revenue</th>
                  <th className="text-right py-2 font-medium text-slate-900">Deals</th>
                  <th className="text-right py-2 font-medium text-slate-900">Leads</th>
                </tr>
              </thead>
              <tbody>
                {salesData.map((data, index) => (
                  <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 font-medium text-slate-900">{data.month}</td>
                    <td className="py-3 text-right font-semibold text-slate-900">
                      ${(data.revenue / 1000).toFixed(0)}K
                    </td>
                    <td className="py-3 text-right text-slate-600">{data.deals}</td>
                    <td className="py-3 text-right text-slate-600">{data.leads}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;