# Component API Contract

**Date**: September 25, 2025  
**Component**: SolidJS Charts Component

## Component Interface Contract

### Required Props

```typescript
interface ChartComponentProps {
  // Required: Chart data in Chart.js format
  data: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      backgroundColor?: string | string[];
      borderColor?: string | string[];
      [key: string]: any;
    }>;
  };
  
  // Required: Chart type
  type: 'line' | 'bar' | 'pie' | 'doughnut' | 'scatter' | 'bubble' | 'radar';
}
```

### Optional Props

```typescript
interface OptionalProps {
  // Chart.js configuration options
  options?: {
    responsive?: boolean;
    maintainAspectRatio?: boolean;
    plugins?: Record<string, any>;
    scales?: Record<string, any>;
    [key: string]: any;
  };
  
  // Dimension overrides
  width?: number;
  height?: number;
  
  // Event handlers
  onChartClick?: (event: {
    event: Event;
    elements: any[];
    chart: Chart;
  }) => void;
  
  onChartHover?: (event: {
    event: Event;
    elements: any[];
    chart: Chart;
  }) => void;
}
```

### Return Type

```typescript
// SolidJS JSX Element
JSX.Element
```

## Behavioral Contract

### Initialization
- Component MUST render Chart.js chart on mount
- Component MUST use provided data and type
- Component MUST apply default responsive behavior
- Component MUST handle initialization errors gracefully

### Updates  
- Component MUST reactively update when data prop changes
- Component MUST update when type prop changes
- Component MUST update when options prop changes
- Component MUST maintain performance during frequent updates

### Events
- Component MUST emit click events when onChartClick provided
- Component MUST emit hover events when onChartHover provided
- Component MUST provide chart instance in event data

### Cleanup
- Component MUST destroy Chart.js instance on unmount
- Component MUST remove all event listeners on unmount
- Component MUST clean up any resources on unmount

### Error Handling  
- Component MUST display error message when initialization fails
- Component MUST not crash parent component on errors
- Component MUST provide meaningful error messages

## Usage Contract

### Valid Usage
```jsx
// Basic usage
<Chart data={chartData} type="line" />

// With options
<Chart 
  data={chartData} 
  type="bar" 
  options={{ responsive: true }}
  onChartClick={handleClick}
/>
```

### Invalid Usage
```jsx
// Missing required props - MUST throw TypeScript error
<Chart />

// Invalid chart type - MUST throw TypeScript error  
<Chart data={chartData} type="invalid" />

// Invalid data format - MUST show error message
<Chart data="invalid" type="line" />
```