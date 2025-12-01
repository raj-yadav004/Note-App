
const notesContainer = document.getElementById('notes-container');
const CreateBtn = document.getElementById('btn');
let notes = document.querySelectorAll('.input-box');
let ClearNotes = document.querySelector('.clear-all-notes');

// load saved notes from storage when page loads
function shownotes() {
    const savednotes = localStorage.getItem("notes");
    if (savednotes) {
        notesContainer.innerHTML = savednotes;
    }
}
shownotes();

// save whatever's currently in the notes container
function UpdateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

// when you click the create button, make a new note
CreateBtn.addEventListener("click", () => {
    // make a new editable paragraph
    let inputbox = document.createElement("p");
    let img = document.createElement("img");
    inputbox.className = "input-box";
    inputbox.setAttribute("contenteditable", "true");
    img.src = "assets/images/delete_sweep_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg";

    // put the delete icon inside the note
    inputbox.appendChild(img);

    // add the whole thing to the page
    notesContainer.appendChild(inputbox);

    // save it right away
    UpdateStorage();
});

// handle clicks on notes - either delete or start editing
notesContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
        // clicked the delete icon, remove the note
        e.target.parentElement.remove();
        UpdateStorage();
    } else if (e.target.tagName === "P") {
        // clicked on a note itself, set up auto-save while typing
        let notes = document.querySelectorAll('.input-box');
        notes.forEach(nt => {
            nt.onkeyup = function () {
                UpdateStorage();
            }
        });
    }
});

// clear all notes button with confirmation
ClearNotes.addEventListener("click", () => {
    if (confirm("are you sure you want to delete all notes")) {
        localStorage.removeItem("notes");
        notesContainer.innerHTML = "";
    }
})

// when page loads, make sure existing notes auto-save on edit
document.addEventListener("DOMContentLoaded", () => {
    let notes = document.querySelectorAll('.input-box');
    notes.forEach(note => {
        note.onkeyup = function () {
            UpdateStorage();
        }
    });
});

// handle enter key to add line breaks properly
document.addEventListener("keydown", (e) => {
    if (e.key === 'Enter') {
        document.execCommand("insertLineBreak");
        e.preventDefault();
    }
});

