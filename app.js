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
  handler(argv) {
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
  handler(argv) {
    notes.removeNote(argv.title)
  }
})

// list command
yargs.command({
  command: 'list',
  describe: 'list your notes',
  handler() {
    notes.listNotes()
  }
})

// read command
yargs.command({
  command: 'read',
  describe: 'read a note',
  builder: {
    title: {
      describe: 'note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    notes.readNote(argv.title)
  }
})

yargs.parse()