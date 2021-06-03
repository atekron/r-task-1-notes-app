import { currentDate } from "./utilities.js";

//render all notes
export const renderNotes = (notes, htmlSelector, archive = false) => {
  const mountPoint = document.querySelector(htmlSelector);
  mountPoint.innerHTML = "";
  const re = /[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}/g;
  notes.forEach((note) => {
    const noteDiv = document.createElement("div");
    noteDiv.classList.add("note");
    const datesInNote = note.content.match(re);
    noteDiv.innerHTML = `
    <div class="note__body" id=${note.id}>
      <h3 class="note__created">${note.created}</h3>
      <p class="note__content">${note.content}</p>
      <p class="note__category">${note.category}</p>
      <p class="note__dates">${datesInNote ? datesInNote.join(", ") : ""}</p>
    </div>
    <div class="note__settings">
      <button class="note__edit small-btn">Edit</button>
      <button class="note__archive small-btn">${
        archive ? "Una" : "A"
      }rchive</button>
      <button class="note__delete small-btn">Delete</button>
    </div>
    `;
    mountPoint.appendChild(noteDiv);
  });
};

//show note creation screen
export const createNote = () => {
  document.querySelector(".header__create-btn").style.visibility = "hidden";
  document.querySelector(".create-note").style.display = "flex";
  document.querySelector(".content").style.display = "none";
};

// //handle saving new note to starage
// export const saveNote = (form, data) => {
//   const newNote = {
//     id: data.nextId,
//     created: currentDate(),
//     content: form.target["text"].value,
//     category: form.target["category"].value,
//   };
//   data.notesList.push(newNote);
//   data.nextId++;
//   document.querySelector(".header__create-btn").style.visibility = "visible";
//   document.querySelector(".create-note").style.display = "none";
//   document.querySelector(".content").style.display = "block";
//   form.target["text"].value = "";
//   form.target["category"].value = "Task";
// };

//display quantity of notes per category in storage
export const displaySummary = (category, notes, htmlSelector) => {
  const mountPoint = document.querySelector(htmlSelector);
  mountPoint.innerHTML = "";
  const summaryDiv = document.createElement("div");
  category.forEach((entry) => {
    const notesByCategory = notes.filter(
      (note) => note.category === entry
    ).length;
    summaryDiv.insertAdjacentHTML(
      "beforeend",
      `<p>${entry}: <span>${notesByCategory}</span></p>`
    );
  });
  mountPoint.appendChild(summaryDiv);
};

//handle saving new note to starage
export const saveNote = (e, data) => {
  const form = e.target.parentNode;
  const newNote = {
    id: data.nextId,
    created: currentDate(),
    content: form["text"].value,
    category: form["category"].value,
  };
  data.notesList.push(newNote);
  document.querySelector(".header__create-btn").style.visibility = "visible";
  document.querySelector(".create-note").style.display = "none";
  document.querySelector(".content").style.display = "block";
  form["text"].value = "";
  form["category"].value = "Task";
};

//edit selected note
export const editNote = (e, data) => {
  const noteDiv = e.target.parentNode.parentNode;

  document.querySelector(".header__create-btn").style.visibility = "hidden";
  document.querySelector(".create-note").style.display = "flex";
  document.querySelector(".content").style.display = "none";
  document.querySelector(".create-note__title").innerHTML = "Edit Note: ";

  document.querySelector("#create-note__category").value =
    noteDiv.children[0].children[2].innerText;
  document.querySelector("#create-note__text").value =
    noteDiv.children[0].children[1].innerText;

  const saveBtn = document.querySelector(".create-note__save");
  const editBtn = document.querySelector(".create-note__edit");
  saveBtn.style.display = "none";
  editBtn.style.display = "inline-block";

  editBtn.onclick = (e) => {
    const editNoteId = parseInt(noteDiv.children[0].id);
    const editIndex = data.notesList.findIndex((note) => {
      return note.id === editNoteId;
    });
    data.notesList[editIndex].category = document.querySelector(
      "#create-note__category"
    ).value;
    data.notesList[editIndex].content =
      document.querySelector("#create-note__text").value;

    console.log(data.notesList);

    document.querySelector(".header__create-btn").style.visibility = "visible";
    document.querySelector(".create-note").style.display = "none";
    document.querySelector(".content").style.display = "block";
    document.querySelector(".create-note__title").innerHTML = "Write note: ";
    saveBtn.style.display = "inline-block";
    editBtn.style.display = "none";
  };
};

//delete selected note from storage
export const deleteNote = (e, data, archive = false) => {
  const noteDiv = e.target.parentNode.parentNode;
  noteDiv.style.display = "none";
  const noteId = parseInt(noteDiv.children[0].id);
  if (!archive) {
    data.notesList = data.notesList.filter((note) => {
      return note.id !== noteId;
    });
  } else {
    data.notesListArchive = data.notesListArchive.filter((note) => {
      return note.id !== noteId;
    });
  }
};

//remove selected note from notes list and move it to archive list
export const archiveNote = (e, data, unarchive = false) => {
  const noteDiv = e.target.parentNode.parentNode;
  noteDiv.style.display = "none";
  const noteId = parseInt(noteDiv.children[0].id);
  if (!unarchive) {
    const archiveIndex = data.notesList.findIndex(
      (entry) => entry.id === noteId
    );
    data.notesListArchive.push(data.notesList[archiveIndex]);
    data.notesList = data.notesList.filter((note) => {
      return note.id !== noteId;
    });
  } else {
    const archiveIndex = data.notesListArchive.findIndex(
      (entry) => entry.id === noteId
    );
    data.notesList.push(data.notesListArchive[archiveIndex]);
    data.notesListArchive = data.notesListArchive.filter((note) => {
      return note.id !== noteId;
    });
  }
};
