<script lang="ts">
	import './layout.css';
	import { PreviewMode, QueryLoader, VisualEditing } from '@sanity/sveltekit';
	import type { LayoutProps } from './$types';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { client } from '$lib/sanity/client';
	import Header from '../components/Header.svelte';
	

	const { children, data }: LayoutProps = $props();

	// svelte-ignore state_referenced_locally -- previewEnabled only changes on full page reload
	const { previewEnabled } = data;
</script>

<PreviewMode enabled={previewEnabled}>
	<VisualEditing enabled={previewEnabled}>
		<QueryLoader enabled={previewEnabled} client={client}>
			{#if previewEnabled}
				<a
					href={resolve('/preview/disable', { redirect: page.url.pathname })}
					class="preview-toggle"
				>
					<span>Preview Enabled</span>
					<span>Disable Preview</span>
				</a>
			{/if}

			<div class="min-h-screen max-w-3xl mx-auto px-6 flex flex-col">
				<Header />
				<main class="flex-1">
					{@render children()}
				</main>
				<footer class="py-6">
					<p class="text-xs text-muted-foreground">@docx.j</p>
				</footer>
			</div>
		</QueryLoader>
	</VisualEditing>
</PreviewMode>
