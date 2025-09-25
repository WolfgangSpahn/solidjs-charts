import type { ChartComponentData, ChartType, ValidationResult, ChartConfigWithDefaults } from '../types/chart-types';
import type { ChartOptions } from 'chart.js';

// Default chart options with SolidJS-optimized settings
export const DEFAULT_CHART_OPTIONS: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 300, // Faster animations for better UX
  },
  scales: {
    x: {
      grid: {
        display: true,
      },
    },
    y: {
      grid: {
        display: true,
      },
      beginAtZero: true,
    },
  },
  plugins: {
    legend: {
      display: true,
      position: 'top',
    },
    tooltip: {
      enabled: true,
      mode: 'index',
      intersect: false,
    },
  },
  interaction: {
    mode: 'nearest',
    axis: 'x',
    intersect: false,
  },
};

// Chart type specific default options
export const TYPE_SPECIFIC_OPTIONS: Record<ChartType, Partial<ChartOptions>> = {
  line: {
    elements: {
      line: {
        tension: 0.1, // Slight curve for line charts
      },
    },
  },
  bar: {
    scales: {
      x: {
        grid: {
          display: false, // Clean look for bar charts
        },
      },
    },
  },
  pie: {
    scales: {}, // No scales for pie charts
    plugins: {
      legend: {
        position: 'right',
      },
    },
  },
  doughnut: {
    scales: {}, // No scales for doughnut charts
    plugins: {
      legend: {
        position: 'right',
      },
    },
    // Note: cutout is a dataset property, not a chart option
    // It should be set on individual datasets when creating the chart
  },
  scatter: {
    plugins: {
      legend: {
        display: false, // Usually not needed for scatter plots
      },
    },
  },
  bubble: {
    plugins: {
      legend: {
        display: false, // Usually not needed for bubble charts
      },
    },
  },
  radar: {
    scales: {
      r: {
        beginAtZero: true,
        grid: {
          display: true,
        },
      },
    },
  },
};

/**
 * Validates chart data structure
 */
export function validateChartData(data: ChartComponentData, type: ChartType): ValidationResult {
  const errors: string[] = [];

  // Check if data exists
  if (!data) {
    errors.push('Chart data is required');
    return { isValid: false, errors };
  }

  // Check labels (not required for scatter and bubble charts)
  if (!['scatter', 'bubble'].includes(type) && !Array.isArray(data.labels)) {
    errors.push('Chart data must include labels array');
  }

  // Check datasets
  if (!Array.isArray(data.datasets) || data.datasets.length === 0) {
    errors.push('Chart data must include at least one dataset');
  } else {
    data.datasets.forEach((dataset, index) => {
      if (!dataset.label) {
        errors.push(`Dataset at index ${index} must have a label`);
      }
      
      if (!Array.isArray(dataset.data)) {
        errors.push(`Dataset at index ${index} must have a data array`);
      } else {
        // Type-specific validation
        switch (type) {
          case 'bubble':
            // Bubble charts need objects with x, y, r properties
            if (!dataset.data.every(point => 
              typeof point === 'object' && 
              point !== null &&
              'x' in point && 
              'y' in point && 
              'r' in point
            )) {
              errors.push(`Dataset at index ${index} for bubble chart must contain objects with x, y, r properties`);
            }
            break;
            
          case 'scatter':
            // Scatter charts need objects with x, y properties
            if (!dataset.data.every(point => 
              typeof point === 'object' && 
              point !== null &&
              'x' in point && 
              'y' in point
            )) {
              errors.push(`Dataset at index ${index} for scatter chart must contain objects with x, y properties`);
            }
            break;
            
          default:
            // Other chart types need numbers
            if (!dataset.data.every(point => typeof point === 'number')) {
              errors.push(`Dataset at index ${index} for ${type} chart must contain numbers`);
            }
        }
      }
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Merges default options with user options and type-specific options
 */
export function createChartConfig(
  type: ChartType,
  data: ChartComponentData,
  userOptions: ChartOptions = {}
): ChartConfigWithDefaults {
  // Get type-specific options
  const typeOptions = TYPE_SPECIFIC_OPTIONS[type] || {};
  
  // Deep merge options (user options take precedence)
  const mergedOptions = {
    ...DEFAULT_CHART_OPTIONS,
    ...typeOptions,
    ...userOptions,
    // Ensure these are always set for SolidJS
    responsive: true,
    maintainAspectRatio: false,
  };

  return {
    type,
    data,
    options: mergedOptions,
  };
}

/**
 * Generates a unique ID for chart instances
 */
export function generateChartId(): string {
  return `solidjs-chart-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Safely destroys a Chart.js instance
 */
export function safeDestroyChart(chart: any): void {
  try {
    if (chart && typeof chart.destroy === 'function') {
      chart.destroy();
    }
  } catch (error) {
    console.warn('Error destroying chart:', error);
  }
}

/**
 * Checks if Chart.js is available
 */
export function isChartJSAvailable(): boolean {
  try {
    return typeof window !== 'undefined' && 'Chart' in window;
  } catch {
    return false;
  }
}