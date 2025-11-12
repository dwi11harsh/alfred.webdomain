# Bolt.newer Frontend

A Next.js 14 application built with TypeScript, Zustand, and Tailwind CSS, featuring neomorphism design and optimized for minimal rerenders.

## Features

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Zustand** for state management with optimized subscriptions
- **Tailwind CSS** for styling (no core CSS)
- **Neomorphism Design** in dark mode
- **Optimized Components** that minimize rerenders

## Project Structure

```
frontend/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles with color variables and neomorphism utilities
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── optimized/        # Components optimized for minimal rerenders
│   └── index.ts          # Component exports
├── zustand/              # State management
│   ├── stores/           # Individual store files
│   │   ├── uiStore.ts    # UI state (sidebar, theme, loading)
│   │   ├── userStore.ts  # User state
│   │   └── appStore.ts   # Application state
│   └── index.ts         # Store exports
└── ...
```

## State Management Pattern

The application uses Zustand with a pattern that minimizes rerenders:

1. **Separate Stores**: Each domain has its own store file
2. **Selective Subscriptions**: Components subscribe only to the specific state they need
3. **Action Selectors**: Actions are exported as separate selectors for stable references
4. **Memoized Components**: Components are wrapped with `memo()` to prevent unnecessary rerenders

### Example Usage

```tsx
// ❌ Bad: Component rerenders on any store change
const MyComponent = () => {
  const { count, message, increment } = useAppStore();
  // ...
};

// ✅ Good: Component only rerenders when count changes
const MyComponent = () => {
  const count = useCount();
  const increment = useIncrement(); // Stable reference, no rerender
  // ...
};
```

## Styling

All colors are defined in `app/globals.css` as CSS variables. Components use these variables instead of hardcoded colors:

```css
--bg-primary: #1a1a1a;
--bg-secondary: #2d2d2d;
--text-primary: #e0e0e0;
--text-secondary: #b0b0b0;
```

Neomorphism utilities are available as Tailwind classes:

- `neo-outset` - Raised effect
- `neo-inset` - Pressed effect
- `neo-flat` - Subtle shadow
- `neo-pressed` - Active pressed state
- `neo-hover` - Hover effect
- `neo-active` - Active state

## Getting Started

1. Install dependencies:

```bash
bun install
```

2. Run the development server:

```bash
bun run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run lint` - Run ESLint

**Note**: This project uses [Bun](https://bun.sh) as the package manager. You can also use `bun` directly instead of `bun run` for scripts (e.g., `bun dev`).

## Best Practices

1. **Minimal Rerenders**: Always use specific selectors instead of subscribing to the entire store
2. **Color Variables**: Never use hardcoded colors in components - use CSS variables from globals.css
3. **Component Size**: Keep components small and focused on a single responsibility
4. **Memoization**: Use `memo()` for components that receive stable props
5. **Action Stability**: Actions from Zustand stores are stable references and won't cause rerenders
