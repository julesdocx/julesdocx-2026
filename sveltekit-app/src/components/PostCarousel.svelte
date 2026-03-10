<script lang="ts">
  import * as Carousel from '$lib/components/ui/carousel';
  import { Skeleton } from '$lib/components/ui/skeleton';
  import * as Card from '$lib/components/ui/card';
  import { Progress } from '$lib/components/ui/progress';
  import { urlFor } from '$lib/sanity/image';
  import type { Post } from '$lib/sanity/queries';

  const { post, initialIndex = 0 } = $props();
  
  let currentIndex = $state(0); // 0-based, for display/progress
  let count = $state(0);

  function onInit(api: any) {
    count = api.scrollSnapList().length;

    // Scroll to the clicked thumbnail immediately
    if (initialIndex > 0) {
      api.scrollTo(initialIndex, true); // true = jump without animation
    }

    currentIndex = api.selectedScrollSnap();

    api.on('select', () => {
      currentIndex = api.selectedScrollSnap();
    });
    api.on('reInit', () => {
      count = api.scrollSnapList().length;
      currentIndex = api.selectedScrollSnap();
    });
  }

  // progress is 1-based percentage
  const progress = $derived(((currentIndex + 1) * 100) / count);

  const images = $derived([
    ...(post.mainImage ? [{ asset: post.mainImage.asset, _key: 'main', alt: post.title }] : []),
    ...(post.gallery ?? [])
  ]);
</script>

<div class=" mb-2">
  <Carousel.Root class="w-full" setApi={onInit} opts={{ loop: true }}>
    <Carousel.Content>
      {#each images ?? [] as image: any, index (image._key)}
        <Carousel.Item>
          <Card.Root>
            <Card.Content class="flex aspect-video items-center justify-center p-0 relative">
              <Skeleton class="absolute bg-grey w-full h-full rounded" />
              <img
                src={urlFor(image).width(1000).quality(100).url()}
                alt=" "
                class="w-full h-full object-contain"
                loading="lazy"
                onload={(e) => {
                    (e.currentTarget.previousElementSibling as HTMLElement).style.display = 'none';
                }}
              />
            </Card.Content>
          </Card.Root>
        </Carousel.Item>
        {/each}
    </Carousel.Content>
    <Carousel.Previous class="top-[calc(100%+0.5rem)] left-0 translate-y-0" />
    <Carousel.Next class="top-[calc(100%+0.5rem)] left-2 translate-x-full translate-y-0" />
  </Carousel.Root>
  <Progress class="mt-4 ml-auto w-24" value={progress} />
</div>