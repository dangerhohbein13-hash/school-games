import { useState } from 'react';
import { Gamepad2 } from 'lucide-react';

export function GameThumbnail({ src, alt, title, className = '' }) {
  const [failed, setFailed] = useState(!src);

  if (failed || !src) {
    return (
      <div
        className={`flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#18212E] via-[#121822] to-[#0D1117] p-4 text-center ${className}`}
      >
        <Gamepad2 className="h-8 w-8 text-amber-400/80" aria-hidden="true" />
        <span className="font-display text-sm font-semibold text-slate-200 line-clamp-1">
          {title}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={`h-full w-full object-cover ${className}`}
    />
  );
}
