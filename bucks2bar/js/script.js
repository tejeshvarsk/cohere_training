document.getElementById("chart-tab").addEventListener("click", function () {
  // ... rest of your code
  var ctx = document.getElementById("myChart").getContext("2d");

  var months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];
  var data = [];
  index = 0;
  months.forEach((month) => {
    var income = document.getElementById(`${month}-income-input`).value;
    var expenses = document.getElementById(`${month}-expenses-input`).value;

    data[index++] = {
      income: income,
      expenses: expenses,
    };
  });

  var incomeData = data.map((month) => month.income);
  var expenseData = data.map((month) => month.expenses);

  var myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      datasets: [
        {
          label: "Income",
          data: incomeData,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
        {
          label: "Expense",
          data: expenseData,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  }); // This file is intentionally left blank.
  // Add your JavaScript code here to implement the logic and interactivity for the web page.
  document.getElementById("download").addEventListener("click", function () {
    let canvas = document.getElementById("myChart");
    let image = canvas.toDataURL("image/png");

    let link = document.createElement("a");
    link.href = image;
    link.download = "chart.png";
    link.click();
  });
});
