const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => {
  return 'your notes...'
}

const addNote = function (title, body) {
  const notes = loadNotes()
  const duplicateNotes = notes.filter(function (note) {
    return note.title === title
  })

  if (duplicateNotes.length === 0) {
    notes.push({
      title, body
    })
    saveNotes(notes)
    console.log(chalk.green.inverse('new note added!'))
  } else {
    console.log(chalk.red.inverse('failed: note title taken!'))
  }
}

const saveNotes = function (notes) {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = function () {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch (e) {
    return []
  }
}

const removeNote = function (title) {
  const notes = loadNotes()
  const newNotes = notes.filter(function (note) {
    return note.title !== title
  })
  
  if (notes.length === newNotes.length) {
    console.log(chalk.red.inverse('no note with that title was found'))
  } else {
    saveNotes(newNotes)
    console.log(chalk.green.inverse(`note titled '${title}' has been deleted`))
  }
}

module.exports = {
  getNotes, addNote, removeNote
}