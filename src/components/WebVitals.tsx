'use client';

import { useReportWebVitals } from 'next/web-vitals';

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Web Vitals:', metric);
    }

    // In production, send to analytics service
    if (process.env.NODE_ENV === 'production') {
      // Example: Google Analytics 4
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', metric.name, {
          custom_map: { metric_id: 'custom.web_vitals' },
          value: Math.round(
            metric.name === 'CLS' ? metric.value * 1000 : metric.value
          ),
          event_category: 'Web Vitals',
          event_label: metric.id,
          non_interaction: true,
        });
      }

      // Example: Custom analytics endpoint
      fetch('/api/web-vitals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(metric),
      }).catch(console.error);
    }
  });

  return null;
}
