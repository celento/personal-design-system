// Builds the files that let other projects and models use this design system
// without cloning the repo:
//
//   public/llms.txt       The spec (README) and token values, as one text file.
//   public/llms-full.txt  The same, plus the source of every component.
//   public/r/*.json       An installable component registry, expanded from
//                         registry.json.
//
// The output is committed so it is reachable from GitHub as well as from the
// deployed site. `--check` fails if the committed files are out of date.

import fs from 'node:fs'
import path from 'node:path'
import { registryItemSchema, registrySchema } from 'shadcn/schema'

const root = path.resolve(import.meta.dirname, '..')
const REPO = 'celento/personal-design-system'
const RAW = `https://raw.githubusercontent.com/${REPO}/main`
const REGISTRY_URL = `${RAW}/public/r`
const check = process.argv.includes('--check')

const read = (p) => fs.readFileSync(path.join(root, p), 'utf8')
const exists = (p) => fs.existsSync(path.join(root, p))
const pkg = JSON.parse(read('package.json'))
const manifest = JSON.parse(read('registry.json'))

// ---------- source files and their dependencies ----------

const uiFiles = fs
  .readdirSync(path.join(root, 'src/components/ui'))
  .filter((f) => f.endsWith('.tsx'))
  .sort()
  .map((f) => `src/components/ui/${f}`)

function fileType(p) {
  if (p.startsWith('src/components/ui/')) return 'registry:ui'
  if (p.startsWith('src/lib/')) return 'registry:lib'
  if (p.endsWith('.css')) return 'registry:file'
  return 'registry:component'
}

function specifiers(source) {
  return [...source.matchAll(/(?:from|import)\s+['"]([^'"]+)['"]/g)].map(
    (m) => m[1],
  )
}

function resolveLocal(spec, fromFile) {
  let base
  if (spec.startsWith('@/')) base = path.posix.join('src', spec.slice(2))
  else if (spec.startsWith('.'))
    base = path.posix.join(path.posix.dirname(fromFile), spec)
  else return null
  for (const ext of ['', '.tsx', '.ts', '.css']) {
    if (
      exists(base + ext) &&
      !fs.statSync(path.join(root, base + ext)).isDirectory()
    )
      return base + ext
  }
  throw new Error(`Cannot resolve ${spec} from ${fromFile}`)
}

function packageName(spec) {
  if (spec.startsWith('.') || spec.startsWith('@/')) return null
  const parts = spec.split('/')
  return spec.startsWith('@') ? parts.slice(0, 2).join('/') : parts[0]
}

// Walks local imports so an item carries every file it needs.
function closure(entries) {
  const files = new Set()
  const packages = new Set()
  const visit = (file) => {
    if (files.has(file)) return
    files.add(file)
    if (file.endsWith('.css')) return
    for (const spec of specifiers(read(file))) {
      const local = resolveLocal(spec, file)
      if (local) visit(local)
      else {
        const name = packageName(spec)
        if (name && name !== 'react' && name !== 'react-dom') packages.add(name)
      }
    }
  }
  entries.forEach(visit)
  return { files: [...files].sort(), packages: [...packages].sort() }
}

function dependencies(packages) {
  return packages.map((name) => {
    const version = pkg.dependencies[name]
    if (!version) throw new Error(`${name} is imported but not in dependencies`)
    return `${name}@${version}`
  })
}

// ---------- tokens ----------

function declarations(body) {
  const out = {}
  for (const decl of body.replace(/\/\*[\s\S]*?\*\//g, '').split(';')) {
    const i = decl.indexOf(':')
    if (i < 0) continue
    const key = decl.slice(0, i).trim()
    if (key.startsWith('--'))
      out[key.slice(2)] = decl
        .slice(i + 1)
        .trim()
        .replace(/\s+/g, ' ')
  }
  return out
}

const tokensCss = read('src/styles/tokens.css')
const block = (re) => {
  const m = tokensCss.match(re)
  if (!m) throw new Error(`tokens.css is missing ${re}`)
  return declarations(m[1])
}
const topLevelRoots = [...tokensCss.matchAll(/^:root \{([^}]*)\}/gm)].map((m) =>
  declarations(m[1]),
)
const light = Object.assign({}, ...topLevelRoots)
const dark = block(/^\.dark \{([^}]*)\}/m)
const coarse = block(/@media \(pointer: coarse\) \{\s*:root \{([^}]*)\}/)
const theme = declarations(
  read('src/index.css').match(/@theme inline \{([^}]*)\}/)[1],
)

// ---------- registry ----------

const installCommand = `npx shadcn@latest add ${REGISTRY_URL}/design-system.json`

const designSystemDocs = [
  'Design system installed.',
  '',
  '1. Import the component styles once in your global stylesheet, after Tailwind:',
  "   @import './styles/materials.css';  (adjust the path to where the file was written)",
  '2. Wrap the app in <MotionProvider> from @/lib/motion.',
  '3. Mount <Toaster position="bottom-right" closeButton /> once at the root.',
  '4. Follow the rules at ' + `${RAW}/public/llms.txt`,
].join('\n')

function fileEntry(p) {
  const entry = { path: p, type: fileType(p), content: read(p) }
  if (entry.type === 'registry:file') entry.target = p
  return entry
}

