import Lenis from "@studio-freight/lenis"

export const useLenis = new Lenis({
  duration: 0.6,
  easing: t => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)), // https://easings.net/en#easeOutExpo
  smooth: true,
  smoothTouch: false,
  touchMultiplier: 2,
})

// const raf = (time: any) => {
//   useLenis.raf(time)
//   requestAnimationFrame(raf)
// }

// if (process.client) {
//   requestAnimationFrame(raf)

//   // @ts-ignore
//   lenis.on('scroll', ({ scroll, limit, velocity, direction, progress } : {scroll: number, limit: number, velocity: number, direction: string, progress: number}) => {
//     console.log({ scroll, limit, velocity, direction, progress })
//     const footer = document.getElementById('footer') as HTMLDivElement
//     if (footer && Math.abs(scroll - limit) < 1) footer.setAttribute("style", "z-index: 1000;");
//     else if (footer) footer.setAttribute("style", "z-index: 0;");
//   })
// }
