<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import MusicPlayer from './MusicPlayer.svelte';

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

</script>

<header class="header">
  <a class="header__title" href="/">julesdocx.be</a>

  <div class="header__right">
    <span class="header__time">{time} Brussels</span>

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
    /* justify-content: space-between; */
    padding: 1.25rem 0;
    gap: 1rem;
  }

  .header__title {
    font-size: 1rem;
    font-weight: 600;
    color: var(--primary);
    text-decoration: underline;
    letter-spacing: -0.02em;
    transition: color 0.2s;
  }

  .header__right {
    display: flex;
    align-items: center;
    margin-top: 2px;
    gap: 1rem;
  }

  /* Time */
  .header__time {
    font-size: 0.8rem;
    font-variant-numeric: tabular-nums;
    color: var(--secondary);
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
    color: var(--foreground);
    text-decoration: none;
    transition: color 0.2s;
    text-decoration: underline;
  }

  .header__social-link:hover {
    color: var(--foreground);
  }

  /* Music button */
  .header__music {
    display: flex;
    align-items: center;
    gap: 2px;
    background: transparent;
    color: var(--chart-3);
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .arena {
    color: var(--chart-4);

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
</style>