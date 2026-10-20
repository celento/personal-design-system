import * as React from 'react'
import { cn } from 'cn'

// With `label`, the label sits in the field like a placeholder and lifts
// into the top edge on focus or once there is a value.
function Input({
  className,
  type,
  label,
  id,
  placeholder,
  ...props
}: React.ComponentProps<'input'> & { label?: string }) {
  const generatedId = React.useId()
  const inputId = label ? (id ?? generatedId) : id
  const field = (
    <input
      type={type}
      id={inputId}
      // The floating label is split into letters, which some browsers
      // read as separate words, so the field carries the name itself.
      aria-label={label ?? props['aria-label']}
      data-slot="input"
      placeholder={label ? (placeholder ?? ' ') : placeholder}
      className={cn(
        'h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
        className,
      )}
      {...props}
    />
  )
  if (!label) return field
  return (
    <div data-slot="input-field" className="relative w-full">
      {field}
      <label htmlFor={inputId} data-slot="input-floating-label">
        <span>
          {[...label].map((char, i) => (
            <span key={i} style={{ '--i': i } as React.CSSProperties}>
              {char}
            </span>
          ))}
        </span>
      </label>
    </div>
  )
}

export { Input }
