import { AMAZON_TAG } from '../config.js';

/** Hosts we recognise as Amazon storefronts. */
const AMAZON_HOST = /(^|\.)amazon\.[a-z.]{2,6}$/i;

/**
 * Query params Amazon adds for its own session tracking. They bloat the URL,
 * leak the referring session, and occasionally break the tag. Stripped on sight.
 */
const JUNK_PARAMS = new Set([
  'ref', 'ref_', 'pd_rd_i', 'pd_rd_r', 'pd_rd_w', 'pd_rd_wg',
  'pf_rd_p', 'pf_rd_r', 'psc', 'th', 'qid', 'sr', '_encoding',
  'linkCode', 'creativeASIN', 'ascsubtag', 'smid',
]);

/**
 * Normalise an outbound product URL and attach the affiliate tag.
 *
 * Runs once per product at build time, never in the browser — the tag is
 * baked into the emitted HTML, so there is no client-side rewrite to block.
 *
 * @param {string} rawUrl Destination as written in the markdown frontmatter.
 * @returns {string} Clean, tagged URL.
 */
export function affiliateUrl(rawUrl) {
  let url;
  try {
    url = new URL(rawUrl);
  } catch {
    // Malformed URL: hand it back untouched rather than throwing the build.
    return rawUrl;
  }

  if (!AMAZON_HOST.test(url.hostname)) return url.toString();

  for (const key of [...url.searchParams.keys()]) {
    if (JUNK_PARAMS.has(key)) url.searchParams.delete(key);
  }

  if (AMAZON_TAG && !url.searchParams.has('tag')) {
    url.searchParams.set('tag', AMAZON_TAG);
  }

  return url.toString();
}

/**
 * Pull the ASIN out of an Amazon product URL, if present.
 * Used as a stable dedupe key and for structured data.
 *
 * @param {string} rawUrl
 * @returns {string|null}
 */
export function extractAsin(rawUrl) {
  const match = /\/(?:dp|gp\/product|gp\/aw\/d)\/([A-Z0-9]{10})/i.exec(rawUrl);
  return match ? match[1].toUpperCase() : null;
}
