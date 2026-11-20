import { useState } from 'react';
import type { Product } from '../types';

function hashCode(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

const PALETTES: { bg: string; mid: string; deep: string; accent: string }[] = [
  { bg: '#EDE6D8', mid: '#D8C9B5', deep: '#A8927E', accent: '#F5F1E9' },
  { bg: '#E9E0D0', mid: '#CDBBA2', deep: '#8A7462', accent: '#F5F1E9' },
  { bg: '#EFE9DE', mid: '#D5C6B0', deep: '#B09B84', accent: '#FFFFFF' },
  { bg: '#E6DCC9', mid: '#C4B096', deep: '#7D6857', accent: '#F5F1E9' },
];

function dressPaths(cx: number, r: number) {
  return {
    neckline: `M ${cx - 22} ${150} Q ${cx} ${172} ${cx + 22} ${150}`,
    bodice: `M ${cx - 24} ${150} L ${cx + 24} ${150} L ${cx + 34} ${235} L ${cx - 34} ${235} Z`,
    skirt: `M ${cx - 34} ${235} L ${cx + 34} ${235} Q ${cx + 62} ${r + 40} ${cx + 48} ${r} Q ${cx} ${r + 18} ${cx - 48} ${r} Q ${cx - 62} ${r + 40} ${cx - 34} ${235} Z`,
  };
}

export default function ProductArt({ product, className = '' }: { product: Product; className?: string }) {
  const [failed, setFailed] = useState(false);
  const h = hashCode(product.seed);
  const palette = PALETTES[h % PALETTES.length];
  const cx = 150;

  if (failed) {
    return (
      <div className={`flex items-center justify-center bg-cream ${className}`} role="img" aria-label={product.nameEn}>
        <span className="font-serif-display text-4xl text-taupe">L</span>
      </div>
    );
  }

  let art: React.ReactNode;

  switch (product.category) {
    case 'dresses': {
      const p = dressPaths(cx, 340);
      art = (
        <g>
          <path d={p.skirt} fill={palette.mid} />
          <path d={`M ${cx - 34} 235 L ${cx + 34} 235 Q ${cx} 250 ${cx - 34} 235 Z`} fill={palette.deep} opacity="0.25" />
          <path d={p.bodice} fill={palette.mid} />
          <path d={p.neckline} fill="none" stroke={palette.deep} strokeWidth="2" />
          <path d={`M ${cx - 34} 235 L ${cx - 48} 340 M ${cx + 34} 235 L ${cx + 48} 340`} stroke={palette.deep} strokeWidth="1" opacity="0.3" />
        </g>
      );
      break;
    }
    case 'blouses': {
      art = (
        <g>
          <path d={`M ${cx - 40} 165 Q ${cx} ${140} ${cx + 40} 165 L ${cx + 52} 300 L ${cx - 52} 300 Z`} fill={palette.mid} />
          <path d={`M ${cx - 40} 165 Q ${cx - 60} 200 ${cx - 48} 265 L ${cx - 40} 300 L ${cx - 30} 300 L ${cx - 38} 200 Z`} fill={palette.deep} opacity="0.35" />
          <path d={`M ${cx + 40} 165 Q ${cx + 60} 200 ${cx + 48} 265 L ${cx + 40} 300 L ${cx + 30} 300 L ${cx + 38} 200 Z`} fill={palette.deep} opacity="0.35" />
          <path d={`M ${cx} 150 L ${cx} 300`} stroke={palette.accent} strokeWidth="1.5" opacity="0.6" />
          <circle cx={cx} cy="158" r="4" fill={palette.accent} />
          <circle cx={cx} cy="200" r="3" fill={palette.accent} opacity="0.8" />
          <circle cx={cx} cy="240" r="3" fill={palette.accent} opacity="0.8" />
          <path d={`M ${cx - 18} 138 Q ${cx} 158 ${cx + 18} 138`} stroke={palette.deep} strokeWidth="3" fill="none" />
        </g>
      );
      break;
    }
    case 'trousers': {
      art = (
        <g>
          <path d={`M ${cx - 35} 130 L ${cx + 35} 130 L ${cx + 30} 165 L ${cx + 26} 340 L ${cx + 4} 340 L ${cx} 190 L ${cx - 4} 340 L ${cx - 26} 340 L ${cx - 30} 165 Z`} fill={palette.mid} />
          <path d={`M ${cx - 35} 130 L ${cx + 35} 130 L ${cx + 34} 142 L ${cx - 34} 142 Z`} fill={palette.deep} opacity="0.5" />
          <path d={`M ${cx - 8} 136 Q ${cx} 140 ${cx + 8} 136`} stroke={palette.deep} strokeWidth="2" fill="none" />
        </g>
      );
      break;
    }
    case 'bags': {
      const isMini = product.id === 10 || product.id === 14;
      if (isMini) {
        art = (
          <g>
            <path d={`M ${cx - 22} 195 Q ${cx} 130 ${cx + 22} 195`} stroke={palette.deep} strokeWidth="4" fill="none" />
            <rect x={cx - 55} y="192" width="110" height="85" rx="14" fill={palette.mid} />
            <rect x={cx - 55} y="192" width="110" height="85" rx="14" fill="none" stroke={palette.deep} strokeWidth="2" opacity="0.4" />
            <rect x={cx - 16} y="222" width="32" height="22" rx="4" fill={palette.accent} />
            <rect x={cx - 3} y="222" width="6" height="22" fill={palette.deep} opacity="0.4" />
          </g>
        );
      } else {
        art = (
          <g>
            <path d={`M ${cx - 30} 190 Q ${cx} ${120} ${cx + 30} 190`} stroke={palette.deep} strokeWidth="5" fill="none" />
            <rect x={cx - 70} y="186" width="140" height="120" rx="12" fill={palette.mid} />
            <rect x={cx - 70} y="186" width="140" height="26" rx="12" fill={palette.deep} opacity="0.4" />
            <rect x={cx - 20} y="228" width="40" height="28" rx="5" fill={palette.accent} />
            <rect x={cx - 4} y="228" width="8" height="28" fill={palette.deep} opacity="0.4" />
          </g>
        );
      }
      break;
    }
    case 'shoes': {
      const heel = product.id === 5;
      if (heel) {
        art = (
          <g>
            <path d={`M ${cx - 75} 300 Q ${cx - 70} 265 ${cx - 30} 250 Q ${cx + 20} 235 ${cx + 45} 260 Q ${cx + 68} 282 ${cx + 70} 300 L ${cx + 70} 308 L ${cx + 40} 308 L ${cx + 38} 285 Q ${cx} 270 ${cx - 40} 285 L ${cx - 48} 308 L ${cx - 75} 308 Z`} fill={palette.mid} />
            <path d={`M ${cx + 42} 262 L ${cx + 62} 300 L ${cx + 70} 300 L ${cx + 70} 308 L ${cx + 44} 308 L ${cx + 34} 280 Z`} fill={palette.deep} />
            <ellipse cx={cx - 62} cy="305" rx="8" ry="5" fill={palette.accent} opacity="0.7" />
          </g>
        );
      } else {
        art = (
          <g>
            <path d={`M ${cx - 70} 290 Q ${cx - 65} 265 ${cx - 25} 255 Q ${cx + 25} 248 ${cx + 55} 275 Q ${cx + 70} 288 ${cx + 70} 300 L ${cx - 70} 300 Z`} fill={palette.mid} />
            <path d={`M ${cx - 25} 255 Q ${cx + 15} 252 ${cx + 40} 272 L ${cx + 30} 282 Q ${cx + 5} 266 ${cx - 22} 268 Z`} fill={palette.deep} opacity="0.5" />
            <rect x={cx - 70} y="298" width="140" height="8" rx="4" fill={palette.deep} opacity="0.6" />
          </g>
        );
      }
      break;
    }
    case 'accessories': {
      if (product.id === 12) {
        art = (
          <g>
            <circle cx={cx - 42} cy="245" r="38" fill="none" stroke={palette.deep} strokeWidth="7" />
            <circle cx={cx + 42} cy="245" r="38" fill="none" stroke={palette.deep} strokeWidth="7" />
            <circle cx={cx - 54} cy="230" r="6" fill={palette.accent} opacity="0.8" />
            <circle cx={cx + 30} cy="230" r="6" fill={palette.accent} opacity="0.8" />
          </g>
        );
      } else {
        art = (
          <g>
            <path d={`M ${cx - 80} 175 Q ${cx} 215 ${cx + 80} 175 L ${cx + 80} 200 Q ${cx} 245 ${cx - 80} 200 Z`} fill={palette.mid} />
            <path d={`M ${cx - 80} 200 Q ${cx} 245 ${cx + 80} 200 L ${cx + 76} 212 Q ${cx} 258 ${cx - 76} 212 Z`} fill={palette.deep} opacity="0.4" />
            <path d={`M ${cx - 80} 175 Q ${cx - 95} 160 ${cx - 88} 148`} stroke={palette.mid} strokeWidth="3" fill="none" />
            <path d={`M ${cx + 80} 175 Q ${cx + 95} 160 ${cx + 88} 148`} stroke={palette.mid} strokeWidth="3" fill="none" />
          </g>
        );
      }
      break;
    }
    default:
      art = null;
  }

  const gid = `bg-${product.seed}`;
  const label = product.nameEn;

  return (
    <svg
      viewBox="0 0 300 420"
      className={className}
      role="img"
      aria-label={label}
      onError={() => setFailed(true)}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={palette.bg} />
          <stop offset="100%" stopColor={palette.mid} stopOpacity="0.45" />
        </linearGradient>
      </defs>
      <rect width="300" height="420" fill={`url(#${gid})`} />
      <circle cx={h % 200 + 50} cy={h % 120 + 60} r="90" fill={palette.accent} opacity="0.14" />
      <circle cx={250 - (h % 90)} cy={330 - (h % 60)} r="70" fill={palette.deep} opacity="0.08" />
      {art}
      <rect x="12" y="12" width="276" height="396" fill="none" stroke={palette.deep} strokeWidth="1" opacity="0.15" />
    </svg>
  );
}
