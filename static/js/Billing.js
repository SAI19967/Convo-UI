document.addEventListener('DOMContentLoaded', function() {
    var data = {
        labels: ['Category 1', 'Category 2', 'Category 3', 'Category 4'],
        
        datasets: [
            {
                label: 'Dataset 1',
                data: [25, 20, 15, 13],
                backgroundColor: '#49a183',
            },
            {
                label: 'Dataset 2',
                data: [5, 13, 8, 3],
                backgroundColor: '#49a183'
                
            },
            {
                label: 'Dataset 3',
                data: [11, 19, 9, 20],
                backgroundColor: '#49a183'
            },
            {
                label: 'Dataset 4',
                data: [1, 5, 3, 13],
                backgroundColor: '#49a183'
            },
            {
                label: 'Dataset 5',
                data: [1, 5, 3, 9],
                backgroundColor: '#49a183'
            },
            {
                label: 'Dataset 6',
                data: [1, 5, 3, 9],
                backgroundColor: '#49a183'
            }
            
            // Add more datasets as needed
        ]
    };

    var options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        },
        layout: {
            padding: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top'
            }
        }
    };

    var ctx = document.getElementById('myBarChart').getContext('2d');
    var myBarChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
    });


    var ctx2 = document.getElementById('BarChart').getContext('2d');
    var BarChart = new Chart(ctx2, {
        type: 'bar',
        data: data,
        options: options
    });
    var ctx3 = document.getElementById('BarChart1').getContext('2d');
var BarChart1 = new Chart(ctx3, {
    type: 'bar',
    data: data,
    options: options
});
});

// Sample data for the charts
// Chart 1
// Chart 1
var labels = ['Category 1', 'Category 2', 'Category 3', 'Category 4'];
var data1 = [1, 2, 5, 10];
var data2 = [11, 22, 21, 12];
var data3 = [5, 2, 1, 9];

var ctx1 = document.getElementById('chart1').getContext('2d');
var chart1 = new Chart(ctx1, {
  type: 'bar',
  data: {
    labels: labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: data1,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      },
      {
        label: 'Dataset 2',
        data: data2,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      },
      {
        label: 'Dataset 3',
        data: data3,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }
    ]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});



// Chart 2
var ctx2 = document.getElementById('chart2').getContext('2d');
var chart2 = new Chart(ctx2, {
  type: 'bar',
  data: {
    labels: labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: data1,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      },
      {
        label: 'Dataset 2',
        data: data2,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      },
      {
        label: 'Dataset 3',
        data: data3,
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1
      }
      
    ]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});
function updateProgressBar(percentage) {
    const progressBar = document.getElementById('progress-bar');
    progressBar.style.width = percentage + '%';
  }

  updateProgressBar(90);
  var data = generateDayWiseTimeSeries(new Date("22 Apr 2023").getTime(), 15, {
    min: 30,
    max: 90
  });
  var options1 = {
    chart: {
      id: "chart2",
      type: "area",
      height: 230,
      foreColor: "#ccc",
      toolbar: {
        autoSelected: "pan",
        show: false
      }
    },
    colors: ["#00BAEC"],
    stroke: {
      width: 3
    },
    grid: {
      borderColor: "#555",
      clipMarkers: false,
      yaxis: {
        lines: {
          show: false
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    fill: {
      gradient: {
        enabled: true,
        opacityFrom: 0.55,
        opacityTo: 0
      }
    },
  
    series: [
      {
        data: data
      }
    ],
    tooltip: {
      theme: "dark"
    },
    xaxis: {
      type: "datetime"
    },
    yaxis: {
      min: 0,
      tickAmount: 4
    }
  };
  var options2 = {
    chart: {
      id: "chart3",
      type: "area",
      height: 230,
      foreColor: "#ccc",
      toolbar: {
        autoSelected: "pan",
        show: false
      }
    },
    colors: ["#00BAEC"],
    stroke: {
      width: 3
    },
    grid: {
      borderColor: "#555",
      clipMarkers: false,
      yaxis: {
        lines: {
          show: false
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    fill: {
      gradient: {
        enabled: true,
        opacityFrom: 0.55,
        opacityTo: 0
      }
    },
    series: [
      {
        data: data
      }
    ],
    tooltip: {
      theme: "dark"
    },
    xaxis: {
      type: "datetime"
    },
    yaxis: {
      min: 0,
      tickAmount: 4
    }
  };
  var chart1 = new ApexCharts(document.querySelector("#chart-area"), options1);
  var chart2 = new ApexCharts(document.querySelector("#chart-area1"), options2);
  
  chart1.render();
  chart2.render();
  
  var options2 = {
    chart: {
      id: "chart1",
      height: 130,
      type: "bar",
      foreColor: "#ccc",
      brush: {
        target: "chart2",
        enabled: true
      },
      selection: {
        enabled: true,
        fill: {
          color: "#fff",
          opacity: 0.4
        },
        xaxis: {
          min: new Date("27 Jul 2017 10:00:00").getTime(),
          max: new Date("14 Aug 2017 10:00:00").getTime()
        }
      }
    },
    colors: ["#FF0080"],
    series: [
      {
        data: data
      }
    ],
    stroke: {
      width: 2
    },
    grid: {
      borderColor: "#444"
    },
    markers: {
      size: 0
    },
    xaxis: {
      type: "datetime",
      tooltip: {
        enabled: false
      }
    },
    yaxis: {
      tickAmount: 2
    }
  };
  
  // var chart2 = new ApexCharts(document.querySelector("#chart-bar"), options2);
  
  // chart2.render();
  
  function generateDayWiseTimeSeries(baseval, count, yrange) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = baseval;
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
  
      series.push([x, y]);
      baseval += 86400000;
      i++;
    }
    return series;
  }
  