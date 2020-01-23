var pump = require('pump')
var ndjson = require('ndjson')
var through = require('through2')
var hyperquest = require('hyperquest')

pump(
  hyperquest('http://localhost:3000'),
  ndjson.parse(),
  through.obj(write),
  process.stdout
)

function write (row, enc, next) {
  next(null, String(row.value * row.value) + '\n')
}