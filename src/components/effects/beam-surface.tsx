import type { ComponentProps } from 'react'
import { BorderBeam } from 'border-beam'
import { useMotionSettings, useResolvedTheme } from '@/lib/motion'
export function BeamSurface({
  active = true,
  ...props
}: ComponentProps<typeof BorderBeam>) {
  const { enabled } = useMotionSettings()
  const theme = useResolvedTheme()
  return (
    <BorderBeam
      theme={theme}
      colorVariant="colorful"
      strength={0.65}
      duration={5}
      {...props}
      active={active && enabled}
    />
  )
}
