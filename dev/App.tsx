import { createSignal, For } from 'solid-js';
import { Chart } from '../src';
import type { ChartType, ChartComponentData } from '../src';

// Sample data for different chart types
const sampleLineData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [{
    label: 'Sales 2024',
    data: [65, 59, 80, 81, 56, 55],
    backgroundColor: 'rgba(75, 192, 192, 0.2)',
    borderColor: 'rgba(75, 192, 192, 1)',
    borderWidth: 2,
    tension: 0.1
  }]
};

const sampleBarData = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [{
    label: 'Votes',
    data: [12, 19, 3, 5, 2, 3],
    backgroundColor: [
      'rgba(255, 99, 132, 0.8)',
      'rgba(54, 162, 235, 0.8)',
      'rgba(255, 205, 86, 0.8)',
      'rgba(75, 192, 192, 0.8)',
      'rgba(153, 102, 255, 0.8)',
      'rgba(255, 159, 64, 0.8)'
    ]
  }]
};

const samplePieData = {
  labels: ['Desktop', 'Mobile', 'Tablet'],
  datasets: [{
    label: 'Device Usage',
    data: [55, 35, 10],
    backgroundColor: [
      'rgba(255, 99, 132, 0.8)',
      'rgba(54, 162, 235, 0.8)',
      'rgba(255, 205, 86, 0.8)'
    ]
  }]
};

const sampleDoughnutData = {
  labels: ['React', 'Vue', 'Angular', 'SolidJS'],
  datasets: [{
    label: 'Framework Popularity',
    data: [40, 25, 20, 15],
    backgroundColor: [
      'rgba(97, 218, 251, 0.8)',
      'rgba(67, 160, 71, 0.8)',
      'rgba(244, 67, 54, 0.8)',
      'rgba(33, 150, 243, 0.8)'
    ]
  }]
};

const sampleScatterData = {
  datasets: [{
    label: 'Scatter Dataset',
    data: [
      { x: 10, y: 20 },
      { x: 15, y: 10 },
      { x: 26, y: 12 },
      { x: 30, y: 25 },
      { x: 35, y: 18 },
      { x: 40, y: 32 }
    ],
    backgroundColor: 'rgba(255, 99, 132, 0.8)',
    borderColor: 'rgba(255, 99, 132, 1)',
    pointRadius: 8
  }]
};

const sampleBubbleData = {
  datasets: [{
    label: 'Bubble Dataset',
    data: [
      { x: 20, y: 30, r: 15 },
      { x: 40, y: 10, r: 10 },
      { x: 30, y: 40, r: 20 },
      { x: 60, y: 25, r: 12 },
      { x: 50, y: 50, r: 18 }
    ],
    backgroundColor: 'rgba(54, 162, 235, 0.6)',
    borderColor: 'rgba(54, 162, 235, 1)',
    borderWidth: 2
  }]
};

const sampleRadarData = {
  labels: ['Speed', 'Reliability', 'Comfort', 'Safety', 'Efficiency'],
  datasets: [{
    label: 'Vehicle A',
    data: [80, 90, 70, 85, 75],
    backgroundColor: 'rgba(255, 99, 132, 0.2)',
    borderColor: 'rgba(255, 99, 132, 1)',
    borderWidth: 2
  }, {
    label: 'Vehicle B',
    data: [70, 85, 90, 80, 85],
    backgroundColor: 'rgba(54, 162, 235, 0.2)',
    borderColor: 'rgba(54, 162, 235, 1)',
    borderWidth: 2
  }]
};

