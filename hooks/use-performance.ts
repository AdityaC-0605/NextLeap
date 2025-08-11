"use client"

import { useEffect, useRef } from 'react'

interface PerformanceMetrics {
  fcp: number | null
  lcp: number | null
  fid: number | null
  cls: number | null
  ttfb: number | null
}

export function usePerformance() {
  const metrics = useRef<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null
  })

  useEffect(() => {
    // First Contentful Paint
    const fcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint')
      if (fcpEntry) {
        metrics.current.fcp = fcpEntry.startTime
        console.log('FCP:', fcpEntry.startTime)
      }
    })
    fcpObserver.observe({ entryTypes: ['paint'] })

    // Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lcpEntry = entries[entries.length - 1]
      if (lcpEntry) {
        metrics.current.lcp = lcpEntry.startTime
        console.log('LCP:', lcpEntry.startTime)
      }
    })
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

    // First Input Delay (deprecated) — approximate using Event Timing API when available
    try {
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'first-input') {
            const anyEntry = entry as any
            const fid = (anyEntry.processingStart ?? anyEntry.startTime) - anyEntry.startTime
            metrics.current.fid = typeof fid === 'number' ? fid : null
            if (metrics.current.fid != null) {
              console.log('FID:', metrics.current.fid)
            }
          }
        }
      })
      fidObserver.observe({ entryTypes: ['first-input'] as any })
    } catch {
      // Ignore if not supported
    }

    // Cumulative Layout Shift
    const clsObserver = new PerformanceObserver((list) => {
      let clsValue = 0
      list.getEntries().forEach(entry => {
        if (entry.entryType === 'layout-shift') {
          clsValue += (entry as any).value
        }
      })
      metrics.current.cls = clsValue
      console.log('CLS:', clsValue)
    })
    clsObserver.observe({ entryTypes: ['layout-shift'] })

    // Time to First Byte
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    if (navigationEntry) {
      metrics.current.ttfb = navigationEntry.responseStart - navigationEntry.requestStart
      console.log('TTFB:', metrics.current.ttfb)
    }

    return () => {
      fcpObserver.disconnect()
      lcpObserver.disconnect()
      // fidObserver may not exist if unsupported; nothing to clean up here
      clsObserver.disconnect()
    }
  }, [])

  return metrics.current
}

// Performance optimization utilities
export function preloadImage(src: string) {
  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = 'image'
  link.href = src
  document.head.appendChild(link)
}

export function preloadFont(family: string, weight: string) {
  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = 'font'
  link.href = `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&display=swap`
  document.head.appendChild(link)
}
