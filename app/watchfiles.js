var watch = require('node-watch')
var exec = require('child_process').exec

function sayBug() {
  exec('say "vim bug file created"')
}
watch('./', { filter: /[\d]+:p/ }, sayBug)
