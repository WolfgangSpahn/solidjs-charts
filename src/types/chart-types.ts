import type { Chart as ChartJS, ChartConfiguration, ChartData, ChartOptions } from 'chart.js';

// Chart types supported by the component
export type ChartType = 'line' | 'bar' | 'pie' | 'doughnut' | 'scatter' | 'bubble' | 'radar';

// Chart data structure for SolidJS Chart component
export interface ChartComponentData {
  labels?: string[]; // Optional for scatter and bubble charts
  datasets: ChartDataset[];
}

// Dataset structure
export interface ChartDataset {
  label: string;
  data: number[] | Array<{x: number, y: number}> | Array<{x: number, y: number, r: number}>; // Support different data formats
  backgroundColor?: string | string[];
  borderColor?: string | string[];
  borderWidth?: number;
  [key: string]: any; // Allow additional Chart.js properties
}

// Event data structure for chart interactions
export interface ChartEvent {
  event: Event;
  elements: any[];
  chart: ChartJS;
}

// Component props interface
export interface ChartComponentProps {
  // Required props
  data: ChartComponentData;
  type: ChartType;
  
  // Optional props
  options?: ChartOptions;
  width?: number;
  height?: number;
  
  // Event handlers
  onChartClick?: (event: ChartEvent) => void;
  onChartHover?: (event: ChartEvent) => void;
  
  // Additional props
  class?: string;
  style?: string | Record<string, string>;
}

// Chart configuration with defaults
export interface ChartConfigWithDefaults extends ChartConfiguration {
  type: ChartType;
  data: ChartData;
  options: ChartOptions & {
    responsive: boolean;
    maintainAspectRatio: boolean;
  };
}

// Validation result for chart data
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

// Hook return type for useChart (simplified)
export interface UseChartReturn {
  createChart: (
    canvas: HTMLCanvasElement,
    type: ChartType,
    data: ChartComponentData,
    options?: ChartOptions
  ) => Promise<any>;
  destroyChart: () => void;
}