function App() {
  const [selectedChart, setSelectedChart] = createSignal<ChartType>('line');
  const [animateData, setAnimateData] = createSignal(false);
  
  // Dynamic slider demo states
  const [sliderValue, setSliderValue] = createSignal(50);
  const [frequency, setFrequency] = createSignal(1);
  const [amplitude, setAmplitude] = createSignal(20);
  
  // Background overlay opacity control
  const [overlayOpacity, setOverlayOpacity] = createSignal(50);
  
  // Dynamic data that changes when animate is enabled
  // Use 'any' for chart data to support all Chart.js dataset shapes
  const getChartData = (): any => {
    const baseData: Record<ChartType, any> = {
      line: sampleLineData,
      bar: sampleBarData,
      pie: samplePieData,
      doughnut: sampleDoughnutData,
      scatter: sampleScatterData,
      bubble: sampleBubbleData,
      radar: sampleRadarData
    };
  
    let data = { ...baseData[selectedChart()] };
    
    if (animateData()) {
      const chartType = selectedChart();
      
      // Only animate charts with simple numeric data
      if (['line', 'bar', 'pie', 'doughnut', 'radar'].includes(chartType)) {
        data = {
          ...data,
          datasets: data.datasets.map((dataset: any) => ({
            ...dataset,
            data: (dataset.data as number[]).map((value: number) => 
              Math.max(0, value + Math.floor(Math.random() * 20 - 10))
            )
          }))
        };
      }
      // For scatter and bubble, we'll create animated data differently
      else if (chartType === 'scatter') {
        data = {
          datasets: [{
            ...(data.datasets[0] as any),
            data: ((data.datasets[0] as any).data as any[]).map((point: any) => ({
              x: Math.max(0, point.x + Math.floor(Math.random() * 10 - 5)),
              y: Math.max(0, point.y + Math.floor(Math.random() * 10 - 5))
            }))
          }]
        };
      }
      else if (chartType === 'bubble') {
        data = {
          datasets: [{
            ...(data.datasets[0] as any),
            data: ((data.datasets[0] as any).data as any[]).map((point: any) => ({
              x: Math.max(0, point.x + Math.floor(Math.random() * 10 - 5)),
              y: Math.max(0, point.y + Math.floor(Math.random() * 10 - 5)),
              r: Math.max(5, point.r + Math.floor(Math.random() * 6 - 3))
            }))
          }]
        };
      }
    }
  
    return data;
  };

  const chartTypes: ChartType[] = ['line', 'bar', 'pie', 'doughnut', 'scatter', 'bubble', 'radar'];

  const handleChartClick = (event: any) => {
    console.log('Chart clicked:', event);
  };

  const handleChartHover = (event: any) => {
    console.log('Chart hovered:', event);
  };

  // Generate dynamic line chart data based on slider values
  const getDynamicLineData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const baseValue = sliderValue();
    const freq = frequency();
    const amp = amplitude();
    
    return {
      labels: months,
      datasets: [{
        label: 'Dynamic Data',
        data: months.map((_, index) => 
          Math.max(0, baseValue + amp * Math.sin((index * freq * Math.PI) / 6))
        ),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true
      }, {
        label: 'Secondary Wave',
        data: months.map((_, index) => 
          Math.max(0, baseValue * 0.8 + (amp * 0.6) * Math.cos((index * freq * Math.PI) / 4))
        ),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        tension: 0.4,
        fill: false
      }]
    };
  };

  return (
    <div class="app">
      <header class="header">
        <h1>SolidJS Charts Demo</h1>
        <p>Interactive demonstration of the SolidJS Chart component wrapping Chart.js</p>
      </header>
      <main class="main-content">
        {/* Chart Type Selector */}
        <section class="controls">
          <h2>Chart Type</h2>
          <div class="chart-selector">
            <For each={chartTypes}>
              {(type) => (
                <button
                  class={`chart-btn ${selectedChart() === type ? 'active' : ''}`}
                  onClick={() => setSelectedChart(type)}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              )}
            </For>
          </div>

          <div class="animation-control">
            <label>
              <input
                type="checkbox"
                checked={animateData()}
                onChange={(e) => setAnimateData(e.currentTarget.checked)}
              />
              Animate Data (demonstrates reactivity)
            </label>
          </div>
        </section>

        {/* Chart Display */}
        <section class="chart-section">
          <h2>Chart: {selectedChart().charAt(0).toUpperCase() + selectedChart().slice(1)}</h2>
          <div class="chart-container">
            <Chart
              type={selectedChart()}
              data={getChartData()}
              width={800}
              height={400}
              onChartClick={handleChartClick}
              onChartHover={handleChartHover}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  title: {
                    display: true,
                    text: `${selectedChart().charAt(0).toUpperCase() + selectedChart().slice(1)} Chart Demo`
                  },
                  legend: {
                    display: true,
                    position: 'top'
                  }
                }
              }}
            />
          </div>
        </section>

        {/* Error Handling Demo */}
        <section class="error-demo">
          <h2>Error Handling Demo</h2>
          <p>This chart has invalid data to demonstrate error handling:</p>
          <div class="chart-container small">
            <Chart
              type="line"
              data={{
                labels: [],
                datasets: []
              }}
              width={400}
              height={200}
            />
          </div>
        </section>

        {/* Dynamic Slider Demo */}
        <section class="dynamic-demo">
          <h2>Dynamic Chart with Sliders</h2>
          <p>Adjust the sliders to see real-time chart updates demonstrating SolidJS reactivity!</p>
          
          <div class="slider-controls">
            <div class="slider-group">
              <label for="base-value">Base Value: {sliderValue()}</label>
              <input
                id="base-value"
                type="range"
                min="10"
                max="100"
                value={sliderValue()}
                onInput={(e) => setSliderValue(Number(e.currentTarget.value))}
                class="slider"
              />
            </div>
            
            <div class="slider-group">
              <label for="frequency">Wave Frequency: {frequency().toFixed(1)}</label>
              <input
                id="frequency"
                type="range"
                min="0.1"
                max="3"
                step="0.1"
                value={frequency()}
                onInput={(e) => setFrequency(Number(e.currentTarget.value))}
                class="slider"
              />
            </div>
            
            <div class="slider-group">
              <label for="amplitude">Wave Amplitude: {amplitude()}</label>
              <input
                id="amplitude"
                type="range"
                min="5"
                max="50"
                value={amplitude()}
                onInput={(e) => setAmplitude(Number(e.currentTarget.value))}
                class="slider"
              />
            </div>
          </div>

          <div class="chart-container">
            <Chart
              type="line"
              data={getDynamicLineData()}
              width={800}
              height={400}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  title: {
                    display: true,
                    text: 'Real-time Dynamic Line Chart'
                  },
                  legend: {
                    display: true,
                    position: 'top'
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 150
                  }
                },
                animation: {
                  duration: 300
                }
              }}
            />
          </div>
        </section>

        {/* Background Image Demo */}
        <section class="background-demo">
          <h2>Charts with Background Images</h2>
          <p>Demonstrating charts overlaid on composite background images - Earth with climate heating overlay at 50% opacity for powerful environmental data visualization!</p>
          
          <div class="background-charts-grid">
            {/* Earth background with climate data */}
            <div 
              class="background-chart-item earth-bg"
              style={`--overlay-opacity: ${overlayOpacity() / 100}`}
            >
              <h3>Climate Change: +3.0°C Scenario</h3>
              <div class="chart-with-background">
                <Chart
                  type="line"
                  data={{
                    labels: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'],
                    datasets: [{
                      label: 'Global Avg Temp (°C)',
                      data: [14.8, 15.0, 14.9, 15.1, 15.2, 15.4, 15.3],
                      backgroundColor: 'rgba(255, 99, 132, 0.3)',
                      borderColor: 'rgba(255, 99, 132, 1)',
                      borderWidth: 3,
                      tension: 0.4,
                      fill: true,
                      pointBackgroundColor: 'rgba(255, 255, 255, 0.9)',
                      pointBorderColor: 'rgba(255, 99, 132, 1)',
                      pointBorderWidth: 2,
                      pointRadius: 6
                    }]
                  }}
                  width={500}
                  height={350}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      title: {
                        display: true,
                        text: 'Climate Data Visualization',
                        color: 'white',
                        font: {
                          size: 16,
                          weight: 'bold'
                        }
                      },
                      legend: {
                        display: true,
                        position: 'top',
                        labels: {
                          color: 'white',
                          font: {
                            weight: 'bold'
                          }
                        }
                      }
                    },
                    scales: {
                      x: {
                        ticks: {
                          color: 'white',
                          font: {
                            weight: 'bold'
                          }
                        },
                        grid: {
                          color: 'rgba(255, 255, 255, 0.2)'
                        }
                      },
                      y: {
                        beginAtZero: false,
                        min: 14.5,
                        max: 15.5,
                        ticks: {
                          color: 'white',
                          font: {
                            weight: 'bold'
                          }
                        },
                        grid: {
                          color: 'rgba(255, 255, 255, 0.2)'
                        }
                      }
                    },
                    animation: {
                      duration: 1000
                    }
                  }}
                />
              </div>
            </div>

            {/* Earth background with continental data */}
            <div 
              class="background-chart-item earth-bg"
              style={`--overlay-opacity: ${overlayOpacity() / 100}`}
            >
              <h3>Global Warming Impact by Region</h3>
              <div class="chart-with-background">
                <Chart
                  type="doughnut"
                  data={{
                    labels: ['Asia', 'North America', 'Europe', 'Africa', 'South America', 'Oceania'],
                    datasets: [{
                      label: 'CO2 Emissions %',
                      data: [53, 18, 12, 8, 5, 4],
                      backgroundColor: [
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(255, 205, 86, 0.8)',
                        'rgba(75, 192, 192, 0.8)',
                        'rgba(153, 102, 255, 0.8)',
                        'rgba(255, 159, 64, 0.8)'
                      ],
                      borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 205, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                      ],
                      borderWidth: 3
                    }]
                  }}
                  width={500}
                  height={350}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      title: {
                        display: true,
                        text: 'Global Emissions by Continent',
                        color: 'white',
                        font: {
                          size: 16,
                          weight: 'bold'
                        }
                      },
                      legend: {
                        display: true,
                        position: 'right',
                        labels: {
                          color: 'white',
                          font: {
                            weight: 'bold'
                          },
                          padding: 15
                        }
                      }
                    },
                    animation: {
                      duration: 1000
                    }
                  }}
                />
              </div>
            </div>
          </div>
          
          {/* Overlay Opacity Control */}
          <div class="overlay-control">
            <h3>Climate Overlay Control</h3>
            <p>Adjust the opacity of the climate impact visualization (hot_3_0.png overlay)</p>
            <div class="opacity-slider-group">
              <label for="overlay-opacity">Climate Impact Visibility: {overlayOpacity()}%</label>
              <input
                id="overlay-opacity"
                type="range"
                min="0"
                max="100"
                value={overlayOpacity()}
                onInput={(e) => setOverlayOpacity(Number(e.currentTarget.value))}
                class="slider opacity-slider"
              />
              <div class="opacity-labels">
                <span>Natural Earth</span>
                <span>Full Climate Impact</span>
              </div>
            </div>
          </div>
        </section>

        {/* Multiple Charts */}
        <section class="multiple-charts">
          <h2>Multiple Charts</h2>
          <div class="charts-grid">
            <div class="chart-item">
              <h3>Line Chart</h3>
              <Chart
                type="line"
                data={sampleLineData}
                width={350}
                height={250}
              />
            </div>
            <div class="chart-item">
              <h3>Bar Chart</h3>
              <Chart
                type="bar"
                data={sampleBarData}
                width={350}
                height={250}
              />
            </div>
            <div class="chart-item">
              <h3>Pie Chart</h3>
              <Chart
                type="pie"
                data={samplePieData}
                width={350}
                height={250}
              />
            </div>
            <div class="chart-item">
              <h3>Doughnut Chart</h3>
              <Chart
                type="doughnut"
                data={sampleDoughnutData}
                width={350}
                height={250}
              />
            </div>
          </div>
        </section>
      </main>

      <footer class="footer">
        <p>Built with SolidJS + Chart.js | Component is stateless and reactive</p>
      </footer>
    </div>
  );
}

export default App;
