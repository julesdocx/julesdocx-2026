<script lang="ts">
  import { onDestroy } from 'svelte';

  const bits = 80;
  const speed = 33;
  const bangs = 5;
  const colours = ["#03f", "#f03", "#0e0", "#93f", "#0cf", "#f93", "#f0c"];

  let boddie: HTMLDivElement;
  let swide = 800;
  let shigh = 600;

  let bangheight: number[] = [];
  let intensity: number[] = [];
  let colour: number[] = [];
  let Xpos: Record<string, number> = {};
  let Ypos: Record<string, number> = {};
  let dX: Record<string, number> = {};
  let dY: Record<string, number> = {};
  let stars: Record<string, HTMLDivElement> = {};
  let decay: Record<string, number> = {};
  let intervals: ReturnType<typeof setInterval>[] = [];

  function createDiv(char: string, size: number): HTMLDivElement {
    const div = document.createElement("div");
    div.style.font = `${size}px monospace`;
    div.style.position = "absolute";
    div.style.backgroundColor = "transparent";
    div.appendChild(document.createTextNode(char));
    return div;
  }

  function launch(N: number) {
    colour[N] = Math.floor(Math.random() * colours.length);
    Xpos[N + "r"] = swide * 0.5;
    Ypos[N + "r"] = shigh - 5;
    bangheight[N] = Math.round((0.5 + Math.random()) * shigh * 0.4);
    dX[N + "r"] = (Math.random() - 0.5) * swide / bangheight[N];
    if (dX[N + "r"] > 1.25) stars[N + "r"].firstChild!.nodeValue = "/";
    else if (dX[N + "r"] < -1.25) stars[N + "r"].firstChild!.nodeValue = "\\";
    else stars[N + "r"].firstChild!.nodeValue = "|";
    stars[N + "r"].style.color = colours[colour[N]];
  }

  function bang(N: number) {
    let A = 0;
    for (let i = bits * N; i < bits + bits * N; i++) {
      const Z = stars[i].style;
      Z.left = Xpos[i] + "px";
      Z.top = Ypos[i] + "px";
      if (decay[i]) decay[i]--;
      else A++;
      if (decay[i] === 15) Z.fontSize = "7px";
      else if (decay[i] === 7) Z.fontSize = "2px";
      else if (decay[i] === 1) Z.visibility = "hidden";
      if (decay[i] > 1 && Math.random() < 0.1) {
        Z.visibility = "hidden";
        setTimeout(() => { stars[i].style.visibility = "visible"; }, speed - 1);
      }
      Xpos[i] += dX[i];
      Ypos[i] += (dY[i] += 1.25 / intensity[N]);
    }
    if (A !== bits) setTimeout(() => bang(N), speed);
  }

  function stepthrough(N: number) {
    const oldx = Xpos[N + "r"];
    const oldy = Ypos[N + "r"];
    Xpos[N + "r"] += dX[N + "r"];
    Ypos[N + "r"] -= 4;
    if (Ypos[N + "r"] < bangheight[N]) {
      const M = Math.floor(Math.random() * 3 * colours.length);
      intensity[N] = 5 + Math.random() * 4;
      for (let i = N * bits; i < bits + bits * N; i++) {
        Xpos[i] = Xpos[N + "r"];
        Ypos[i] = Ypos[N + "r"];
        dY[i] = (Math.random() - 0.5) * intensity[N];
        dX[i] = (Math.random() - 0.5) * (intensity[N] - Math.abs(dY[i])) * 1.25;
        decay[i] = 16 + Math.floor(Math.random() * 16);
        const Z = stars[i];
        if (M < colours.length) Z.style.color = colours[i % 2 ? colour[N] : M];
        else if (M < 2 * colours.length) Z.style.color = colours[colour[N]];
        else Z.style.color = colours[i % colours.length];
        Z.style.fontSize = "13px";
        Z.style.visibility = "visible";
      }
      bang(N);
      launch(N);
    }
    stars[N + "r"].style.left = oldx + "px";
    stars[N + "r"].style.top = oldy + "px";
  }

export function launch_fireworks() {
    destroy();
    swide = window.innerWidth;
    shigh = window.innerHeight;

    boddie = document.createElement("div");
    boddie.style.cssText = "position:fixed;top:0;left:0;overflow:visible;width:1px;height:1px;pointer-events:none;z-index:9999;";
    document.body.appendChild(boddie);

    for (let i = 0; i < bangs; i++) {
      stars[i + "r"] = createDiv("|", 12);
      boddie.appendChild(stars[i + "r"]);
      for (let j = bits * i; j < bits + bits * i; j++) {
        stars[j] = createDiv("*", 13);
        boddie.appendChild(stars[j]);
      }
      launch(i);
      intervals.push(setInterval(() => stepthrough(i), speed));
    }
    // no setTimeout(destroy) here anymore
  }

  export function stop_fireworks() {
    destroy();
  }

  function destroy() {
    intervals.forEach(clearInterval);
    intervals = [];
    if (boddie && boddie.parentNode) boddie.parentNode.removeChild(boddie);
  }

  onDestroy(destroy);
</script>