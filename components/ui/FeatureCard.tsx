import React from 'react';
import { FeatureCardProps } from '@/types/landing';

export default function FeatureCard({ feature, className = '' }: FeatureCardProps) {
  return (
    <div className={`card group hover:border-primary/20 transition-all duration-300 ${className}`}>
      {/* Icon */}
      <div className="mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <div
            dangerouslySetInnerHTML={{ __html: feature.icon }}
            className="w-10 h-10 text-primary"
          />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-900 mb-3">
        {feature.title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 leading-relaxed">
        {feature.description}
      </p>
    </div>
  );
}

