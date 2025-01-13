import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const mdExtensions = ['markdown', 'mdown', 'mkdn', 'mkd', 'mdwn', 'md', 'mdx'];
const getGlobLoader = (contentType: string, extensions: string) => glob({
  base: `./src/content/${contentType}`,
  pattern: `**/[^_]*.${extensions}`
});

const BlogPostSchema = z.object({
  title: z.string(),
  description: z.string(),
  author: z.string(),
  date: z.coerce.date(),
});
export type BlogPost = z.infer<typeof BlogPostSchema>;

const SpecErrorV1Schema = z.object({
  type: z.string(),
  description: z.string(),
  status: z.number(),
});
export type SpecErrorV1Schema = z.infer<typeof SpecErrorV1Schema>;

const exampleSchema = z.object({
  title: z.string()
});
export type Example = z.infer<typeof SpecErrorV1Schema>;

const blog = defineCollection({
  loader: getGlobLoader('blog', `{${mdExtensions.join(',')}}`),
  schema: BlogPostSchema
});
const specErrorV1 = defineCollection({
  loader: getGlobLoader('spec/1.0.0/errors', 'json'),
  schema: SpecErrorV1Schema
});
const example = defineCollection({
  loader: getGlobLoader('examples', `{${mdExtensions.join(',')}}`),
  schema: exampleSchema
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
  specErrorV1,
  example,
  //docs,
};

export type CollectionContent = {
  id: string;
  data: {
    title: string;
  }
}