'use client';

import { useEffect } from 'react';

// Расширение типа Window для gtag
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void;
  }
}

// Типы для web-vitals
interface Metric {
  name: string;
  value: number;
  delta: number;
  id: string;
  entries: PerformanceEntry[];
}

export default function WebVitals() {
  useEffect(() => {
    // Отслеживание Core Web Vitals
    if (typeof window !== 'undefined' && 'web-vitals' in window) {
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        // Cumulative Layout Shift
        getCLS((metric: Metric) => {
          console.log('CLS:', metric);
          // Отправка метрики в аналитику
          if (typeof window.gtag !== 'undefined') {
            window.gtag('event', 'web_vitals', {
              event_category: 'Web Vitals',
              event_label: 'CLS',
              value: Math.round(metric.value * 1000),
              custom_map: { metric_value: metric.value }
            });
          }
        });

        // First Input Delay
        getFID((metric: Metric) => {
          console.log('FID:', metric);
          if (typeof window.gtag !== 'undefined') {
            window.gtag('event', 'web_vitals', {
              event_category: 'Web Vitals',
              event_label: 'FID',
              value: Math.round(metric.value),
              custom_map: { metric_value: metric.value }
            });
          }
        });

        // First Contentful Paint
        getFCP((metric: Metric) => {
          console.log('FCP:', metric);
          if (typeof window.gtag !== 'undefined') {
            window.gtag('event', 'web_vitals', {
              event_category: 'Web Vitals',
              event_label: 'FCP',
              value: Math.round(metric.value),
              custom_map: { metric_value: metric.value }
            });
          }
        });

        // Largest Contentful Paint
        getLCP((metric: Metric) => {
          console.log('LCP:', metric);
          if (typeof window.gtag !== 'undefined') {
            window.gtag('event', 'web_vitals', {
              event_category: 'Web Vitals',
              event_label: 'LCP',
              value: Math.round(metric.value),
              custom_map: { metric_value: metric.value }
            });
          }
        });

        // Time to First Byte
        getTTFB((metric: Metric) => {
          console.log('TTFB:', metric);
          if (typeof window.gtag !== 'undefined') {
            window.gtag('event', 'web_vitals', {
              event_category: 'Web Vitals',
              event_label: 'TTFB',
              value: Math.round(metric.value),
              custom_map: { metric_value: metric.value }
            });
          }
        });
      });
    }
  }, []);

  return null;
}