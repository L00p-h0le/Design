import { Suspense } from 'react'
import { Link, useParams } from 'react-router'
import { findWeek } from './registry'

/** /w/:week renders the week's own Page full-bleed, with a small way back to the lab. */
export function WeekPage() {
  const { week: id } = useParams()
  const week = findWeek(id)

  const Page = week?.module?.Page

  if (!Page) {
    return (
      <div data-theme="lab" className="grid min-h-dvh place-items-center px-6 text-center">
        <title>Week {id} | Design Lab</title>
        <div>
          <p className="font-mono text-sm text-muted">Week {id}</p>
          <h1 className="mt-2 text-2xl font-semibold">
            {!week ? 'No such week' : week.url ? `${week.style} lives in its own project` : `${week.style} isn't built yet`}
          </h1>
          {week?.url && (
            <a href={week.url} className="mt-6 inline-block text-accent hover:underline">
              Open the live site ↗
            </a>
          )}
          <p className="mt-4">
            <Link to="/" className="text-accent hover:underline">
              ← Back to the lab
            </Link>
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Suspense fallback={<div className="min-h-dvh" aria-busy="true" />}>
        <Page />
      </Suspense>
      <Link
        to="/"
        data-theme="lab"
        className="fixed bottom-4 left-4 z-50 rounded-full border border-border px-3.5 py-2 text-sm shadow-card transition-transform duration-(--dur-fast) hover:-translate-y-0.5"
      >
        ← Lab
      </Link>
    </>
  )
}
