import type { WeekEntry } from './types'
import { baseline } from '../weeks/00-baseline'

/*
 * Single source of truth for every week.
 * When you start a week: set status to 'in-progress' and attach `module`.
 * When you finish it: set status to 'shipped'.
 * Keep this in sync with the Progress Tracker in /CLAUDE.md.
 */
export const weeks: WeekEntry[] = [
  { id: '00', number: 0, style: 'Baseline', phase: 'Setup', brief: 'Wireframe reference kit and lab setup', status: 'shipped', module: baseline },
  { id: '01', number: 1, style: 'Minimalism', phase: 'Foundations', brief: 'Architecture studio portfolio', status: 'planned' },
  { id: '02', number: 2, style: 'Swiss / International', phase: 'Foundations', brief: 'Design conference site', status: 'planned' },
  { id: '03', number: 3, style: 'Editorial', phase: 'Foundations', brief: 'Long-form magazine feature', status: 'planned' },
  { id: '04', number: 4, style: 'Bauhaus', phase: 'Foundations', brief: 'Art school exhibition', status: 'planned' },
  { id: '05', number: 5, style: 'Brutalism', phase: 'Expressive', brief: 'Indie record label', status: 'planned' },
  { id: '06', number: 6, style: 'Neo-Brutalism', phase: 'Expressive', brief: 'Productivity SaaS landing', status: 'planned' },
  { id: '07', number: 7, style: 'Memphis / 80s', phase: 'Expressive', brief: "Kids' creative app", status: 'planned' },
  { id: '08', number: 8, style: 'Y2K / Retro Web', phase: 'Expressive', brief: 'Music streaming promo', status: 'planned' },
  { id: '09', number: 9, style: 'Art Deco', phase: 'Expressive', brief: 'Luxury hotel', status: 'planned' },
  { id: '10', number: 10, style: 'Bento Grid', phase: 'Modern UI', brief: 'Product features page', status: 'planned' },
  { id: '11', number: 11, style: 'Glassmorphism', phase: 'Modern UI', brief: 'Weather app', status: 'planned' },
  { id: '12', number: 12, style: 'Dark SaaS', phase: 'Modern UI', brief: 'Developer tool landing', status: 'planned' },
  { id: '13', number: 13, style: 'Neumorphism → Clay', phase: 'Modern UI', brief: 'Smart-home control panel', status: 'planned' },
  { id: '14', number: 14, style: 'Kinetic Typography', phase: 'Advanced', brief: 'Film festival manifesto', status: 'planned' },
  { id: '15', number: 15, style: 'Organic / Japandi', phase: 'Advanced', brief: 'Tea brand', status: 'planned' },
  { id: '16', number: 16, style: 'Cyberpunk / Terminal', phase: 'Advanced', brief: 'Hackathon site', status: 'planned' },
  { id: '17', number: 17, style: 'Maximalism', phase: 'Advanced', brief: 'Streetwear drop', status: 'planned' },
  { id: '18', number: 18, style: '3D / WebGL', phase: 'Advanced', brief: 'Product showcase', status: 'planned' },
  { id: '19', number: 19, style: 'Your Own Style', phase: 'Capstone', brief: 'Personal portfolio', status: 'planned' },
]

/** Weeks that have a Constant Set to show in the gallery. */
export const builtWeeks = weeks.filter(
  (w): w is WeekEntry & { module: NonNullable<WeekEntry['module']> } => Boolean(w.module),
)

export const findWeek = (id: string | undefined) => weeks.find((w) => w.id === id)
