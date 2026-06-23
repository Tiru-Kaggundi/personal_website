import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    tags: z
      .array(z.union([z.string(), z.object({ tag: z.string() })]))
      .optional()
      .transform((tags) =>
        tags?.map((t) => (typeof t === "string" ? t : t.tag))
      ),
  }),
});

export const collections = { blog };
