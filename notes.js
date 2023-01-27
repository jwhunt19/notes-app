const fs = require('fs')

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
    console.log('new note added!')
  } else {
    console.log('failed: note title taken!')
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
  console.log(title)
}

module.exports = {
  getNotes, addNote, removeNote
}