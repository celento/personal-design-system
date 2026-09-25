import { useState, type ComponentProps } from 'react'
import { Input } from '@/components/ui/input'
import { BeamSurface } from './beam-surface'
export function BeamInput({
  onFocus,
  onBlur,
  ...props
}: ComponentProps<typeof Input>) {
  const [focused, setFocused] = useState(false)
  return (
    <BeamSurface
      active={focused}
      size="line"
      borderRadius={12}
      className="w-full"
    >
      <Input
        {...props}
        onFocus={(e) => {
          setFocused(true)
          onFocus?.(e)
        }}
        onBlur={(e) => {
          setFocused(false)
          onBlur?.(e)
        }}
      />
    </BeamSurface>
  )
}
