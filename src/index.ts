// Main exports for solidjs-charts library
export { Chart, Chart as default } from './components/Chart';

// Type exports
export type {
  ChartType,
  ChartComponentData,
  ChartDataset,
  ChartEvent,
  ChartComponentProps,
  ChartConfigWithDefaults,
  ValidationResult,
  UseChartReturn,
} from './types/chart-types';

// Hook exports
export { useChart } from './hooks/useChart';

// Utility exports
export {
  DEFAULT_CHART_OPTIONS,
  TYPE_SPECIFIC_OPTIONS,
  validateChartData,
  createChartConfig,
  generateChartId,
  safeDestroyChart,
  isChartJSAvailable,
} from './utils/chart-utils';