/**
 * Single source of truth for anything that is not content.
 * Change it here, it changes everywhere — no grepping through templates.
 */
export const SITE = {
  url: 'https://labelleedit.com',
  name: 'La Belle Edit',
  tagline: 'Outfit edits worth saving',
  description:
    'Curated outfit edits - dresses, shoes, bags and activewear, shoppable in one tap.',
  locale: 'en_US',
  author: 'La Belle Edit',
};

/**
 * Amazon Associates tracking ID. Appended at build time to every amazon.*
 * link that does not already carry one.
 * Leave as an empty string to disable tag injection entirely.
 */
export const AMAZON_TAG = 'labelleedit-20';

/** Text shown above the fold on every page carrying affiliate links. */
export const DISCLOSURE =
  'This page contains affiliate links. If you buy through them, I earn a small commission at no extra cost to you.';
