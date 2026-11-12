import { Link } from 'react-router'

export function NotFound() {
  return (
    <div className="py-24 text-center">
      <title>Not found | Design Lab</title>
      <p className="font-mono text-sm text-muted">404</p>
      <h1 className="mt-2 text-2xl font-semibold">This page doesn't exist</h1>
      <Link to="/" className="mt-6 inline-block text-accent hover:underline">
        ← Back to the lab
      </Link>
    </div>
  )
}
