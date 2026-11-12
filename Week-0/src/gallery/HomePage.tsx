import { motion } from 'motion/react'
import { Link } from 'react-router'
import { EASE_OUT } from '../lib/motion'
import { weeks } from './registry'
import { StatusBadge } from './StatusBadge'
import type { Phase, WeekEntry } from './types'

const phases: Phase[] = ['Setup', 'Foundations', 'Expressive', 'Modern UI', 'Advanced', 'Capstone']

export function HomePage() {
  const shipped = weeks.filter((w) => w.status === 'shipped').length
  const progress = Math.round((shipped / weeks.length) * 100)

  return (
    <>
      <title>Design Lab</title>

      <section className="max-w-3xl">
        <p className="font-mono text-sm text-muted">Design engineering · 2026–27</p>
        <h1 className="mt-4 font-display text-hero font-semibold tracking-tight">Design Lab</h1>
        <p className="mt-6 max-w-[60ch] text-lg/relaxed text-muted">
          One design style a week, built for real. Each week also rebuilds the same five components, so the
          gallery shows exactly what changes from one style to the next.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <div className="min-w-56 flex-1 sm:max-w-xs">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span className="font-mono text-muted">
                {shipped}/{weeks.length} weeks
              </span>
            </div>
            <div
              role="progressbar"
              aria-label="Weeks shipped"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              className="mt-2 h-1.5 overflow-hidden rounded-full bg-border"
            >
              <motion.div
                className="h-full origin-left rounded-full bg-accent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: progress / 100 }}
                transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.2 }}
              />
            </div>
          </div>
          <Link
            to="/gallery"
            className="inline-flex h-11 items-center rounded-btn bg-accent px-5 font-medium text-accent-fg transition-colors duration-(--dur-fast) hover:bg-accent/85"
          >
            Open gallery →
          </Link>
        </div>
      </section>

      <div className="mt-20 flex flex-col gap-14">
        {phases.map((phase) => {
          const list = weeks.filter((w) => w.phase === phase)
          return (
            <section key={phase} aria-labelledby={`phase-${phase}`}>
              <h2 id={`phase-${phase}`} className="font-mono text-xs tracking-widest text-muted uppercase">
                {phase}
              </h2>
              <ul className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(min(100%,16rem),1fr))] gap-3">
                {list.map((week, i) => (
                  <motion.li
                    key={week.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.05 * i }}
                  >
                    <WeekCard week={week} />
                  </motion.li>
                ))}
              </ul>
            </section>
          )
        })}
      </div>
    </>
  )
}

function WeekCard({ week }: { week: WeekEntry }) {
  const body = (
    <>
      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-3xl leading-none text-muted tabular-nums">{week.id}</span>
        <StatusBadge status={week.status} />
      </div>
      <h3 className="mt-6 font-semibold">{week.style}</h3>
      <p className="mt-1 text-sm text-muted">{week.brief}</p>
    </>
  )

  const base = 'flex h-full flex-col rounded-card border p-5'
  const live = `${base} group border-border bg-surface shadow-card transition-[border-color,transform] duration-(--dur-base) ease-style hover:-translate-y-0.5 hover:border-accent/50`
  const cta = (label: string, arrow: string) => (
    <span className="mt-4 text-sm text-accent">
      {label} <span className="inline-block transition-transform group-hover:translate-x-0.5">{arrow}</span>
    </span>
  )

  // Ported page inside the lab
  if (week.module?.Page) {
    return (
      <Link to={`/w/${week.id}`} className={live}>
        {body}
        {cta('View page', '→')}
      </Link>
    )
  }

  // Standalone project, deployed separately
  if (week.url) {
    return (
      <a href={week.url} className={live}>
        {body}
        {cta('Open live site', '↗')}
      </a>
    )
  }

  return <div className={`${base} border-dashed border-border`}>{body}</div>
}
