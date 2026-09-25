import { BeamInput } from '@/components/effects/beam-input'
import { BeamSurface } from '@/components/effects/beam-surface'
import { useState, type ReactNode } from 'react'
import {
  Archive,
  ArrowDown,
  ArrowRight,
  Bold,
  CalendarDays,
  Check,
  ChevronsUpDown,
  CircleAlert,
  ClipboardPaste,
  Copy,
  Download,
  Italic,
  Loader2,
  Mail,
  MapPin,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Settings2,
  Sparkles,
  Underline,
} from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Calendar } from '@/components/ui/calendar'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { Input } from '@/components/ui/input'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { Label } from '@/components/ui/label'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger,
} from '@/components/ui/menubar'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Skeleton } from '@/components/ui/skeleton'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Toggle } from '@/components/ui/toggle'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const Row = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-wrap items-center gap-3">{children}</div>
)
const Stack = ({ children }: { children: ReactNode }) => (
  <div className="w-full space-y-5">{children}</div>
)
const people = [
  { initials: 'AM', from: '#ffb27a', to: '#f76b15' },
  { initials: 'JL', from: '#fcd9a8', to: '#e89a3c' },
  { initials: 'SK', from: '#f5b3a1', to: '#d9573a' },
  { initials: 'RP', from: '#e8d5c4', to: '#9c7a5e' },
]
const Swatch = ({ color }: { color: string }) => (
  <span style={{ background: color }} />
)
export const categories = [
  'All components',
  'Effects',
  'Actions',
  'Inputs',
  'Data display',
  'Navigation',
  'Feedback',
  'Overlays',
  'Layout',
] as const
export type Category = (typeof categories)[number]
export type Specimen = {
  name: string
  category: Category
  detail: string
  render: () => ReactNode
  wide?: boolean
}

function Buttons() {
  return (
    <Stack>
      <Row>
        <BeamSurface size="sm" colorVariant="sunset" borderRadius={99}>
          <Button onClick={() => toast.success('Primary button clicked')}>
            Primary <ArrowRight />
          </Button>
        </BeamSurface>
        <Button
          variant="secondary"
          onClick={() => toast('Secondary button clicked')}
        >
          Secondary
        </Button>
        <Button
          variant="outline"
          onClick={() => toast('Outline button clicked')}
        >
          Outline
        </Button>
      </Row>
      <Row>
        <Button variant="ghost" onClick={() => toast('Ghost button clicked')}>
          Ghost
        </Button>
        <Button
          variant="destructive"
          onClick={() => toast.error('Destructive button clicked')}
        >
          Destructive
        </Button>
        <Button variant="link" onClick={() => toast('Link button clicked')}>
          Link <ArrowRight />
        </Button>
      </Row>
      <Separator />
      <Row>
        <Button size="sm" onClick={() => toast('Small button clicked')}>
          Small
        </Button>
        <Button
          size="icon"
          variant="outline"
          aria-label="Add item"
          onClick={() => toast.success('Item added')}
        >
          <Plus />
        </Button>
        <Button disabled>
          <Loader2 className="animate-spin" />
          Loading
        </Button>
        <Button disabled variant="outline">
          Disabled
        </Button>
      </Row>
    </Stack>
  )
}
function Inputs() {
  return (
    <Stack>
      <div className="space-y-2">
        <Label htmlFor="demo-email">Email</Label>
        <div className="relative">
          <Mail className="input-icon" />
          <BeamInput
            id="demo-email"
            type="email"
            placeholder="you@example.com"
            className="pl-9"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Input aria-label="Disabled input" disabled placeholder="Disabled" />
        <Input
          aria-label="Invalid input"
          aria-invalid="true"
          defaultValue="Invalid value"
        />
      </div>
      <div className="relative">
        <Search className="input-icon" />
        <Input
          aria-label="Search example"
          placeholder="Search anything…"
          className="pl-9"
        />
      </div>
    </Stack>
  )
}
function Selections() {
  return (
    <Stack>
      <div className="flex items-center justify-between">
        <Label htmlFor="notifications">Notifications</Label>
        <Switch id="notifications" defaultChecked />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="auto-save">Auto-save</Label>
        <Switch id="auto-save" />
      </div>
      <Separator />
      <Row>
        <Checkbox id="terms" defaultChecked />
        <Label htmlFor="terms">Remember my preference</Label>
      </Row>
      <Row>
        <Checkbox id="disabled-check" disabled />
        <Label htmlFor="disabled-check" className="text-muted-foreground">
          Disabled
        </Label>
      </Row>
    </Stack>
  )
}
function SliderDemo() {
  const [value, setValue] = useState([64])
  return (
    <Stack>
      <div className="flex justify-between">
        <Label htmlFor="volume">Volume</Label>
        <span className="font-mono text-xs text-muted-foreground">
          {value[0]}%
        </span>
      </div>
      <Slider
        id="volume"
        aria-label="Volume"
        value={value}
        onValueChange={setValue}
      />
      <Label>Range</Label>
      <Slider aria-label="Range" defaultValue={[25, 75]} />
      <Slider aria-label="Disabled slider" defaultValue={[40]} disabled />
    </Stack>
  )
}
function CalendarDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  return <Calendar mode="single" selected={date} onSelect={setDate} />
}
function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Settings2 />
          Edit profile
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Update how your name appears across the library.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            toast.success('Profile saved')
          }}
          className="space-y-5"
        >
          <Label htmlFor="profile-name">Name</Label>
          <Input id="profile-name" defaultValue="Alex Morgan" required />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
