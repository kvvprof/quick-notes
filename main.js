'use strict'

const textArea = document.querySelector('.notes__text')
const clearBtn = document.querySelector('.fa-eraser')
const saveBtn = document.querySelector('.fa-floppy-disk')
const addBtn = document.querySelector('.fa-circle-plus')
const listOfNotes = document.querySelector('.notes__view')
const downBtn = document.querySelector('.fa-angles-down')
const upBtn = document.querySelector('.fa-angles-up')
const highlighterBtn = document.querySelector('.fa-highlighter')
const copyBtn = document.querySelector('.fa-copy')
const showNotesBtn = document.querySelector('.fa-book')
const downloadBtn = document.querySelector('.fa-download')
const showSmiliesBtn = document.querySelector('.fa-face-smile')
const listOfSmilies = document.querySelector('.notes__smiles')

let noteId = 0
let countNotes = []
let showListOfNotes = false
let showListOfSmilies = false

window.onload = () => {
    textArea.value = localStorage.getItem(noteId)
    getStorage()
    editNote()
    upBtndateStorage()
    showOrHideListOfNotes(false)
    noteId = countNotes[countNotes.length - 1]
    textArea.value = localStorage.getItem(countNotes[countNotes.length - 1])
    activeNote(false, noteId)
    countSymbols()
    insertSmile()
}

window.onunload = () => {
    (noteId > 0 && noteId !== undefined) ? saveNote() : addNote()
}

const getNote = (key) => localStorage.getItem(key)

const countSymbols = () => {
    let symbols = document.querySelector('.notes__symbols')
    symbols.innerHTML = `${textArea.value.length}/10000 | ${countNotes.length}/<span class="attention">50</span>`
}

const getStorage = () => {
    listOfNotes.innerHTML = ''
    const notesId = []
    for (let index = 0; index < localStorage.length; index++) {
        notesId.push(localStorage.key(index))
    }
    notesId.sort()
    countNotes = notesId
    notesId.forEach(element => {
        listOfNotes.innerHTML += `<div class="notes__note" id="${element}"> 
        ${localStorage.getItem(element).slice(0, 950)}
        <i class="notes__delete fa-solid fa-trash-can" id="${element}"></i></div>`
    })
}

const editNote = () => {
    const notes = document.querySelectorAll('.notes__note')
    for (let index = 0; index < notes.length; index++) {
        notes[index].addEventListener('click', (e) => {
            activeNote(true, noteId)
            if (getNote(e.target.id)) {
                textArea.value = getNote(noteId = e.target.id)
                activeNote(false, e.target.id)
                countSymbols()
            }
        })
    }
}

const upBtndateStorage = () => {
    const deleteBtns = document.querySelectorAll('.fa-trash-can')
    for (let index = 0; index < deleteBtns.length; index++) {
        deleteBtns[index].addEventListener('click', (e) => {
            deleteNote(e.target.id)
            getStorage()
            editNote()
            upBtndateStorage()
            textArea.focus()
            countSymbols()
        })
    }
}

const saveNote = () => {
    if (textArea.value !== '' && noteId !== undefined && noteId !== 0) {
        localStorage.setItem(noteId, textArea.value)
        textArea.value = ''
        textArea.focus()
        noteId = 0
    }
}

const addNote = () => {
    if (textArea.value !== '' && countNotes.length <= 49) {
        localStorage.setItem(Date.now(), textArea.value)
        textArea.value = ''
        textArea.focus()
        countSymbols()
    }
}

const deleteNote = (key) => {
    localStorage.removeItem(key)
    if (noteId > 0) {
        textArea.value = ''
    }
    noteId = 0

    if (localStorage.length === 0) {
        showOrHideListOfNotes(false)
    }
}

