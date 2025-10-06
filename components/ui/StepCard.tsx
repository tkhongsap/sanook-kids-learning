import React from 'react';
import { StepCardProps } from '@/types/landing';

export default function StepCard({ step, className = '' }: StepCardProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Step Number Badge */}
      <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg z-10">
        {step.number}
      </div>

      {/* Card Content */}
      <div className="card h-full pt-8">
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 bg-primary-light/20 rounded-full flex items-center justify-center">
            <div dangerouslySetInnerHTML={{ __html: step.icon }} className="w-12 h-12 text-primary" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
          {step.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-center leading-relaxed">
          {step.description}
        </p>
      </div>
    </div>
  );
}

