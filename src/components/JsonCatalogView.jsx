import { useState } from 'react';
import { Check, Copy, Download, Play, Plus, RotateCcw, Trash2 } from 'lucide-react';
import { parseIframeInput } from '../utils/iframeParser.js';

export function JsonCatalogView({
  games,
  onPlayGame,
  onAddCustomGame,
  onRemoveCustomGame,
  onResetCustomGames,
}) {
  const [copied, setCopied] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Arcade');
  const [controls, setControls] = useState('Keyboard / Mouse');
  const [description, setDescription] = useState('');
  const [iframeInput, setIframeInput] = useState('');
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  const catalogJson = JSON.stringify(
    {
      version: '1.0',
      games: games.map(({ isCustom: _ignored, ...rest }) => rest),
    },
    null,
    2,
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(catalogJson);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([catalogJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'games.json';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    const cleanTitle = title.trim();
    if (!cleanTitle) {
      setFormError('Enter a game title.');
      return;
    }

    const parsedIframe = parseIframeInput(iframeInput, cleanTitle);
    if (!parsedIframe) {
      setFormError('Provide a valid http(s) URL, relative /games/... path, or <iframe src="..."> tag.');
      return;
    }

    const slugBase = cleanTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    const id = `${slugBase || 'custom-game'}-${Date.now().toString().slice(-4)}`;

    const newGame = {
      id,
      title: cleanTitle,
      category,
      description:
        description.trim() || `Embedded browser game loaded from ${parsedIframe.src}.`,
      controls: controls.trim() || 'Keyboard / Mouse',
      thumbnail: '',
      iframe: parsedIframe,
      isCustom: true,
    };

    onAddCustomGame(newGame);
    setTitle('');
    setDescription('');
    setIframeInput('');
    setFormSuccess(`Added "${newGame.title}" to the active JSON catalog.`);
  };

  const hasCustomGames = games.some((g) => g.isCustom);

  return (
    <section className="mx-auto w-full max-w-[1280px] px-4 py-8 sm:px-6">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="rounded-xl border border-white/10 bg-[#131922] p-6">
            <h1 className="font-display text-2xl font-bold tracking-tight text-slate-50">
              Add Game Iframe
            </h1>
            <p className="mt-1.5 text-sm text-slate-400">
              Paste a full <code className="font-mono text-slate-200">&lt;iframe&gt;</code> tag or a direct URL to append an entry to <code className="font-mono text-slate-200">games.json</code>.
            </p>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div>
                <label htmlFor="game-title" className="block text-xs font-medium text-slate-300 mb-1.5">
                  Game Title
                </label>
                <input
                  id="game-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Classic Solitaire"
                  className="w-full rounded-lg border border-white/12 bg-[#0B0F14] px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="game-category" className="block text-xs font-medium text-slate-300 mb-1.5">
                    Category
                  </label>
                  <select
                    id="game-category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-lg border border-white/12 bg-[#0B0F14] px-3.5 py-2.5 text-sm text-slate-100 focus:border-amber-400 focus:outline-none"
                  >
                    <option value="Arcade">Arcade</option>
                    <option value="Puzzle">Puzzle</option>
                    <option value="Action">Action</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="game-controls" className="block text-xs font-medium text-slate-300 mb-1.5">
                    Controls
                  </label>
                  <input
                    id="game-controls"
                    type="text"
                    value={controls}
                    onChange={(e) => setControls(e.target.value)}
                    placeholder="Arrow Keys / Mouse"
                    className="w-full rounded-lg border border-white/12 bg-[#0B0F14] px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="game-iframe" className="block text-xs font-medium text-slate-300 mb-1.5">
                  Iframe HTML or Embed URL
                </label>
                <textarea
                  id="game-iframe"
                  rows={3}
                  value={iframeInput}
                  onChange={(e) => setIframeInput(e.target.value)}
                  placeholder='<iframe src="/games/snake.html" title="Snake"></iframe> or https://...'
                  className="w-full rounded-lg border border-white/12 bg-[#0B0F14] px-3.5 py-2.5 font-mono text-xs text-slate-100 placeholder:text-slate-500 focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="game-desc" className="block text-xs font-medium text-slate-300 mb-1.5">
                  Short Description
                </label>
                <input
                  id="game-desc"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Optional gameplay summary"
                  className="w-full rounded-lg border border-white/12 bg-[#0B0F14] px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-amber-400 focus:outline-none"
                />
              </div>

              {formError && (
                <p role="alert" className="text-xs font-medium text-rose-400">
                  {formError}
                </p>
              )}
              {formSuccess && (
                <p className="text-xs font-medium text-emerald-400">
                  {formSuccess}
                </p>
              )}

              <button
                type="submit"
                className="inline-flex w-full min-h-[42px] items-center justify-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-[#0B0F14] transition-colors duration-150 hover:bg-amber-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 cursor-pointer"
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
                Add to JSON Catalog
              </button>
            </form>

            {hasCustomGames && (
              <div className="mt-6 border-t border-white/8 pt-5">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-semibold text-slate-200">Custom Added Games</h2>
                  <button
                    type="button"
                    onClick={onResetCustomGames}
                    className="inline-flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-slate-200 cursor-pointer"
                  >
                    <RotateCcw className="h-3 w-3" aria-hidden="true" />
                    Reset Custom
                  </button>
                </div>
                <ul className="space-y-2">
                  {games
                    .filter((g) => g.isCustom)
                    .map((g) => (
                      <li
                        key={g.id}
                        className="flex items-center justify-between gap-3 rounded-lg border border-white/8 bg-[#0B0F14] px-3 py-2"
                      >
                        <div className="min-w-0">
                          <div className="text-sm font-medium text-slate-100 truncate">{g.title}</div>
                          <div className="font-mono text-[11px] text-slate-400 truncate">
                            {g.iframe.src}
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => onPlayGame(g)}
                            className="inline-flex h-8 items-center gap-1 rounded-md bg-white/8 px-2.5 text-xs font-medium text-slate-200 hover:bg-white/15 cursor-pointer"
                          >
                            <Play className="h-3 w-3" aria-hidden="true" />
                            Play
                          </button>
                          <button
                            type="button"
                            aria-label={`Remove ${g.title}`}
                            onClick={() => onRemoveCustomGame(g.id)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:bg-rose-500/15 hover:text-rose-300 cursor-pointer"
                          >
                            <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                          </button>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="flex h-full flex-col rounded-xl border border-white/10 bg-[#131922] p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <h2 className="font-display text-lg font-bold text-slate-50">
                  games.json
                </h2>
                <p className="text-xs text-slate-400 tabular-nums">
                  {games.length} iframe entries loaded
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex min-h-[38px] items-center gap-1.5 rounded-lg border border-white/12 bg-[#0B0F14] px-3.5 py-2 text-xs font-semibold text-slate-200 transition-colors hover:border-white/25 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                      Copy JSON
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="inline-flex min-h-[38px] items-center gap-1.5 rounded-lg bg-white/10 px-3.5 py-2 text-xs font-semibold text-slate-100 transition-colors hover:bg-white/18 cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5" aria-hidden="true" />
                  Download games.json
                </button>
              </div>
            </div>

            <pre className="flex-1 overflow-auto rounded-lg border border-white/8 bg-[#0B0F14] p-4 font-mono text-xs leading-relaxed text-slate-300 max-h-[540px]">
              <code>{catalogJson}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
