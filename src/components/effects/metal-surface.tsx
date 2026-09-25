import type { ComponentProps } from 'react'
import { MetalFx } from 'metal-fx'
import { useMotionSettings, useResolvedTheme } from '@/motion'
export function MetalSurface(props: ComponentProps<typeof MetalFx>) {
  const { enabled } = useMotionSettings()
  const theme = useResolvedTheme()
  return <MetalFx preset="silver" theme={theme} {...props} paused={!enabled} />
}
