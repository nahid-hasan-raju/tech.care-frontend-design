// chart.js
// Renders the blood pressure chart using Chart.js.
// Expects the diagnosis_history array already sorted chronologically.

const MONTH_ABBR = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

let bpChartInstance = null;

function buildBPChart(diagHistory) {
  // Take the last 6 months only
  const last6 = diagHistory.slice(-6);

  const labels = last6.map(entry => {
    const abbr = entry.month.slice(0, 3);
    return `${abbr}, ${entry.year}`;
  });

  const systolicPoints  = last6.map(e => e.blood_pressure.systolic.value);
  const diastolicPoints = last6.map(e => e.blood_pressure.diastolic.value);

  const canvas = document.getElementById('bpChart');
  const ctx = canvas.getContext('2d');

  // destroy old chart if re-rendering
  if (bpChartInstance) {
    bpChartInstance.destroy();
  }

  bpChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Systolic',
          data: systolicPoints,
          borderColor: '#E066A0',
          pointBackgroundColor: '#E066A0',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8,
          tension: 0.42,
          fill: false,
          borderWidth: 2,
        },
        {
          label: 'Diastolic',
          data: diastolicPoints,
          borderColor: '#8C6FE6',
          pointBackgroundColor: '#8C6FE6',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8,
          tension: 0.42,
          fill: false,
          borderWidth: 2,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false  // we have our own legend on the right
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          callbacks: {
            label: function(context) {
              return `  ${context.dataset.label}: ${context.parsed.y} mmHg`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: '#707070',
            font: { size: 11 }
          }
        },
        y: {
          min: 60,
          max: 180,
          ticks: {
            stepSize: 20,
            color: '#707070',
            font: { size: 11 }
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          }
        }
      }
    }
  });
}
