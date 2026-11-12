import { AnimatePresence, motion } from 'motion/react'
import { useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { Link, useSearchParams } from 'react-router'
import { EASE_OUT } from '../lib/motion'
import { buttonContent, heroContent, navbarContent, pricingContent, testimonialContent } from './content'
import { builtWeeks, weeks } from './registry'
import type { ConstantSet, WeekEntry } from './types'

/* ---------- configuration ---------- */

const COMPONENTS = [
  { key: 'hero', label: 'Hero', wide: true, minCol: '' },
  { key: 'navbar', label: 'Navbar', wide: true, minCol: '' },
  { key: 'buttons', label: 'Buttons', wide: false, minCol: '26rem' },
  { key: 'pricing', label: 'Pricing', wide: false, minCol: '40rem' },
  { key: 'testimonial', label: 'Testimonial', wide: false, minCol: '26rem' },
] as const

type ComponentKey = (typeof COMPONENTS)[number]['key']

const WIDTHS = [
  { key: 'fit', label: 'Fit', px: undefined },
  { key: '390', label: '390', px: 390 },
  { key: '768', label: '768', px: 768 },
  { key: '1280', label: '1280', px: 1280 },
] as const

type WidthKey = (typeof WIDTHS)[number]['key']

function renderComponent(key: ComponentKey, set: ConstantSet): ReactNode {
  switch (key) {
    case 'hero':
      return <set.Hero {...heroContent} headingLevel={3} />
    case 'navbar':
      return <set.Navbar {...navbarContent} />
    case 'buttons':
      return <set.ButtonSet {...buttonContent} />
    case 'pricing':
      return (
        <div className="grid gap-6 p-6 @2xl:grid-cols-2">
          {pricingContent.map((plan) => (
            <set.PricingCard key={plan.plan} {...plan} />
          ))}
        </div>
      )
    case 'testimonial':
      return <set.Testimonial {...testimonialContent} />
  }
}

/* ---------- page ---------- */

export function GalleryPage() {
  const [params, setParams] = useSearchParams()
  const active = (COMPONENTS.find((c) => c.key === params.get('c'))?.key ?? 'hero') as ComponentKey
  const width = (WIDTHS.find((w) => w.key === params.get('w'))?.key ?? 'fit') as WidthKey
  const [hidden, setHidden] = useState<Set<string>>(new Set())

  const setParam = (name: string, value: string) =>
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        next.set(name, value)
        return next
      },
      { replace: true },
    )

  const component = COMPONENTS.find((c) => c.key === active)!
  const px = WIDTHS.find((w) => w.key === width)!.px
  const visible = builtWeeks.filter((w) => !hidden.has(w.id))
  const nextUp = weeks.find((w) => !w.module)
  const stacked = component.wide || px !== undefined

  const toggleWeek = (id: string) =>
    setHidden((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  return (
    <>
      <title>Gallery | Design Lab</title>

      <header className="max-w-3xl">
        <h1 className="font-display text-hero font-semibold tracking-tight">Gallery</h1>
        <p className="mt-6 max-w-[60ch] text-lg/relaxed text-muted">
          The same five components with the same content, rebuilt in every style. Compare them side by side to
          see what each style changes: type, color, spacing, shape and motion.
        </p>
      </header>

      {/* Controls */}
      <div className="sticky top-14 z-30 -mx-4 mt-12 border-b border-border bg-bg/85 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <ComponentTabs active={active} onChange={(key) => setParam('c', key)} />
          <WidthPicker value={width} onChange={(key) => setParam('w', key)} />
        </div>

        {builtWeeks.length > 1 && (
          <div role="group" aria-label="Show weeks" className="mt-3 flex flex-wrap gap-1.5">
            {builtWeeks.map((w) => {
              const on = !hidden.has(w.id)
              return (
                <button
                  key={w.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggleWeek(w.id)}
                  className={`rounded-full border px-3 py-1 text-xs transition-colors duration-(--dur-fast) ${
                    on ? 'border-fg/30 bg-surface text-fg' : 'border-border text-muted line-through'
                  }`}
                >
                  <span className="font-mono">{w.id}</span> {w.style}
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* Frames */}
      <div role="tabpanel" id="gallery-panel" aria-labelledby={`tab-${active}`} className="mt-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${active}-${width}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE_OUT }}
            className={stacked ? 'flex flex-col gap-8' : 'grid gap-6'}
            style={
              stacked
                ? undefined
                : { gridTemplateColumns: `repeat(auto-fill, minmax(min(100%, ${component.minCol}), 1fr))` }
            }
          >
            {visible.map((week) => (
              <Frame key={week.id} week={week} theme={week.module.theme} px={px} label={component.label}>
                {renderComponent(active, week.module.constant)}
              </Frame>
            ))}

            {visible.length === 0 && (
              <p className="rounded-card border border-dashed border-border p-10 text-center text-muted">
                All weeks are hidden. Turn one back on above.
              </p>
            )}

            {nextUp && <NextUp week={nextUp} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  )
}

/* ---------- pieces ---------- */

function Frame({
  week,
  theme,
  px,
  label,
  children,
}: {
  week: WeekEntry
  theme: string
  px: number | undefined
  label: string
  children: ReactNode
}) {
  const headingId = `frame-${week.id}`
  return (
    <section
      aria-labelledby={headingId}
      className="overflow-hidden rounded-card border border-border bg-surface shadow-card"
    >
      <header className="flex items-center justify-between gap-4 border-b border-border px-4 py-2.5">
        <h2 id={headingId} className="flex items-baseline gap-2 text-sm font-medium">
          <span className="font-mono text-muted">{week.id}</span>
          {week.style}
        </h2>
        <div className="flex items-center gap-4 text-sm">
          {px && <span className="font-mono text-xs text-muted">{px}px</span>}
          {week.module?.Page ? (
            <Link to={`/w/${week.id}`} className="text-accent hover:underline">
              Open page →
            </Link>
          ) : week.url ? (
            <a href={week.url} className="text-accent hover:underline">
              Live site ↗
            </a>
          ) : null}
        </div>
      </header>

      {/* Scrolls sideways when a fixed width is wider than the screen. Focusable so keyboard users can scroll it. */}
      <div
        className="overflow-x-auto"
        tabIndex={px ? 0 : undefined}
        aria-label={px ? `${week.style} ${label} preview at ${px} pixels, scrollable` : undefined}
        role={px ? 'region' : undefined}
      >
        <div
          data-theme={theme}
          className={`@container ${px ? 'mx-auto border-x border-dashed border-border' : ''}`}
          style={px ? { width: px } : undefined}
        >
          {children}
        </div>
      </div>
    </section>
  )
}

function NextUp({ week }: { week: WeekEntry }) {
  return (
    <div className="grid min-h-40 place-items-center rounded-card border border-dashed border-border p-8 text-center">
      <div>
        <p className="font-mono text-sm text-muted">Next up · Week {week.id}</p>
        <p className="mt-1 font-medium">{week.style}</p>
        <p className="mt-1 text-sm text-muted">Joins the gallery once its Constant Set is built.</p>
      </div>
    </div>
  )
}

function ComponentTabs({ active, onChange }: { active: ComponentKey; onChange: (key: ComponentKey) => void }) {
  const refs = useRef<(HTMLButtonElement | null)[]>([])

  // Arrow keys move between tabs (WAI-ARIA tabs pattern with automatic activation).
  const onKeyDown = (e: KeyboardEvent, index: number) => {
    const last = COMPONENTS.length - 1
    const target =
      e.key === 'ArrowRight' ? (index === last ? 0 : index + 1)
      : e.key === 'ArrowLeft' ? (index === 0 ? last : index - 1)
      : e.key === 'Home' ? 0
      : e.key === 'End' ? last
      : null
    if (target === null) return
    e.preventDefault()
    refs.current[target]?.focus()
    onChange(COMPONENTS[target].key)
  }

  return (
    <div
      role="tablist"
      aria-label="Component"
      className="flex max-w-full overflow-x-auto rounded-btn border border-border bg-surface p-1"
    >
      {COMPONENTS.map((c, i) => {
        const selected = c.key === active
        return (
          <button
            key={c.key}
            ref={(el) => {
              refs.current[i] = el
            }}
            type="button"
            role="tab"
            id={`tab-${c.key}`}
            aria-selected={selected}
            aria-controls="gallery-panel"
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(c.key)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={`relative shrink-0 rounded-[calc(var(--radius-btn)-2px)] px-3 py-1.5 text-sm transition-colors duration-(--dur-fast) ${
              selected ? 'text-fg' : 'text-muted hover:text-fg'
            }`}
          >
            {selected && (
              <motion.span
                layoutId="gallery-tab-pill"
                aria-hidden="true"
                className="absolute inset-0 rounded-[inherit] bg-bg shadow-card ring-1 ring-border"
                transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
              />
            )}
            <span className="relative">{c.label}</span>
          </button>
        )
      })}
    </div>
  )
}

function WidthPicker({ value, onChange }: { value: WidthKey; onChange: (key: WidthKey) => void }) {
  return (
    <fieldset className="flex items-center gap-2">
      <legend className="sr-only">Frame width</legend>
      <span aria-hidden="true" className="text-xs text-muted">
        Width
      </span>
      <div className="flex rounded-btn border border-border bg-surface p-1">
        {WIDTHS.map((w) => (
          <label
            key={w.key}
            className="cursor-pointer rounded-[calc(var(--radius-btn)-2px)] px-2.5 py-1 font-mono text-xs text-muted transition-colors duration-(--dur-fast) hover:text-fg has-checked:bg-bg has-checked:text-fg has-checked:shadow-card has-focus-visible:outline-2 has-focus-visible:outline-ring"
          >
            <input
              type="radio"
              name="frame-width"
              value={w.key}
              checked={value === w.key}
              onChange={() => onChange(w.key)}
              className="sr-only"
            />
            {w.label}
            {w.px && <span className="sr-only"> pixels</span>}
          </label>
        ))}
      </div>
    </fieldset>
  )
}
