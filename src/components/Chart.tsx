import { mergeProps, Show, onCleanup, createEffect } from 'solid-js';
import type { Component } from 'solid-js';
import type { ChartComponentProps } from '../types/chart-types';
import { validateChartData, createChartConfig, safeDestroyChart } from '../utils/chart-utils';

/**
 * SolidJS Chart component that wraps Chart.js with proper reactivity
 */
export const Chart: Component<ChartComponentProps> = (props) => {
  // Merge with default props
  const merged = mergeProps({
    width: 400,
    height: 200,
    options: {},
  }, props);

  // Validate data - purely functional
  const validation = () => validateChartData(merged.data, merged.type);
  const isValid = () => validation().isValid;

  let canvasRef: HTMLCanvasElement | undefined;
  let chartInstance: any = null;
  let currentType: string | undefined;

  // Chart management function
  const manageChart = async () => {
    if (!canvasRef || !isValid()) return;

    // If type changed, destroy existing chart
    if (chartInstance && currentType !== merged.type) {
      safeDestroyChart(chartInstance);
      chartInstance = null;
    }

    // Create new chart if needed
    if (!chartInstance) {
      try {
        const { Chart: ChartJS, registerables } = await import('chart.js');
        ChartJS.register(...registerables);
        
        const config = createChartConfig(merged.type, merged.data, merged.options);
        chartInstance = new ChartJS(canvasRef, config);
        currentType = merged.type;

        // Handle events
        if (merged.onChartClick) {
          canvasRef.onclick = (event) => {
            if (!chartInstance) return;
            const elements = chartInstance.getElementsAtEventForMode(
              event,
              'nearest',
              { intersect: true },
              false
            );
            merged.onChartClick!({
              event,
              elements,
              chart: chartInstance,
            });
          };
        }

        if (merged.onChartHover) {
          canvasRef.onmousemove = (event) => {
            if (!chartInstance) return;
            const elements = chartInstance.getElementsAtEventForMode(
              event,
              'nearest',
              { intersect: false },
              false
            );
            merged.onChartHover!({
              event,
              elements,
              chart: chartInstance,
            });
          };
        }
      } catch (error) {
        console.error('Failed to initialize chart:', error);
      }
    } else {
      // Update existing chart data
      chartInstance.data = merged.data;
      if (merged.options) {
        Object.assign(chartInstance.options, merged.options);
      }
      chartInstance.update('none');
    }
  };

  // React to prop changes
  createEffect(() => {
    // Track all the props we care about
    merged.type;
    merged.data;
    merged.options;
    
    // Manage chart based on current props
    manageChart();
  });

  // Cleanup on component unmount
  onCleanup(() => {
    if (chartInstance) {
      safeDestroyChart(chartInstance);
      chartInstance = null;
    }
  });

  return (
    <div 
      class={`solidjs-chart-container ${merged.class || ''}`}
      style={typeof merged.style === 'string' ? merged.style : undefined}
      classList={{
        'chart-error': !isValid(),
      }}
    >
      <Show 
        when={isValid()} 
        fallback={
          <div class="chart-error-message" style={`
            display: flex;
            align-items: center;
            justify-content: center;
            width: ${merged.width}px;
            height: ${merged.height}px;
            background-color: #f8f9fa;
            border: 1px solid #dee2e6;
            border-radius: 4px;
            color: #dc3545;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            font-size: 14px;
            text-align: center;
            padding: 20px;
          `}>
            <div>
              <div style="font-weight: 600; margin-bottom: 8px;">Chart Error</div>
              <div>{validation().errors.join(', ')}</div>
            </div>
          </div>
        }
      >
        <canvas
          ref={(canvas) => {
            canvasRef = canvas;
            if (canvas) {
              manageChart();
            }
          }}
          width={merged.width}
          height={merged.height}
          style={`
            display: block;
            box-sizing: border-box;
            width: ${merged.width}px;
            height: ${merged.height}px;
          `}
        />
      </Show>
    </div>
  );
};

export default Chart;