# Lumina Oracles - Agent Coding Guidelines

This file guides AI coding agents working in this Next.js 16 + TypeScript spiritual services website.

## Build/Lint/Test Commands

```bash
# Development server
bun run dev

# Production build (static export for Cloudflare Pages)
bun run build

# Start production server
bun run start

# Lint code
bun run lint
```

**Single test**: No test framework configured. Run `bun run dev` and verify manually.

## Code Style Guidelines

### Imports
```typescript
// React
import { useState, useEffect, useRef } from "react"

// Next.js
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import dynamic from 'next/dynamic'

// Three.js/WebGL
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

// Utilities
import { cn } from "@/lib/utils"
```

**Path aliases**: Use `@/*` for all internal imports (e.g., `@/components/Hero`, `@/lib/utils`)

### Component Declaration
```typescript
// Server components (default)
export default function Home() {
  return <main>...</main>
}

// Client components
"use client"

import { useState } from "react"

export default function InteractiveComponent() {
  const [state, setState] = useState(null)
  return <div>...</div>
}
```

### Naming Conventions
- **Components**: PascalCase (`Hero`, `ServiceGrid`, `SanctuaryBackground`)
- **Functions/Variables**: camelCase (`handleMouseUp`, `resizeCanvas`)
- **Constants**: SCREAMING_SNAKE_CASE (`SERVICES`, `PLAYLIST`)
- **Types/Interfaces**: PascalCase, `Props` suffix (`ServiceHeaderProps`)
- **Files**: kebab-case (`animated-shader-hero.tsx`, `liquid-glass-button.tsx`)

### TypeScript Patterns
```typescript
// Interface for props
interface ComponentProps {
  title: string
  divineEssence: string
  shaderIndex: number
}

// Forward refs
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, ...props }, ref) => { ... }
)
Button.displayName = "Button"

// Type assertions only when necessary (avoid where possible)
```

### Styling
```typescript
// Tailwind classes with cn() utility for merging
import { cn } from "@/lib/utils"

<div className={cn(
  "base-classes",
  isActive && "active-classes",
  className
)} />

// Custom animations (defined in globals.css):
// animate-blob, animate-float, animate-breath, animate-flow, animate-radiate
```

### Error Handling
```typescript
// Async operations
const playPromise = audioRef.current.play()
if (playPromise !== undefined) {
  playPromise
    .then(() => setIsPlaying(true))
    .catch((error) => console.error("Playback blocked:", error))
}

// Shader compilation (try-catch for WebGL)
try {
  prog = link(vertSrc, fragSrc)
} catch {
  return
}

// Not found pages
import { notFound } from "next/navigation"
if (!service) { notFound() }
```

### File Organization
```
app/              # Next.js App Router (pages, layouts, fonts)
components/       # React components (PascalCase naming)
lib/             # Utilities (cn(), data.ts, utils.ts)
public/           # Static assets
.agent/           # Agent workflows and skills
```

### Key Configuration Notes
- **Static export mode**: `output: 'export'` in next.config.ts (Cloudflare Pages)
- **Images**: Must use `unoptimized: true` for static export
- **TypeScript**: Strict mode enabled, ES2017 target
- **Dynamic imports**: Use `{ ssr: false }` for WebGL/shader components
- **Tailwind**: v4 with custom colors (`--lumina-gold`, `--lumina-cyan`, `--lumina-lavender`)

### Tech Stack
- Next.js 16.1.1 (App Router)
- React 19.2.3
- TypeScript 5 (strict mode)
- Tailwind CSS v4
- Three.js + @react-three/fiber
- WebGL2 shaders
- Shadcn UI components

### Deployment
- Platform: Cloudflare Pages
- Build: `bun run build`
- Output: `out/` directory
