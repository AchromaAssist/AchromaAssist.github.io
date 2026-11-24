import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const prototypes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/prototypes' }),
  schema: z.object({
    title: z.string(),
    device: z.string(),
    summary: z.string(),
    status: z.string(),
    platform: z.string(),
    repo: z.url(),
    order: z.number().default(0),
    video: z
      .object({ mp4: z.string(), webm: z.string().optional(), poster: z.string(), alt: z.string() })
      .optional(),
  }),
});

export const collections = { prototypes };
