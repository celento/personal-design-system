import * as React from 'react'
import { motion } from 'motion/react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'cn'
import { Tabs as TabsPrimitive } from 'radix-ui'
import { useMotionSettings } from '@/motion'
const TabsContext = React.createContext({ value: '', id: '' })
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
    variants: { variant: { default: 'bg-muted', line: 'bg-transparent' } },
    defaultVariants: { variant: 'default' },
  },
)
function TabsList({
  className,
  variant = 'default',
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  )
}
function TabsTrigger({
  className,
  children,
  value,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  const context = React.useContext(TabsContext)
  const { enabled } = useMotionSettings()
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      value={value}
      className={cn(
        'relative flex flex-1 items-center justify-center gap-1.5 px-3 py-1.5 text-sm outline-none disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-ring',
        className,
      )}
      {...props}
    >
      {context.value === value && (
        <motion.span
          data-slot="tabs-indicator"
          layoutId={`tabs-${context.id}`}
          className="absolute inset-0 rounded-full bg-background"
          transition={
            enabled
              ? { type: 'spring', stiffness: 380, damping: 30 }
              : { duration: 0 }
          }
        />
      )}
      <span className="relative z-10 flex items-center gap-1.5">
        {children}
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
