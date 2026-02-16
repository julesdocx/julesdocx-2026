<script lang="ts">
  import {useQuery} from '@sanity/sveltekit'
  import Card from '../components/Card.svelte'
  import type {PageProps} from './$types'
  import * as Accordion from '$lib/components/ui/accordion';
  import {urlFor} from '$lib/sanity/image'
  import PostCarousel from '../components/PostCarousel.svelte'; 

  const {data}: PageProps = $props()
  const query = $derived(useQuery(data))
  const posts = $derived($query.data)
  const sorted = $derived(
  [...(posts ?? [])].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
) ;

</script>

<section class="">
  <h1 class="text-5xl md:text-7xl tracking-tighter font-bold mb-8 md:mt-6 mt-2">
    <span class="underline">Design</span>, <span class="text-chart-2 underline">Frontend Development</span>  &   <span class="text-chart-5 tracking-widest underline">Art</span> <span class="text-chart-1">with care.</span><img class="ml-2 md:ml-6 w-[80px] md:w-[100px] inline" src="/family.svg" alt="Family" />
  </h1>

  <Accordion.Root type="single" collapsible>
  {#each sorted as post: Post}
    <Accordion.Item value={post._id}>
      <Accordion.Trigger>
        <div class="grid grid-cols-2 w-full">
          <div class="font-bold">
            {post.title}
          </div>
          <div class="flex gap-1 wrap">
            {#each post.tags ?? [] as tag}
              <div class="text-muted-foreground">
                {tag}
              </div> 
            {/each}
          </div>  
        </div>
      </Accordion.Trigger>
      <Accordion.Content>
        <PostCarousel {post} />
      </Accordion.Content>
    </Accordion.Item>
  {/each}
</Accordion.Root>
</section>

<style>
  .home {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 650px;
  }
  .home__container {
    display: flex;
    flex-wrap: wrap;
    gap: 0.2rem;
  }
</style>