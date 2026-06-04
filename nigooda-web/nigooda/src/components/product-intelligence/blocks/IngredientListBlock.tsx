import React from 'react';
import { FlaskConical } from 'lucide-react';
import { IngredientListBlockData } from '../types';
import { BaseCard } from './BaseCard';

export const IngredientListBlock: React.FC<{ data: IngredientListBlockData }> = ({ data }) => {
  const getRiskColor = (level: number) => {
    if (level <= 2) return 'bg-emerald-100 text-emerald-700';
    if (level === 3) return 'bg-amber-100 text-amber-700';
    return 'bg-red-100 text-red-700';
  };

  return (
    <BaseCard title={data.title || 'Ingredient Analysis'}>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Ingredient</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Purpose</th>
              <th className="text-center py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Risk</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.ingredients.map((ing, idx) => (
              <tr key={idx} className="group hover:bg-gray-50/50 transition-colors">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-gray-100 rounded-md group-hover:bg-white transition-colors">
                      <FlaskConical className="w-3.5 h-3.5 text-gray-500" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-sm">{ing.name}</div>
                      {ing.description && <div className="text-xs text-gray-500 mt-0.5 line-clamp-1">{ing.description}</div>}
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm text-gray-600">{ing.purpose}</span>
                </td>
                <td className="py-4 px-4 flex justify-center">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${getRiskColor(ing.riskLevel)}`}>
                    Level {ing.riskLevel}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </BaseCard>
  );
};
