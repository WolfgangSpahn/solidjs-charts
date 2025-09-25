import { ChartComponentData, ChartType } from '../types/chart-types';
import { ChartOptions } from 'chart.js';
/**
 * Simple hook for Chart.js utilities
 */
export declare function useChart(): {
    createChart: (canvas: HTMLCanvasElement, type: ChartType, data: ChartComponentData, options?: ChartOptions) => Promise<any>;
    destroyChart: () => void;
};
//# sourceMappingURL=useChart.d.ts.map