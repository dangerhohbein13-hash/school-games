import { useCallback, useEffect, useMemo, useState } from 'react';
import { Eye, Heart, Play, Search, Shuffle, X } from 'lucide-react';
import { GamePlayer } from './components/GamePlayer.jsx';
import { GameThumbnail } from './components/GameThumbnail.jsx';
import { JsonCatalogView } from './components/JsonCatalogView.jsx';

const FAVORITES_KEY = 'arcadedeck_favorites';
const CUSTOM_GAMES_KEY = 'arcadedeck_custom_games';
const DEFAULT_TITLE = 'ArcadeDeck — Unblocked Browser Games';

export default function App() {
  const [baseGames, setBaseGames] = useState([]);
  const [customGames, setCustomGames] = useState(() => {
    try {
      const raw = localStorage.getItem(CUSTOM_GAMES_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = localStorage.getItem(FAVORITES_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [activeTab, setActiveTab] = useState('browse');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);
  const [cloaked, setCloaked] = useState(false);

  const fetchCatalog = useCallback(async () => {
    setLoading(true);
    setLoadError('');
    try {
      const res = await fetch('/games.json');
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await res.json();
      if (!Array.isArray(data.games)) {
        throw new Error('Invalid games.json structure');
      }
      setBaseGames(data.games);
    } catch {
      setLoadError('Could not load games.json catalog. Check that /games.json exists.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCatalog();
  }, [fetchCatalog]);

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(CUSTOM_GAMES_KEY, JSON.stringify(customGames));
  }, [customGames]);

  useEffect(() => {
    if (cloaked) {
      document.title = 'Linear Algebra — Matrix Transformations Notes';
    } else if (selectedGame) {
      document.title = `${selectedGame.title} — ArcadeDeck`;
    } else {
      document.title = DEFAULT_TITLE;
    }
  }, [cloaked, selectedGame]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.shiftKey && e.key.toLowerCase() === 'h') {
        e.preventDefault();
        setCloaked((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const allGames = useMemo(
    () => [...baseGames, ...customGames],
    [baseGames, customGames],
  );

  const filteredGames = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return allGames.filter((game) => {
      if (activeTab === 'favorites' && !favorites.includes(game.id)) {
        return false;
      }
      if (activeTab === 'browse' && categoryFilter !== 'All' && game.category !== categoryFilter) {
        return false;
      }
      if (!q) return true;
      return (
        game.title.toLowerCase().includes(q) ||
        game.category.toLowerCase().includes(q) ||
        game.description.toLowerCase().includes(q) ||
        game.controls.toLowerCase().includes(q)
      );
    });
  }, [allGames, activeTab, favorites, categoryFilter, searchQuery]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handlePlayRandom = () => {
    if (allGames.length === 0) return;
    const pool =
      selectedGame && allGames.length > 1
        ? allGames.filter((g) => g.id !== selectedGame.id)
        : allGames;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    setSelectedGame(pick);
    setActiveTab('browse');
  };

  const handleAddCustomGame = (game) => {
    setCustomGames((prev) => [...prev, game]);
  };

  const handleRemoveCustomGame = (id) => {
    setCustomGames((prev) => prev.filter((g) => g.id !== id));
    if (selectedGame?.id === id) {
      setSelectedGame(null);
    }
  };

  const handleResetCustomGames = () => {
    setCustomGames([]);
    if (selectedGame?.isCustom) {
      setSelectedGame(null);
    }
  };

  if (cloaked) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] text-slate-900">
        <header className="border-b border-slate-200 bg-white px-6 py-4">
          <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
            <h1 className="font-sans text-lg font-semibold text-slate-900">
              MATH 240 — Matrix Transformations &amp; Eigenvalues
            </h1>
            <button
              type="button"
              onClick={() => setCloaked(false)}
              className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
            >
              <Eye className="h-3.5 w-3.5" aria-hidden="true" />
              Return to ArcadeDeck
            </button>
          </div>
        </header>
        <main className="mx-auto max-w-4xl px-6 py-10 space-y-6 text-sm leading-relaxed text-slate-700">
          <section className="rounded-lg border border-slate-200 bg-white p-6 space-y-3">
            <h2 className="text-base font-semibold text-slate-900">1. Characteristic Polynomial</h2>
            <p>
              For an n × n matrix A, a scalar λ is an eigenvalue if there exists a non-zero vector v such that Av = λv. Equivalently, (A − λI)v = 0 has a non-trivial solution if and only if det(A − λI) = 0.
            </p>
          </section>
          <section className="rounded-lg border border-slate-200 bg-white p-6 space-y-3">
            <h2 className="text-base font-semibold text-slate-900">2. Diagonalization Criterion</h2>
            <p>
              A square matrix A is diagonalizable if and only if it has n linearly independent eigenvectors. In particular, if A has n distinct real eigenvalues, then A = PDP⁻¹ where D is diagonal.
            </p>
          </section>
          <p className="text-xs text-slate-500">
            Press Shift + H anytime to toggle study view.
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#0B0F14] text-[#F1F5F9]">
      <header className="sticky top-0 z-30 border-b border-white/8 bg-[#0B0F14]/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-8 px-4 py-3.5 sm:px-6">
          <button
            type="button"
            onClick={() => {
              setSelectedGame(null);
              setActiveTab('browse');
            }}
            className="font-display text-xl font-bold tracking-tight text-slate-50 hover:text-amber-400 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
          >
            ArcadeDeck
          </button>

          <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-7 text-sm font-medium">
            <button
              type="button"
              onClick={() => {
                setSelectedGame(null);
                setActiveTab('browse');
              }}
              className={`py-1 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer border-b-2 ${
                !selectedGame && activeTab === 'browse'
                  ? 'border-amber-400 text-slate-50'
                  : 'border-transparent text-slate-400 hover:text-slate-100'
              }`}
            >
              Browse
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedGame(null);
                setActiveTab('favorites');
              }}
              className={`py-1 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer border-b-2 ${
                !selectedGame && activeTab === 'favorites'
                  ? 'border-amber-400 text-slate-50'
                  : 'border-transparent text-slate-400 hover:text-slate-100'
              }`}
            >
              Favorites
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedGame(null);
                setActiveTab('catalog');
              }}
              className={`py-1 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer border-b-2 ${
                !selectedGame && activeTab === 'catalog'
                  ? 'border-amber-400 text-slate-50'
                  : 'border-transparent text-slate-400 hover:text-slate-100'
              }`}
            >
              JSON Catalog
            </button>
            <button
              type="button"
              onClick={() => setCloaked(true)}
              className="py-1 text-slate-400 hover:text-slate-100 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer border-b-2 border-transparent"
            >
              Hide Screen
            </button>
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handlePlayRandom}
              disabled={allGames.length === 0}
              className="inline-flex min-h-[40px] items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-xs font-semibold text-[#0B0F14] transition-colors duration-150 hover:bg-amber-400 disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Shuffle className="h-3.5 w-3.5" aria-hidden="true" />
              Random Game
            </button>
          </div>
        </div>

        <nav
          aria-label="Mobile navigation"
          className="flex md:hidden items-center gap-4 overflow-x-auto border-t border-white/6 px-4 py-2 text-xs font-medium"
        >
          <button
            type="button"
            onClick={() => {
              setSelectedGame(null);
              setActiveTab('browse');
            }}
            className={`whitespace-nowrap shrink-0 py-1 ${
              !selectedGame && activeTab === 'browse' ? 'text-amber-400' : 'text-slate-400'
            }`}
          >
            Browse
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedGame(null);
              setActiveTab('favorites');
            }}
            className={`whitespace-nowrap shrink-0 py-1 ${
              !selectedGame && activeTab === 'favorites' ? 'text-amber-400' : 'text-slate-400'
            }`}
          >
            Favorites
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedGame(null);
              setActiveTab('catalog');
            }}
            className={`whitespace-nowrap shrink-0 py-1 ${
              !selectedGame && activeTab === 'catalog' ? 'text-amber-400' : 'text-slate-400'
            }`}
          >
            JSON Catalog
          </button>
          <button
            type="button"
            onClick={() => setCloaked(true)}
            className="whitespace-nowrap shrink-0 py-1 text-slate-400"
          >
            Hide Screen
          </button>
        </nav>
      </header>

      <main className="flex-1">
        {selectedGame ? (
          <GamePlayer
            game={selectedGame}
            allGames={allGames}
            isFavorite={favorites.includes(selectedGame.id)}
            onToggleFavorite={toggleFavorite}
            onBack={() => setSelectedGame(null)}
            onSelectGame={(game) => setSelectedGame(game)}
            onCloak={() => setCloaked(true)}
          />
        ) : activeTab === 'catalog' ? (
          <JsonCatalogView
            games={allGames}
            onPlayGame={(game) => setSelectedGame(game)}
            onAddCustomGame={handleAddCustomGame}
            onRemoveCustomGame={handleRemoveCustomGame}
            onResetCustomGames={handleResetCustomGames}
          />
        ) : (
          <section className="mx-auto w-full max-w-[1280px] px-4 py-8 sm:px-6 sm:py-10">
            <div className="mb-8 flex flex-col justify-between gap-6 border-b border-white/8 pb-8 lg:flex-row lg:items-end">
              <div className="max-w-2xl">
                <h1 className="font-display text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl [text-wrap:balance]">
                  {activeTab === 'favorites'
                    ? 'Saved Games'
                    : 'Instant Browser Arcade'}
                </h1>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-400 sm:text-base">
                  {activeTab === 'favorites'
                    ? 'Quick access to the games you bookmarked for break-time sessions.'
                    : 'Self-hosted HTML, CSS, and JavaScript games loaded as iframes directly from games.json—zero third-party blockers.'}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative w-full sm:w-64">
                  <Search
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
                    aria-hidden="true"
                  />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search games or controls..."
                    aria-label="Search games"
                    className="w-full min-h-[40px] rounded-lg border border-white/10 bg-[#131922] py-2 pl-9 pr-8 text-sm text-slate-100 placeholder:text-slate-500 focus:border-amber-400 focus:outline-none"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      aria-label="Clear search"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer"
                    >
                      <X className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  )}
                </div>

                {activeTab === 'browse' && (
                  <div
                    role="group"
                    aria-label="Filter by category"
                    className="flex items-center gap-1 rounded-lg border border-white/8 bg-[#131922] p-1"
                  >
                    {['All', 'Arcade', 'Puzzle', 'Action'].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setCategoryFilter(cat)}
                        className={`min-h-[32px] rounded-md px-3 py-1.5 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                          categoryFilter === cat
                            ? 'bg-amber-500 text-[#0B0F14] font-semibold'
                            : 'text-slate-400 hover:text-slate-100'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 8 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="overflow-hidden rounded-xl border border-white/8 bg-[#131922]"
                  >
                    <div className="aspect-[4/3] w-full animate-pulse bg-[#1A222D]" />
                    <div className="p-4 space-y-2.5">
                      <div className="h-4 w-2/3 animate-pulse rounded bg-[#1E2734]" />
                      <div className="h-3 w-1/2 animate-pulse rounded bg-[#1A222D]" />
                    </div>
                  </div>
                ))}
              </div>
            ) : loadError ? (
              <div className="rounded-xl border border-white/10 bg-[#131922] p-8 text-center">
                <p className="text-sm text-rose-300">{loadError}</p>
                <button
                  type="button"
                  onClick={fetchCatalog}
                  className="mt-4 inline-flex min-h-[40px] items-center rounded-lg bg-amber-500 px-4 py-2 text-xs font-semibold text-[#0B0F14] hover:bg-amber-400 cursor-pointer"
                >
                  Retry Loading Catalog
                </button>
              </div>
            ) : filteredGames.length === 0 ? (
              <div className="rounded-xl border border-white/10 bg-[#131922] p-10 text-center">
                <h2 className="font-display text-lg font-semibold text-slate-100">
                  {activeTab === 'favorites'
                    ? 'No saved games yet'
                    : 'No matching games found'}
                </h2>
                <p className="mt-1.5 text-sm text-slate-400">
                  {activeTab === 'favorites'
                    ? 'Click the heart icon on any game card to bookmark it here.'
                    : 'Try clearing your search or switching category filters.'}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('browse');
                    setCategoryFilter('All');
                    setSearchQuery('');
                  }}
                  className="mt-4 inline-flex min-h-[40px] items-center rounded-lg border border-white/12 bg-[#1A222E] px-4 py-2 text-xs font-semibold text-slate-100 hover:bg-[#232D3C] cursor-pointer"
                >
                  Show All Games
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {filteredGames.map((game) => {
                  const isFav = favorites.includes(game.id);
                  return (
                    <article
                      key={game.id}
                      className="group flex flex-col overflow-hidden rounded-xl border border-white/8 bg-[#131922] transition-colors duration-150 hover:border-amber-500/40"
                    >
                      <button
                        type="button"
                        onClick={() => setSelectedGame(game)}
                        className="relative aspect-[4/3] w-full overflow-hidden bg-[#0D1117] text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-amber-400"
                      >
                        <GameThumbnail
                          src={game.thumbnail}
                          alt={`${game.title} cover art`}
                          title={game.title}
                          className="transition-transform duration-200 group-hover:scale-[1.03]"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                        <span className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-semibold text-[#0B0F14] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                          <Play className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                          Play
                        </span>
                      </button>

                      <div className="flex flex-1 flex-col p-4">
                        <div className="flex items-start justify-between gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedGame(game)}
                            className="font-display text-base font-semibold text-slate-50 text-left hover:text-amber-400 transition-colors duration-150 truncate cursor-pointer"
                          >
                            {game.title}
                          </button>

                          <button
                            type="button"
                            onClick={() => toggleFavorite(game.id)}
                            aria-label={isFav ? `Remove ${game.title} from favorites` : `Save ${game.title} to favorites`}
                            aria-pressed={isFav}
                            className="-mr-2 -mt-2 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/6 hover:text-amber-400 cursor-pointer"
                          >
                            <Heart
                              className={`h-4 w-4 ${isFav ? 'fill-amber-400 text-amber-400' : ''}`}
                              aria-hidden="true"
                            />
                          </button>
                        </div>

                        <p className="mt-0.5 text-xs text-slate-400 truncate">
                          {game.category}
                          <span className="mx-1.5" aria-hidden="true">·</span>
                          {game.controls}
                        </p>

                        <p className="mt-2.5 text-xs leading-relaxed text-slate-300/90 line-clamp-2">
                          {game.description}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        )}
      </main>

      <footer className="border-t border-white/8 bg-[#0B0F14] py-6">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-3 px-4 text-xs text-slate-500 sm:flex-row sm:px-6">
          <p className="tabular-nums">
            ArcadeDeck · {allGames.length} playable iframe games loaded from games.json
          </p>
          <div className="flex items-center gap-5">
            <a
              href="/games.json"
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-300 transition-colors"
            >
              View raw games.json
            </a>
            <button
              type="button"
              onClick={() => {
                setSelectedGame(null);
                setActiveTab('catalog');
              }}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Add Custom Iframe
            </button>
            <span>Shift + H to hide screen</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
