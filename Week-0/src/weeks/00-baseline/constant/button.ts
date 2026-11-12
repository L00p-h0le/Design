/*
 * Shared button styles for this week. Links styled as buttons (Hero, Navbar CTAs)
 * and real <button>s both use these, so every call-to-action looks the same.
 *
 * `enabled:` keeps hover/press effects off disabled buttons.
 */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'sm' | 'md'

const base =
  'inline-flex items-center justify-center gap-2 rounded-btn font-medium whitespace-nowrap select-none ' +
  'transition-[background-color,border-color,color,transform] duration-(--dur-fast) ease-style ' +
  'disabled:cursor-not-allowed disabled:opacity-40 active:translate-y-px disabled:active:translate-y-0'

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-3.5 text-sm',
  md: 'h-11 px-5 text-base', // 44px tall = minimum comfortable touch target
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-accent-fg hover:bg-accent/85 disabled:hover:bg-accent',
  secondary:
    'border border-border bg-bg text-fg hover:border-fg/40 hover:bg-surface disabled:hover:border-border disabled:hover:bg-bg',
  ghost: 'text-fg hover:bg-surface disabled:hover:bg-transparent',
}

export function buttonClass(variant: ButtonVariant = 'primary', size: ButtonSize = 'md') {
  return `${base} ${sizes[size]} ${variants[variant]}`
}