function ComboboxDemo() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-label={value || 'Select framework'}
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value || 'Select framework'}
          <ChevronsUpDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search framework…" />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {['Next.js', 'Vite', 'Remix', 'Astro'].map((item) => (
                <CommandItem
                  key={item}
                  onSelect={() => {
                    setValue(item)
                    setOpen(false)
                  }}
                >
                  {item}
                  {value === item && <Check className="ml-auto" />}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
function PaginationDemo() {
  const [page, setPage] = useState(1)
  return (
    <Stack>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#pagination"
              onClick={(e) => {
                e.preventDefault()
                setPage(Math.max(1, page - 1))
              }}
              aria-disabled={page === 1}
            />
          </PaginationItem>
          {[1, 2, 3].map((n) => (
            <PaginationItem key={n}>
              <PaginationLink
                href="#pagination"
                isActive={page === n}
                onClick={(e) => {
                  e.preventDefault()
                  setPage(n)
                }}
              >
                {n}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#pagination"
              aria-disabled={page === 3}
              onClick={(e) => {
                e.preventDefault()
                setPage(Math.min(3, page + 1))
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <p className="text-center text-xs text-muted-foreground">
        Page {page} of 3
      </p>
    </Stack>
  )
}
function ProgressDemo() {
  const [value, setValue] = useState(60)
  return (
    <Stack>
      <div className="flex items-baseline justify-between text-[13px]">
        <span className="font-medium">Upload progress</span>
        <span className="font-mono text-xs text-muted-foreground">
          {value}%
        </span>
      </div>
      <Progress value={value} aria-label="Upload progress" />
      <Button
        size="sm"
        variant="outline"
        onClick={() => setValue(value >= 100 ? 0 : Math.min(100, value + 20))}
      >
        {value >= 100 ? 'Reset' : '+20%'}
      </Button>
    </Stack>
  )
}
function TableDemo() {
  const [ascending, setAscending] = useState(true)
  const rows = [
    ['Button', 'Actions', 'Ready'],
    ['Input', 'Inputs', 'Ready'],
    ['Dialog', 'Overlays', 'Review'],
  ]
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <button
              className="flex items-center gap-2"
              onClick={() => setAscending(!ascending)}
            >
              Component
              <ArrowDown size={12} />
            </button>
          </TableHead>
          <TableHead>Category</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows
          .sort((a, b) =>
            ascending ? a[0].localeCompare(b[0]) : b[0].localeCompare(a[0]),
          )
          .map((row) => (
            <TableRow key={row[0]}>
              <TableCell className="font-medium">{row[0]}</TableCell>
              <TableCell className="text-muted-foreground">{row[1]}</TableCell>
              <TableCell className="text-right">
                <Badge variant="secondary">{row[2]}</Badge>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}
function FormDemo() {
  return (
    <form
      className="w-full space-y-4"
      onSubmit={(e) => {
        e.preventDefault()
        toast.success('Form submitted')
      }}
    >
      <div className="space-y-2">
        <Label htmlFor="form-name">Name</Label>
        <Input id="form-name" name="name" placeholder="Alex Morgan" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="form-email">Email</Label>
        <Input
          id="form-email"
          name="email"
          type="email"
          placeholder="alex@example.com"
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Submit
        <ArrowRight />
      </Button>
    </form>
  )
}
function DatePickerDemo() {
  const [date, setDate] = useState<Date>()
  const [open, setOpen] = useState(false)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">
          {date
            ? date.toLocaleDateString(undefined, { dateStyle: 'medium' })
            : 'Pick a date'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => {
            setDate(d)
            setOpen(false)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
export const specimens: Specimen[] = [
  {
    name: 'Button',
    category: 'Actions',
    detail: 'Variants · sizes · states',
    render: () => <Buttons />,
  },
  {
    name: 'Input',
    category: 'Inputs',
    detail: 'Default · disabled · invalid',
    render: () => <Inputs />,
  },
  {
    name: 'Switch & Checkbox',
    category: 'Inputs',
    detail: 'Selection controls',
    render: () => <Selections />,
  },
  {
    name: 'Badge',
    category: 'Data display',
    detail: 'Variants · status',
    render: () => (
      <Stack>
        <Row>
          <Badge>
            <Sparkles />
            New
          </Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Deprecated</Badge>
        </Row>
        <Row>
          <span className="status-badge">
            <span className="status-dot" data-pulse />
            Live
          </span>
          <Badge variant="outline">
            <span className="status-dot text-warning" />
            Pending
          </Badge>
          <Badge variant="outline">
            <span className="status-dot text-muted-foreground" />
            Draft
          </Badge>
          <Badge variant="secondary" className="font-mono">
            ⌘ K
          </Badge>
        </Row>
      </Stack>
    ),
  },
  {
    name: 'Avatar',
    category: 'Data display',
    detail: 'Fallbacks · sizes · groups',
    render: () => (
      <Stack>
        <Row>
          {people.slice(0, 3).map((p, i) => (
            <div key={p.initials} className="relative">
              <Avatar className={['size-12', 'size-10', 'size-8'][i]}>
                <AvatarFallback
                  className="text-white"
                  style={{
                    background: `linear-gradient(145deg, ${p.from}, ${p.to})`,
                  }}
                >
                  {p.initials}
                </AvatarFallback>
              </Avatar>
              {i === 0 && (
                <span className="absolute right-0 bottom-0 size-3 rounded-full bg-success ring-2 ring-[var(--stage)]" />
              )}
            </div>
          ))}
        </Row>
        <div className="flex items-center gap-3">
          <div className="flex -space-x-1">
            {people.map((p) => (
              <Avatar
                key={p.initials}
                className="size-9 ring-2 ring-[var(--stage)] transition-transform duration-300 hover:z-10 hover:-translate-y-1"
              >
                <AvatarFallback
                  className="text-[11px] text-white"
                  style={{
                    background: `linear-gradient(145deg, ${p.from}, ${p.to})`,
                  }}
                >
                  {p.initials}
                </AvatarFallback>
              </Avatar>
            ))}
            <Avatar className="size-9 ring-2 ring-[var(--stage)]">
              <AvatarFallback className="text-[11px]">+4</AvatarFallback>
            </Avatar>
          </div>
          <span className="text-xs text-muted-foreground">8 editors</span>
        </div>
      </Stack>
    ),
  },
  {
    name: 'Select',
    category: 'Inputs',
    detail: 'Single selection',
    render: () => (
      <Stack>
        <Label htmlFor="select-font">Typeface</Label>
        <Select defaultValue="inter">
          <SelectTrigger id="select-font" className="w-full">
            <SelectValue placeholder="Select typeface" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="geist">Geist</SelectItem>
            <SelectItem value="inter">Inter</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
        <Select disabled>
          <SelectTrigger className="w-full" aria-label="Disabled select">
            <SelectValue placeholder="Disabled" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
          </SelectContent>
        </Select>
      </Stack>
    ),
  },
  {
    name: 'Tabs',
    category: 'Navigation',
    detail: 'Grouped content',
    render: () => (
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="tab-preview">
          <span>Components shipped</span>
          <div className="flex items-end justify-between">
            <strong>49</strong>
            <span className="status-badge">+3 this week</span>
          </div>
        </TabsContent>
        <TabsContent value="activity" className="tab-preview">
          <div className="flex items-center gap-3">
            <span className="grid size-8 place-items-center rounded-full bg-primary-soft text-primary-soft-foreground">
              <Pencil size={14} />
            </span>
            <div>
              <p className="font-medium text-foreground">
                Button updated · just now
              </p>
              <p>New sunset beam on primary</p>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="settings" className="tab-preview">
          <div className="flex items-center justify-between">
            <Label htmlFor="tab-grid" className="text-foreground">
              Show grid
            </Label>
            <Switch id="tab-grid" defaultChecked />
          </div>
          <span>Overlay a 4px grid on every stage.</span>
        </TabsContent>
      </Tabs>
    ),
  },
  {
    name: 'Slider',
    category: 'Inputs',
    detail: 'Single · range · disabled',
    render: () => <SliderDemo />,
  },
  {
    name: 'Accordion',
    category: 'Layout',
    detail: 'Expandable sections',
    render: () => (
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="one"
      >
        <AccordionItem value="one">
          <AccordionTrigger>Component properties</AccordionTrigger>
          <AccordionContent>Size, variant, and state.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="two">
          <AccordionTrigger>Keyboard interaction</AccordionTrigger>
          <AccordionContent>
            Use Tab to focus and Enter or Space to toggle.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="three">
          <AccordionTrigger>Design tokens</AccordionTrigger>
          <AccordionContent>
            Color, spacing, typography, and radius.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
  },
  {
    name: 'Calendar',
    category: 'Inputs',
    detail: 'Single date selection',
    render: () => <CalendarDemo />,
  },
  {
    name: 'Card',
    category: 'Data display',
    detail: 'Header · content · footer',
    render: () => (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-[15px]">Design review</CardTitle>
          <CardDescription className="text-xs">
            Component library · v0.2
          </CardDescription>
          <CardAction>
            <Badge>
              <span className="status-dot" />
              In progress
            </Badge>
          </CardAction>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <CalendarDays size={13} />
              Due Friday
            </span>
            <span className="font-mono text-foreground">72%</span>
          </div>
          <Progress value={72} aria-label="Review progress" />
        </CardContent>
        <CardFooter className="justify-between gap-3">
          <div className="flex -space-x-1">
            {people.slice(0, 3).map((p) => (
              <Avatar key={p.initials} className="size-8 ring-2 ring-surface">
                <AvatarFallback
                  className="text-[10px] text-white"
                  style={{
                    background: `linear-gradient(145deg, ${p.from}, ${p.to})`,
                  }}
                >
                  {p.initials}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
          <Button size="sm" onClick={() => toast.success('Review opened')}>
            Open
            <ArrowRight />
          </Button>
        </CardFooter>
      </Card>
    ),
  },
  {
    name: 'Tooltip',
    category: 'Overlays',
    detail: 'Hover · focus',
    render: () => (
      <Row>
        {[
          [Copy, 'Copy'],
          [Download, 'Download'],
          [Plus, 'Add'],
        ].map(([Icon, label]) => {
          const I = Icon as typeof Copy
          return (
            <Tooltip key={String(label)}>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label={String(label) + ' example'}
                  onClick={() => toast(String(label) + ' clicked')}
                >
                  <I />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{String(label)}</TooltipContent>
            </Tooltip>
          )
        })}
      </Row>
    ),
  },
  {
    name: 'Dialog',
    category: 'Overlays',
    detail: 'Modal · focus management',
    render: () => <DialogDemo />,
  },
  {
    name: 'Dropdown Menu',
    category: 'Overlays',
    detail: 'Actions · keyboard navigation',
    render: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            Options
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuLabel>Component</DropdownMenuLabel>
          <DropdownMenuItem onSelect={() => toast('Edit selected')}>
            <Pencil />
            Edit
            <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => toast.success('Duplicated')}>
            <Copy />
            Duplicate
            <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => toast('Archived')}>
            <Archive />
            Archive
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
  {
    name: 'Table',
    category: 'Data display',
    detail: 'Sortable header · status',
    render: () => <TableDemo />,
    wide: true,
  },
  {
    name: 'Textarea',
    category: 'Inputs',
    detail: 'Multiline input',
    render: () => (
      <Stack>
        <Label htmlFor="notes">Notes</Label>
        <Textarea id="notes" placeholder="Add a note…" className="min-h-28" />
      </Stack>
    ),
  },
  {
    name: 'Radio Group',
    category: 'Inputs',
    detail: 'Exclusive selection',
    render: () => (
      <RadioGroup defaultValue="comfortable" className="w-full gap-4">
        {['Compact', 'Comfortable', 'Spacious'].map((v) => (
          <div className="flex items-center gap-3" key={v}>
            <RadioGroupItem value={v.toLowerCase()} id={'radio-' + v} />
            <Label htmlFor={'radio-' + v}>{v}</Label>
          </div>
        ))}
      </RadioGroup>
    ),
  },
  {
    name: 'Toggle & Toggle Group',
    category: 'Actions',
    detail: 'Formatting controls',
    render: () => (
      <Stack>
        <Row>
          <Toggle aria-label="Toggle bold" variant="outline">
            <Bold />
          </Toggle>
          <Toggle aria-label="Toggle italic" variant="outline">
            <Italic />
          </Toggle>
          <Toggle aria-label="Disabled underline" disabled variant="outline">
            <Underline />
          </Toggle>
        </Row>
        <ToggleGroup
          type="multiple"
          variant="outline"
          aria-label="Text formatting"
        >
          <ToggleGroupItem value="bold" aria-label="Bold text">
            <Bold />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Italic text">
            <Italic />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Underline text">
            <Underline />
          </ToggleGroupItem>
        </ToggleGroup>
      </Stack>
    ),
  },
  {
    name: 'Alert',
    category: 'Feedback',
    detail: 'Informational · destructive',
    render: () => (
      <Stack>
        <Alert>
          <Sparkles />
          <AlertTitle>Update available</AlertTitle>
          <AlertDescription>Version 0.2 is ready to install.</AlertDescription>
        </Alert>
        <Alert variant="destructive">
          <CircleAlert />
          <AlertTitle>Unable to save</AlertTitle>
          <AlertDescription>
            Check your connection and try again.
          </AlertDescription>
        </Alert>
      </Stack>
    ),
  },
  {
    name: 'Toast',
    category: 'Feedback',
    detail: 'Success · error · action · loading',
    render: () => (
      <div className="grid w-full max-w-72 grid-cols-2 gap-3">
        <Button
          variant="outline"
          onClick={() =>
            toast.success('Changes saved', {
              description: 'Your preferences are up to date.',
            })
          }
        >
          Success
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.error('Unable to save', {
              description: 'Check your connection and try again.',
            })
          }
        >
          Error
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast('Item archived', {
              description: 'Moved to the archive.',
              action: {
                label: 'Undo',
                onClick: () => toast.success('Item restored'),
              },
            })
          }
        >
          With action
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.promise(new Promise((resolve) => setTimeout(resolve, 1600)), {
              loading: 'Publishing tokens…',
              success: 'Tokens published',
              error: 'Publishing failed',
            })
          }
        >
          Loading
        </Button>
      </div>
    ),
  },
  {
    name: 'Progress',
    category: 'Feedback',
    detail: 'Determinate progress',
    render: () => <ProgressDemo />,
  },
  {
    name: 'Skeleton',
    category: 'Feedback',
    detail: 'Loading placeholders',
    render: () => (
      <div className="w-full space-y-4 rounded-2xl bg-surface p-4 shadow-[var(--material-shadow)]">
        <div className="flex items-center gap-3">
          <Skeleton className="size-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-2/3 rounded-full" />
            <Skeleton className="h-3 w-1/3 rounded-full" />
          </div>
        </div>
        <Skeleton className="h-24 w-full rounded-xl" />
        <div className="flex gap-2">
          <Skeleton className="h-7 w-16 rounded-full" />
          <Skeleton className="h-7 w-20 rounded-full" />
        </div>
      </div>
    ),
  },
  {
    name: 'Input OTP',
    category: 'Inputs',
    detail: 'Six-digit verification',
    render: () => (
      <Stack>
        <Label htmlFor="otp">Verification code</Label>
        <InputOTP id="otp" maxLength={6}>
          <InputOTPGroup>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <InputOTPSlot key={i} index={i} />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </Stack>
    ),
  },
  {
    name: 'Combobox',
    category: 'Inputs',
    detail: 'Searchable selection',
    render: () => <ComboboxDemo />,
  },
  {
    name: 'Date Picker',
    category: 'Inputs',
    detail: 'Popover · calendar',
    render: () => <DatePickerDemo />,
  },
  {
    name: 'Form',
    category: 'Inputs',
    detail: 'Required fields · validation',
    render: () => <FormDemo />,
  },
  {
    name: 'Popover',
    category: 'Overlays',
    detail: 'Anchored content',
    render: () => (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <Settings2 />
            Dimensions
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Dimensions</h4>
            <Label htmlFor="width">Width</Label>
            <Input id="width" defaultValue="100%" />
            <Label htmlFor="height">Height</Label>
            <Input id="height" defaultValue="Auto" />
          </div>
        </PopoverContent>
      </Popover>
    ),
  },
  {
    name: 'Sheet',
    category: 'Overlays',
    detail: 'Side panel',
    render: () => (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">
            Open sheet
            <ArrowRight />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Component settings</SheetTitle>
            <SheetDescription>
              Adjust how this component is labelled.
            </SheetDescription>
          </SheetHeader>
          <div className="px-4 space-y-3">
            <Label htmlFor="sheet-label">Label</Label>
            <Input id="sheet-label" defaultValue="Component" />
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button onClick={() => toast.success('Settings saved')}>
                Save changes
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    ),
  },
  {
    name: 'Drawer',
    category: 'Overlays',
    detail: 'Bottom panel · drag to close',
    render: () => (
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">
            Open drawer
            <ArrowDown />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Spacing</DrawerTitle>
              <DrawerDescription>Set the base spacing unit.</DrawerDescription>
            </DrawerHeader>
            <div className="p-4">
              <Slider aria-label="Drawer spacing" defaultValue={[40]} />
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button>Done</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    ),
  },
  {
    name: 'Alert Dialog',
    category: 'Overlays',
    detail: 'Confirmation',
    render: () => (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Delete component</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this component?</AlertDialogTitle>
            <AlertDialogDescription>
              This only resets the example.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => toast('Example reset')}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    ),
  },
  {
    name: 'Hover Card',
    category: 'Overlays',
    detail: 'Profile preview',
    render: () => (
      <HoverCard openDelay={150}>
        <HoverCardTrigger asChild>
          <Button variant="link">@alexmorgan</Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-72">
          <div className="flex gap-3">
            <Avatar className="size-11">
              <AvatarFallback
                className="text-white"
                style={{
                  background: `linear-gradient(145deg, ${people[0].from}, ${people[0].to})`,
                }}
              >
                AM
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <p className="text-sm font-semibold">Alex Morgan</p>
              <p className="text-xs text-muted-foreground">
                Product designer. Builds the components you are looking at.
              </p>
              <p className="flex items-center gap-1 pt-1 text-xs text-muted-foreground">
                <MapPin size={12} />
                Lisbon
              </p>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    ),
  },
  {
    name: 'Context Menu',
    category: 'Overlays',
    detail: 'Right-click actions',
    render: () => (
      <ContextMenu>
        <ContextMenuTrigger className="flex h-32 w-full flex-col items-center justify-center gap-2 rounded-2xl border-[1.5px] border-dashed border-[var(--input)] text-[13px] text-muted-foreground transition-colors hover:border-[var(--ring)] hover:bg-primary-soft/40 data-[state=open]:border-[var(--ring)]">
          <MoreHorizontal size={18} />
          Right-click here
        </ContextMenuTrigger>
        <ContextMenuContent className="w-48">
          <ContextMenuItem onSelect={() => toast('Copied')}>
            <Copy />
            Copy
            <ContextMenuShortcut>⌘C</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem onSelect={() => toast('Pasted')}>
            <ClipboardPaste />
            Paste
            <ContextMenuShortcut>⌘V</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem onSelect={() => toast('Selection cleared')}>
            Clear selection
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    ),
  },
  {
    name: 'Command',
    category: 'Navigation',
    detail: 'Search · keyboard selection',
    render: () => (
      <Command
        defaultValue="__none__"
        label="Search actions"
        className="w-full"
      >
        <CommandInput placeholder="Search actions…" />
        <CommandList>
          <CommandEmpty>No actions found.</CommandEmpty>
          <CommandGroup heading="Actions">
            <CommandItem onSelect={() => toast('New component selected')}>
              <Plus />
              New component
            </CommandItem>
            <CommandItem onSelect={() => toast('Settings selected')}>
              <Settings2 />
              Settings
            </CommandItem>
            <CommandItem onSelect={() => toast('Export selected')}>
              <Download />
              Export tokens
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    ),
  },
  {
    name: 'Breadcrumb',
    category: 'Navigation',
    detail: 'Page hierarchy',
    render: () => (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#top">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#components">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Button</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    ),
  },
  {
    name: 'Pagination',
    category: 'Navigation',
    detail: 'Page selection',
    render: () => <PaginationDemo />,
    wide: true,
  },
  {
    name: 'Menubar',
    category: 'Navigation',
    detail: 'Application menus',
    render: () => (
      <Menubar>
        {['File', 'Edit', 'View'].map((v) => (
          <MenubarMenu key={v}>
            <MenubarTrigger>{v}</MenubarTrigger>
            <MenubarContent>
              {(v === 'File'
                ? ['New', 'Open', 'Save']
                : v === 'Edit'
                  ? ['Undo', 'Redo', 'Copy']
                  : ['Zoom in', 'Zoom out', 'Reset zoom']
              ).map((a, i) => (
                <MenubarItem key={a} onSelect={() => toast(a + ' selected')}>
                  {a}
                  <MenubarShortcut>
                    {v === 'View' ? ['⌘+', '⌘−', '⌘0'][i] : '⌘' + a[0]}
                  </MenubarShortcut>
                </MenubarItem>
              ))}
            </MenubarContent>
          </MenubarMenu>
        ))}
      </Menubar>
    ),
  },
  {
    name: 'Navigation Menu',
    category: 'Navigation',
    detail: 'Links · nested content',
    render: () => (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Components</NavigationMenuTrigger>
            <NavigationMenuContent className="min-w-48">
              <NavigationMenuLink href="#button">Button</NavigationMenuLink>
              <NavigationMenuLink href="#input">Input</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#top">Overview</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    ),
  },
  {
    name: 'Collapsible',
    category: 'Layout',
    detail: 'Show · hide content',
    render: () => (
      <Collapsible className="w-full space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-medium">3 design tokens</span>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Toggle tokens">
              <ChevronsUpDown />
            </Button>
          </CollapsibleTrigger>
        </div>
        <div className="token-row">
          <Swatch color="var(--background)" />
          --background
        </div>
        <CollapsibleContent className="space-y-3">
          <div className="token-row">
            <Swatch color="var(--foreground)" />
            --foreground
          </div>
          <div className="token-row">
            <Swatch color="var(--primary)" />
            --primary
          </div>
        </CollapsibleContent>
      </Collapsible>
    ),
  },
  {
    name: 'Resizable',
    category: 'Layout',
    detail: 'Draggable panels',
    render: () => (
      <ResizablePanelGroup orientation="horizontal" className="min-h-40">
        <ResizablePanel defaultSize="40%" minSize="20%">
          <div className="panel-label">
            Sidebar
            <span>drag the handle</span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize="60%" minSize="20%">
          <div className="panel-label">
            Canvas
            <span>fills the rest</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    ),
  },
  {
    name: 'Scroll Area',
    category: 'Layout',
    detail: 'Contained overflow',
    render: () => (
      <ScrollArea className="h-44 w-full">
        <div className="p-2">
          {[
            'Accordion',
            'Alert',
            'Avatar',
            'Badge',
            'Button',
            'Calendar',
            'Card',
            'Carousel',
            'Checkbox',
            'Command',
            'Dialog',
            'Drawer',
          ].map((name, i) => (
            <div
              key={name}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-[13px] transition-colors hover:bg-secondary"
            >
              <span>{name}</span>
              <span className="font-mono text-[11px] text-muted-foreground">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
          ))}
        </div>
      </ScrollArea>
    ),
  },
  {
    name: 'Separator',
    category: 'Layout',
    detail: 'Horizontal · vertical',
    render: () => (
      <Stack>
        <div className="space-y-1">
          <div className="text-[13px] font-medium">Design system</div>
          <p className="text-xs text-muted-foreground">
            Warm materials and considered motion.
          </p>
        </div>
        <Separator />
        <div className="flex h-5 items-center gap-4 text-[13px] text-muted-foreground">
          <span>Components</span>
          <Separator orientation="vertical" />
          <span>Tokens</span>
          <Separator orientation="vertical" />
          <span>Styles</span>
        </div>
      </Stack>
    ),
  },
  {
    name: 'Aspect Ratio',
    category: 'Layout',
    detail: '16 : 9',
    render: () => (
      <div className="w-full">
        <AspectRatio ratio={16 / 9} className="ratio-art">
          <div />
          <span>16 : 9</span>
        </AspectRatio>
      </div>
    ),
  },
  {
    name: 'Carousel',
    category: 'Data display',
    detail: 'Previous · next · swipe',
    render: () => (
      <Carousel className="mx-10 w-[calc(100%-5rem)]">
        <CarouselContent>
          {[
            ['01', 'Materials', 'linear-gradient(145deg, #ffb27a, #f76b15)'],
            ['02', 'Motion', 'linear-gradient(145deg, #3a2a20, #1a1310)'],
            ['03', 'Tokens', 'linear-gradient(145deg, #f5b3a1, #c2410c)'],
          ].map(([n, label, bg]) => (
            <CarouselItem key={n}>
              <div className="slide-card" style={{ background: bg }}>
                <span>{label}</span>
                <strong>{n}</strong>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    ),
  },
]
export function slug(name: string) {
  return name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')
}
