import type { ButtonSetProps } from '../../../gallery/types'
import { buttonClass, type ButtonVariant } from './button'

const variants: ButtonVariant[] = ['primary', 'secondary', 'ghost']

/** Every variant in its live state (hover, focus and press it yourself) plus disabled. */
export function ButtonSet({ label }: ButtonSetProps) {
  return (
    <div className="flex flex-col gap-5 p-6">
      {variants.map((variant) => (
        <div key={variant} className="flex flex-col gap-2 @md:flex-row @md:items-center @md:gap-6">
          <span className="w-24 font-mono text-xs tracking-wide text-muted uppercase">{variant}</span>
          <div className="flex flex-wrap items-center gap-3">
            <button type="button" className={buttonClass(variant)}>
              {label}
            </button>
            <button type="button" className={buttonClass(variant, 'sm')}>
              {label}
            </button>
            <button type="button" className={buttonClass(variant)} disabled>
              Disabled
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
