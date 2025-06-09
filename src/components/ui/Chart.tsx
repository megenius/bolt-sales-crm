import React, { useState } from 'react';

const Chart: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const data = [
    { month: 'Jan', value: 85, deals: 12, leads: 145 },
    { month: 'Feb', value: 92, deals: 15, leads: 168 },
    { month: 'Mar', value: 78, deals: 10, leads: 132 },
    { month: 'Apr', value: 95, deals: 18, leads: 189 },
    { month: 'May', value: 88, deals: 13, leads: 156 },
    { month: 'Jun', value: 102, deals: 21, leads: 203 }
  ];

  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="space-y-6">
      <div className="flex items-end space-x-2 h-64 relative">
        {data.map((item, index) => (
          <div 
            key={index} 
            className="flex-1 flex flex-col items-center relative"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Tooltip */}
            {hoveredIndex === index && (
              <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap z-10 shadow-lg">
                <div className="text-center">
                  <p className="font-semibold">${item.value}K Revenue</p>
                  <p className="text-slate-300">{item.deals} deals • {item.leads} leads</p>
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900"></div>
              </div>
            )}
            
            <div className="w-full bg-slate-100 rounded-t-xl overflow-hidden" style={{ height: '200px' }}>
              <div 
                className={`w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-xl transition-all duration-700 ease-out hover:from-blue-600 hover:to-purple-600 cursor-pointer ${
                  hoveredIndex === index ? 'shadow-lg transform scale-105' : ''
                }`}
                style={{ 
                  height: `${(item.value / maxValue) * 100}%`,
                  marginTop: `${100 - (item.value / maxValue) * 100}%`
                }}
              />
            </div>
            <p className="text-sm text-slate-600 mt-3 font-medium">{item.month}</p>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100">
        <div className="text-center">
          <p className="text-2xl font-bold text-slate-900">$540K</p>
          <p className="text-sm text-slate-500">Total Revenue</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-slate-900">89</p>
          <p className="text-sm text-slate-500">Total Deals</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-slate-900">993</p>
          <p className="text-sm text-slate-500">Total Leads</p>
        </div>
      </div>
    </div>
  );
};

export default Chart;