import { data } from "./data/data.js";
import {
  renderNotes,
  saveNote,
  createNote,
  displaySummary,
  deleteNote,
  archiveNote,
  editNote,
} from "./js/app.js";

function reRender(archive = false) {
  const notes = archive ? data.notesListArchive : data.notesList;
  renderNotes(notes, ".content", archive);
  displaySummary(data.category, notes, ".summary__content");
  document.querySelectorAll(".note__delete").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      deleteNote(e, data, archive);
    })
  );
  document.querySelectorAll(".note__archive").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      archiveNote(e, data, archive);
    })
  );
  document.querySelectorAll(".note__edit").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      editNote(e, data);
    })
  );
}

reRender();

//displaying create note screen
document
  .querySelector(".header__create-btn")
  .addEventListener("click", createNote);

//saving note to storage on form submit and rendering notes list
document.querySelector(".create-note__save").addEventListener("click", (e) => {
  e.preventDefault();
  saveNote(e, data);
  reRender();
});

//rerendering app on form submit
document.querySelector(".create-note").addEventListener("submit", (e) => {
  e.preventDefault();
  reRender();
});

//display notes list when clicking on all notes button
document.querySelector(".nav__all").addEventListener("click", () => {
  document.querySelector(".content").style.display = "block";
  document.querySelector(".content").style.opacity = "1";
  reRender();
});

//display archive list when clicking on archive button
document.querySelector(".nav__archive").addEventListener("click", () => {
  document.querySelector(".content").style.display = "block";
  document.querySelector(".content").style.opacity = "0.6";
  reRender(true);
});
