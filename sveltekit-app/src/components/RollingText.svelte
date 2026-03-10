<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  const { texts, speed = 50, delay = 4000 } = $props<{
    texts: string[];
    speed?: number;
    delay?: number;
  }>();

  let containerHeight = $state(0);
  let currentIndex = $state(0);
  let position = $state(0); // 0 = visible, negative = scrolled out top, positive = waiting below
  let nextPosition = $state(0);
  let showNext = $state(false);

  let container: HTMLElement;
  let animFrame: number;
  let timeout: ReturnType<typeof setTimeout>;

  function animateIn(from: number, to: number, onDone: () => void) {
    const startTime = performance.now();
    const duration = Math.abs(from - to) * speed * 0.5;

    function step(now: number) {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      position = from + (to - from) * eased;
      if (t < 1) animFrame = requestAnimationFrame(step);
      else { position = to; onDone(); }
    }
    animFrame = requestAnimationFrame(step);
  }

  function cycle() {
    const h = containerHeight;

    // slide current out upward
    animateIn(0, -h, () => {
      // swap to next text, reset below
      currentIndex = (currentIndex + 1) % texts.length;
      position = h;

      // slide next in from below
      animateIn(h, 0, () => {
        timeout = setTimeout(cycle, delay);
      });
    });
  }

  onMount(() => {
    containerHeight = container.clientHeight;
    position = 0;
    timeout = setTimeout(cycle, delay);
  });
    onDestroy(() => {
    if (typeof window === 'undefined') return;
    cancelAnimationFrame(animFrame);
    clearTimeout(timeout);
    });
</script>

<span
  class="rolling-wrapper"
  bind:this={container}
>
  <span
    class="rolling-text"
    style="transform: translateY({position}px)"
  >
    {texts[currentIndex]}
  </span>
</span>

<style>
  .rolling-wrapper {
    display: inline-block;
    overflow: hidden;
    vertical-align: bottom;
  }

  .rolling-text {
    display: inline-block;
    will-change: transform;
  }
</style>