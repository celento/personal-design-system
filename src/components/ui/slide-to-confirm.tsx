import * as React from 'react'
import { animate, motion, useMotionValue, useTransform } from 'motion/react'
import { cn } from 'cn'
import { ArrowRightIcon, CheckIcon } from 'lucide-react'
import { useMotionSettings } from '@/lib/motion'

const HANDLE = 40
const PAD = 4

// A handle pushed across a track. It follows the finger exactly; past the
// mark it takes over and finishes the journey on its own. Let go short of
// the mark and it springs back. Enter or Space confirms from the keyboard.
function SlideToConfirm({
  label = 'Slide to confirm',
  confirmedLabel = 'Confirmed',
  onConfirm,
  resetAfter,
  disabled,
  className,
  ...props
}: Omit<React.ComponentProps<'div'>, 'children'> & {
  label?: string
  confirmedLabel?: string
  onConfirm?: () => void
  resetAfter?: number
  disabled?: boolean
}) {
  const track = React.useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const [range, setRange] = React.useState(1)
  const [done, setDone] = React.useState(false)
  const drag = React.useRef<{ start: number; from: number } | null>(null)
  const { enabled } = useMotionSettings()
  const progress = useTransform(x, (v) => Math.min(1, v / range))
  const labelOpacity = useTransform(progress, [0, 0.6], [1, 0])
  const fill = useTransform(x, (v) => v + HANDLE + PAD * 2)

  React.useLayoutEffect(() => {
    const node = track.current
    if (!node) return
    const measure = () =>
      setRange(Math.max(1, node.clientWidth - HANDLE - PAD * 2))
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  React.useEffect(() => {
    if (!done || !resetAfter) return
    const id = window.setTimeout(() => {
      setDone(false)
      animate(x, 0, enabled ? { duration: 0.25 } : { duration: 0 })
    }, resetAfter)
    return () => window.clearTimeout(id)
  }, [done, resetAfter, x, enabled])

  const finish = () => {
    if (done) return
    drag.current = null
    setDone(true)
    animate(
      x,
      range,
      enabled ? { type: 'spring', duration: 0.3, bounce: 0 } : { duration: 0 },
    )
    onConfirm?.()
  }

  return (
    <div
      ref={track}
      data-slot="slide-to-confirm"
      data-done={done || undefined}
      data-disabled={disabled || undefined}
      className={cn('relative w-full select-none', className)}
      {...props}
    >
      <motion.span
        data-slot="slide-to-confirm-fill"
        aria-hidden="true"
        style={{ width: fill }}
      />
      <motion.span
        data-slot="slide-to-confirm-label"
        aria-hidden="true"
        style={{ opacity: done ? 1 : labelOpacity }}
      >
        {done ? confirmedLabel : label}
      </motion.span>
      <motion.button
        type="button"
        data-slot="slide-to-confirm-handle"
        aria-label={done ? confirmedLabel : label}
        disabled={disabled || done}
        style={{ x }}
        onClick={(event) => {
          if (event.detail === 0) finish()
        }}
        onPointerDown={(event) => {
          if (disabled || done || event.button !== 0) return
          event.currentTarget.setPointerCapture(event.pointerId)
          drag.current = { start: event.clientX, from: x.get() }
        }}
        onPointerMove={(event) => {
          if (!drag.current) return
          const next = drag.current.from + event.clientX - drag.current.start
          x.set(Math.min(range, Math.max(0, next)))
          if (x.get() >= range * 0.8) finish()
        }}
        onPointerUp={() => {
          if (!drag.current) return
          drag.current = null
          if (x.get() >= range * 0.6) finish()
          else
            animate(
              x,
              0,
              enabled
                ? { type: 'spring', duration: 0.35, bounce: 0.3 }
                : { duration: 0 },
            )
        }}
        onPointerCancel={() => {
          drag.current = null
          animate(x, 0, enabled ? { duration: 0.2 } : { duration: 0 })
        }}
      >
        {done ? <CheckIcon /> : <ArrowRightIcon />}
      </motion.button>
    </div>
  )
}

export { SlideToConfirm }
