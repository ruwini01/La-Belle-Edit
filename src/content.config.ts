import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * One markdown file = one Pinterest-destination page.
 * The 30 products live in frontmatter, not the body, so they stay
 * machine-readable: sortable, countable, and usable in structured data.
 */
const roundups = defineCollection({
  loader: glob({ base: './src/content/roundups', pattern: '**/*.md' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().min(10).max(70),
      // Doubles as the meta description and the Pinterest pin description.
      description: z.string().min(50).max(160),
      category: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),

      // The tall flyer image you upload as the pin itself (2:3, 1000x1500).
      pinImage: image(),
      pinAlt: z.string().min(5),

      draft: z.boolean().default(false),

      products: z
        .array(
          z.object({
            name: z.string().min(3).max(80),
            note: z.string().max(140).optional(),
            image: image(),
            alt: z.string().min(5),
            url: z.string().url(),
          })
        )
        .min(1)
        .max(60),
    }),
});

export const collections = { roundups };
