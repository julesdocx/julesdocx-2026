<script lang="ts">
  import { Music, Pause, SkipForward, Volume2, VolumeX } from '@lucide/svelte';
 
  const tracks = [
    'WUmmt22Dn8s', // replace with your YouTube video IDs
    'SCMbqRcOQFM',
    'WCcVAgsiN8k',
    'tS4Wh30HGAs',
  ];

  let currentIndex = $state(Math.floor(Math.random() * tracks.length));
  let isPlaying = $state(false);
  let muted = $state(false);
  let player: any = null;
  let ready = $state(false);

  function loadYT() {
    if ((window as any).YT?.Player) { initPlayer(); return; }
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);
    (window as any).onYouTubeIframeAPIReady = initPlayer;
  }

  function initPlayer() {
    player = new (window as any).YT.Player('yt-player', {
      videoId: tracks[currentIndex],
      playerVars: { autoplay: 1, controls: 0 },
      events: {
        onReady: () => { ready = true; player.playVideo(); },
        onStateChange: (e: any) => {
          isPlaying = e.data === (window as any).YT.PlayerState.PLAYING;
        }
      }
    });
  }

  function togglePlay() {
    if (!player) { loadYT(); return; }
    isPlaying ? player.pauseVideo() : player.playVideo();
  }

  function skip() {
    currentIndex = (currentIndex + 1) % tracks.length;
    if (!player) { loadYT(); return; }
    player.loadVideoById(tracks[currentIndex]);
  }

  function toggleMute() {
    if (!player) return;
    muted ? player.unMute() : player.mute();
    muted = !muted;
  }
</script>

<!-- Hidden YouTube iframe -->
<div id="yt-player" class="hidden"></div>

<div class="player">
  <button onclick={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}>
    {#if isPlaying}
      <Pause size={13} />
    {:else}
      <Music size={13} />
    {/if}
  </button>

  <button onclick={skip} aria-label="Next track">
    {#if isPlaying}
      <SkipForward size={13} />
    {/if}
  </button>

</div>

<style>
  .player {
    display: flex;
    align-items: center;
    gap: 2px;
  }

  button {
    display: flex;
    align-items: center;
    background: transparent;
    color: var(--chart-3);
    cursor: pointer;
    padding: 2px;
    transition: color 0.2s;
  }

  button:hover {
    color: var(--foreground);
  }
</style>