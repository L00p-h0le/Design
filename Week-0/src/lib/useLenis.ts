import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from './gsap'
import { MOTION_REDUCED } from './motion'

/**
 * Smooth scroll for the weeks that want it (Editorial, Japandi ...).
 * Call once at the top of a week's Page. It is driven by GSAP's ticker so
 * ScrollTrigger and Lenis stay in sync. It is skipped for reduced-motion users.
 */
export function useLenis(options?: ConstructorParameters<typeof Lenis>[0]) {
  // Options are read once on mount, on purpose. Re-creating Lenis on every render would reset scrolling.
  const optionsRef = useRef(options)

  useEffect(() => {
    if (window.matchMedia(MOTION_REDUCED).matches) return

    const lenis = new Lenis({ anchors: true, ...optionsRef.current, autoRaf: false })
    lenis.on('scroll', ScrollTrigger.update)

    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      gsap.ticker.lagSmoothing(500, 33)
      lenis.destroy()
    }
  }, [])
}
