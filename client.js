document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons() {
    var req = new XMLHttpRequest();
    /* Get table from server */
    req.open("GET", "/get-player-table", true);
    req.addEventListener('load', function() {
        if(req.status >= 200 && req.status < 400) {
            var response = JSON.parse(req.responseText);
            buildTable(response);
        } else {
            document.getElementById("displayTable").textContent = "Error in network request: " + req.statusText;
        }
    });
    req.send();

    function buildTable(exerciseData) {
        var req = new XMLHttpRequest();
        var tableAtMain = document.getElementById("displayTable");
            
        // Create table element
        var table = document.createElement("table");
            
        if(tableAtMain.firstChild != null) {
            tableAtMain.removeChild(tableAtMain.firstChild);
        }

        // Create tableHead
        var tableHead = document.createElement("thead");
        // Create tableHead row
        var tHeadRow = document.createElement("tr");

        var numCols = 7;

        function createCell(headerName) {
            var tHeadCell = document.createElement("th");
            tHeadCell.textContent = headerName;
            tHeadRow.appendChild(tHeadCell); 
        }

        createCell("Name");
        createCell("Weight");
        createCell("Reps");
        createCell("Date");
        createCell("Units")

        // Append tHeadRow to tableHead and tableHead to table
        tableHead.appendChild(tHeadRow);
        table.appendChild(tableHead);

        // Create tableBody
        var tableBody = document.createElement("tbody");
        
        // Create rows
        exerciseData.forEach(function(rowData) {
            var row = document.createElement("tr");   
            for(var i = 0; i < numCols; i++) {
                var cell = document.createElement("td");
                var cellData;			

                if(i == 0) {
                    cellData = document.createTextNode(rowData["name"]);
                } else if(i == 1){
                    cellData = document.createTextNode(rowData["reps"]);
                } else if(i == 2){
                    cellData = document.createTextNode(rowData["weight"]);
                } else if(i == 3){
                    cellData = document.createTextNode(rowData["date"]);
                } else if(i == 4){
                    if(exerciseData["unit"] == 1) {
                        cellData = document.createTextNode("lbs");
                    } else {
                        cellData = document.createTextNode("kgs");
                    }
                } else if(i == 5) {
                    var deleteBtn = document.createElement('button');
                    deleteBtn.innerHTML = 'Delete'
                    deleteBtn.onclick = function () {
                        clearTable();
                    }
                    //     req.open("GET", "/delete?id=" + id, true);
	                //     req.addEventListener("load",function() {
		            //         if(req.status >= 200 && req.status < 400){
	    	        //             console.log('success');
		            //         } else {
		            //             console.log('error');
		            //         }   
	                //     });
                    // req.send("/delete?id=" + id);
                    cellData = deleteBtn;
                } else {
                    var editButton = document.createElement("button");
                    editButton.innerHTML = "Edit";
                    editButton.onclick = function () {
                        console.log(row);
                    }
                    cellData = editButton;
                }
                cell.appendChild(cellData);
                row.appendChild(cell);
            }
            tableBody.appendChild(row);
    });

    table.appendChild(tableBody);
    tableAtMain.appendChild(table);
    }

    function clearTable() {
        //Delete all but header row
        if (document.getElementById("displayTable").length > 1) {
            for (i = (document.getElementById("displayTable").length - 1); i > 0; i--) {
                document.getElementById("displayTable").deleteRow(i);
            }
        }
    }

}




