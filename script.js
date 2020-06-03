let json = {}

document.getElementById('json-button').addEventListener('click', e => {
    fetch("data.json")
        .then(response => response.json())
        .then(result => {
            json = result
            displayTable(json)
        });
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