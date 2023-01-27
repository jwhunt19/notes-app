const validator = require('validator');
const chalk = require('chalk');
const yargs = require('yargs')
const notes = require('./notes.js');

// customize yargs version
yargs.version('1.1.0')

// shorthand console log
function l() {
  console.log(Object.values(arguments).join(' '))
}

// add command
yargs.command({
  command: 'add',
  describe: 'add a new note',
  builder: {
    title: {
      describe: 'note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'note body',
      demandOption: true,
      type: 'string'
    }
  },
  handler: function (argv) {
    notes.addNote(argv.title, argv.body)
  }
})

// remove command
yargs.command({
  command: 'remove',
  describe: 'remove a note',
  builder: {
    title: {
      describe: 'note title',
      demandOption: true,
      type: 'string'
    },
  },
  handler: function (argv) {
    notes.removeNote(argv.title)
  }
})

// read command
yargs.command({
  command: 'read',
  describe: 'read a note',
  handler: function () {
    l('read a note')
  }
})

// list command
yargs.command({
  command: 'list',
  describe: 'list your notes',
  handler: function () {
    l('listing notes')
  }
})


yargs.parse()