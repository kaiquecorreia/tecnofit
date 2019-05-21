var barChartData = {
  labels: ['Janeiro', 'Fevereiro', 'Março'],
  datasets: [
    {
      type: 'line',
      borderColor: 'rgb(42, 186, 42)',
      borderWidth: 2,
      fill: false,
      data: [1200, 900, 4000]
    },
    {
      backgroundColor: 'rgb(255, 99, 132)',
      data: [-1200, -300, -200]
    },
    {
      borderWidth: 1,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132,.6)',
      data: [-200, -300, -200]
    },
    {
      backgroundColor: 'rgb(42, 186, 42)',
      data: [800, 700, 2000]
    },
    {
      borderWidth: 1,
      borderColor: 'rgb(42, 186, 42)',
      backgroundColor: 'rgba(42, 186, 42,.6)',
      data: [400, 200, 2000]
    }
  ]
};

var ctx = document.getElementById('grafico-mensal').getContext('2d');
var chart = new Chart(ctx, {
  // The type of chart we want to create
  type: 'bar',

  // The data for our dataset
  data: barChartData,
  options: {
    legend: { display: false },
    tooltips: {
      mode: 'index',
      intersect: false
    },

    responsive: true,
    scales: {
      xAxes: [
        {
          stacked: true,
          barThickness: 30,
          ticks: { beginAtZero: true }
        }
      ],
      yAxes: [
        {
          stacked: true
        }
      ]
    }
  }
});
