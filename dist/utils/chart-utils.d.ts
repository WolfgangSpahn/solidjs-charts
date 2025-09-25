import { ChartComponentData, ChartType, ValidationResult, ChartConfigWithDefaults } from '../types/chart-types';
import { ChartOptions } from 'chart.js';
export declare const DEFAULT_CHART_OPTIONS: ChartOptions;
export declare const TYPE_SPECIFIC_OPTIONS: Record<ChartType, Partial<ChartOptions>>;
/**
 * Validates chart data structure
 */
export declare function validateChartData(data: ChartComponentData, type: ChartType): ValidationResult;
/**
 * Merges default options with user options and type-specific options
 */
export declare function createChartConfig(type: ChartType, data: ChartComponentData, userOptions?: ChartOptions): ChartConfigWithDefaults;
/**
 * Generates a unique ID for chart instances
 */
export declare function generateChartId(): string;
/**
 * Safely destroys a Chart.js instance
 */
export declare function safeDestroyChart(chart: any): void;
/**
 * Checks if Chart.js is available
 */
export declare function isChartJSAvailable(): boolean;
//# sourceMappingURL=chart-utils.d.ts.map