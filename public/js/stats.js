let chart = document.getElementById("myChart");
let totalApplications = document.getElementById("totalApplications");
let totalCompanies = document.getElementById("totalCompanies");
// let table = document.getElementById("applicationTable");
let ghostedApplicationText = document.getElementById("ghostedApplications");

let statisticsData = undefined;
let myChart = undefined;
let filteredData = {};
let selectedBarType = "bar";

const createBarChart = (barData, graphType) => {
  const canvas = document.getElementById("myChart");
  canvas.width = 200;
  canvas.height = 500;
  const lab = Object.keys(barData);
  const dataToShow = Object.values(barData);
  // console.log(lab);
  // console.log(dataToShow);

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
    type: graphType,
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
      width: 1000,
      height: 1000,
    },
  };

  myChart = new Chart(document.getElementById("myChart"), config);
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
    createBarChart(statsData.barDateData, "bar");
    //#endregion

    //#region pie chart data

    createPieChart(statsData.pieChartStatusData);

    //#endregion
    console.log(data.data);
    totalApplications.innerHTML = data.data.totalApplications;
    totalCompanies.innerHTML = data.data.noOfCompaniesApplied;
    ghostedApplicationText.innerHTML = data.data.ghostedApplications;
  } catch (error) {
    console.log(error.mesaage);
  }
};

document.addEventListener("DOMContentLoaded", loadContent);

const changeGraphType = () => {
  let selectedGraph = document.getElementById("graphSelect").value;

  // Example logic to handle the selected graph type
  if (selectedGraph === "bar") {
    // Code to display bar graph
    console.log("Bar graph selected");
    if (myChart) {
      myChart.destroy();
    }
    // createBarChart(statisticsData.barDateData, "bar");
    selectedBarType = "bar";
  } else if (selectedGraph === "line") {
    if (myChart) {
      myChart.destroy();
    }
    // Code to display line graph
    console.log("Line graph selected");
    // createBarChart(statisticsData.barDateData, "line");
    selectedBarType = "line";
  }

  createBarChart(filteredData, selectedBarType);
};

const changeTimeRange = () => {
  filteredData = {};
  let selectedRange = document.getElementById("timeRangeSelect").value;

  if (myChart) {
    myChart.destroy();
  }

  if (selectedRange === "lastWeek") {
    for (let key in statisticsData.barDateData) {
      if (getDateDifference(key) <= 7) {
        filteredData[key] = statisticsData.barDateData[key];
      }
    }
  } else if (selectedRange === "lastMonth") {
    for (let key in statisticsData.barDateData) {
      if (getDateDifference(key) <= 30) {
        filteredData[key] = statisticsData.barDateData[key];
      }
    }
  } else {
    filteredData = statisticsData.barDateData;
  }

  createBarChart(filteredData, selectedBarType);
};

//#region helper
const getDateDifference = (date2) => {
  // Convert the dates to JavaScript Date objects
  var d1 = new Date();
  var d2 = new Date(date2);

  // Find the difference in milliseconds
  var differenceMs = Math.abs(d1 - d2);

  // Convert milliseconds to days
  var differenceDays = Math.floor(differenceMs / (1000 * 60 * 60 * 24));

  return differenceDays;
};
//#endregion