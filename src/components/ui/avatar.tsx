import * as React from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from 'cn'
import { Avatar as AvatarPrimitive } from 'radix-ui'
import { useMotionSettings } from '@/lib/motion'

function Avatar({
  className,
  size = 'default',
  name,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> & {
  size?: 'default' | 'sm' | 'lg'
  name?: string
}) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      data-name={name}
      role={name ? 'img' : undefined}
      aria-label={name}
      className={cn(
        'group/avatar relative flex size-8 shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken data-[size=lg]:size-10 data-[size=sm]:size-6 dark:after:mix-blend-lighten',
        className,
      )}
      {...props}
    />
  )
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(
        'aspect-square size-full rounded-full object-cover',
        className,
      )}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        'flex size-full items-center justify-center rounded-full bg-muted text-sm text-muted-foreground group-data-[size=sm]/avatar:text-xs',
        className,
      )}
      {...props}
    />
  )
}

function AvatarBadge({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        'absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground bg-blend-color ring-2 ring-background select-none',
        'group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden',
        'group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2',
        'group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2',
        className,
      )}
      {...props}
    />
  )
}

// Pointing along the group lifts the faces nearest the pointer, falling off
// across their neighbours, and one name label slides to whoever is closest.
// Names come from each avatar's `name`.
function AvatarGroup({
  className,
  children,
  onPointerMove,
  onPointerLeave,
  ...props
}: React.ComponentProps<'div'>) {
  const [label, setLabel] = React.useState<{ name: string; x: number }>()
  const { enabled } = useMotionSettings()
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        'group/avatar-group relative flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background',
        className,
      )}
      onPointerMove={(event) => {
        onPointerMove?.(event)
        if (event.pointerType !== 'mouse') return
        const group = event.currentTarget
        const left = group.getBoundingClientRect().left
        let nearest: { name: string; x: number } | undefined
        let best = Infinity
        group
          .querySelectorAll<HTMLElement>('[data-slot="avatar"]')
          .forEach((avatar) => {
            const box = avatar.getBoundingClientRect()
            const mid = box.left + box.width / 2
            const distance = Math.abs(event.clientX - mid)
            const lift = enabled ? Math.max(0, 1 - distance / 56) : 0
            avatar.style.setProperty('--lift', lift.toFixed(3))
            if (distance < best && avatar.dataset.name) {
              best = distance
              nearest = { name: avatar.dataset.name, x: mid - left }
            }
          })
        setLabel((current) =>
          current?.name === nearest?.name ? current : nearest,
        )
      }}
      onPointerLeave={(event) => {
        onPointerLeave?.(event)
        event.currentTarget
          .querySelectorAll<HTMLElement>('[data-slot="avatar"]')
          .forEach((avatar) => avatar.style.setProperty('--lift', '0'))
        setLabel(undefined)
      }}
      {...props}
    >
      {children}
      <AnimatePresence>
        {label && (
          <motion.span
            data-slot="avatar-group-label"
            aria-hidden="true"
            initial={{ opacity: 0, y: 4, x: label.x }}
            animate={{ opacity: 1, y: 0, x: label.x }}
            exit={{ opacity: 0, y: 4 }}
            transition={
              enabled
                ? { type: 'spring', duration: 0.3, bounce: 0.15 }
                : { duration: 0 }
            }
          >
            {label.name}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}

function AvatarGroupCount({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        'relative flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm text-muted-foreground ring-2 ring-background group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=sm]/avatar-group:size-6 [&>svg]:size-4 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3',
        className,
      )}
      {...props}
    />
  )
}

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarBadge,
}
