import { useRef } from 'react'
import { buttonContent, heroContent, navbarContent, pricingContent, testimonialContent } from '../../gallery/content'
import { gsap, useGSAP } from '../../lib/gsap'
import { MOTION_OK } from '../../lib/motion'
import { ButtonSet } from './constant/ButtonSet'
import { Hero } from './constant/Hero'
import { Navbar } from './constant/Navbar'
import { PricingCard } from './constant/PricingCard'
import { Testimonial } from './constant/Testimonial'

/*
 * Week 00 page: the Constant Set assembled into a plain landing page.
 * It also serves as the reference for the GSAP pattern every week should use:
 *   useGSAP + scope ref + matchMedia(MOTION_OK) + animate FROM hidden.
 */
export default function Page() {
  const scope = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        scope.current?.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
          gsap.from(el, {
            y: 24,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          })
        })
      })
      return () => mm.revert()
    },
    { scope },
  )

  return (
    <div ref={scope} data-theme="w00" className="@container min-h-dvh">
      <title>Week 00 · Baseline | Design Lab</title>

      <div className="sticky top-0 z-10">
        <Navbar {...navbarContent} />
      </div>

      <main>
        <Hero {...heroContent} />

        <section aria-labelledby="pricing-heading" className="border-t border-border px-6 py-20 @3xl:px-12">
          <h2 id="pricing-heading" data-reveal className="font-display text-title font-semibold">
            Simple pricing
          </h2>
          <div className="mt-10 grid max-w-3xl gap-6 @2xl:grid-cols-2">
            {pricingContent.map((plan) => (
              <div key={plan.plan} data-reveal>
                <PricingCard {...plan} />
              </div>
            ))}
          </div>
        </section>

        <section aria-label="Testimonial" className="border-t border-border bg-surface px-0 py-12 @3xl:px-6">
          <div data-reveal>
            <Testimonial {...testimonialContent} />
          </div>
        </section>

        <section aria-labelledby="buttons-heading" className="border-t border-border px-6 py-20 @3xl:px-12">
          <h2 id="buttons-heading" data-reveal className="font-display text-title font-semibold">
            Button states
          </h2>
          <div data-reveal className="-mx-6 mt-4">
            <ButtonSet {...buttonContent} />
          </div>
        </section>
      </main>

      <footer className="border-t border-border px-6 py-10 text-sm text-muted @3xl:px-12">
        Week 00 · Baseline wireframe kit
      </footer>
    </div>
  )
}
