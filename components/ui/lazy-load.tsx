"use client"

import { Suspense, lazy, ComponentType } from 'react'

interface LazyLoadProps {
  component: () => Promise<{ default: ComponentType<any> }>
  fallback?: React.ReactNode
  props?: any
}

export function LazyLoad({ component, fallback, props }: LazyLoadProps) {
  const LazyComponent = lazy(component)
  
  return (
    <Suspense fallback={fallback || <div className="animate-pulse">Loading...</div>}>
      <LazyComponent {...props} />
    </Suspense>
  )
}

// Predefined lazy components for common use cases
// Map named exports to default for React.lazy compatibility
export const LazyChart = lazy(() =>
  import('./chart').then((m) => ({ default: m.ChartContainer as ComponentType<any> }))
)

export const LazyCarousel = lazy(() =>
  import('./carousel').then((m) => ({ default: (m as any).Carousel as ComponentType<any> }))
)

// Note: Calendar lazy export removed because the file may be absent or unused
