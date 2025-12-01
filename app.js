const notesContainer = document.getElementById('notes-container');
const CreateBtn = document.getElementById('btn');
let notes = document.querySelectorAll('.input-box');
let ClearNotes = document.querySelector('.clear-all-notes');

function shownotes() {
    const savednotes = localStorage.getItem("notes"); 
    if(savednotes){
        notesContainer.innerHTML = savednotes; 
    }
}
shownotes();

function UpdateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

CreateBtn.addEventListener("click", () => {

    let inputbox = document.createElement("p");
    let img = document.createElement("img");
    inputbox.className = "input-box";
    inputbox.setAttribute("contenteditable", "true");
    img.src = "assets/images/delete_sweep_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg";
    
    inputbox.appendChild(img); 

    notesContainer.appendChild(inputbox);


   UpdateStorage(); 

});

notesContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
        e.target.parentElement.remove();
        UpdateStorage();
    } else if (e.target.tagName === "P") {
        let notes = document.querySelectorAll('.input-box');
        notes.forEach(nt => {
            nt.onkeyup = function () {
                UpdateStorage();
            }
        });
    }
});

ClearNotes.addEventListener("click",()=>{
    if(confirm("are you sure you want to delete all notes")){ 
        localStorage.removeItem("notes"); 
        notesContainer.innerHTML="";
    }
})

document.addEventListener("DOMContentLoaded", () => {
    let notes = document.querySelectorAll('.input-box');
    notes.forEach(note => {
        note.onkeyup = function() {
            UpdateStorage();
        }
    });
});

document.addEventListener("keydown",(e)=>{
    if(e.key === 'Enter'){
        document.execCommand("insertLineBreak"); 
        e.preventDefault(); 
    }
});
