/**
 * Reduced-motion queries for gsap.matchMedia().
 *
 * Pattern (inside useGSAP):
 *   const mm = gsap.matchMedia()
 *   mm.add(MOTION_OK, () => { gsap.from(...) })       // full motion
 *   mm.add(MOTION_REDUCED, () => { gsap.from(..., { opacity: 0 }) }) // optional gentle fade
 *
 * Content must be visible by default (in CSS). Animate *from* hidden, not *to* visible,
 * so nothing stays invisible if JS fails or motion is reduced.
 *
 * Motion (motion/react) is covered globally by <MotionConfig reducedMotion="user"> in main.tsx.
 */
export const MOTION_OK = '(prefers-reduced-motion: no-preference)'
export const MOTION_REDUCED = '(prefers-reduced-motion: reduce)'

/** Shared easing curves as arrays for Motion (`transition={{ ease: EASE_OUT }}`). */
export const EASE_OUT = [0.2, 0.7, 0.2, 1] as const
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const