function buildItem(spec) {
  const isAll = spec.include?.includes('*')
  const entries = isAll
    ? [...uiFiles, 'src/lib/motion.tsx', 'src/styles/materials.css']
    : (spec.files ?? [`src/components/ui/${spec.name}.tsx`])
  const { files, packages } = closure(entries)
  // Stylesheet-only packages the design system imports from index.css.
  if (isAll)
    packages.push('@fontsource-variable/inter', 'tw-animate-css', 'shadcn')

  const item = {
    $schema: 'https://ui.shadcn.com/schema/registry-item.json',
    name: spec.name,
    type: spec.type ?? 'registry:ui',
    title:
      spec.title ??
      spec.name
        .split('-')
        .map((w) => w[0].toUpperCase() + w.slice(1))
        .join(' '),
    description: spec.description,
    dependencies: dependencies([...new Set(packages)].sort()),
    files: files.map(fileEntry),
  }
  if (isAll) {
    item.cssVars = { theme, light, dark }
    item.css = {
      '@import "tw-animate-css"': {},
      '@import "shadcn/tailwind.css"': {},
      '@import "@fontsource-variable/inter"': {},
      '@layer base': {
        '*': { '@apply border-border outline-ring/50': {} },
        body: { '@apply bg-background text-foreground': {} },
        html: { '@apply font-sans': {} },
      },
      '@media (pointer: coarse)': {
        ':root': Object.fromEntries(
          Object.entries(coarse).map(([k, v]) => [`--${k}`, v]),
        ),
      },
    }
    item.docs = designSystemDocs
  } else {
    item.docs = `Needs the tokens and styles from ${REGISTRY_URL}/design-system.json. Install that first if the project doesn't have it.`
  }
  return registryItemSchema.parse(item)
}

const listed = new Set(
  manifest.items
    .filter((i) => !i.include)
    .map((i) => `src/components/ui/${i.name}.tsx`),
)
const missing = uiFiles.filter((f) => !listed.has(f))
if (missing.length)
  throw new Error(
    `Add these components to registry.json: ${missing.join(', ')}`,
  )

const items = manifest.items.map(buildItem)
const index = registrySchema.parse({
  $schema: 'https://ui.shadcn.com/schema/registry.json',
  name: manifest.name,
  homepage: manifest.homepage,
  items: items.map((item) => ({
    ...item,
    files: item.files.map(({ content: _content, ...rest }) => rest),
  })),
})

// ---------- llms.txt ----------

function readmeForModels() {
  return read('README.md')
    .replace(/\n## Development[\s\S]*$/, '\n')
    .replace(/\n## Contents\n[\s\S]*?\n## /, '\n## ')
    .trim()
}

const header = `# Design system

> Components, tokens, and rules for building web interfaces with AI models.
> Follow this document unless the person you are building for says otherwise.

- Install everything into a React + Tailwind v4 project: \`${installCommand}\`
- Component registry: ${REGISTRY_URL}/registry.json
- Spec with component source: ${RAW}/public/llms-full.txt
- Repository: https://github.com/${REPO}
`

const tokensSection = `## Token file

\`src/styles/tokens.css\`:

\`\`\`css
${tokensCss.trim()}
\`\`\`
`

const llms = [
  header,
  readmeForModels().replace(/^# Design system\n+/, ''),
  tokensSection,
].join('\n\n')

const sourceFiles = [
  'src/index.css',
  'src/styles/materials.css',
  ...closure([...uiFiles, 'src/lib/motion.tsx']).files.filter(
    (f) => !f.endsWith('.css'),
  ),
  'src/components/effects/beam-surface.tsx',
  'src/components/effects/metal-surface.tsx',
]
const fence = (p) => (p.endsWith('.css') ? 'css' : 'tsx')
const llmsFull = [
  llms,
  '## Source files\n\nEvery file below is part of the design system. Paths are relative to the project root.',
  ...sourceFiles.map(
    (p) => `### ${p}\n\n\`\`\`${fence(p)}\n${read(p).trim()}\n\`\`\``,
  ),
].join('\n\n')

// ---------- write or check ----------

const outputs = new Map([
  ['public/llms.txt', llms.trim() + '\n'],
  ['public/llms-full.txt', llmsFull.trim() + '\n'],
  ['public/r/registry.json', JSON.stringify(index, null, 2) + '\n'],
  ...items.map((item) => [
    `public/r/${item.name}.json`,
    JSON.stringify(item, null, 2) + '\n',
  ]),
])
const stale = fs.existsSync(path.join(root, 'public/r'))
  ? fs
      .readdirSync(path.join(root, 'public/r'))
      .map((f) => `public/r/${f}`)
      .filter((f) => !outputs.has(f))
  : []

if (check) {
  const outdated = [...outputs]
    .filter(([p, c]) => !exists(p) || read(p) !== c)
    .map(([p]) => p)
  if (outdated.length || stale.length) {
    console.error(
      `Distribution files are out of date: ${[...outdated, ...stale].join(', ')}\nRun npm run build:dist and commit the result.`,
    )
    process.exit(1)
  }
  console.log(`Distribution files are up to date (${outputs.size} files).`)
} else {
  fs.mkdirSync(path.join(root, 'public/r'), { recursive: true })
  for (const f of stale) fs.rmSync(path.join(root, f))
  for (const [p, c] of outputs) fs.writeFileSync(path.join(root, p), c)
  console.log(`Wrote ${outputs.size} files.`)
}
