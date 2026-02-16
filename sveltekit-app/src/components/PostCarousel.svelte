<script lang="ts">
  import * as Carousel from '$lib/components/ui/carousel';
  import { Skeleton } from '$lib/components/ui/skeleton';
  import * as Card from '$lib/components/ui/card';
  import { Progress } from '$lib/components/ui/progress';
  import { urlFor } from '$lib/sanity/image';
  import type { Post } from '$lib/sanity/queries';

  let { post }: { post: Post } = $props();

  let current = $state(0);
  let count = $state(0);

  function onInit(api: any) {
    count = api.scrollSnapList().length;
    current = api.selectedScrollSnap() + 1;
    api.on('select', () => {
      current = api.selectedScrollSnap() + 1;
    });
    api.on('reInit', () => {
      count = api.scrollSnapList().length;
    });
  }

  const progress = $derived((current * 100) / count);

  const images = $derived([
  ...(post.mainImage ? [{ asset: post.mainImage.asset, _key: 'main', alt: post.title }] : []),
  ...(post.gallery ?? [])
]);

</script>

<div class=" py-4">
  <Carousel.Root class="w-full" setApi={onInit} opts={{ loop: true }}>
    <Carousel.Content>
      {#each images ?? [] as image, index (image._key)}
        <Carousel.Item>
          <Card.Root>
            <Card.Content class="flex aspect-video items-center justify-center p-0 relative">
              <Skeleton class="absolute bg-grey w-full h-full rounded" />
              <img
                src={urlFor(image).width(800).quality(95).url()}
                alt=" "
                class="w-full h-full object-contain"
                loading="lazy"
                onload={(e) => {
                    (e.currentTarget.previousElementSibling as HTMLElement).style.display = 'none';
                    e.currentTarget.style.opacity = '1';
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