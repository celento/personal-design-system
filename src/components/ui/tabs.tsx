import * as React from 'react'
import { animate, motion, useMotionValue, useTransform } from 'motion/react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'cn'
import { Tabs as TabsPrimitive } from 'radix-ui'
import { useMotionSettings } from '@/lib/motion'
const TabsContext = React.createContext({ value: '', id: '' })
const TabsListContext = React.createContext<string | null>('default')
function Tabs({
  className,
  orientation = 'horizontal',
  value,
  defaultValue,
  onValueChange,
  children,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  const [internal, setInternal] = React.useState(defaultValue ?? '')
  const id = React.useId()
  const selected = value ?? internal
  return (
    <TabsContext.Provider value={{ value: selected, id }}>
      <TabsPrimitive.Root
        data-slot="tabs"
        orientation={orientation}
        value={selected}
        onValueChange={(v) => {
          setInternal(v)
          onValueChange?.(v)
        }}
        className={cn(
          'group/tabs flex gap-2 data-horizontal:flex-col',
          className,
        )}
        {...props}
      >
        {children}
      </TabsPrimitive.Root>
    </TabsContext.Provider>
  )
}
const tabsListVariants = cva(
  'relative inline-flex w-fit items-center justify-center gap-1 rounded-full p-1 text-muted-foreground',
  {
    variants: {
      variant: {
        default: 'bg-muted',
        line: 'bg-transparent',
        icons: 'bg-muted',
      },
    },
    defaultVariants: { variant: 'default' },
  },
)
// The indicator moves in two phases: the edge on the side it is heading
// leaves first, the indicator stretches across both tabs, then the far edge
// catches up and overshoots a little as it lands.
function useStretchIndicator(
  list: React.RefObject<HTMLDivElement | null>,
  value: string,
  enabled: boolean,
) {
  const left = useMotionValue(0)
  const right = useMotionValue(0)
  const opacity = useMotionValue(0)
  const width = useTransform(() => right.get() - left.get())
  const placed = React.useRef(false)
  const measure = React.useCallback(() => {
    const active = list.current?.querySelector<HTMLElement>(
      '[data-slot="tabs-trigger"][data-state="active"]',
    )
    return active
      ? { l: active.offsetLeft, r: active.offsetLeft + active.offsetWidth }
      : null
  }, [list])
  React.useLayoutEffect(() => {
    const box = measure()
    if (!box) return
    if (!placed.current || !enabled) {
      left.jump(box.l)
      right.jump(box.r)
      opacity.jump(1)
      placed.current = true
      return
    }
    const forward = box.l > left.get()
    const lead = { type: 'spring', stiffness: 560, damping: 40 } as const
    const trail = {
      type: 'spring',
      stiffness: 320,
      damping: 25,
      delay: 0.04,
    } as const
    const a = animate(left, box.l, forward ? trail : lead)
    const b = animate(right, box.r, forward ? lead : trail)
    return () => {
      a.stop()
      b.stop()
    }
  }, [value, enabled, measure, left, right, opacity])
  React.useEffect(() => {
    const node = list.current
    if (!node) return
    const observer = new ResizeObserver(() => {
      const box = measure()
      if (!box) return
      left.jump(box.l)
      right.jump(box.r)
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [list, measure, left, right])
  return { x: left, width, opacity }
}
function TabsList({
  className,
  variant = 'default',
  children,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsListVariants>) {
  const ref = React.useRef<HTMLDivElement>(null)
  const { value } = React.useContext(TabsContext)
  const { enabled } = useMotionSettings()
  const style = useStretchIndicator(ref, value, enabled)
  return (
    <TabsPrimitive.List
      ref={ref}
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    >
      {variant !== 'icons' && (
        <motion.span
          data-slot="tabs-indicator"
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-[3px] left-0 rounded-full bg-background"
          style={style}
        />
      )}
      <TabsListContext.Provider value={variant}>
        {children}
      </TabsListContext.Provider>
    </TabsPrimitive.List>
  )
}
// In the icons variant each tab shows only its icon until it is chosen,
// then opens to show its name while the tile slides under it.
function TabsTrigger({
  className,
  children,
  value,
  icon,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger> & {
  icon?: React.ReactNode
}) {
  const context = React.useContext(TabsContext)
  const variant = React.useContext(TabsListContext)
  const { enabled } = useMotionSettings()
  const iconTabs = variant === 'icons'
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      value={value}
      className={cn(
        'relative flex items-center justify-center gap-1.5 px-3 py-1.5 text-sm outline-none disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-ring',
        iconTabs ? 'flex-none' : 'flex-1',
        className,
      )}
      {...props}
    >
      {iconTabs && context.value === value && (
        <motion.span
          data-slot="tabs-indicator"
          layoutId={`tabs-${context.id}`}
          className="absolute inset-0 rounded-full bg-background"
          transition={
            enabled
              ? { type: 'spring', duration: 0.35, bounce: 0.2 }
              : { duration: 0 }
          }
        />
      )}
      <span className="relative z-10 flex items-center">
        {icon}
        {iconTabs ? (
          <span data-slot="tabs-label">
            <span>{children}</span>
          </span>
        ) : (
          <span className="flex items-center gap-1.5">{children}</span>
        )}
      </span>
    </TabsPrimitive.Trigger>
  )
}
function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn('flex-1 text-sm outline-none', className)}
      {...props}
    />
  )
}
export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
