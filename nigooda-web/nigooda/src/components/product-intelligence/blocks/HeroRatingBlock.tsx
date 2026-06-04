import React from 'react';
import { Star } from 'lucide-react';
import { HeroRatingBlockData } from '../types';
import { BaseCard } from './BaseCard';

export const HeroRatingBlock: React.FC<{ data: HeroRatingBlockData }> = ({ data }) => {
  const { rating, maxRating = 5, summary, tags } = data;
  const percentage = (rating / maxRating) * 100;

  return (
    <BaseCard className="overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-indigo-500/10 blur-3xl rounded-full" />
      
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Star className="w-5 h-5 text-indigo-600 fill-indigo-600" />
            </div>
            <span className="text-sm font-medium text-indigo-600 uppercase tracking-wider">
              {data.title || 'Overall Intelligence Rating'}
            </span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {summary}
          </h1>

          <div className="flex flex-wrap gap-2">
            {tags?.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium border border-gray-200">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl text-white shadow-lg min-w-[180px]">
          <div className="text-5xl font-black mb-2">
            {rating.toFixed(1)}
          </div>
          <div className="flex items-center gap-1.5 opacity-80 text-sm mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-3.5 h-3.5 ${i < Math.floor(rating) ? 'fill-white text-white' : 'text-white/30'}`} 
                />
              ))}
            </div>
            <span>/ {maxRating}</span>
          </div>
          <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-1000 ease-out" 
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>
    </BaseCard>
  );
};
