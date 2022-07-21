const notesContainer = document.getElementById("app");
const addNoteButton = notesContainer.querySelector(".add-note");

addNoteButton.addEventListener("click", () => { addNote(); });

window.addEventListener("load", () => {
    loadNotesToDOM();
    let color = getUserPreferedColor();
    changeBackground(color);
});

function loadNotesToDOM(){
    let notes = getNotes();
    notes.forEach(note => {
        const noteElement = createNoteElement(note.id, note.content);
        notesContainer.insertBefore(noteElement, addNoteButton);
    });
}

function getNotes(){
    return JSON.parse(localStorage.getItem("stickyNotes") || "[]");
}

function saveNotes(notes){
    localStorage.setItem("stickyNotes", JSON.stringify(notes));
}

function createNoteElement(id, content){
    const element = document.createElement("textarea");
    element.classList.add("note");
    element.value = content;
    element.placeholder = "Write something on me";

    element.addEventListener("change", () => {
        updateNote(id, element.value);
    });

    element.ondblclick = () => {
        const doDelete = confirm("Are you sure you want to delete this note?");
        if(doDelete){
            deleteNote(id, element);
        }
    };

    return element;
}

function addNote(){
    const notesArray = getNotes();
    var time = new Date();
    const noteObject = {
        id: time.getTime(),
        content: ""
    }

    const noteElement = createNoteElement(noteObject.id, noteObject.content);
    notesContainer.insertBefore(noteElement, addNoteButton);

    notesArray.push(noteObject);
    saveNotes(notesArray);
}

function updateNote(id, newContent){
    const notesArray = getNotes();
    const targetNote = notesArray.filter(note => note.id == id)[0];

    targetNote.content = newContent;
    saveNotes(notesArray);

}

function deleteNote(id, element){
    const notesArray = getNotes().filter(note => note.id != id);
    saveNotes(notesArray);
    notesContainer.removeChild(element);
}

function toggleNav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
}

function toggleInstructions(){
    let instructions = document.querySelector(".instructions");
    let app = document.querySelector("#app");
    instructions.classList.toggle("open-instructions");
    app.classList.toggle("open-app");    
}

function changeBackground(color){
    
    switch(color){
        case 'blue':
            document.body.style.backgroundColor = '#192841';
            break;
        case 'pink':
            document.body.style.backgroundColor = '#b20e66';
            break;
        case 'green':
            document.body.style.backgroundColor = '#3A6152';
            break;
        case 'purple':
            document.body.style.backgroundColor = '#4E2A84';
            break;
        default:
            break;
    }

    saveUserPreferedColor(color);

}

function saveUserPreferedColor(color){
    localStorage.setItem("userColor", JSON.stringify(color));
}

function getUserPreferedColor(){
    return JSON.parse(localStorage.getItem("userColor") || "blue");
}