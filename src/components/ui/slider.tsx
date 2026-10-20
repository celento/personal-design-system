'use client'

import * as React from 'react'
import { cn } from 'cn'
import { Slider as SliderPrimitive } from 'radix-ui'
import { useMotionSettings } from '@/lib/motion'

const BAR_COUNT = 36

// The bars variant has no visible thumb. Dragging quickly lifts the bars
// the pointer sweeps past, and they settle back once it slows down.
function useWake(count: number, enabled: boolean) {
  const bars = React.useRef<(HTMLSpanElement | null)[]>([])
  const energy = React.useRef(new Float32Array(count))
  const last = React.useRef<{ x: number; t: number } | null>(null)
  const frame = React.useRef(0)
  function tick() {
    let active = false
    energy.current.forEach((e, i) => {
      const next = e < 0.005 ? 0 : e * 0.86
      energy.current[i] = next
      if (next) active = true
      bars.current[i]?.style.setProperty('--lift', next.toFixed(3))
    })
    frame.current = active ? requestAnimationFrame(tick) : 0
  }
  React.useEffect(() => () => cancelAnimationFrame(frame.current), [])
  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (!enabled || !event.buttons) {
      last.current = null
      return
    }
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const t = event.timeStamp
    const previous = last.current
    last.current = { x, t }
    if (!previous || t <= previous.t) return
    const speed = Math.min(Math.abs(x - previous.x) / (t - previous.t), 3)
    const at = (x / rect.width) * count
    energy.current.forEach((e, i) => {
      const distance = Math.abs(i + 0.5 - at)
      if (distance < 4)
        energy.current[i] = Math.min(1, e + speed * 0.22 * (1 - distance / 4))
    })
    if (!frame.current) frame.current = requestAnimationFrame(tick)
  }
  return { bars, onPointerMove }
}

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  variant = 'default',
  onValueChange,
  onPointerMove,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root> & {
  variant?: 'default' | 'bars'
}) {
  const [internal, setInternal] = React.useState(defaultValue)
  const current = value ?? internal
  const _values = React.useMemo(
    () => (Array.isArray(current) ? current : [min, max]),
    [current, min, max],
  )
  const { enabled } = useMotionSettings()
  const wake = useWake(BAR_COUNT, enabled)
  const bars = variant === 'bars'
  const low = _values.length > 1 ? Math.min(..._values) : min
  const high = Math.max(..._values)

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      data-variant={variant}
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      onValueChange={(v) => {
        setInternal(v)
        onValueChange?.(v)
      }}
      onPointerMove={(event) => {
        if (bars) wake.onPointerMove(event)
        onPointerMove?.(event)
      }}
      className={cn(
        'relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-vertical:h-full data-vertical:min-h-40 data-vertical:w-auto data-vertical:flex-col',
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className="relative grow overflow-hidden rounded-full bg-muted data-horizontal:h-1 data-horizontal:w-full data-vertical:h-full data-vertical:w-1"
      >
        {bars ? (
          Array.from({ length: BAR_COUNT }, (_, i) => {
            const at = min + ((i + 0.5) / BAR_COUNT) * (max - min)
            return (
              <span
                key={i}
                ref={(node) => {
                  wake.bars.current[i] = node
                }}
                data-slot="slider-bar"
                data-on={(at >= low && at <= high) || undefined}
              />
            )
          })
        ) : (
          <SliderPrimitive.Range
            data-slot="slider-range"
            className="absolute bg-primary select-none data-horizontal:h-full data-vertical:w-full"
          />
        )}
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          aria-label={
            props['aria-label']
              ? `${props['aria-label']}${_values.length > 1 ? ` ${index === 0 ? 'minimum' : 'maximum'}` : ''}`
              : undefined
          }
          aria-labelledby={props['aria-labelledby']}
          key={index}
          className="relative block size-3 shrink-0 rounded-full border border-ring bg-white ring-ring/50 transition-[color,box-shadow] select-none after:absolute after:-inset-2 hover:ring-3 focus-visible:ring-3 focus-visible:outline-hidden active:ring-3 disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider }
