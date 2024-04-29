let chart = document.getElementById("myChart");

let statisticsData = undefined;

const createBarChart = (barData) => {
  const canvas = document.getElementById("myChart");
  canvas.width = 400;
  canvas.height = 600;

  const lab = Object.keys(barData);
  const dataToShow = Object.values(barData);
  console.log(lab);
  console.log(dataToShow);

  const barChartData = {
    labels: lab,
    datasets: [
      {
        label: "Date Wise Applications",
        backgroundColor: "rgba(54, 162, 235, 1)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        data: dataToShow,
      },
    ],
  };
  const config = {
    type: "bar",
    data: barChartData,
    options: {
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            precision: 0,
          },
        },
      },
      plugins: {
        legend: {
          display: true,
          position: "top",
        },
      },
      layout: {
        padding: {
          left: 50,
          right: 50,
          top: 50,
          bottom: 50,
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      width: 800,
      height: 600,
    },
  };

  let myChart = new Chart(document.getElementById("myChart"), config);
};

const createPieChart = (pieData) => {
  const pieCanvas = document.getElementById("pieChart");
  const pieLabels = Object.keys(pieData);
  const pieDataToShow = Object.values(pieData);

  const pieChartData = {
    labels: pieLabels,
    datasets: [
      {
        label: "Pie Chart Data",
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 0, 0, 1)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 0, 0, 1)",
        ],
        borderWidth: 1,
        data: pieDataToShow,
      },
    ],
  };

  const pieConfig = {
    type: "doughnut",
    data: pieChartData,
    options: {
      plugins: {
        legend: {
          display: true,
          position: "top",
        },
        datalabels: {
          formatter: (value, ctx) => {
            let sum = 0;
            let dataArr = ctx.chart.data.datasets[0].data;
            dataArr.map((data) => {
              sum += data;
            });
            let percentage = ((value * 100) / sum).toFixed(2) + "%";
            return percentage;
          },
          color: "#fff", // color of the text
        },
      },
      layout: {
        padding: {
          left: 50,
          right: 50,
          top: 50,
          bottom: 50,
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      width: 400,
      height: 400,
    },
  };

  let pieChart = new Chart(pieCanvas, pieConfig);
};

const loadContent = async () => {
  try {
    const { data } = await axios.get(
      `http://localhost:3000/statistics/getStats`
    );

    const statsData = data.data;

    statisticsData = data.data;

    //#region bar chart
    createBarChart(statsData.barDateData);
    //#endregion

    //#region pie chart data

    createPieChart(statsData.pieChartStatusData);

    //#endregion
  } catch (error) {
    console.log(error.mesaage);
  }
};

document.addEventListener("DOMContentLoaded", loadContent);
