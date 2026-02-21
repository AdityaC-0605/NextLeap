"use client"

import { lazy, ComponentType } from 'react'

// Predefined lazy components for common use cases
// Map named exports to default for React.lazy compatibility
export const LazyChart = lazy(() =>
  import('./chart').then((m) => ({ default: m.ChartContainer as ComponentType<unknown> }))
)

export const LazyCarousel = lazy(() =>
  import('./carousel').then((m) => ({ default: m.Carousel as ComponentType<unknown> }))
)

// Note: Calendar lazy export removed because the file may be absent or unused
