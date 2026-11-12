import type {
  ButtonSetProps,
  HeroProps,
  NavbarProps,
  PricingCardProps,
  TestimonialProps,
} from './types'

/*
 * Fixed demo content shared by every week in the gallery.
 * Keep it identical across weeks: only the style should change between frames.
 * The fictional product is "Fieldnote", a notes app for designers.
 */

export const heroContent: HeroProps = {
  eyebrow: 'New · Version 2.0',
  title: 'Capture ideas before they disappear',
  subtitle:
    'Fieldnote is a quiet place for sketches, references and half-formed thoughts, organised the moment you save them.',
  primaryCta: { label: 'Start for free', href: '#' },
  secondaryCta: { label: 'See how it works', href: '#' },
}

export const navbarContent: NavbarProps = {
  brand: 'Fieldnote',
  links: [
    { label: 'Product', href: '#' },
    { label: 'Pricing', href: '#' },
    { label: 'Journal', href: '#' },
    { label: 'About', href: '#' },
  ],
  cta: { label: 'Sign up', href: '#' },
}

export const buttonContent: ButtonSetProps = {
  label: 'Get started',
}

export const pricingContent: PricingCardProps[] = [
  {
    plan: 'Starter',
    price: '$0',
    period: '/month',
    description: 'For trying things out.',
    features: ['100 notes', '1 board', 'Web app'],
    cta: { label: 'Start free', href: '#' },
  },
  {
    plan: 'Pro',
    price: '$12',
    period: '/month',
    description: 'For working designers.',
    features: ['Unlimited notes', 'Unlimited boards', 'Desktop and mobile apps', 'Version history'],
    cta: { label: 'Choose Pro', href: '#' },
    featured: true,
  },
]

export const testimonialContent: TestimonialProps = {
  quote:
    'It replaced three apps and a drawer full of sticky notes. I actually find things again.',
  author: 'Amara Okafor',
  role: 'Product Designer, Lumen',
}
