import { NavLink, Outlet } from 'react-router'

const navClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-btn px-3 py-1.5 text-sm transition-colors duration-(--dur-fast) ${
    isActive ? 'bg-surface text-fg shadow-card' : 'text-muted hover:text-fg'
  }`

export function LabLayout() {
  return (
    <div data-theme="lab" className="min-h-dvh">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-btn focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-fg"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <NavLink to="/" className="flex items-baseline gap-2 font-semibold tracking-tight">
            Design Lab
            <span className="hidden font-mono text-xs font-normal text-muted sm:inline">20 weeks · 18 styles</span>
          </NavLink>
          <nav aria-label="Lab">
            <ul className="flex items-center gap-1">
              <li>
                <NavLink to="/" end className={navClass}>
                  Weeks
                </NavLink>
              </li>
              <li>
                <NavLink to="/gallery" className={navClass}>
                  Gallery
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main id="content" className="mx-auto max-w-7xl px-4 pt-12 pb-24 sm:px-6 sm:pt-16">
        <Outlet />
      </main>
    </div>
  )
}
