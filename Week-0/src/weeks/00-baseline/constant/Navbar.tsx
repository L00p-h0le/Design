import { useId, useState } from 'react'
import type { NavbarProps } from '../../../gallery/types'
import { buttonClass } from './button'

export function Navbar({ brand, links, cta }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const menuId = useId()

  return (
    <header className="border-b border-border bg-bg">
      <nav aria-label={`${brand} primary`} className="flex h-16 items-center justify-between gap-6 px-6">
        <a href="#" className="font-display text-lg font-semibold tracking-tight">
          {brand}
        </a>

        {/* Wide containers: inline links */}
        <ul className="hidden items-center gap-8 @2xl:flex">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-sm text-muted transition-colors duration-(--dur-fast) hover:text-fg"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {/* Show/hide lives on wrappers: `hidden` and the button's own `inline-flex` both set
              `display`, and whichever comes later in the CSS wins. Never stack two display utilities. */}
          <div className="hidden @2xl:block">
            <a href={cta.href} className={buttonClass('primary', 'sm')}>
              {cta.label}
            </a>
          </div>
          {/* Narrow containers: disclosure menu */}
          <div className="@2xl:hidden">
            <button
              type="button"
              className={buttonClass('ghost', 'sm')}
              aria-expanded={open}
              aria-controls={menuId}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>
      </nav>

      <div id={menuId} hidden={!open} className="border-t border-border px-6 py-4 @2xl:hidden">
        <ul className="flex flex-col gap-1">
          {links.map((link) => (
            <li key={link.label}>
              <a href={link.href} className="block rounded-btn px-2 py-2.5 hover:bg-surface">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a href={cta.href} className={`${buttonClass('primary')} mt-4 w-full`}>
          {cta.label}
        </a>
      </div>
    </header>
  )
}
