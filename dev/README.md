# SolidJS Charts Demo

This is a comprehensive demo application showcasing the SolidJS Chart component functionality.

## Features Demonstrated

### Chart Types
- **Line Charts** - Smooth data visualization with customizable tension
- **Bar Charts** - Vertical bars with customizable colors
- **Pie Charts** - Circular data representation
- **Doughnut Charts** - Pie charts with center cutout
- **Scatter Charts** - X/Y coordinate plotting
- **Bubble Charts** - Multi-dimensional data visualization
- **Radar Charts** - Multi-axis comparison charts

### Interactive Features
- **Chart Type Switching** - Dynamically change between chart types
- **Reactive Data Updates** - Real-time data animation when enabled
- **Event Handling** - Click and hover events with console logging
- **Error Handling** - Graceful display of invalid data scenarios
- **Multiple Charts** - Side-by-side chart comparison

### Component Features
- **Stateless Design** - Pure functional component approach
- **TypeScript Support** - Full type safety and IntelliSense
- **Responsive Layout** - Adapts to different screen sizes
- **Custom Styling** - CSS classes and inline styles support
- **Chart.js Integration** - Full access to Chart.js options and plugins

## How to Run

1. **Install Dependencies** (from project root):
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Open Browser**:
   Navigate to `http://localhost:3000` (or the port shown in terminal)

## What to Test

### Basic Functionality
- Switch between different chart types using the buttons
- Observe how the component handles different data structures
- Check that charts render correctly and are interactive

### Reactivity
- Enable "Animate Data" checkbox to see real-time updates
- Notice how the stateless component re-renders efficiently
- Data changes should be smooth without component re-initialization

### Error Handling
- View the "Error Handling Demo" section
- Invalid data (empty datasets) should show a clear error message
- Error state should be styled appropriately

### Multiple Charts
- Scroll to "Multiple Charts" section
- Multiple chart instances should work independently
- Different chart types should render simultaneously

### Events
- Open browser developer console
- Click on charts to see click events logged
- Hover over charts to see hover events logged
- Events should provide proper chart instance and element data

## Architecture Notes

- **Stateless Component**: The Chart component has no internal state
- **Pure Functions**: All chart logic is functional and predictable
- **Chart.js Wrapper**: Clean abstraction over Chart.js with SolidJS integration
- **TypeScript Types**: Full type definitions for props and data structures
- **Responsive Design**: Works on desktop and mobile devices

## File Structure

```
dev/
├── App.tsx           # Main demo application
├── index.html        # HTML entry point
├── index.css         # Demo styling
├── main.tsx          # SolidJS application bootstrap
├── tsconfig.json     # TypeScript configuration
└── README.md         # This file
```

The `src` directory is symbolically linked to the main library source code, allowing for real-time development and testing.
