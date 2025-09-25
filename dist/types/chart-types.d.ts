import { Chart as ChartJS, ChartConfiguration, ChartData, ChartOptions } from 'chart.js';
export type ChartType = 'line' | 'bar' | 'pie' | 'doughnut' | 'scatter' | 'bubble' | 'radar';
export interface ChartComponentData {
    labels?: string[];
    datasets: ChartDataset[];
}
export interface ChartDataset {
    label: string;
    data: number[] | Array<{
        x: number;
        y: number;
    }> | Array<{
        x: number;
        y: number;
        r: number;
    }>;
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
    [key: string]: any;
}
export interface ChartEvent {
    event: Event;
    elements: any[];
    chart: ChartJS;
}
export interface ChartComponentProps {
    data: ChartComponentData;
    type: ChartType;
    options?: ChartOptions;
    width?: number;
    height?: number;
    onChartClick?: (event: ChartEvent) => void;
    onChartHover?: (event: ChartEvent) => void;
    class?: string;
    style?: string | Record<string, string>;
}
export interface ChartConfigWithDefaults extends ChartConfiguration {
    type: ChartType;
    data: ChartData;
    options: ChartOptions & {
        responsive: boolean;
        maintainAspectRatio: boolean;
    };
}
export interface ValidationResult {
    isValid: boolean;
    errors: string[];
}
export interface UseChartReturn {
    createChart: (canvas: HTMLCanvasElement, type: ChartType, data: ChartComponentData, options?: ChartOptions) => Promise<any>;
    destroyChart: () => void;
}
//# sourceMappingURL=chart-types.d.ts.map