const undoStack = [];
const redoStack = [];

const btnAdd = document.querySelector(".btn_add");
const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
    notes.forEach((noteTxt) => addNote(noteTxt));
}

btnAdd.addEventListener("click", () => addNote());

function addNote(text = "") {
    const note = document.createElement("div");
    note.classList.add("note-wrapper");
    note.innerHTML = `
        <div class="operations">
            <div class="text">
                <button class="bold fa fa-bold"></button>
                <button class="italic fa fa-italic"></button>
                <button class="list fa fa-list-ul" onclick="convertToUnorderedList(this)"></button>
            </div>
            <button class="edit fas fa-edit"></button>
            <button class="delete fas fa-trash-alt"></button>
        </div>
        <div class="main ${text ? "" : "hidden"}"></div>
        <textarea class="${text ? "hidden" : ""}">${text}</textarea>`;

    const editBtn = note.querySelector(".edit");
    const deleteBtn = note.querySelector(".delete");
    const boldBtn = note.querySelector(".bold");
    const italicBtn = note.querySelector(".italic");
    const mainEl = note.querySelector(".main");
    const textAreaEl = note.querySelector("textarea");

    textAreaEl.value = text;
    mainEl.innerHTML = text;

    deleteBtn.addEventListener("click", () => {
        note.remove();
        updates();
    });

    editBtn.addEventListener("click", () => {
        mainEl.classList.toggle("hidden");
        textAreaEl.classList.toggle("hidden");
    });

    boldBtn.addEventListener("click", () => {
        mainEl.classList.toggle("bold-text");
        textAreaEl.classList.toggle("bold-text");
        updates();
    });

    italicBtn.addEventListener("click", () => {
        mainEl.classList.toggle("italic-text");
        textAreaEl.classList.toggle("italic-text");
        updates();
    });

    textAreaEl.addEventListener("input", (e) => {
        const { value } = e.target;
        mainEl.innerHTML = value;
        updates();
    });

    document.body.appendChild(note);

    redoStack.length = 0;
    undoStack.push(document.body.innerHTML);
}

function updates() {
    const noteText = document.querySelectorAll("textarea");
    const notes = [];
    noteText.forEach((note) => notes.push(note.value));
    localStorage.setItem("notes", JSON.stringify(notes));
}

function undo() {
    if (undoStack.length > 1) {
        redoStack.push(undoStack.pop());
        document.body.innerHTML = undoStack[undoStack.length - 1];
    }
}

function redo() {
    if (redoStack.length > 0) {
        undoStack.push(redoStack.pop());
        document.body.innerHTML = undoStack[undoStack.length - 1];
    }
}

function convertToUnorderedList(button) {
    const noteWrapper = button.closest(".note-wrapper");
    const noteTextArea = noteWrapper.querySelector("textarea");
    const textContent = noteTextArea.value.trim();

    if (textContent !== '') {
        const lines = textContent.split('\n');
        const unorderedList = document.createElement('ul');

        lines.forEach(line => {
            const listItem = document.createElement('li');
            listItem.textContent = line;
            unorderedList.appendChild(listItem);
        });

        noteWrapper.querySelector(".main").innerHTML = "";
        noteWrapper.querySelector(".main").appendChild(unorderedList);

        updates();
    }
}
let search = document.getElementById("searchTxt");
search.addEventListener("input", function(){
    let inputVal = search.value.trim().toLowerCase();
    let noteCards = document.querySelectorAll(".note-wrapper");

    noteCards.forEach(function(element) {
        let noteText = element.querySelector("textarea").value.trim().toLowerCase();
        if (noteText.includes(inputVal)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    });
});