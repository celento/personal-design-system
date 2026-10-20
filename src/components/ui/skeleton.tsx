import { cn } from 'cn'

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cn('animate-pulse rounded-md bg-muted', className)}
      {...props}
    />
  )
}

// Wraps content that replaces a skeleton. Pieces ease up out of a soft blur
// top to bottom, in `order`.
function SkeletonReveal({
  className,
  order = 0,
  style,
  ...props
}: React.ComponentProps<'div'> & { order?: number }) {
  return (
    <div
      data-slot="skeleton-reveal"
      className={className}
      style={{ '--order': order, ...style } as React.CSSProperties}
      {...props}
    />
  )
}

export { Skeleton, SkeletonReveal }
