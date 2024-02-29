// This file is intentionally left blank.

//for all the input and select elements in the index.html, capture the id of the field and the label of the field and generate a json
document
  .getElementById("view-details-tab")
  .addEventListener("click", populateTable);

var elementsMap;

function populateTable() {
  var inputs = document.querySelectorAll("input, select");
  var json = {};

  for (var i = 0; i < inputs.length; i++) {
    var id = inputs[i].id;
    var label = document.querySelector("label[for='" + id + "']");
    if (label) {
      json[id] = label.textContent;
    }
  }

  elementsMap = json;
  var table = document.getElementById("myTable");
  for (var key in elementsMap) {
    var row = table.insertRow(-1);
    row.className = "myRow";
    var labelCell = row.insertCell(0);
    var valueCell = row.insertCell(1);
    labelCell.innerHTML = elementsMap[key];
    valueCell.innerHTML = document.getElementById(key).value;
  }
}

document.getElementById("download").addEventListener("click", function () {
  var table = document.getElementById("myTable");
  var csv = [];
  var rows = table.rows;

  for (var i = 0; i < rows.length; i++) {
    var row = [],
      cols = rows[i].cells;

    for (var j = 0; j < cols.length; j++) row.push(cols[j].innerText);

    csv.push(row.join(","));
  }

  downloadCSV(csv.join("\n"), "table.csv");
});

function downloadCSV(csv, filename) {
  var csvFile;
  var downloadLink;

  csvFile = new Blob([csv], { type: "text/csv" });
  downloadLink = document.createElement("a");
  downloadLink.download = filename;
  downloadLink.href = window.URL.createObjectURL(csvFile);
  downloadLink.style.display = "none";
  document.body.appendChild(downloadLink);
  downloadLink.click();
}
