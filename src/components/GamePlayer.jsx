import { useRef, useState } from 'react';
import { ArrowLeft, EyeOff, Heart, Maximize2, Monitor, RotateCw } from 'lucide-react';
import { isSafeIframeSrc } from '../utils/iframeParser.js';

export function GamePlayer({
  game,
  allGames,
  isFavorite,
  onToggleFavorite,
  onBack,
  onSelectGame,
  onCloak,
}) {
  const iframeRef = useRef(null);
  const [reloadNonce, setReloadNonce] = useState(0);
  const [theaterMode, setTheaterMode] = useState(false);

  const safeSrc = isSafeIframeSrc(game.iframe.src) ? game.iframe.src : '';

  const handleFullscreen = () => {
    const el = iframeRef.current;
    if (!el) return;
    if (el.requestFullscreen) {
      el.requestFullscreen().catch(() => {});
    }
  };

  const quickSwitchGames = allGames.filter((g) => g.id !== game.id).slice(0, 4);

  return (
    <section className="mx-auto w-full max-w-[1360px] px-4 py-6 sm:px-6">
      <div
        className={`mx-auto transition-[max-width] duration-200 ${
          theaterMode ? 'max-w-full' : 'max-w-[1040px]'
        }`}
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-white/10 bg-[#131922] px-3.5 py-2 text-sm font-medium text-slate-200 transition-colors duration-150 hover:border-white/20 hover:bg-[#1B2330] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to Library
            </button>

            <div className="min-w-0">
              <h1 className="font-display text-xl font-bold tracking-tight text-slate-50 truncate sm:text-2xl">
                {game.title}
              </h1>
              <p className="text-xs text-slate-400 truncate">
                {game.category}
                <span className="mx-1.5" aria-hidden="true">·</span>
                {game.controls}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => onToggleFavorite(game.id)}
              aria-pressed={isFavorite}
              className={`inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 whitespace-nowrap shrink-0 cursor-pointer ${
                isFavorite
                  ? 'border-amber-500/40 bg-amber-500/15 text-amber-300'
                  : 'border-white/10 bg-[#131922] text-slate-300 hover:border-white/20 hover:text-white'
              }`}
            >
              <Heart className={`h-3.5 w-3.5 ${isFavorite ? 'fill-amber-400 text-amber-400' : ''}`} aria-hidden="true" />
              {isFavorite ? 'Saved' : 'Save'}
            </button>

            <button
              type="button"
              onClick={() => setReloadNonce((n) => n + 1)}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-white/10 bg-[#131922] px-3 py-2 text-xs font-semibold text-slate-300 transition-colors duration-150 hover:border-white/20 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <RotateCw className="h-3.5 w-3.5" aria-hidden="true" />
              Reload
            </button>

            <button
              type="button"
              onClick={() => setTheaterMode((t) => !t)}
              className="hidden sm:inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-white/10 bg-[#131922] px-3 py-2 text-xs font-semibold text-slate-300 transition-colors duration-150 hover:border-white/20 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Monitor className="h-3.5 w-3.5" aria-hidden="true" />
              {theaterMode ? 'Standard Width' : 'Wide View'}
            </button>

            <button
              type="button"
              onClick={onCloak}
              title="Quickly hide screen (Shift + H)"
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-white/10 bg-[#131922] px-3 py-2 text-xs font-semibold text-slate-300 transition-colors duration-150 hover:border-white/20 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <EyeOff className="h-3.5 w-3.5" aria-hidden="true" />
              Hide Screen
            </button>

            <button
              type="button"
              onClick={handleFullscreen}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-amber-500 px-3.5 py-2 text-xs font-semibold text-[#0B0F14] transition-colors duration-150 hover:bg-amber-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
              Fullscreen
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-white/10 bg-[#070A0E]">
          {safeSrc ? (
            <iframe
              key={`${game.id}-${reloadNonce}`}
              ref={iframeRef}
              src={safeSrc}
              title={game.iframe.title || game.title}
              allow={game.iframe.allow || 'fullscreen; autoplay'}
              sandbox={game.iframe.sandbox || 'allow-scripts allow-same-origin'}
              className="block w-full border-0 bg-[#0B0F14]"
              style={{
                height: theaterMode ? 'min(78vh, 720px)' : 'min(72vh, 620px)',
              }}
            />
          ) : (
            <div className="flex h-[420px] items-center justify-center p-6 text-center text-sm text-slate-400">
              Invalid iframe source URL configured for this game.
            </div>
          )}
        </div>

        <div className="mt-5 flex flex-col justify-between gap-4 border-b border-white/8 pb-6 sm:flex-row sm:items-center">
          <p className="max-w-2xl text-sm leading-relaxed text-slate-300">{game.description}</p>
          <div className="font-mono text-xs text-slate-400 shrink-0">
            Source: <span className="text-slate-200">{game.iframe.src}</span>
          </div>
        </div>

        {quickSwitchGames.length > 0 && (
          <div className="mt-6">
            <h2 className="font-display text-base font-semibold text-slate-200 mb-3">
              Up Next
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {quickSwitchGames.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectGame(item)}
                  className="flex items-center justify-between gap-3 rounded-lg border border-white/8 bg-[#131922] px-4 py-3 text-left transition-colors duration-150 hover:border-amber-500/40 hover:bg-[#19222E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 cursor-pointer"
                >
                  <div className="min-w-0">
                    <div className="font-display text-sm font-semibold text-slate-100 truncate">
                      {item.title}
                    </div>
                    <div className="text-xs text-slate-400 truncate">
                      {item.category}
                      <span className="mx-1.5" aria-hidden="true">·</span>
                      {item.controls}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
