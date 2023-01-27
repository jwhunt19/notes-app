const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
  const notes = loadNotes()
  const duplicateNotes = notes.filter((note) => note.title === title)
  const duplicateNote = notes.find((note) => note.title === title)

  if (!duplicateNote) {
    notes.push({
      title, body
    })
    saveNotes(notes)
    console.log(chalk.green.inverse('new note added!'))
  } else {
    console.log(chalk.red.inverse('failed: note title taken!'))
  }
}

const removeNote = (title) => {
  const notes = loadNotes()
  const newNotes = notes.filter((note) => note.title !== title)
  
  if (notes.length === newNotes.length) {
    console.log(chalk.red.inverse('no note with that title was found'))
  } else {
    saveNotes(newNotes)
    console.log(chalk.green.inverse(`note titled '${title}' has been deleted`))
  }
}

const listNotes = () => {
  const notes = loadNotes()

  console.log(chalk.inverse('Your Notes'))
  console.log(('=========='))
  
  notes.forEach((note => {
    console.log(`> ${note.title}`)
  }))
}

const readNote = (title) => {
  const notes = loadNotes()
  const note = notes.find((note) => note.title === title)

  if (note) {
    console.log(chalk.inverse(note.title))
    console.log((note.body))
  } else {
    console.log(chalk.red.inverse('note not found'))
  }
}

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch (e) {
    return []
  }
}

module.exports = {
  addNote, removeNote, listNotes, readNote
}