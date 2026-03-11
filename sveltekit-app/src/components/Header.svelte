<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import MusicPlayer from './MusicPlayer.svelte';
  import RollingText from './RollingText.svelte';
  import Fireworks from './Fireworks.svelte';

  let pressed = $state(false);
  let time = $state('');

  function updateTime() {
    time = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Brussels',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(new Date());
  }

  onMount(() => {
  updateTime();
  const interval = setInterval(updateTime, 1000);
  return () => clearInterval(interval);
});

  let fireworks: any;
  
    function handleTitleClick(e: MouseEvent) {
    e.preventDefault();
    pressed = !pressed;
    if (pressed) fireworks.launch_fireworks();
    else fireworks.stop_fireworks();
  }
</script>

<Fireworks bind:this={fireworks} />
<header class="header">
  <div class="header__left">
  <a class="button" href="/" class:pressed onclick={handleTitleClick}>
    <div class="button-outer">
      <div class="button-inner">
        <span>julesdocx.be</span>
      </div>
    </div>
  </a>

    <span class="header__time">
      <RollingText texts={[`${time} Brussels`, 'Welcome']} delay={3000} />
    </span>
  </div>
  <div class="header__right">

    <nav class="header__socials">
      <a
        href="https://www.instagram.com/docx.j"
        target="_blank"
        rel="noopener noreferrer"
        class="header__social-link"
        aria-label="Instagram"
      >
        Instagram
      </a>

      <a
        href="https://www.are.na/jules-docx"
        target="_blank"
        rel="noopener noreferrer"
        class="header__social-link arena"
        aria-label="Are.na"
      >
        <span>Are.na</span>
      </a>
    </nav>

    <MusicPlayer />
  </div>
</header>

