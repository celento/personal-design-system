import * as React from 'react'
import { type VariantProps } from 'class-variance-authority'
import { cn } from 'cn'
import { ToggleGroup as ToggleGroupPrimitive } from 'radix-ui'

import { toggleVariants } from '@/components/ui/toggle'
import { useMotionSettings } from '@/lib/motion'

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants> & {
    spacing?: number
    orientation?: 'horizontal' | 'vertical'
  }
>({
  size: 'default',
  variant: 'default',
  spacing: 2,
  orientation: 'horizontal',
})

// Pressing an item swells it and shoves its neighbours aside, hardest next
// to it and barely at all at the ends, before everything settles back.
function nudge(group: HTMLElement, pressed: HTMLElement, vertical: boolean) {
  const items = [
    ...group.querySelectorAll<HTMLElement>('[data-slot="toggle-group-item"]'),
  ]
  const at = items.indexOf(pressed)
  if (at < 0) return
  const options = { duration: 320, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' }
  pressed.animate(
    [{ scale: '0.92' }, { scale: '1.08', offset: 0.45 }, { scale: '1' }],
    options,
  )
  items.forEach((item, i) => {
    if (i === at) return
    const push = (Math.sign(i - at) * 5) / Math.abs(i - at)
    const shift = vertical ? `0 ${push}px` : `${push}px 0`
    item.animate(
      [
        { translate: '0 0' },
        { translate: shift, offset: 0.4 },
        { translate: '0 0' },
      ],
      options,
    )
  })
}

function ToggleGroup({
  className,
  variant,
  size,
  spacing = 2,
  orientation = 'horizontal',
  children,
  onPointerDown,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root> &
  VariantProps<typeof toggleVariants> & {
    spacing?: number
    orientation?: 'horizontal' | 'vertical'
  }) {
  const { enabled } = useMotionSettings()
  return (
    <ToggleGroupPrimitive.Root
      onPointerDown={(event) => {
        const item = (event.target as HTMLElement).closest<HTMLElement>(
          '[data-slot="toggle-group-item"]:not(:disabled)',
        )
        if (enabled && item)
          nudge(event.currentTarget, item, orientation === 'vertical')
        onPointerDown?.(event)
      }}
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      data-spacing={spacing}
      data-orientation={orientation}
      style={{ '--gap': spacing } as React.CSSProperties}
      className={cn(
        'group/toggle-group flex w-fit flex-row items-center gap-[--spacing(var(--gap))] rounded-lg data-[size=sm]:rounded-[min(var(--radius-md),10px)] data-vertical:flex-col data-vertical:items-stretch',
        className,
      )}
      {...props}
    >
      <ToggleGroupContext.Provider
        value={{ variant, size, spacing, orientation }}
      >
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  )
}

function ToggleGroupItem({
  className,
  children,
  variant = 'default',
  size = 'default',
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> &
  VariantProps<typeof toggleVariants>) {
  const context = React.useContext(ToggleGroupContext)

  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      data-variant={context.variant || variant}
      data-size={context.size || size}
      data-spacing={context.spacing}
      className={cn(
        'shrink-0 group-data-[spacing=0]/toggle-group:rounded-none group-data-[spacing=0]/toggle-group:px-2 focus:z-10 focus-visible:z-10 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pr-1.5 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:pl-1.5 group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-l-lg group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-lg group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-r-lg group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-lg group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-l-0 group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-l group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t',
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
}

export { ToggleGroup, ToggleGroupItem }
