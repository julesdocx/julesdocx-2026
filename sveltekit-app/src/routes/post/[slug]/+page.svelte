<script lang="ts">
  import {useQuery} from '@sanity/sveltekit'
  import {PortableText} from '@portabletext/svelte'
  import {formatDate} from '$lib/utils'
  import {urlFor} from '$lib/sanity/image'
  import type {PageProps} from './$types'

  const {data}: PageProps = $props()
  const query = $derived(useQuery(data))
  const post = $derived($query.data)
</script>

{#if post}
  <section class="post">
    {#if post.mainImage}
      <img
        class="post__cover"
        src={urlFor(post.mainImage).url()}
        alt="Cover image for {post.title}"
      />
    {:else}
      <div class="post__cover--none"></div>
    {/if}
    <div class="post__container">
      <h1 class="post__title">{post.title}</h1>
      <p class="post__date">
        {formatDate(post._createdAt)}
      </p>
      {#if post.body}
        <div class="post__content">
          <PortableText components={{}} value={post.body} />
        </div>
      {/if}
    </div>
  </section>
{/if}

<style>

</style>
