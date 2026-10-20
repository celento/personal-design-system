'use client'

import * as React from 'react'
import { cn } from 'cn'
import { Progress as ProgressPrimitive } from 'radix-ui'

// Progress is a row of ticks. When the value changes, the ticks between the
// old and new value light (or dim) one after another, starting from the
// old value.
function Progress({
  className,
  value,
  ticks = 32,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & { ticks?: number }) {
  const lit = Math.round(((value ?? 0) / 100) * ticks)
  const [shown, setShown] = React.useState(lit)
  const [from, setFrom] = React.useState(lit)
  if (lit !== shown) {
    setFrom(shown)
    setShown(lit)
  }
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      value={value}
      className={cn('relative flex w-full items-center', className)}
      {...props}
    >
      {Array.from({ length: ticks }, (_, i) => {
        const step = lit >= from ? i - from : from - 1 - i
        return (
          <span
            key={i}
            data-slot="progress-tick"
            data-on={i < lit || undefined}
            style={{ '--step': Math.max(0, step) } as React.CSSProperties}
          />
        )
      })}
    </ProgressPrimitive.Root>
  )
}

export { Progress }
