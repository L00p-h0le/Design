import type { ComponentType, LazyExoticComponent } from 'react'

/*
 * THE CONSTANT SET CONTRACT
 * Every week builds these 5 components with exactly these props, so the gallery
 * can render all weeks side by side with identical content.
 *
 * Rules for constant components:
 *  1. Style only with theme tokens (bg-bg, text-fg, font-display, rounded-card ...).
 *  2. Be responsive with CONTAINER queries (@sm:, @md:, @3xl: ...), not viewport
 *     queries (sm:, md:). The gallery shows them inside frames of different widths.
 *  3. No position: fixed or sticky inside the component. The Page decides placement.
 *  4. Handle every state: hover, focus-visible, active, disabled.
 */

export interface Cta {
  label: string
  href: string
}

export interface HeroProps {
  eyebrow?: string
  title: string
  subtitle: string
  primaryCta: Cta
  secondaryCta?: Cta
  /** 1 on a real page; the gallery passes 3 so the page keeps a single h1. */
  headingLevel?: 1 | 2 | 3
}

export interface NavbarProps {
  brand: string
  links: Cta[]
  cta: Cta
}

export interface ButtonSetProps {
  /** Label used for every button variant. */
  label: string
}

export interface PricingCardProps {
  plan: string
  price: string
  period: string
  description: string
  features: string[]
  cta: Cta
  /** Highlighted / recommended plan. */
  featured?: boolean
}

export interface TestimonialProps {
  quote: string
  author: string
  role: string
}

export interface ConstantSet {
  Hero: ComponentType<HeroProps>
  Navbar: ComponentType<NavbarProps>
  ButtonSet: ComponentType<ButtonSetProps>
  PricingCard: ComponentType<PricingCardProps>
  Testimonial: ComponentType<TestimonialProps>
}

export type WeekStatus = 'planned' | 'in-progress' | 'shipped'

export type Phase = 'Setup' | 'Foundations' | 'Expressive' | 'Modern UI' | 'Advanced' | 'Capstone'

/** What a week folder exports from its index.ts once it has been built. */
export interface WeekModule {
  /** Value for data-theme, e.g. "w01". Must match the selector in tokens.css. */
  theme: string
  /** Optional: port the full page too, or leave it out and set `url` on the WeekEntry instead. */
  Page?: LazyExoticComponent<ComponentType>
  constant: ConstantSet
}

export interface WeekEntry {
  /** Two-digit number used in URLs: /w/01 */
  id: string
  number: number
  style: string
  phase: Phase
  brief: string
  status: WeekStatus
  /** Deployed URL of the week's standalone project (Week-1/, Week-2/ ...). */
  url?: string
  module?: WeekModule
}
