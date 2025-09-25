# SolidJS Charts

A reactive SolidJS component wrapper for Chart.js with full TypeScript support. Create beautiful, interactive charts with minimal setup and maximum flexibility.

## Features

- 🚀 **Reactive**: Built for SolidJS's fine-grained reactivity
- 📊 **7 Chart Types**: Line, Bar, Pie, Doughnut, Scatter, Bubble, Radar
- 🎯 **TypeScript**: Full type safety and IntelliSense support
- 🎨 **Customizable**: All Chart.js options and styling available
- 📱 **Responsive**: Mobile-friendly and adaptive layouts
- ⚡ **Performant**: Stateless component design with efficient updates
- 🎪 **Interactive**: Click and hover event handling
- 🧪 **Tested**: Comprehensive test suite included

## Installation

```bash
npm install @wolfgangspahn/solidjs-charts chart.js solid-js
```

## Quick Start

```tsx
import { Chart } from '@wolfgangspahn/solidjs-charts';

function App() {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Sales 2024',
      data: [65, 59, 80, 81, 56, 55],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 2
    }]
  };

  return (
    <Chart
      type="line"
      data={data}
      width={800}
      height={400}
    />
  );
}
```

## Chart Types

### Line Chart
```tsx
<Chart type="line" data={lineData} />
```

### Bar Chart
```tsx
<Chart type="bar" data={barData} />
```

### Pie Chart
```tsx
<Chart type="pie" data={pieData} />
```

### Doughnut Chart
```tsx
<Chart type="doughnut" data={doughnutData} />
```

### Scatter Plot
```tsx
<Chart 
  type="scatter" 
  data={{
    datasets: [{
      label: 'Scatter Dataset',
      data: [
        { x: 10, y: 20 },
        { x: 15, y: 10 },
        { x: 26, y: 12 }
      ]
    }]
  }} 
/>
```

### Bubble Chart
```tsx
<Chart 
  type="bubble" 
  data={{
    datasets: [{
      label: 'Bubble Dataset',
      data: [
        { x: 20, y: 30, r: 15 },
        { x: 40, y: 10, r: 10 }
      ]
    }]
  }} 
/>
```

### Radar Chart
```tsx
<Chart type="radar" data={radarData} />
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `type` | `ChartType` | ✅ | Chart type: 'line', 'bar', 'pie', 'doughnut', 'scatter', 'bubble', 'radar' |
| `data` | `ChartComponentData` | ✅ | Chart data following Chart.js format |
| `options` | `ChartOptions` | ❌ | Chart.js configuration options |
| `width` | `number` | ❌ | Chart width in pixels |
| `height` | `number` | ❌ | Chart height in pixels |
| `onChartClick` | `(event) => void` | ❌ | Chart click event handler |
| `onChartHover` | `(event) => void` | ❌ | Chart hover event handler |
| `class` | `string` | ❌ | CSS class name |
| `style` | `string \| object` | ❌ | Inline styles |

## Advanced Usage

### Custom Options
```tsx
<Chart
  type="line"
  data={data}
  options={{
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Custom Chart Title'
      },
      legend: {
        position: 'top'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }}
/>
```

### Event Handling
```tsx
<Chart
  type="bar"
  data={data}
  onChartClick={(event) => {
    console.log('Chart clicked:', event);
  }}
  onChartHover={(event) => {
    console.log('Chart hovered:', event);
  }}
/>
```

### Reactive Data Updates
```tsx
import { createSignal } from 'solid-js';

function ReactiveChart() {
  const [chartData, setChartData] = createSignal(initialData);
  
  // Data updates automatically trigger chart re-render
  const updateData = () => {
    setChartData({
      ...chartData(),
      datasets: [{
        ...chartData().datasets[0],
        data: generateNewData()
      }]
    });
  };

  return (
    <div>
      <button onClick={updateData}>Update Data</button>
      <Chart type="line" data={chartData()} />
    </div>
  );
}
```

## TypeScript Support

Full TypeScript definitions are included:

```tsx
import { Chart, ChartType, ChartComponentData } from '@wolfgangspahn/solidjs-charts';

const data: ChartComponentData = {
  labels: ['A', 'B', 'C'],
  datasets: [{
    label: 'Dataset 1',
    data: [1, 2, 3]
  }]
};

const chartType: ChartType = 'line';
```

## Data Validation

The component includes built-in data validation:

- ✅ Validates chart data structure
- ✅ Type-specific data format checking
- ✅ Helpful error messages for debugging
- ✅ Graceful error handling

## Demo

Check out the [live demo](https://your-demo-url.com) with interactive examples including:
- Dynamic data updates with sliders
- All chart types showcase
- Background image overlays
- Error handling demonstrations

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Development

```bash
# Clone the repository
git clone https://github.com/wolfgangspahn/solidjs-charts.git

# Install dependencies
npm install

# Run tests
npm test

# Build the package
npm run build

# Run development server
npm run dev
```

## License

MIT © [Wolfgang Spahn](https://github.com/wolfgangspahn)

## Dependencies

- [SolidJS](https://solidjs.com/) - The reactive JavaScript framework
- [Chart.js](https://chartjs.org/) - The charting library

## Peer Dependencies

Make sure you have these installed in your project:

```json
{
  "chart.js": "^4.0.0",
  "solid-js": "^1.8.0"
}
```