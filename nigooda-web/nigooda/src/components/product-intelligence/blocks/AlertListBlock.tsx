import React from 'react';
import { ShieldAlert, AlertTriangle, ShieldCheck, Flag } from 'lucide-react';
import { AlertListBlockData, AlertItem } from '../types';
import { BaseCard } from './BaseCard';

const SeverityIcon = ({ severity }: { severity: AlertItem['severity'] }) => {
  switch (severity) {
    case 'critical': return <ShieldAlert className="w-5 h-5 text-red-600" />;
    case 'high': return <AlertTriangle className="w-5 h-5 text-orange-600" />;
    case 'medium': return <Flag className="w-5 h-5 text-amber-600" />;
    case 'low': return <ShieldCheck className="w-5 h-5 text-blue-600" />;
  }
};

const SeverityColors = (severity: AlertItem['severity']) => {
  switch (severity) {
    case 'critical': return 'bg-red-50 border-red-100 text-red-900';
    case 'high': return 'bg-orange-50 border-orange-100 text-orange-900';
    case 'medium': return 'bg-amber-50 border-amber-100 text-amber-900';
    case 'low': return 'bg-blue-50 border-blue-100 text-blue-900';
  }
};

export const AlertListBlock: React.FC<{ data: AlertListBlockData }> = ({ data }) => {
  return (
    <BaseCard title={data.title || 'Intelligence Alerts'}>
      <div className="space-y-4">
        {data.alerts.map((alert, idx) => (
          <div key={idx} className={`p-4 rounded-xl border flex gap-4 ${SeverityColors(alert.severity)}`}>
            <div className="mt-0.5">
              <SeverityIcon severity={alert.severity} />
            </div>
            <div>
              <h5 className="font-bold text-sm mb-1">{alert.title}</h5>
              <p className="text-sm opacity-80 leading-relaxed">{alert.description}</p>
            </div>
          </div>
        ))}
      </div>
    </BaseCard>
  );
};
