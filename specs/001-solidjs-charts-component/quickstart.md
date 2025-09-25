# Quickstart: SolidJS Charts Component

**Date**: September 25, 2025  
**Component**: SolidJS Charts Component

## Installation

```bash
npm install solidjs-charts chart.js
```

## Basic Usage

### 1. Import the Component

```typescript
import { Chart } from 'solidjs-charts';
import { createSignal } from 'solid-js';
```

### 2. Prepare Chart Data

```typescript
const [chartData, setChartData] = createSignal({
  labels: ['January', 'February', 'March', 'April', 'May'],
  datasets: [{
    label: 'Sales Data',
    data: [12, 19, 3, 5, 2],
    backgroundColor: 'rgba(54, 162, 235, 0.2)',
    borderColor: 'rgba(54, 162, 235, 1)',
    borderWidth: 1
  }]
});
```

### 3. Render the Chart

```tsx
function App() {
  return (
    <div>
      <h1>My Dashboard</h1>
      <Chart data={chartData()} type="bar" />
    </div>
  );
}
```

## Advanced Usage

### With Custom Options

```tsx
const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Sales Chart'
    }
  },
  scales: {
    y: {
      beginAtZero: true
    }
  }
};

<Chart 
  data={chartData()} 
  type="line" 
  options={options}
/>
```

### With Event Handling

```tsx
const handleChartClick = (event) => {
  console.log('Chart clicked:', event.elements);
};

const handleChartHover = (event) => {
  console.log('Chart hovered:', event.elements);  
};

<Chart 
  data={chartData()} 
  type="pie"
  onChartClick={handleChartClick}
  onChartHover={handleChartHover}  
/>
```

### Reactive Data Updates

```tsx
function ReactiveChart() {
  const [data, setData] = createSignal(initialData);
  
  // Update data every 2 seconds
  setInterval(() => {
    setData(prev => ({
      ...prev,
      datasets: [{
        ...prev.datasets[0],
        data: prev.datasets[0].data.map(() => Math.random() * 100)
      }]
    }));
  }, 2000);
  
  return <Chart data={data()} type="line" />;
}
```

## Chart Types

### Supported Types
- `line` - Line chart
- `bar` - Bar chart  
- `pie` - Pie chart
- `doughnut` - Doughnut chart
- `scatter` - Scatter plot
- `bubble` - Bubble chart
- `radar` - Radar chart

### Example for Each Type

```tsx
// Line Chart
<Chart data={timeSeriesData} type="line" />

// Bar Chart  
<Chart data={categoryData} type="bar" />

// Pie Chart
<Chart data={proportionalData} type="pie" />

// Doughnut Chart
<Chart data={proportionalData} type="doughnut" />

// Scatter Plot
<Chart data={scatterData} type="scatter" />

// Bubble Chart
<Chart data={bubbleData} type="bubble" />

// Radar Chart  
<Chart data={radarData} type="radar" />
```

## Error Handling

```tsx
// Invalid data will show error message
const invalidData = { labels: [], datasets: [] };

<Chart 
  data={invalidData} 
  type="line" 
  // Will display: "Error: No data provided for chart"
/>
```

## Testing Your Integration

### 1. Verify Chart Renders
- Chart should appear in the DOM
- Chart should match the specified type
- Chart should display the provided data

### 2. Test Reactivity
- Change data via signal
- Chart should update automatically
- No full re-render should occur

### 3. Test Interactions
- Click on chart elements
- Hover over chart elements  
- Event handlers should fire correctly

### 4. Test Error States
- Provide invalid data
- Error message should display
- Component should not crash

## Performance Tips

1. **Avoid frequent data updates** - Chart.js updates can be expensive
2. **Use Chart.js animation controls** - Disable animations for better performance
3. **Optimize data structure** - Keep datasets minimal for large datasets
4. **Consider data decimation** - For time series with many points

## Common Issues

### Chart Not Rendering
- Ensure Chart.js is installed as peer dependency
- Check that data format matches Chart.js expectations
- Verify container has dimensions

### Poor Performance  
- Reduce animation duration or disable animations
- Limit dataset size for large data
- Use appropriate chart type for data volume

### TypeScript Errors
- Ensure correct data types for props
- Import Chart.js types if needed
- Check that chart type is valid