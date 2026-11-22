export function isSafeIframeSrc(rawUrl) {
  const trimmed = String(rawUrl || '').trim();
  if (!trimmed) return false;
  if (trimmed.startsWith('/') && !trimmed.startsWith('//')) {
    return true;
  }
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

export function buildIframeHtml(src, title, allow, sandbox) {
  const safeTitle = String(title || '').replace(/"/g, '&quot;');
  const safeSrc = String(src || '').replace(/"/g, '&quot;');
  const allowAttr = allow ? ` allow="${String(allow).replace(/"/g, '&quot;')}"` : '';
  const sandboxAttr = sandbox ? ` sandbox="${String(sandbox).replace(/"/g, '&quot;')}"` : '';
  return `<iframe src="${safeSrc}" title="${safeTitle}"${allowAttr}${sandboxAttr} loading="lazy"></iframe>`;
}

export function parseIframeInput(input, fallbackTitle) {
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
