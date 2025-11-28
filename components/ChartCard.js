function ChartCard({ title, type }) {
  try {
    const chartRef = React.useRef(null);
    const chartInstanceRef = React.useRef(null);

    React.useEffect(() => {
      if (chartRef.current) {
        const ctx = chartRef.current.getContext('2d');
        
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        const data = getChartData(type);
        
        chartInstanceRef.current = new ChartJS(ctx, {
          type: type === 'doughnut' ? 'doughnut' : type === 'radar' ? 'radar' : type === 'bar' ? 'bar' : 'line',
          data: data,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true,
                position: 'bottom'
              }
            }
          }
        });
      }

      return () => {
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }
      };
    }, [type]);

    const getChartData = (type) => {
      const baseData = {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
        datasets: [{
          label: 'Dataset',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: 'rgba(37, 99, 235, 0.2)',
          borderColor: 'rgba(37, 99, 235, 1)',
          borderWidth: 2
        }]
      };

      if (type === 'doughnut') {
        return {
          labels: ['Cat A', 'Cat B', 'Cat C'],
          datasets: [{
            data: [300, 50, 100],
            backgroundColor: ['#2563eb', '#10b981', '#f59e0b']
          }]
        };
      }

      return baseData;
    };

    return (
      <div className="card dark:bg-gray-800" data-name="chart-card" data-file="components/ChartCard.js">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>
        <div style={{ height: '250px' }}>
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    );
  } catch (error) {
    console.error('ChartCard component error:', error);
    return null;
  }
}