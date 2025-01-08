import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { DEFAULT_TITLE, DEFAULT_DESC } from '../consts';

export async function GET(context) {
	const posts = (await getCollection('blog'))
  	.sort((a, b) => a.data.date.valueOf() - b.data.date.valueOf());
	return rss({
		title: DEFAULT_TITLE,
		description: DEFAULT_DESC,
		site: context.site,
		items: posts.map((post) => ({
			...post.data,
			pubDate: post.data.date,
			link: `/blog/${post.id}/`,
		})),
	});
}
