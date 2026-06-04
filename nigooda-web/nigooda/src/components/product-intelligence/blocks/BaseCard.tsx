import React from 'react';

interface BaseCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export const BaseCard: React.FC<BaseCardProps> = ({ children, className = '', title }) => {
  return (
    <div className={`bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-gray-100/50 hover:shadow-2xl transition-all duration-300 ${className}`}>
      {title && (
        <h3 className="text-xl font-semibold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
};
