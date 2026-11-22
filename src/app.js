const FAVORITES_KEY = 'arcadedeck_favorites';
const CUSTOM_GAMES_KEY = 'arcadedeck_custom_games';
const DEFAULT_TITLE = 'ArcadeDeck — Unblocked Browser Games';

const ICONS = {
  shuffle: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22"/><path d="m18 2 4 4-4 4"/><path d="M2 6h1.9c1.5 0 2.9.9 3.6 2.2"/><path d="M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8"/><path d="m18 14 4 4-4 4"/></svg>',
  search: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
  close: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
  play: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="6 3 20 12 6 21 6 3"/></svg>',
  heart: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>',
  heartFill: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>',
  arrowLeft: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>',
  reload: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>',
  monitor: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>',
  eyeOff: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/></svg>',
  eye: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>',
  maximize: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" x2="14" y1="3" y2="10"/><line x1="3" x2="10" y1="21" y2="14"/></svg>',
  gamepad: '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="6" x2="10" y1="11" y2="11"/><line x1="8" x2="8" y1="9" y2="13"/><line x1="15" x2="15.01" y1="12" y2="12"/><line x1="18" x2="18.01" y1="10" y2="10"/><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"/></svg>',
  plus: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg>',
  copy: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>',
  download: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>',
  trash: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>'
};

const state = {
  baseGames: [],
  customGames: loadStorage(CUSTOM_GAMES_KEY, []),
  favorites: loadStorage(FAVORITES_KEY, []),
  loading: true,
  loadError: '',
  activeTab: 'browse',
  categoryFilter: 'All',
  searchQuery: '',
  selectedGame: null,
  theaterMode: false,
  reloadNonce: 0,
  cloaked: false,
  copiedJson: false,
  formError: '',
  formSuccess: '',
};

function loadStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore storage errors
  }
}

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function isSafeIframeSrc(rawUrl) {
  const trimmed = String(rawUrl || '').trim();
  if (!trimmed) return false;
  if (trimmed.startsWith('./') || (trimmed.startsWith('/') && !trimmed.startsWith('//'))) {
    return true;
  }
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

function buildIframeHtml(src, title, allow, sandbox) {
  const allowAttr = allow ? ` allow="${escapeHtml(allow)}"` : '';
  const sandboxAttr = sandbox ? ` sandbox="${escapeHtml(sandbox)}"` : '';
  return `<iframe src="${escapeHtml(src)}" title="${escapeHtml(title)}"${allowAttr}${sandboxAttr} loading="lazy"></iframe>`;
}

function parseIframeInput(input, fallbackTitle) {
  const trimmed = String(input || '').trim();
  if (!trimmed) return null;

  if (trimmed.toLowerCase().includes('<iframe')) {
    const srcMatch = trimmed.match(/\bsrc\s*=\s*["']([^"']+)["']/i);
    if (!srcMatch || !isSafeIframeSrc(srcMatch[1])) return null;

    const titleMatch = trimmed.match(/\btitle\s*=\s*["']([^"']+)["']/i);
    const allowMatch = trimmed.match(/\ballow\s*=\s*["']([^"']+)["']/i);
    const sandboxMatch = trimmed.match(/\bsandbox\s*=\s*["']([^"']+)["']/i);

    const src = srcMatch[1].trim();
    const title = (titleMatch?.[1] || fallbackTitle || 'Embedded Game').trim();
    const allow = allowMatch?.[1]?.trim() || 'fullscreen; autoplay';
    const sandbox = sandboxMatch?.[1]?.trim() || 'allow-scripts allow-same-origin';

    return {
      src,
      title,
      allow,
      sandbox,
      aspectRatio: '16/10',
      html: buildIframeHtml(src, title, allow, sandbox),
    };
  }

  if (!isSafeIframeSrc(trimmed)) return null;
  const title = String(fallbackTitle || '').trim() || 'Embedded Game';
  const allow = 'fullscreen; autoplay';
  const sandbox = 'allow-scripts allow-same-origin';

  return {
    src: trimmed,
    title,
    allow,
    sandbox,
    aspectRatio: '16/10',
    html: buildIframeHtml(trimmed, title, allow, sandbox),
  };
}

function getAllGames() {
  return [...state.baseGames, ...state.customGames];
}

function getFilteredGames() {
  const q = state.searchQuery.trim().toLowerCase();
  return getAllGames().filter((game) => {
    if (state.activeTab === 'favorites' && !state.favorites.includes(game.id)) {
      return false;
    }
    if (state.activeTab === 'browse' && state.categoryFilter !== 'All' && game.category !== state.categoryFilter) {
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
}

function syncDocumentTitle() {
  if (state.cloaked) {
    document.title = 'Linear Algebra — Matrix Transformations Notes';
  } else if (state.selectedGame) {
    document.title = `${state.selectedGame.title} — ArcadeDeck`;
  } else {
    document.title = DEFAULT_TITLE;
  }
}

async function fetchCatalog() {
  state.loading = true;
  state.loadError = '';
  render();
  try {
    const res = await fetch('./games.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!Array.isArray(data.games)) throw new Error('Invalid games.json structure');
    state.baseGames = data.games;
  } catch {
    state.loadError = 'Could not load games.json catalog. Make sure games.json is served alongside index.html.';
  } finally {
    state.loading = false;
    render();
  }
}

function toggleFavorite(id) {
  if (state.favorites.includes(id)) {
    state.favorites = state.favorites.filter((item) => item !== id);
  } else {
    state.favorites = [...state.favorites, id];
  }
  saveStorage(FAVORITES_KEY, state.favorites);
  render();
}

function playRandomGame() {
  const all = getAllGames();
  if (all.length === 0) return;
  const pool = state.selectedGame && all.length > 1
    ? all.filter((g) => g.id !== state.selectedGame.id)
    : all;
  state.selectedGame = pool[Math.floor(Math.random() * pool.length)];
  state.reloadNonce = 0;
  state.activeTab = 'browse';
  render();
}

function renderCloakView() {
  return `
    <div class="cloak-page">
      <header class="cloak-header">
        <div class="cloak-header-inner">
          <h1>MATH 240 — Matrix Transformations &amp; Eigenvalues</h1>
          <button type="button" class="cloak-return-btn" data-action="uncloak">
            ${ICONS.eye}
            Return to ArcadeDeck
          </button>
        </div>
      </header>
      <main class="cloak-main">
        <section class="cloak-card">
          <h2>1. Characteristic Polynomial</h2>
          <p>For an n × n matrix A, a scalar λ is an eigenvalue if there exists a non-zero vector v such that Av = λv. Equivalently, (A − λI)v = 0 has a non-trivial solution if and only if det(A − λI) = 0.</p>
        </section>
        <section class="cloak-card">
          <h2>2. Diagonalization Criterion</h2>
          <p>A square matrix A is diagonalizable if and only if it has n linearly independent eigenvectors. In particular, if A has n distinct real eigenvalues, then A = PDP⁻¹ where D is diagonal.</p>
        </section>
        <p style="font-size: 12px; color: #64748b;">Press Shift + H anytime to toggle study view.</p>
      </main>
    </div>
  `;
}

function renderHeader() {
  const isBrowse = !state.selectedGame && state.activeTab === 'browse';
  const isFavs = !state.selectedGame && state.activeTab === 'favorites';
  const isCat = !state.selectedGame && state.activeTab === 'catalog';
  const disabledAttr = getAllGames().length === 0 ? 'disabled' : '';

  return `
    <header class="topbar">
      <div class="topbar-inner">
        <button type="button" class="brand-btn" data-action="go-home">ArcadeDeck</button>

        <nav class="nav-links" aria-label="Primary navigation">
          <button type="button" class="nav-btn ${isBrowse ? 'is-active' : ''}" data-tab="browse">Browse</button>
          <button type="button" class="nav-btn ${isFavs ? 'is-active' : ''}" data-tab="favorites">Favorites</button>
          <button type="button" class="nav-btn ${isCat ? 'is-active' : ''}" data-tab="catalog">JSON Catalog</button>
          <button type="button" class="nav-btn" data-action="cloak">Hide Screen</button>
        </nav>

        <button type="button" class="btn-primary" data-action="random" ${disabledAttr}>
          ${ICONS.shuffle}
          Random Game
        </button>
      </div>

      <nav class="mobile-nav" aria-label="Mobile navigation">
        <button type="button" class="nav-btn ${isBrowse ? 'is-active' : ''}" data-tab="browse">Browse</button>
        <button type="button" class="nav-btn ${isFavs ? 'is-active' : ''}" data-tab="favorites">Favorites</button>
        <button type="button" class="nav-btn ${isCat ? 'is-active' : ''}" data-tab="catalog">JSON Catalog</button>
        <button type="button" class="nav-btn" data-action="cloak">Hide Screen</button>
      </nav>
    </header>
  `;
}

function renderPlayer(game) {
  const isFav = state.favorites.includes(game.id);
  const safeSrc = isSafeIframeSrc(game.iframe?.src) ? game.iframe.src : '';
  const upNext = getAllGames().filter((g) => g.id !== game.id).slice(0, 4);

  return `
    <section class="player-section">
      <div class="player-container ${state.theaterMode ? 'is-wide' : ''}">
        <div class="player-bar">
          <div class="player-left">
            <button type="button" class="btn-secondary" data-action="back">
              ${ICONS.arrowLeft}
              Back to Library
            </button>
            <div style="min-width: 0;">
              <h1 class="player-title">${escapeHtml(game.title)}</h1>
              <p class="player-meta">${escapeHtml(game.category)} · ${escapeHtml(game.controls)}</p>
            </div>
          </div>

          <div class="player-actions">
            <button type="button" class="btn-secondary ${isFav ? 'is-saved' : ''}" data-fav="${escapeHtml(game.id)}" aria-pressed="${isFav}">
              ${isFav ? ICONS.heartFill : ICONS.heart}
              ${isFav ? 'Saved' : 'Save'}
            </button>
            <button type="button" class="btn-secondary" data-action="reload-iframe">
              ${ICONS.reload}
              Reload
            </button>
            <button type="button" class="btn-secondary" data-action="toggle-wide">
              ${ICONS.monitor}
              ${state.theaterMode ? 'Standard Width' : 'Wide View'}
            </button>
            <button type="button" class="btn-secondary" data-action="cloak" title="Quickly hide screen (Shift + H)">
              ${ICONS.eyeOff}
              Hide Screen
            </button>
            <button type="button" class="btn-primary" data-action="fullscreen">
              ${ICONS.maximize}
              Fullscreen
            </button>
          </div>
        </div>

        <div class="iframe-frame-wrap">
          ${
            safeSrc
              ? `<iframe id="game-iframe" class="game-iframe" src="${escapeHtml(safeSrc)}" title="${escapeHtml(game.iframe.title || game.title)}" allow="${escapeHtml(game.iframe.allow || 'fullscreen; autoplay')}" sandbox="${escapeHtml(game.iframe.sandbox || 'allow-scripts allow-same-origin')}" data-nonce="${state.reloadNonce}"></iframe>`
              : `<div class="state-card"><p>Invalid iframe source URL configured for this game.</p></div>`
          }
        </div>

        <div class="player-info-bar">
          <p class="player-desc">${escapeHtml(game.description)}</p>
          <div class="player-source">Source: <span>${escapeHtml(game.iframe.src)}</span></div>
        </div>

        ${
          upNext.length > 0
            ? `
            <h2 class="up-next-title">Up Next</h2>
            <div class="up-next-grid">
              ${upNext
                .map(
                  (item) => `
                  <button type="button" class="up-next-card" data-play="${escapeHtml(item.id)}">
                    <div class="up-next-name">${escapeHtml(item.title)}</div>
                    <div class="up-next-meta">${escapeHtml(item.category)} · ${escapeHtml(item.controls)}</div>
                  </button>
                `,
                )
                .join('')}
            </div>
          `
            : ''
        }
      </div>
    </section>
  `;
}

function renderCatalogView() {
  const all = getAllGames();
  const catalogJson = JSON.stringify(
    {
      version: '1.0',
      games: all.map(({ isCustom: _ignored, ...rest }) => rest),
    },
    null,
    2,
  );
  const customList = all.filter((g) => g.isCustom);

  return `
    <section class="container">
      <div class="catalog-layout">
        <div class="panel">
          <h1 class="panel-title">Add Game Iframe</h1>
          <p class="panel-sub">
            Paste a full <code>&lt;iframe&gt;</code> tag or a direct URL to append an entry to <code>games.json</code>.
          </p>

          <form id="add-game-form" class="form-stack">
            <div>
              <label for="game-title" class="field-label">Game Title</label>
              <input id="game-title" name="title" type="text" class="field-input" placeholder="e.g. Classic Solitaire" />
            </div>

            <div class="form-row-2">
              <div>
                <label for="game-category" class="field-label">Category</label>
                <select id="game-category" name="category" class="field-select">
                  <option value="Arcade">Arcade</option>
                  <option value="Puzzle">Puzzle</option>
                  <option value="Action">Action</option>
                </select>
              </div>
              <div>
                <label for="game-controls" class="field-label">Controls</label>
                <input id="game-controls" name="controls" type="text" class="field-input" value="Keyboard / Mouse" />
              </div>
            </div>

            <div>
              <label for="game-iframe-input" class="field-label">Iframe HTML or Embed URL</label>
              <textarea id="game-iframe-input" name="iframeInput" rows="3" class="field-textarea" placeholder='<iframe src="./games/snake.html" title="Snake"></iframe> or https://...'></textarea>
            </div>

            <div>
              <label for="game-desc" class="field-label">Short Description</label>
              <input id="game-desc" name="description" type="text" class="field-input" placeholder="Optional gameplay summary" />
            </div>

            ${state.formError ? `<p class="msg-error" role="alert">${escapeHtml(state.formError)}</p>` : ''}
            ${state.formSuccess ? `<p class="msg-success">${escapeHtml(state.formSuccess)}</p>` : ''}

            <button type="submit" class="btn-primary" style="width: 100%; min-height: 42px; font-size: 13.5px;">
              ${ICONS.plus}
              Add to JSON Catalog
            </button>
          </form>

          ${
            customList.length > 0
              ? `
              <div class="custom-list">
                <div class="custom-list-head">
                  <h2 style="font-size: 14px; font-weight: 600;">Custom Added Games</h2>
                  <button type="button" class="footer-link-btn" data-action="reset-custom">Reset Custom</button>
                </div>
                ${customList
                  .map(
                    (g) => `
                    <div class="custom-item">
                      <div class="custom-item-meta">
                        <div class="custom-item-title">${escapeHtml(g.title)}</div>
                        <div class="custom-item-src">${escapeHtml(g.iframe.src)}</div>
                      </div>
                      <div class="custom-item-actions">
                        <button type="button" class="btn-mini" data-play="${escapeHtml(g.id)}">Play</button>
                        <button type="button" class="btn-mini btn-mini-danger" data-remove-custom="${escapeHtml(g.id)}" aria-label="Remove ${escapeHtml(g.title)}">
                          ${ICONS.trash}
                        </button>
                      </div>
                    </div>
                  `,
                  )
                  .join('')}
              </div>
            `
              : ''
          }
        </div>

        <div class="panel">
          <div class="json-head">
            <div>
              <h2 class="panel-title" style="font-size: 18px;">games.json</h2>
              <p class="panel-sub tabular-nums" style="margin-top: 2px;">${all.length} iframe entries loaded</p>
            </div>
            <div class="json-actions">
              <button type="button" class="btn-secondary" data-action="copy-json">
                ${ICONS.copy}
                ${state.copiedJson ? 'Copied' : 'Copy JSON'}
              </button>
              <button type="button" class="btn-secondary" data-action="download-json">
                ${ICONS.download}
                Download games.json
              </button>
            </div>
          </div>

          <pre class="json-pre"><code>${escapeHtml(catalogJson)}</code></pre>
        </div>
      </div>
    </section>
  `;
}

function renderLibraryView() {
  const filtered = getFilteredGames();
  const isFavTab = state.activeTab === 'favorites';

  let bodyHtml = '';
  if (state.loading) {
    bodyHtml = `<div class="state-card"><h2>Loading games catalog...</h2></div>`;
  } else if (state.loadError) {
    bodyHtml = `
      <div class="state-card">
        <h2>Catalog Unavailable</h2>
        <p>${escapeHtml(state.loadError)}</p>
        <button type="button" class="btn-primary" data-action="retry-load">Retry Loading Catalog</button>
      </div>
    `;
  } else if (filtered.length === 0) {
    bodyHtml = `
      <div class="state-card">
        <h2>${isFavTab ? 'No saved games yet' : 'No matching games found'}</h2>
        <p>${isFavTab ? 'Click the heart icon on any game card to bookmark it here.' : 'Try clearing your search or switching category filters.'}</p>
        <button type="button" class="btn-secondary" data-action="reset-filters">Show All Games</button>
      </div>
    `;
  } else {
    bodyHtml = `
      <div class="games-grid">
        ${filtered
          .map((game) => {
            const isFav = state.favorites.includes(game.id);
            const hasThumb = Boolean(game.thumbnail);
            return `
              <article class="game-card">
                <button type="button" class="thumb-btn" data-play="${escapeHtml(game.id)}" aria-label="Play ${escapeHtml(game.title)}">
                  ${
                    hasThumb
                      ? `<img class="thumb-img" src="${escapeHtml(game.thumbnail)}" alt="${escapeHtml(game.title)} cover art" referrerpolicy="no-referrer" data-fallback-title="${escapeHtml(game.title)}" />`
                      : `<div class="thumb-fallback">${ICONS.gamepad}<span class="thumb-fallback-title">${escapeHtml(game.title)}</span></div>`
                  }
                  <div class="thumb-scrim"></div>
                  <span class="play-pill">${ICONS.play} Play</span>
                </button>

                <div class="card-body">
                  <div class="card-head">
                    <button type="button" class="card-title-btn" data-play="${escapeHtml(game.id)}">
                      ${escapeHtml(game.title)}
                    </button>
                    <button type="button" class="fav-btn ${isFav ? 'is-fav' : ''}" data-fav="${escapeHtml(game.id)}" aria-label="${isFav ? 'Remove from favorites' : 'Save to favorites'}" aria-pressed="${isFav}">
                      ${isFav ? ICONS.heartFill : ICONS.heart}
                    </button>
                  </div>
                  <p class="card-meta">${escapeHtml(game.category)} · ${escapeHtml(game.controls)}</p>
                  <p class="card-desc">${escapeHtml(game.description)}</p>
                </div>
              </article>
            `;
          })
          .join('')}
      </div>
    `;
  }

  return `
    <section class="container">
      <div class="library-header">
        <div class="hero-copy">
          <h1 class="hero-title">${isFavTab ? 'Saved Games' : 'Instant Browser Arcade'}</h1>
          <p class="hero-subtitle">
            ${
              isFavTab
                ? 'Quick access to the games you bookmarked for break-time sessions.'
                : 'Self-hosted HTML, CSS, and JavaScript games loaded as iframes directly from games.json—zero third-party blockers.'
            }
          </p>
        </div>

        <div class="toolbar">
          <div class="search-box">
            <span class="search-icon">${ICONS.search}</span>
            <input id="search-input" class="search-input" type="search" value="${escapeHtml(state.searchQuery)}" placeholder="Search games or controls..." aria-label="Search games" />
            ${
              state.searchQuery
                ? `<button type="button" class="clear-btn" data-action="clear-search" aria-label="Clear search">${ICONS.close}</button>`
                : ''
            }
          </div>

          ${
            !isFavTab
              ? `
              <div class="filter-group" role="group" aria-label="Filter by category">
                ${['All', 'Arcade', 'Puzzle', 'Action']
                  .map(
                    (cat) => `
                    <button type="button" class="filter-btn ${state.categoryFilter === cat ? 'is-active' : ''}" data-cat="${cat}">
                      ${cat}
                    </button>
                  `,
                  )
                  .join('')}
              </div>
            `
              : ''
          }
        </div>
      </div>

      ${bodyHtml}
    </section>
  `;
}

function renderFooter() {
  return `
    <footer class="footer">
      <div class="footer-inner">
        <p class="tabular-nums">ArcadeDeck · ${getAllGames().length} playable iframe games loaded from games.json</p>
        <div class="footer-links">
          <a href="./games.json" target="_blank" rel="noreferrer">View raw games.json</a>
          <button type="button" class="footer-link-btn" data-tab="catalog">Add Custom Iframe</button>
          <span>Shift + H to hide screen</span>
        </div>
      </div>
    </footer>
  `;
}

function render() {
  syncDocumentTitle();
  const root = document.getElementById('app');
  if (!root) return;

  if (state.cloaked) {
    root.innerHTML = renderCloakView();
    return;
  }

  let mainContent = '';
  if (state.selectedGame) {
    mainContent = renderPlayer(state.selectedGame);
  } else if (state.activeTab === 'catalog') {
    mainContent = renderCatalogView();
  } else {
    mainContent = renderLibraryView();
  }

  root.innerHTML = `
    <div class="app-shell">
      ${renderHeader()}
      <main class="main-content">${mainContent}</main>
      ${renderFooter()}
    </div>
  `;

  root.querySelectorAll('img[data-fallback-title]').forEach((img) => {
    img.addEventListener('error', () => {
      const title = img.getAttribute('data-fallback-title') || 'Game';
      const fallback = document.createElement('div');
      fallback.className = 'thumb-fallback';
      fallback.innerHTML = `${ICONS.gamepad}<span class="thumb-fallback-title">${escapeHtml(title)}</span>`;
      img.replaceWith(fallback);
    });
  });

  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const pos = e.target.selectionStart;
      state.searchQuery = e.target.value;
      render();
      const restored = document.getElementById('search-input');
      if (restored) {
        restored.focus();
        if (typeof pos === 'number') {
          restored.setSelectionRange(pos, pos);
        }
      }
    });
  }

  const addForm = document.getElementById('add-game-form');
  if (addForm) {
    addForm.addEventListener('submit', (e) => {
      e.preventDefault();
      state.formError = '';
      state.formSuccess = '';

      const fd = new FormData(addForm);
      const cleanTitle = String(fd.get('title') || '').trim();
      const category = String(fd.get('category') || 'Arcade');
      const controls = String(fd.get('controls') || '').trim() || 'Keyboard / Mouse';
      const description = String(fd.get('description') || '').trim();
      const iframeInput = String(fd.get('iframeInput') || '');

      if (!cleanTitle) {
        state.formError = 'Enter a game title.';
        render();
        return;
      }

      const parsedIframe = parseIframeInput(iframeInput, cleanTitle);
      if (!parsedIframe) {
        state.formError = 'Provide a valid http(s) URL, relative ./games/... path, or <iframe src="..."> tag.';
        render();
        return;
      }

      const slugBase = cleanTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      const id = `${slugBase || 'custom-game'}-${Date.now().toString().slice(-4)}`;

      const newGame = {
        id,
        title: cleanTitle,
        category,
        description: description || `Embedded browser game loaded from ${parsedIframe.src}.`,
        controls,
        thumbnail: '',
        iframe: parsedIframe,
        isCustom: true,
      };

      state.customGames = [...state.customGames, newGame];
      saveStorage(CUSTOM_GAMES_KEY, state.customGames);
      state.formSuccess = `Added "${newGame.title}" to the active JSON catalog.`;
      render();
    });
  }
}

document.addEventListener('click', async (e) => {
  const target = e.target.closest('button');
  if (!target) return;

  const tab = target.getAttribute('data-tab');
  if (tab) {
    state.selectedGame = null;
    state.activeTab = tab;
    render();
    return;
  }

  const cat = target.getAttribute('data-cat');
  if (cat) {
    state.categoryFilter = cat;
    render();
    return;
  }

  const playId = target.getAttribute('data-play');
  if (playId) {
    const found = getAllGames().find((g) => g.id === playId);
    if (found) {
      state.selectedGame = found;
      state.reloadNonce = 0;
      render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    return;
  }

  const favId = target.getAttribute('data-fav');
  if (favId) {
    toggleFavorite(favId);
    return;
  }

  const removeCustomId = target.getAttribute('data-remove-custom');
  if (removeCustomId) {
    state.customGames = state.customGames.filter((g) => g.id !== removeCustomId);
    saveStorage(CUSTOM_GAMES_KEY, state.customGames);
    if (state.selectedGame?.id === removeCustomId) {
      state.selectedGame = null;
    }
    render();
    return;
  }

  const action = target.getAttribute('data-action');
  if (!action) return;

  if (action === 'go-home' || action === 'back') {
    state.selectedGame = null;
    state.activeTab = 'browse';
    render();
  } else if (action === 'random') {
    playRandomGame();
  } else if (action === 'cloak') {
    state.cloaked = true;
    render();
  } else if (action === 'uncloak') {
    state.cloaked = false;
    render();
  } else if (action === 'clear-search') {
    state.searchQuery = '';
    render();
  } else if (action === 'reset-filters') {
    state.activeTab = 'browse';
    state.categoryFilter = 'All';
    state.searchQuery = '';
    render();
  } else if (action === 'retry-load') {
    fetchCatalog();
  } else if (action === 'toggle-wide') {
    state.theaterMode = !state.theaterMode;
    render();
  } else if (action === 'reload-iframe') {
    const iframe = document.getElementById('game-iframe');
    if (iframe && state.selectedGame) {
      state.reloadNonce += 1;
      iframe.src = state.selectedGame.iframe.src;
    }
  } else if (action === 'fullscreen') {
    const iframe = document.getElementById('game-iframe');
    if (iframe && iframe.requestFullscreen) {
      iframe.requestFullscreen().catch(() => {});
    }
  } else if (action === 'reset-custom') {
    state.customGames = [];
    saveStorage(CUSTOM_GAMES_KEY, []);
    if (state.selectedGame?.isCustom) {
      state.selectedGame = null;
    }
    render();
  } else if (action === 'copy-json' || action === 'download-json') {
    const json = JSON.stringify(
      {
        version: '1.0',
        games: getAllGames().map(({ isCustom: _ignored, ...rest }) => rest),
      },
      null,
      2,
    );
    if (action === 'copy-json') {
      try {
        await navigator.clipboard.writeText(json);
        state.copiedJson = true;
        render();
        setTimeout(() => {
          state.copiedJson = false;
          render();
        }, 1800);
      } catch {
        // ignore clipboard failure
      }
    } else {
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'games.json';
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    }
  }
});

window.addEventListener('keydown', (e) => {
  if (e.shiftKey && e.key.toLowerCase() === 'h') {
    e.preventDefault();
    state.cloaked = !state.cloaked;
    render();
  }
});

fetchCatalog();
