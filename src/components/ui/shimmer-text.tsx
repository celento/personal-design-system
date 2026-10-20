import * as React from 'react'
import { cn } from 'cn'

// Loading text with a band of ink sweeping across it on a loop. For short
// status lines while something works, like "Reading files…".
function ShimmerText({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="shimmer-text"
      className={cn('inline-block', className)}
      {...props}
    />
  )
}

export { ShimmerText }