const replaceSelectedText = (key = true) => {
    if (textArea.selectionStart !== undefined) {
        const startPos = textArea.selectionStart
        const endPos = textArea.selectionEnd
        const selectedText = textArea.value.substring(startPos, endPos)
        if (key === true) {
            textArea.value = textArea.value.slice(0, startPos) + selectedText.toLowerCase() + textArea.value.slice(endPos)
            textArea.setSelectionRange(startPos, endPos)
            textArea.focus()
        } else {
            textArea.value = textArea.value.slice(0, startPos) + selectedText.toUpperCase() + textArea.value.slice(endPos)
            textArea.setSelectionRange(startPos, endPos)
            textArea.focus()
        }
    }
}

const insertSmile = () => {
    const smile = document.querySelectorAll('.notes__smile')
    for (let index = 0; index < 1632; index++) {
        smile[index].addEventListener('click', (e) => {
            const startPos = textArea.selectionStart
            const endPos = textArea.selectionEnd
            textArea.value = textArea.value.slice(0, startPos) + e.target.innerHTML + textArea.value.slice(endPos)
            textArea.setSelectionRange(startPos+2, endPos+2)
            textArea.focus()
        })
    }
}

const showOrHideListOfNotes = (key) => {
    if (key === true) {
        showListOfNotes = true
        listOfNotes.style.display = 'flex'
        showNotesBtn.style.color = '#D7675C'
        showSmiliesBtn.style.color = '#E6DCD2'
        showListOfSmilies = false
        listOfSmilies.style.display = 'none'
    } else {
        listOfNotes.style.display = 'none'
        showListOfNotes = false
        showNotesBtn.style.color = '#E6DCD2'
    }
}

const showOrHideListOfSmilies = (key) => {
    if (key === true) {
        showListOfSmilies = true
        listOfSmilies.style.display = 'flex'
        showSmiliesBtn.style.color = '#D7675C'
        showNotesBtn.style.color = '#E6DCD2'
        showListOfNotes = false
        listOfNotes.style.display = 'none'
    } else {
        showListOfSmilies = false
        listOfSmilies.style.display = 'none'
        listOfSmilies.style.color = '#E6DCD2'
        showSmiliesBtn.style.color = '#E6DCD2'
    }
}

const activeNote = (key, id) => {
    if (noteId !== undefined && key === true && document.getElementById(id)) {
        document.getElementById(id).style.backgroundColor = '#565656'
    }
    if (noteId !== undefined && key === false && document.getElementById(id)) {
        document.getElementById(id).style.backgroundColor = '#D7675C'
    }
}

clearBtn.addEventListener('click', () => {
    textArea.value = ''
    textArea.focus()
    countSymbols()
})

saveBtn.addEventListener('click', () => {
    saveNote()
    getStorage()
    upBtndateStorage()
    editNote()
    countSymbols()
})

addBtn.addEventListener('click', () => {
    addNote()
    getStorage()
    upBtndateStorage()
    editNote()
    countSymbols()
})

downBtn.addEventListener('click', () => {
    replaceSelectedText(true)
})

upBtn.addEventListener('click', () => {
    replaceSelectedText(false)
})

highlighterBtn.addEventListener('click', () => {
    textArea.focus()
    textArea.select()
})

copyBtn.addEventListener('click', () => {
    textArea.focus()
    textArea.select()
    window.navigator.clipboard.writeText(textArea.value)
})

showNotesBtn.addEventListener('click', () => {
    if (localStorage.length !== 0) {
        showListOfNotes = !showListOfNotes
        showOrHideListOfNotes(showListOfNotes)
        listOfSmilies.style.display = 'none'
    }
})

showSmiliesBtn.addEventListener('click', () => {
    showListOfSmilies = !showListOfSmilies
    showOrHideListOfSmilies(showListOfSmilies)
    textArea.focus()
})

downloadBtn.addEventListener('click', () => {
    const lictOfNotes = []
    const notesId = []
    for (let index = 0; index < localStorage.length; index++) {
        notesId.push(localStorage.key(index))
    }
    notesId.sort()
    for (let index = 0; index < notesId.length; index++) {
        lictOfNotes.push(localStorage.getItem(notesId[index]) + '\r\n' + '-------------------------' + '\r\n')

    }
    const notes = 'data:application/txt;charset=utf-8,' + encodeURIComponent(lictOfNotes.join(''))
    window.open(notes)
})


