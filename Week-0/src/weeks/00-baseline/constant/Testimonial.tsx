import type { TestimonialProps } from '../../../gallery/types'

export function Testimonial({ quote, author, role }: TestimonialProps) {
  const initials = author
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)

  return (
    <figure className="max-w-2xl p-6 @xl:p-10">
      <blockquote className="font-display text-xl/snug font-medium @xl:text-2xl/snug">
        <p>“{quote}”</p>
      </blockquote>
      <figcaption className="mt-8 flex items-center gap-4">
        <span
          aria-hidden="true"
          className="grid size-11 place-items-center rounded-full border border-border bg-bg text-sm font-semibold text-muted"
        >
          {initials}
        </span>
        <span className="flex flex-col">
          <span className="font-medium">{author}</span>
          <span className="text-sm text-muted">{role}</span>
        </span>
      </figcaption>
    </figure>
  )
}
