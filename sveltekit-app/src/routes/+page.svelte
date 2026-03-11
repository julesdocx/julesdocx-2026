<script lang="ts">
  import {useQuery} from '@sanity/sveltekit'
  import Card from '../components/Card.svelte'
  import { ArrowRight, X } from '@lucide/svelte';

  import type {PageProps} from './$types'
  import * as ButtonGroup from "$lib/components/ui/button-group/index.js";
  import * as Accordion from '$lib/components/ui/accordion';
  import { Button } from "$lib/components/ui/button/index.js";
  import { Badge } from "$lib/components/ui/badge/index.js";
  import {urlFor} from '$lib/sanity/image'
  import PostCarousel from '../components/PostCarousel.svelte'; 
  import { PortableText } from '@portabletext/svelte'; // if you have this
    import { text } from '@sveltejs/kit';

  let openPost = $state<string | null>(null);
  let openImageIndex = $state<number>(0);

  function togglePost(id: string, index: number = 0) {
    if (openPost === id) {
      openPost = null;
    } else {
      openPost = id;
      openImageIndex = index;
    }
  }

  const {data}: PageProps = $props()
  const query = $derived(useQuery(data))
  const posts = $derived($query.data)
  const sorted = $derived(
  [...(posts ?? [])].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
) ;

</script>

<section class="flex flex-wrap gap-2">
  <!-- <h1 class="text-5xl md:text-8xl tracking-tighter font-bold mb-8 my-16 opacity-10">
    <span class="">Design</span>, <span class=" ">Frontend Development</span> & <span class=" ">Art</span> 
  </h1> -->

 {#each sorted as post: Post}
  {#if openPost === post._id}
    <div class="flex md:grid md:grid-cols-3 w-full mt-4 items-center text-left mt-6">
      <button
        type="button"
        class="cursor-pointer text-left flex items-center gap-1 w-full group"
        onclick={() => togglePost(post._id, 0)}
      >
        <X size={16} class="relative -top-0.5" />
        <h2 class="font-bold text-sm md:text-md mr-4">{post.title}</h2>
      </button>
      {#if post.link?.href}
      <a href={post.link?.href} class="flex md:justify-center justify-end md:text-center md:w-full  hover:no-underline underline text-sm text-secondary" target="_blank">
        {#if post.link?.text}
          {post.link?.text}
        {:else}
          {post.link?.href}
        {/if}  
        <ArrowRight size={16} class="ml-2 " />
      </a>
      {:else}
      <div></div>
      {/if}
      <div class="hidden cursor-pointer md:flex md:justify-end justify-start  w-full">
        <ButtonGroup.Root aria-label="Button group">
          {#each post.tags ?? [] as tag}
            <Button variant="outline" class="rounded-full px-4 h-6 text-xs hover:bg-white">{tag}</Button>
          {/each}
          <Button variant="outline" class="rounded-full h-6 text-xs hover:bg-white">
            {new Date(post.date).getFullYear()}
          </Button>
        </ButtonGroup.Root>
      </div>
    </div>
  {/if}

  <!-- Thumbnail images — hidden when expanded -->
  {#if openPost !== post._id}
    <div class="grid w-full md:w-auto grid-cols-4 items-start md:flex justify-start md:justify-start gap-2 flex-wrap md:gap-2 group">
      {#if post.mainImage}
        <button type="button" onclick={() => togglePost(post._id, 0)}>
            <img
              src={urlFor(post.mainImage).width(200).quality(80).url()}
              alt={post.title}
              class="md:w-[100px] md:h-[100px] p-1 rounded-xl shadow-md object-contain border border-grey-400
                hover:shadow-none hover:inset-shadow-sm hover:ring-2 group-hover:rounded-xs ring-black inset-shadow-grey transition-all duration-200"
              loading="lazy"
            />
        </button>
      {/if}

      {#each post.gallery ?? [] as image, i}
        <button type="button" onclick={() => togglePost(post._id, i + 1)}>
          <img
            src={urlFor(image).width(200).quality(80).url()}
            alt={post.title}
            class="md:w-[100px] md:h-[100px] p-1 rounded-xl shadow-md object-contain border border-grey-400
                hover:shadow-none hover:inset-shadow-sm hover:ring-2 group-hover:rounded-xs ring-black inset-shadow-grey transition-all duration-200"
            loading="lazy"
          />
        </button>
      {/each}
    </div>
  {/if}

  {#if openPost === post._id}
    <div class="w-full mt-4 mb-8">
      <PostCarousel {post} initialIndex={openImageIndex} />
      {#if post.body}
        <div class="prose mt-6 max-w-none text-sm/8">
          <PortableText value={post.body} />
        </div>
      {/if}
    </div>
  {/if}
{/each}
</section>