<style>
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.25rem 0;
    gap: 1rem;
  }

  .header__title {
    font-size: 1rem;
    font-weight: 600;
    /* color: var(--primary); */
    text-decoration: underline;
    letter-spacing: -0.02em;
    transition: color 0.2s;
  }

  .header__left {
    display: flex;
    align-items: center;
    margin-top: 2px;
    gap: 1rem;
  }

  .header__right {
    display: flex;
    align-self: center;
    margin-top: 2px;
    gap: 1rem;
  }

  /* Time */
  .header__time {
    font-size: 0.8rem;
    font-variant-numeric: tabular-nums;
    /* color: var(--secondary); */
    letter-spacing: 0.03em;
  }

  /* Socials */
  .header__socials {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .header__social-link {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.8rem;
    /* color: var(--foreground); */
    text-decoration: none;
    transition: color 0.2s;
    text-decoration: underline;
  }

  .header__social-link:hover {
    text-decoration: none;
    color: var(--secondary);
  }

  /* Music button */
  .header__music {
    display: flex;
    align-items: center;
    gap: 2px;
    background: transparent;
    /* color: var(--chart-3); */
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .arena {
    /* color: var(--chart-4); */

  }

  @keyframes bar {
    from { height: 3px; }
    to   { height: 12px; }
  }

  /* Mobile: hide text labels on small screens */
  @media (max-width: 480px) {
    .header__social-link span,
    .header__music-label {
      display: none;
    }

    .header__right {
      gap: 1rem;
    }
  }

  .button {
  all: unset;
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  position: relative;
  border-radius: 100em;
  background-color: rgba(0, 0, 0, 0.75);
  box-shadow:
    -0.15em -0.15em 0.15em -0.075em rgba(5, 5, 5, 0.25),
    0.0375em 0.0375em 0.0675em 0 rgba(5, 5, 5, 0.1);
}

.button::after {
  content: "";
  position: absolute;
  z-index: 0;
  width: calc(100% + 0.3em);
  height: calc(100% + 0.3em);
  top: -0.15em;
  left: -0.15em;
  border-radius: inherit;
  background: linear-gradient(
    -135deg,
    rgba(5, 5, 5, 0.5),
    transparent 20%,
    transparent 100%
  );
  filter: blur(0.0125em);
  opacity: 0.25;
  mix-blend-mode: multiply;
}

.button .button-outer {
  position: relative;
  z-index: 1;
  border-radius: inherit;
  transition: box-shadow 300ms ease;
  will-change: box-shadow;
  box-shadow:
    0 0.05em 0.05em -0.01em rgba(5, 5, 5, 1),
    0 0.01em 0.01em -0.01em rgba(5, 5, 5, 0.5),
    0.15em 0.3em 0.1em -0.01em rgba(5, 5, 5, 0.25);
}

.button:hover .button-outer {
  box-shadow:
    0 0 0 0 rgba(5, 5, 5, 1),
    0 0 0 0 rgba(5, 5, 5, 0.5),
    0 0 0 0 rgba(5, 5, 5, 0.25);
}

.button-inner {
  position: relative;
  z-index: 1;
  border-radius: inherit;
  padding: 0.5em 1.5em;
  background-image: linear-gradient(
    135deg,
    rgba(230, 230, 230, 1),
    rgba(180, 180, 180, 1)
  );
  transition:
    box-shadow 300ms ease,
    clip-path 250ms ease,
    background-image 250ms ease,
    transform 250ms ease;
  will-change: box-shadow, clip-path, background-image, transform;
  overflow: clip;
  clip-path: inset(0 0 0 0 round 100em);
  box-shadow:
    0 0 0 0 inset rgba(5, 5, 5, 0.1),
    -0.05em -0.05em 0.05em 0 inset rgba(5, 5, 5, 0.25),
    0 0 0 0 inset rgba(5, 5, 5, 0.1),
    0 0 0.05em 0.2em inset rgba(255, 255, 255, 0.25),
    0.025em 0.05em 0.1em 0 inset rgba(255, 255, 255, 1),
    0.12em 0.12em 0.12em inset rgba(255, 255, 255, 0.25),
    -0.075em -0.25em 0.25em 0.1em inset rgba(5, 5, 5, 0.25);
}

.button:hover .button-inner {
  clip-path: inset(
    clamp(1px, 0.0625em, 2px) clamp(1px, 0.0625em, 2px)
    clamp(1px, 0.0625em, 2px) clamp(1px, 0.0625em, 2px) round 100em
  );
  box-shadow:
    0.1em 0.15em 0.05em 0 inset rgba(5, 5, 5, 0.75),
    -0.025em -0.03em 0.05em 0.025em inset rgba(5, 5, 5, 0.5),
    0.25em 0.25em 0.2em 0 inset rgba(5, 5, 5, 0.5),
    0 0 0.05em 0.5em inset rgba(255, 255, 255, 0.15),
    0 0 0 0 inset rgba(255, 255, 255, 1),
    0.12em 0.12em 0.12em inset rgba(255, 255, 255, 0.25),
    -0.075em -0.12em 0.2em 0.1em inset rgba(5, 5, 5, 0.25);
}

.button .button-inner span {
  position: relative;
  z-index: 4;
  font-size: 0.85rem;
  letter-spacing: -0.03em;
  font-weight: 500;
  color: rgba(0, 0, 0, 0);
  background-image: linear-gradient(
    135deg,
    rgba(25, 25, 25, 1),
    rgba(75, 75, 75, 1)
  );
  -webkit-background-clip: text;
  background-clip: text;
  transition: transform 250ms ease;
  display: block;
  will-change: transform;
  text-shadow: rgba(0, 0, 0, 0.1) 0 0 0.1em;
  user-select: none;
}

.button:hover .button-inner span {
  transform: scale(0.975);
}

.button:active .button-inner {
  transform: scale(0.975);
}

.button.pressed .button-outer {
  box-shadow:
    0 0 0 0 rgba(5, 5, 5, 1),
    0 0 0 0 rgba(5, 5, 5, 0.5),
    0 0 0 0 rgba(5, 5, 5, 0.25);
}

.button.pressed .button-inner {
  clip-path: inset(
    clamp(1px, 0.0625em, 2px) clamp(1px, 0.0625em, 2px)
    clamp(1px, 0.0625em, 2px) clamp(1px, 0.0625em, 2px) round 100em
  );
  box-shadow:
    0.1em 0.15em 0.05em 0 inset rgba(5, 5, 5, 0.75),
    -0.025em -0.03em 0.05em 0.025em inset rgba(5, 5, 5, 0.5),
    0.25em 0.25em 0.2em 0 inset rgba(5, 5, 5, 0.5),
    0 0 0.05em 0.5em inset rgba(255, 255, 255, 0.15),
    0 0 0 0 inset rgba(255, 255, 255, 1),
    0.12em 0.12em 0.12em inset rgba(255, 255, 255, 0.25),
    -0.075em -0.12em 0.2em 0.1em inset rgba(5, 5, 5, 0.25);
}

.button.pressed .button-inner span {
  transform: scale(0.975);
}
</style>