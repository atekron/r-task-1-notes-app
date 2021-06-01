import { data } from "./data/data.js";
import { renderNotes, saveNote, createNote } from "./js/app.js";

renderNotes(data.notesList, ".content");

document
  .querySelector(".header__create-btn")
  .addEventListener("click", createNote);

document.querySelector(".create-note").addEventListener("submit", (e) => {
  e.preventDefault();
  saveNote(e, data);
  renderNotes(data.notesList, ".content");
});
