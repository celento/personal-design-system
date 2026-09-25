import { BeamInput } from '@/components/effects/beam-input'
import { BeamSurface } from '@/components/effects/beam-surface'
import { useState, type ReactNode } from 'react'
import {
  ArrowDown,
  ArrowRight,
  Bold,
  Check,
  ChevronsUpDown,
  Copy,
  Download,
  Italic,
  Loader2,
  Mail,
  MoreHorizontal,
  Plus,
  Search,
  Settings2,
  Terminal,
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
  CardContent,
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
  DropdownMenuSeparator,
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
  docs?: string
  wide?: boolean
}

function Buttons() {
  return (
    <Stack>
      <Row>
        <BeamSurface size="sm" colorVariant="ocean" borderRadius={99}>
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
      <div className="flex justify-between text-sm">
        <Label htmlFor="volume">Volume</Label>
        <span className="font-mono text-muted-foreground">{value[0]}%</span>
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
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-lg border"
    />
  )
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
          <DialogDescription>Name</DialogDescription>
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
      <div className="flex justify-between text-sm">
        <span>Upload progress</span>
        <span className="font-mono">{value}%</span>
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
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </Row>
        <Row>
          <span className="status-badge">
            <span />
            Active
          </span>
          <Badge variant="outline" className="gap-1">
            <span className="size-1.5 rounded-full bg-amber-500" />
            Pending
          </Badge>
          <Badge variant="secondary">⌘ K</Badge>
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
          {['AM', 'JL', 'SK'].map((n, i) => (
            <Avatar key={n} className={i === 0 ? 'size-12' : 'size-10'}>
              <AvatarFallback
                className={
                  i === 0 ? 'bg-primary/15 text-foreground' : 'bg-muted'
                }
              >
                {n}
              </AvatarFallback>
            </Avatar>
          ))}
          <Avatar className="size-8">
            <AvatarFallback>+3</AvatarFallback>
          </Avatar>
        </Row>
        <div className="flex -space-x-2">
          {['AM', 'JL', 'SK', '+4'].map((n) => (
            <Avatar key={n} className="ring-2 ring-card">
              <AvatarFallback>{n}</AvatarFallback>
            </Avatar>
          ))}
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
          <span className="size-2 rounded-full bg-primary" />
          12 components · 3 updated
        </TabsContent>
        <TabsContent value="activity" className="tab-preview">
          Button updated · just now
        </TabsContent>
        <TabsContent value="settings" className="tab-preview">
          <Label htmlFor="tab-grid">Show grid</Label>
          <Switch id="tab-grid" defaultChecked />
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
      <Card className="w-full shadow-none">
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle className="text-base">Project settings</CardTitle>
            <Settings2 size={16} className="text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>PD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Personal</p>
              <p className="text-xs text-muted-foreground">Design system</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => toast.success('Settings saved')}
          >
            Save settings
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
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={() => toast('Edit selected')}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => toast.success('Duplicated')}>
            Duplicate
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => toast('Archived')}>
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
          <Terminal />
          <AlertTitle>Update available</AlertTitle>
          <AlertDescription>Version 0.2 is ready to install.</AlertDescription>
        </Alert>
        <Alert variant="destructive">
          <AlertTitle>Unable to save</AlertTitle>
          <AlertDescription>
            Check your connection and try again.
          </AlertDescription>
        </Alert>
      </Stack>
    ),
  },
  {
    name: 'Sonner',
    category: 'Feedback',
    detail: 'Toast notifications',
    render: () => (
      <Row>
        <Button
          variant="outline"
          onClick={() => toast.success('Changes saved')}
        >
          Success
        </Button>
        <Button variant="outline" onClick={() => toast.error('Unable to save')}>
          Error
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast('Item archived', {
              action: {
                label: 'Undo',
                onClick: () => toast.success('Item restored'),
              },
            })
          }
        >
          With action
        </Button>
      </Row>
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
      <div className="w-full space-y-5">
        <div className="flex gap-3">
          <Skeleton className="size-10 rounded-full" />
          <div className="flex-1 space-y-2 pt-1">
            <Skeleton className="h-3 w-2/3" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
        <Skeleton className="h-20 w-full" />
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
            <h4 className="font-medium">Dimensions</h4>
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
            <SheetDescription>Label</SheetDescription>
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
              <DrawerDescription>Spacing</DrawerDescription>
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
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="link">@alexmorgan</Button>
        </HoverCardTrigger>
        <HoverCardContent>
          <div className="flex gap-3">
            <Avatar>
              <AvatarFallback>AM</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">Alex Morgan</p>
              <p className="text-sm text-muted-foreground">Designer</p>
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
        <ContextMenuTrigger className="flex h-28 w-full items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
          Right-click here
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onSelect={() => toast('Copied')}>
            Copy
          </ContextMenuItem>
          <ContextMenuItem onSelect={() => toast('Pasted')}>
            Paste
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
        className="rounded-lg border"
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
              ).map((a) => (
                <MenubarItem key={a} onSelect={() => toast(a + ' selected')}>
                  {a}
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
            <NavigationMenuLink
              href="https://ui.shadcn.com"
              target="_blank"
              rel="noreferrer"
            >
              Documentation
            </NavigationMenuLink>
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
          <span className="text-sm font-medium">3 design tokens</span>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Toggle tokens">
              <ChevronsUpDown />
            </Button>
          </CollapsibleTrigger>
        </div>
        <div className="token-row">--background</div>
        <CollapsibleContent className="space-y-3">
          <div className="token-row">--foreground</div>
          <div className="token-row">--primary</div>
        </CollapsibleContent>
      </Collapsible>
    ),
  },
  {
    name: 'Resizable',
    category: 'Layout',
    detail: 'Draggable panels',
    render: () => (
      <ResizablePanelGroup
        orientation="horizontal"
        className="min-h-36 rounded-lg border"
      >
        <ResizablePanel defaultSize="50%">
          <div className="panel-label">Panel A</div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize="50%">
          <div className="panel-label">Panel B</div>
        </ResizablePanel>
      </ResizablePanelGroup>
    ),
  },
  {
    name: 'Scroll Area',
    category: 'Layout',
    detail: 'Contained overflow',
    render: () => (
      <ScrollArea className="h-40 w-full rounded-lg border">
        <div className="p-4 space-y-3">
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className="text-sm border-b pb-3">
              Component {String(i + 1).padStart(2, '0')}
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
        <div className="text-sm font-medium">Separator</div>
        <Separator />
        <div className="flex h-5 items-center gap-4 text-sm text-muted-foreground">
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
          {['01', '02', '03'].map((n) => (
            <CarouselItem key={n}>
              <div className="flex h-36 items-center justify-center rounded-lg bg-muted text-4xl font-light">
                {n}
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
