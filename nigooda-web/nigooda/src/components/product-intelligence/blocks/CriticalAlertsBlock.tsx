import React from 'react';
import { AlertOctagon, Lightbulb } from 'lucide-react';
import { CriticalAlertsBlockData } from '../types';
import { BaseCard } from './BaseCard';

export const CriticalAlertsBlock: React.FC<{ data: CriticalAlertsBlockData }> = ({ data }) => {
  return (
    <div className="space-y-4">
      {data.alerts.map((alert, idx) => (
        <div key={idx} className="relative overflow-hidden rounded-[2rem] p-6 bg-red-600 text-white shadow-2xl shadow-red-200">
          {/* Animated Wave Background */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 50 Q 25 45 50 50 T 100 50" fill="none" stroke="white" strokeWidth="10" strokeLinecap="round" />
            </svg>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md">
                <AlertOctagon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tighter">CRITICAL DETECTION</h3>
            </div>
            
            <div className="mb-6">
              <div className="text-xs font-bold text-red-200 uppercase tracking-widest mb-1">{alert.type}</div>
              <div className="text-2xl font-bold leading-tight">{alert.message}</div>
            </div>
            
            {alert.action && (
              <div className="flex items-center gap-3 p-4 bg-white/15 backdrop-blur-lg rounded-2xl border border-white/20">
                <Lightbulb className="w-5 h-5 text-yellow-300" />
                <div className="text-sm font-bold leading-snug">
                  RECOMMENDATION: <span className="font-medium text-red-50">{alert.action}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
