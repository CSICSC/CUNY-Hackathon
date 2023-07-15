import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [vitePreprocess()],
	kit: {
		adapter: adapter({
			out: 'build',
		}),
		alias: {
			$components: 'src/lib/components',
			$styles: 'src/assets/scss',
			$images: 'src/assets/images',
			$fonts: 'src/assets/fonts'
		},
	}
};

export default config;
