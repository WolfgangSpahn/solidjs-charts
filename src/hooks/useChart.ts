import { onCleanup } from 'solid-js';
import type { ChartComponentData, ChartType } from '../types/chart-types';
import type { ChartOptions } from 'chart.js';
import { 
  validateChartData, 
  createChartConfig, 
  safeDestroyChart
} from '../utils/chart-utils';

/**
 * Simple hook for Chart.js utilities
 */
export function useChart() {
  let chartInstance: any = null;

  const createChart = async (
    canvas: HTMLCanvasElement,
    type: ChartType,
    data: ChartComponentData,
    options?: ChartOptions
  ) => {
    // Cleanup existing instance
    if (chartInstance) {
      safeDestroyChart(chartInstance);
      chartInstance = null;
    }

    // Validate data
    const validation = validateChartData(data, type);
    if (!validation.isValid) {
      throw new Error(`Invalid chart data: ${validation.errors.join(', ')}`);
    }

    // Dynamic import and create chart
    const { Chart, registerables } = await import('chart.js');
    Chart.register(...registerables);
    
    const config = createChartConfig(type, data, options);
    chartInstance = new Chart(canvas, config);
    
    return chartInstance;
  };

  const destroyChart = () => {
    if (chartInstance) {
      safeDestroyChart(chartInstance);
      chartInstance = null;
    }
  };

  // Cleanup on unmount
  onCleanup(() => {
    destroyChart();
  });

  return {
    createChart,
    destroyChart,
  };
}