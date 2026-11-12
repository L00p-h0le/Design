import type { HeroProps } from '../../../gallery/types'
import { buttonClass } from './button'

export function Hero({ eyebrow, title, subtitle, primaryCta, secondaryCta, headingLevel = 1 }: HeroProps) {
  const Heading = `h${headingLevel}` as const

  return (
    <section className="px-6 py-16 @3xl:px-12 @3xl:py-28">
      <div className="max-w-3xl">
        {eyebrow && (
          <p className="inline-block rounded-btn border border-border px-2.5 py-1 text-sm text-muted">
            {eyebrow}
          </p>
        )}
        <Heading className="mt-6 font-display text-hero font-semibold tracking-tight">{title}</Heading>
        <p className="mt-6 max-w-[55ch] text-lg/relaxed text-muted">{subtitle}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a href={primaryCta.href} className={buttonClass('primary')}>
            {primaryCta.label}
          </a>
          {secondaryCta && (
            <a href={secondaryCta.href} className={buttonClass('secondary')}>
              {secondaryCta.label}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
