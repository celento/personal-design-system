import * as React from 'react'
import { cn } from 'cn'

// A value with a copy button. On copy the two pages of the icon slide into
// one and turn into a check that draws itself, and a band of light passes
// through the value.
function CopyField({
  value,
  label = 'Copy',
  className,
  ...props
}: Omit<React.ComponentProps<'div'>, 'children'> & {
  value: string
  label?: string
}) {
  const [copied, setCopied] = React.useState(false)
  const timer = React.useRef<number>(undefined)
  React.useEffect(() => () => window.clearTimeout(timer.current), [])
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      return
    }
    setCopied(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 1800)
  }
  return (
    <div
      data-slot="copy-field"
      data-copied={copied || undefined}
      className={cn('flex w-full min-w-0 items-center', className)}
      {...props}
    >
      <span data-slot="copy-field-value" className="min-w-0 flex-1 truncate">
        {value}
      </span>
      <button
        type="button"
        data-slot="copy-field-button"
        aria-label={copied ? 'Copied' : label}
        onClick={copy}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect data-part="back" x="8" y="8" width="12" height="12" rx="2.5" />
          <path
            data-part="front"
            d="M16 8V6.5A2.5 2.5 0 0 0 13.5 4h-7A2.5 2.5 0 0 0 4 6.5v7A2.5 2.5 0 0 0 6.5 16H8"
          />
          <path data-part="check" d="M6 12.5l4 4L18 8.5" pathLength={1} />
        </svg>
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? 'Copied to clipboard' : ''}
      </span>
    </div>
  )
}

export { CopyField }
