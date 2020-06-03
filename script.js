let json = {}

document.getElementById('json-button').addEventListener('click', e => {
    fetch("data.json")
        .then(response => response.json())
        .then(result => json = result);

    // json = {
    //     "boersenkurse": [
    //         {
    //             "Bezeichnung": "SAP SE O.N.",
    //             "WKN": "716460",
    //             "Akt. Kurs": "95.72",
    //             "Perf. 1 Jahr": "1.37%",
    //             "Perf. 3 Jahre": "41.52%",
    //             "Perf. 5 Jahre": "49.10%"
    //         },
    //         {
    //             "Bezeichnung": "BASF SE NA O.N.",
    //             "WKN": "BASF11",
    //             "Akt. Kurs": "88.13",
    //             "Perf. 1 Jahr": "-0.81%",
    //             "Perf. 3 Jahre": "1.92%",
    //             "Perf. 5 Jahre": "19.09%"
    //         },
    //         {
    //             "Bezeichnung": "FUCHS PETROL.SE VZO O.N.",
    //             "WKN": "579043",
    //             "Akt. Kurs": "45.34",
    //             "Perf. 1 Jahr": "-7.76%",
    //             "Perf. 3 Jahre": "19.79%",
    //             "Perf. 5 Jahre": "46.77%"
    //         },
    //         {
    //             "Bezeichnung": "SOFTWARE AG  NA O.N.",
    //             "WKN": "A2GS40",
    //             "Akt. Kurs": "42.97",
    //             "Perf. 1 Jahr": "0.58%",
    //             "Perf. 3 Jahre": "61.36%",
    //             "Perf. 5 Jahre": "60.45%"
    //         },
    //         {
    //             "Bezeichnung": "GRAMMER AG AKTIEN O.N.",
    //             "WKN": "589540",
    //             "Akt. Kurs": "53.75",
    //             "Perf. 1 Jahr": "1.08%",
    //             "Perf. 3 Jahre": "48.95%",
    //             "Perf. 5 Jahre": "105.93%"
    //         },
    //         {
    //             "Bezeichnung": "DAIMLER AG NA O.N.",
    //             "WKN": "710000",
    //             "Akt. Kurs": "67.08",
    //             "Perf. 1 Jahr": "-3.25%",
    //             "Perf. 3 Jahre": "-21.32%",
    //             "Perf. 5 Jahre": "43.81%"
    //         },
    //         {
    //             "Bezeichnung": "BILFINGER SE O.N.",
    //             "WKN": "590900",
    //             "Akt. Kurs": "38.8",
    //             "Perf. 1 Jahr": "0.87%",
    //             "Perf. 3 Jahre": "0.77%",
    //             "Perf. 5 Jahre": "-49.02%"
    //         },
    //         {
    //             "Bezeichnung": "NORDINTERNET ANTEILE",
    //             "WKN": "978530",
    //             "Akt. Kurs": "110.25",
    //             "Perf. 1 Jahr": "27.09%",
    //             "Perf. 3 Jahre": "78.58%",
    //             "Perf. 5 Jahre": "168.03%"
    //         },
    //         {
    //             "Bezeichnung": "DEUTSCHE BANK AG NA O.N.",
    //             "WKN": "514000",
    //             "Akt. Kurs": "11.04",
    //             "Perf. 1 Jahr": "-35.80%",
    //             "Perf. 3 Jahre": "-56.52%",
    //             "Perf. 5 Jahre": "-63.95%"
    //         },
    //         {
    //             "Bezeichnung": "NORDASIA.COM ANTEILE",
    //             "WKN": "979217",
    //             "Akt. Kurs": "74.28",
    //             "Perf. 1 Jahr": "7.10%",
    //             "Perf. 3 Jahre": "26.19%",
    //             "Perf. 5 Jahre": "61.00%"
    //         },
    //         {
    //             "Bezeichnung": "ARERO-DER WELTFONDS INH.",
    //             "WKN": "DWS0R4",
    //             "Akt. Kurs": "195.3",
    //             "Perf. 1 Jahr": "3.77%",
    //             "Perf. 3 Jahre": "7.86%",
    //             "Perf. 5 Jahre": "29.94%"
    //         }
    //     ]
    // }

    displayTable(json)
})

document.querySelectorAll('.sortable').forEach(e => e.addEventListener('click', e => sort(e.srcElement.innerHTML)))

const sort = function (name) {
    if (!json.hasOwnProperty('boersenkurse')) return

    var sortingFunction = /Perf\. [135] Jahre?/g.test(name) ?
        ((a, b) => Number.parseFloat(a) > Number.parseFloat(b) ? 1 : Number.parseFloat(a) < Number.parseFloat(b) ? -1 : 0) :
        ((a, b) => a > b ? 1 : a < b ? -1 : 0)

    let sorted = [...json['boersenkurse']]
    sorted.sort((a, b) => sortingFunction(a[name], b[name]))

    displayTable({ 'boersenkurse': sorted })
}

const displayTable = function (table) {
    const tbody = document.getElementById('table-body')

    for (let node of Array.from(tbody.children).slice(1))
        tbody.removeChild(node)

    for (let row of table['boersenkurse']) {
        let tr = document.createElement('tr')
        for (let elem in row) {
            let td = document.createElement('td')
            td.innerHTML = row[elem]
            if (/Perf\. [135] Jahre?/g.test(elem))
                td.className = Number.parseFloat(row[elem]) > 0 ? 'green' : Number.parseFloat(row[elem]) < 0 ? 'red' : ''
            tr.appendChild(td)
        }
        tbody.appendChild(tr)
    }
}