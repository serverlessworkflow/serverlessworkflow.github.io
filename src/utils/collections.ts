import { getCollection } from "astro:content";

export const getSortedBlogPosts = async () => 
  (await getCollection('blog'))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
    ;