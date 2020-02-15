var express = require('express')
var app = express()
var XLSX = require('xlsx')
const fs = require('fs')
const rawdata = fs.readFileSync('MOCK_DATA.json') //reads MockData file
var wsData = JSON.parse(rawdata) //parses json
const port = 3000

var ws = XLSX.utils.json_to_sheet(wsData, {
    header: ['id', 'first_name', 'last_name', 'email', 'gender', 'ip_address'] //sets header of spreadsheet TODO: work out way to get these without hardcoding them 
})
var wb = XLSX.utils.book_new() //creates new sheet

XLSX.utils.book_append_sheet(wb, ws, 'DATA') // writes to new sheet
var buf = XLSX.write(wb, {
    type: 'buffer',
    bookType: 'xlsx'
});
let i = getRandomInt(1, 1000) //random number for file name purposes TODO: increment requests 

app.get('/download', function(req, res) {
    fs.writeFile(`./upload-folder/data${i}.xlsx`, buf, err => {
        if (err) {
            console.error(err)
        }
        res.status(200).download(`./upload-folder/data${i}.xlsx`)
    });

})
app.get('/', function(req, res) {
    res.send('hello world')
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))



function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}