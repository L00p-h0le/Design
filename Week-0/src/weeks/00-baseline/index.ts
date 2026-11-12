import { lazy } from 'react'
import type { WeekModule } from '../../gallery/types'
import { ButtonSet } from './constant/ButtonSet'
import { Hero } from './constant/Hero'
import { Navbar } from './constant/Navbar'
import { PricingCard } from './constant/PricingCard'
import { Testimonial } from './constant/Testimonial'

/*
 * Each week folder exports one WeekModule like this.
 * To start a new week: copy this folder, rename the theme (w01), update tokens.css,
 * import the tokens in src/index.css, and attach the module in gallery/registry.ts.
 */
export const baseline: WeekModule = {
  theme: 'w00',
  Page: lazy(() => import('./Page')),
  constant: { Hero, Navbar, ButtonSet, PricingCard, Testimonial },
}
