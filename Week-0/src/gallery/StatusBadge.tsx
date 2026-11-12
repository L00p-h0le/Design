import type { WeekStatus } from './types'

const styles: Record<WeekStatus, { label: string; dot: string; text: string }> = {
  shipped: { label: 'Shipped', dot: 'bg-accent', text: 'text-fg' },
  'in-progress': { label: 'In progress', dot: 'bg-accent animate-pulse', text: 'text-fg' },
  planned: { label: 'Planned', dot: 'border border-muted', text: 'text-muted' },
}

/** The status is written as text, so it never relies on the dot's color alone. */
export function StatusBadge({ status }: { status: WeekStatus }) {
  const s = styles[status]
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs ${s.text}`}>
      <span aria-hidden="true" className={`size-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  )
}
