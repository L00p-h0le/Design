/**
 * Register GSAP plugins once, here. Import gsap from this file, never from 'gsap'
 * directly, so plugins are always registered before use.
 *
 * All GSAP plugins are free. Add more as weeks need them:
 *   Flip, Draggable, InertiaPlugin, MorphSVGPlugin, DrawSVGPlugin, ScrambleTextPlugin, CustomEase
 */
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)

export { gsap, ScrollTrigger, SplitText, useGSAP }
