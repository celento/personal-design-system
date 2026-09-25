import { useRef, useState } from 'react'
import {
  ArrowUp,
  AudioLines,
  Check,
  Copy,
  Link,
  Plus,
  Sparkles,
  Upload,
  X,
} from 'lucide-react'
import { ThinkingOrb } from 'thinking-orbs'
import { BotAvatar } from 'bot-avatars'
import { Liquid } from 'liquid-gooey'
import { VoiceBeam } from 'voice-glow'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { BeamSurface } from '@/components/effects/beam-surface'
import { MetalSurface } from '@/components/effects/metal-surface'
import { useMotionSettings, useResolvedTheme } from './motion'
import type { Specimen } from './demos'

export function BeamDemo() {
  const [active, setActive] = useState(true)
  const [text, setText] = useState('')
  return (
    <div className="effect-example">
      <BeamSurface active={active} className="w-full" borderRadius={22}>
        <form
          className="composer"
          onSubmit={(e) => {
            e.preventDefault()
            if (text.trim()) {
              toast.success('Message sent')
              setText('')
            }
          }}
        >
          <textarea
            aria-label="Beam message"
            placeholder="Message…"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={2}
          />
          <div className="composer-toolbar">
            <Sparkles size={16} />
            <Button
              size="icon"
              variant="secondary"
              type="submit"
              aria-label="Send beam message"
              disabled={!text.trim()}
            >
              <ArrowUp />
            </Button>
          </div>
        </form>
      </BeamSurface>
      <Button
        size="sm"
        variant="ghost"
        aria-pressed={active}
        onClick={() => setActive(!active)}
      >
        {active ? 'Stop beam' : 'Start beam'}
      </Button>
    </div>
  )
}
export function MetalDemo() {
  const [preset, setPreset] = useState<'silver' | 'chromatic' | 'gold'>(
    'silver',
  )
  return (
    <div className="effect-example">
      <div className="metal-actions">
        <MetalSurface preset={preset}>
          <Button
            className="metal-button"
            variant="secondary"
            onClick={() => toast.success('Changes saved')}
          >
            <Check />
            Save changes
          </Button>
        </MetalSurface>
        <MetalSurface preset={preset} variant="circle">
          <Button
            size="icon"
            variant="secondary"
            className="metal-button"
            aria-label="Upload file example"
            onClick={() => toast('Upload selected')}
          >
            <ArrowUp />
          </Button>
        </MetalSurface>
      </div>
      <div className="effect-options" role="group" aria-label="Metal finish">
        {(['silver', 'chromatic', 'gold'] as const).map((p) => (
          <button
            aria-pressed={preset === p}
            onClick={() => setPreset(p)}
            key={p}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  )
}
export function OrbDemo() {
  const [state, setState] = useState<'working' | 'searching' | 'solving'>(
    'working',
  )
  const { enabled } = useMotionSettings()
  const theme = useResolvedTheme()
  return (
    <div className="effect-example">
      <div className="orb-row">
        <ThinkingOrb state={state} size={64} theme={theme} paused={!enabled} />
        <div className="orb-pill">
          <ThinkingOrb
            state={state}
            size={20}
            theme={theme}
            paused={!enabled}
          />
          <span>{state}</span>
        </div>
      </div>
      <div className="effect-options" role="group" aria-label="Orb state">
        {(['working', 'searching', 'solving'] as const).map((s) => (
          <button
            key={s}
            aria-pressed={state === s}
            onClick={() => setState(s)}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  )
}
export function GooeyDemo() {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const { enabled } = useMotionSettings()
  const theme = useResolvedTheme()
  const actions = [
    { Icon: Copy, label: 'Copy', x: -68, y: -52 },
    { Icon: Link, label: 'Link', x: 0, y: -86 },
    { Icon: Upload, label: 'Upload', x: 68, y: -52 },
  ]
  return (
    <div
      className="gooey-example"
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          setOpen(false)
          triggerRef.current?.focus()
        }
      }}
    >
      <Liquid
        fill={theme === 'dark' ? '#303030' : '#ffffff'}
        blur={7}
        contrast={20}
        shadow={
          theme === 'dark'
            ? '0 4px 12px rgba(0,0,0,.3)'
            : '0 3px 12px rgba(0,0,0,.12)'
        }
        className="gooey-area"
      >
        {actions.map(({ Icon, label, x, y }) => (
          <Liquid.Item
            className="gooey-item"
            key={label}
            x={open ? x : 0}
            y={open ? y : 0}
            transition={enabled ? 'bouncy' : { duration: 0 }}
          >
            <button
              className="liquid-action"
              aria-label={`Gooey ${label.toLowerCase()}`}
              tabIndex={open ? 0 : -1}
              aria-hidden={!open}
              style={{ visibility: open ? 'visible' : 'hidden' }}
              onClick={() => {
                toast(`${label} selected`)
                setOpen(false)
                triggerRef.current?.focus()
              }}
            >
              <Icon size={18} />
            </button>
          </Liquid.Item>
        ))}
        <Liquid.Item className="gooey-item">
          <button
            ref={triggerRef}
            className="liquid-action liquid-trigger"
            aria-label="Toggle quick actions"
            aria-expanded={open}
            onClick={() => setOpen((previous) => !previous)}
          >
            {open ? <X size={20} /> : <Plus size={20} />}
          </button>
        </Liquid.Item>
      </Liquid>
    </div>
  )
}
export function VoiceDemo() {
  const [level, setLevel] = useState([0.55])
  const [processing, setProcessing] = useState(false)
  const { enabled } = useMotionSettings()
  const theme = useResolvedTheme()
  return (
    <div className="effect-example">
      <VoiceBeam
        level={level[0]}
        processing={processing}
        theme={theme}
        paused={!enabled}
        className="w-full"
      >
        <div className="voice-surface">
          <AudioLines size={24} />
          <span>{processing ? 'Processing' : 'Voice'}</span>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle processing"
            aria-pressed={processing}
            onClick={() => setProcessing(!processing)}
          >
            {processing ? <X /> : <ArrowUp />}
          </Button>
        </div>
      </VoiceBeam>
      <div className="voice-controls">
        <Label htmlFor="voice-level">Level</Label>
        <Slider
          id="voice-level"
          aria-label="Voice level"
          value={level}
          min={0}
          max={1}
          step={0.05}
          onValueChange={setLevel}
        />
      </div>
    </div>
  )
}
export function BotDemo() {
  const [state, setState] = useState<'default' | 'working' | 'sleeping'>(
    'default',
  )
  const { enabled } = useMotionSettings()
  const theme = useResolvedTheme()
  return (
    <div className="effect-example">
      <div className="bot-row">
        {(['clover', 'flower', 'ghost'] as const).map((type) => (
          <BotAvatar
            key={type}
            type={type}
            state={state}
            size={64}
            paused={!enabled}
            theme={theme}
            aria-label={`${type} bot`}
          />
        ))}
      </div>
      <div className="effect-options" role="group" aria-label="Avatar state">
        {(['default', 'working', 'sleeping'] as const).map((s) => (
          <button
            aria-pressed={state === s}
            onClick={() => setState(s)}
            key={s}
          >
            {s === 'default' ? 'Idle' : s}
          </button>
        ))}
      </div>
    </div>
  )
}
export const effectSpecimens: Specimen[] = [
  {
    name: 'Border Beam',
    category: 'Effects',
    detail: 'Animated border · composer',
    render: () => <BeamDemo />,
    docs: 'https://libraries.dev/beam',
  },
  {
    name: 'Metal',
    category: 'Effects',
    detail: 'Silver · chromatic · gold',
    render: () => <MetalDemo />,
    docs: 'https://libraries.dev/metal',
  },
  {
    name: 'Thinking Orb',
    category: 'Effects',
    detail: 'Working · searching · solving',
    render: () => <OrbDemo />,
    docs: 'https://libraries.dev/orbs',
  },
  {
    name: 'Gooey',
    category: 'Effects',
    detail: 'Liquid quick actions',
    render: () => <GooeyDemo />,
    docs: 'https://libraries.dev/gooey',
  },
  {
    name: 'Voice',
    category: 'Effects',
    detail: 'Reactive glow · processing',
    render: () => <VoiceDemo />,
    docs: 'https://libraries.dev/voice',
  },
  {
    name: 'Bot Avatar',
    category: 'Effects',
    detail: 'Idle · working · sleeping',
    render: () => <BotDemo />,
    docs: 'https://libraries.dev/avatars',
  },
]
