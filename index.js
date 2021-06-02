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
  displaySummary(data.category, notes, ".summary");
  document.querySelectorAll(".note__delete").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      deleteNote(e, data);
    })
  );
  document.querySelectorAll(".note__archive").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      archiveNote(e, data, archive);
    })
  );
  document.querySelectorAll(".note__edit").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      editNote(e);
    })
  );
}

reRender();

document
  .querySelector(".header__create-btn")
  .addEventListener("click", createNote);

document.querySelector(".create-note").addEventListener("submit", (e) => {
  e.preventDefault();
  saveNote(e, data);
  reRender();
});

document.querySelector(".nav__all").addEventListener("click", () => {
  reRender();
});

document.querySelector(".nav__archive").addEventListener("click", () => {
  reRender(true);
});
