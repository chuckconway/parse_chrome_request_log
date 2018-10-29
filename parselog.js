var fs = require('fs');
var fetch = require("node-fetch");

fs.readFile('projectionpro.txt', 'utf8', function(err, data) {
    if (err) throw err;

    parseJson(data)
  });

  function parseJson(json){
      const requests = JSON.parse(json);

      const rows = requests.log.entries;
      console.log(rows.length);

      let items = [];
      rows.forEach(e => {
          items.push({
              time: e.time,
              url:e.request.url,
              method: e.request.method,
              date: e.startedDateTime
          })
      });

      console.log(items);

      exportToCsv(items);
  }

  function exportToCsv(rows) {
    // var processRow = function (row) {
    //     var finalVal = '';
    //     for (var j = 0; j < row.length; j++) {
    //         var innerValue = row[j] === null ? '' : row[j].toString();
    //         if (row[j] instanceof Date) {
    //             innerValue = row[j].toLocaleString();
    //         };
    //         var result = innerValue.replace(/"/g, '""');
    //         if (result.search(/("|,|\n)/g) >= 0)
    //             result = '"' + result + '"';
    //         if (j > 0)
    //             finalVal += ',';
    //         finalVal += result;
    //     }
    //     return finalVal + '\n';
    // };

    // var csvFile = '';
    // for (var i = 0; i < rows.length; i++) {
    //     csvFile += processRow(rows[i]);
    // }

    var converted = convertToCSV(rows);


    fs.writeFile('stats.csv', converted, function(err) {
        if(err) {
            return console.log(err);
        }
    
        console.log("The file was saved!");
    }); 

    // var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
    // if (navigator.msSaveBlob) { // IE 10+
    //     navigator.msSaveBlob(blob, filename);
    // } else {
    //     var link = document.createElement("a");
    //     if (link.download !== undefined) { // feature detection
    //         // Browsers that support HTML5 download attribute
    //         var url = URL.createObjectURL(blob);
    //         link.setAttribute("href", url);
    //         link.setAttribute("download", filename);
    //         link.style.visibility = 'hidden';
    //         document.body.appendChild(link);
    //         link.click();
    //         document.body.removeChild(link);
    //     }
    // }
}

function convertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';
    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','

            line += array[i][index];
        }
        str += line + '\r\n';
    }
    return str;
}