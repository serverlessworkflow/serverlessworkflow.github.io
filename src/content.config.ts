import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const mdExtensions = ['markdown', 'mdown', 'mkdn', 'mkd', 'mdwn', 'md', 'mdx'];
const getLoader = (contentType: string) => glob({
  base: `./src/content/${contentType}`,
  pattern: `**/[^_]*.{${mdExtensions.join(',')}}`
});

const BlogPostSchema = z.object({
  title: z.string(),
  description: z.string(),
  author: z.string(),
  date: z.coerce.date(),
});
export type BlogPost = z.infer<typeof BlogPostSchema>;

const blog = defineCollection({
  loader: getLoader('blog'),
  schema: BlogPostSchema
});
/*
const docs = defineCollection({
  loader: getLoader('docs'),
  schema: z.object({
		title: z.string(),
		description: z.string()
  })
});
*/
export const collections = {
  blog,
  //docs,
};

export type CollectionContent = {
  id: string;
  data: {
    title: string;
  }
}