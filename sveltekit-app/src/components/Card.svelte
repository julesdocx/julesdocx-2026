<script lang="ts">
  import {formatDate} from '$lib/utils'
  import {urlFor} from '$lib/sanity/image'
  import type {Post} from '$lib/sanity/queries'

  export let post: Post
</script>

<a class="card" href={`/post/${post.slug.current}`}>
  {#if post.mainImage}
    <img
      class="card__cover"
      src={urlFor(post.mainImage).url()}
      alt="Cover image for {post.title}"
    />
  {:else}
    <div class="card__cover--none"></div>
  {/if}

  <div class="card__container">
    <h3 class="card__title">
      {post.title}
    </h3>
    <p class="card__date">
      {formatDate(post._createdAt)}
    </p>
  </div>
</a>

<style>
  .card {
    display: flex;
    width: 28rem;
    border: 1px solid var(--gray-200);
    border-radius: var(--border-radius);
    overflow: hidden;
    margin: 3px ;
    color: var(--black);
  }
  .card__cover {
    width: 180px;
    height: 180px;
    object-fit: contain;
    align-self: fill;
  }
  .card__cover--none {
    aspect-ratio: 5 / 3;
    background-color: var(--gray-200);
    border-radius: var(--border-radius);
  }
  .card__date {
    font-size: var(--font-size-2);
    color: var(--gray-600);
    margin-top: 6px;
  }
  .card__title {
    font-size: var(--font-size-3);
    font-weight: 400;
    color: var(--black);
    margin: 0;
  }
  .card__container {
    display: flex;
    flex-direction: column;
    padding: 1rem;
  }
  a {
    text-decoration: none;
  }
</style>