import * as React from 'react'
import { cn } from 'cn'
import { MinusIcon, PlusIcon } from 'lucide-react'

// A number between a minus and a plus. Digits roll like an odometer, only
// the columns that change turn, and holding a button repeats faster the
// longer it is held. Arrow keys work on the number itself.
function Digit({ digit }: { digit: number }) {
  return (
    <span data-slot="number-stepper-digit" aria-hidden="true">
      <span style={{ '--digit': digit } as React.CSSProperties}>
        {Array.from({ length: 10 }, (_, n) => (
          <span key={n}>{n}</span>
        ))}
      </span>
    </span>
  )
}

function NumberStepper({
  value: valueProp,
  defaultValue = 0,
  min = -Infinity,
  max = Infinity,
  step = 1,
  onValueChange,
  className,
  'aria-label': ariaLabel,
  ...props
}: Omit<React.ComponentProps<'div'>, 'defaultValue' | 'onChange'> & {
  value?: number
  defaultValue?: number
  min?: number
  max?: number
  step?: number
  onValueChange?: (value: number) => void
}) {
  const [internal, setInternal] = React.useState(defaultValue)
  const value = valueProp ?? internal
  const latest = React.useRef(value)
  React.useLayoutEffect(() => {
    latest.current = value
  }, [value])
  const set = React.useCallback(
    (next: number) => {
      const clamped = Math.min(max, Math.max(min, next))
      if (clamped === latest.current) return
      latest.current = clamped
      setInternal(clamped)
      onValueChange?.(clamped)
    },
    [min, max, onValueChange],
  )
  const timer = React.useRef<number>(undefined)
  const stop = () => window.clearTimeout(timer.current)
  React.useEffect(() => stop, [])
  const hold = (direction: 1 | -1) => {
    set(latest.current + direction * step)
    let delay = 380
    const repeat = () => {
      set(latest.current + direction * step)
      delay = Math.max(40, delay * 0.8)
      timer.current = window.setTimeout(repeat, delay)
    }
    timer.current = window.setTimeout(repeat, delay)
  }
  const digits = String(Math.abs(value)).split('').map(Number)
  const button = (direction: 1 | -1) => ({
    type: 'button' as const,
    'data-slot': 'number-stepper-button',
    disabled: direction > 0 ? value >= max : value <= min,
    'aria-label': direction > 0 ? 'Increase' : 'Decrease',
    onPointerDown: (event: React.PointerEvent) => {
      if (event.button !== 0) return
      hold(direction)
    },
    onPointerUp: stop,
    onPointerLeave: stop,
    onPointerCancel: stop,
    // Pointer presses are handled on pointerdown; this covers the keyboard.
    onClick: (event: React.MouseEvent) => {
      if (event.detail === 0) set(latest.current + direction * step)
    },
  })
  return (
    <div
      data-slot="number-stepper"
      className={cn('inline-flex items-center', className)}
      {...props}
    >
      <button {...button(-1)}>
        <MinusIcon />
      </button>
      <span
        role="spinbutton"
        tabIndex={0}
        aria-label={ariaLabel}
        aria-valuenow={value}
        aria-valuemin={Number.isFinite(min) ? min : undefined}
        aria-valuemax={Number.isFinite(max) ? max : undefined}
        data-slot="number-stepper-value"
        onKeyDown={(event) => {
          const moves: Record<string, number> = {
            ArrowUp: step,
            ArrowRight: step,
            ArrowDown: -step,
            ArrowLeft: -step,
            PageUp: step * 10,
            PageDown: step * -10,
          }
          if (event.key in moves) {
            event.preventDefault()
            set(latest.current + moves[event.key])
          } else if (event.key === 'Home' && Number.isFinite(min)) {
            event.preventDefault()
            set(min)
          } else if (event.key === 'End' && Number.isFinite(max)) {
            event.preventDefault()
            set(max)
          }
        }}
      >
        {value < 0 && <span aria-hidden="true">−</span>}
        {digits.map((digit, i) => (
          <Digit key={digits.length - i} digit={digit} />
        ))}
      </span>
      <button {...button(1)}>
        <PlusIcon />
      </button>
    </div>
  )
}

export { NumberStepper }
