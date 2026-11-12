import type { PricingCardProps } from '../../../gallery/types'
import { buttonClass } from './button'

export function PricingCard({ plan, price, period, description, features, cta, featured }: PricingCardProps) {
  return (
    <article
      className={`flex h-full flex-col rounded-card bg-bg p-6 shadow-card ${
        featured ? 'border-2 border-fg' : 'border border-border'
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-lg font-semibold">{plan}</h3>
        {featured && (
          <span className="rounded-btn bg-accent px-2 py-0.5 text-xs font-medium text-accent-fg">
            Recommended
          </span>
        )}
      </div>
      <p className="mt-1 text-sm text-muted">{description}</p>

      <p className="mt-6 flex items-baseline gap-1">
        <span className="font-display text-4xl font-semibold tracking-tight">{price}</span>
        <span className="text-sm text-muted">{period}</span>
      </p>

      <ul className="mt-6 flex flex-1 flex-col gap-3 text-sm">
        {features.map((feature) => (
          <li key={feature} className="flex gap-3">
            <svg viewBox="0 0 16 16" aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-muted">
              <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="1.75" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      <a href={cta.href} className={`${buttonClass(featured ? 'primary' : 'secondary')} mt-8 w-full`}>
        {cta.label}
      </a>
    </article>
  )
}
