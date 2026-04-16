import React from 'react';
import { motion } from 'motion/react';

interface DartboardProps {
  onScore: (score: number) => void;
  disabled?: boolean;
}

const SEGMENTS = [20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5];

export default function Dartboard({ onScore, disabled }: DartboardProps) {
  const size = 320;
  const center = size / 2;
  const radius = size * 0.45;

  const handleScore = (score: number) => {
    if (disabled) return;
    onScore(score);
  };

  const getCoordinatesForAngle = (angle: number, r: number) => {
    const x = center + r * Math.cos((angle - 90) * (Math.PI / 180));
    const y = center + r * Math.sin((angle - 90) * (Math.PI / 180));
    return { x, y };
  };

  const createArcPath = (startAngle: number, endAngle: number, innerR: number, outerR: number) => {
    const startOuter = getCoordinatesForAngle(startAngle, outerR);
    const endOuter = getCoordinatesForAngle(endAngle, outerR);
    const startInner = getCoordinatesForAngle(startAngle, innerR);
    const endInner = getCoordinatesForAngle(endAngle, innerR);

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return `
      M ${startOuter.x} ${startOuter.y}
      A ${outerR} ${outerR} 0 ${largeArcFlag} 1 ${endOuter.x} ${endOuter.y}
      L ${endInner.x} ${endInner.y}
      A ${innerR} ${innerR} 0 ${largeArcFlag} 0 ${startInner.x} ${startInner.y}
      Z
    `;
  };

  return (
    <div className="flex flex-col items-center justify-center p-1 bg-stone-900/40 rounded-3xl border border-stone-800 shadow-inner w-full">
      <svg 
        viewBox={`0 0 ${size} ${size}`} 
        className={`w-full max-w-[450px] h-auto transition-opacity ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
      >
        {/* Background circle */}
        <circle cx={center} cy={center} r={radius + 25} fill="#111" />
        
        {/* Segments */}
        {SEGMENTS.map((num, i) => {
          const startAngle = i * 18 - 9;
          const endAngle = (i + 1) * 18 - 9;
          const isBlack = i % 2 === 0;
          
          const baseColor = isBlack ? "#111" : "#f5f2ed";
          const altColor = isBlack ? "#991b1b" : "#064e3b";

          return (
            <g key={num} className="cursor-pointer transition-transform hover:brightness-125 active:scale-[0.98]">
              {/* Double Ring */}
              <path
                d={createArcPath(startAngle, endAngle, radius * 0.9, radius)}
                fill={altColor}
                onClick={() => handleScore(num * 2)}
              />
              {/* Single Outer */}
              <path
                d={createArcPath(startAngle, endAngle, radius * 0.6, radius * 0.9)}
                fill={baseColor}
                onClick={() => handleScore(num)}
              />
              {/* Triple Ring */}
              <path
                d={createArcPath(startAngle, endAngle, radius * 0.5, radius * 0.6)}
                fill={altColor}
                onClick={() => handleScore(num * 3)}
              />
              {/* Single Inner */}
              <path
                d={createArcPath(startAngle, endAngle, radius * 0.15, radius * 0.5)}
                fill={baseColor}
                onClick={() => handleScore(num)}
              />
              
              {/* Numbers */}
              <text
                x={getCoordinatesForAngle(i * 18, radius + 15).x}
                y={getCoordinatesForAngle(i * 18, radius + 15).y}
                fill="#c5a059"
                fontSize="12"
                fontWeight="bold"
                textAnchor="middle"
                alignmentBaseline="middle"
                className="pointer-events-none font-serif"
              >
                {num}
              </text>
            </g>
          );
        })}

        <circle 
          cx={center} cy={center} r={radius * 0.15} 
          fill="#064e3b" 
          className="cursor-pointer hover:brightness-125"
          onClick={() => handleScore(25)}
        />
        <circle 
          cx={center} cy={center} r={radius * 0.06} 
          fill="#991b1b" 
          className="cursor-pointer hover:brightness-125"
          onClick={() => handleScore(50)}
        />
      </svg>
      
      <div className="mt-4 flex gap-4">
        <button 
          onClick={() => handleScore(0)}
          className="px-6 py-2 bg-stone-800 text-stone-400 rounded-full text-xs font-bold uppercase tracking-widest border border-stone-700 hover:bg-stone-700"
        >
          Miss / 0
        </button>
      </div>
    </div>
  );
}
