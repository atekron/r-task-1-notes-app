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

export const createNote = () => {
  document.querySelector(".header__create-btn").style.visibility = "hidden";
  document.querySelector(".create-note").style.display = "flex";
  document.querySelector(".content").style.display = "none";
};

export const saveNote = (form, data) => {
  const creationDate = new Date();
  const dd = creationDate.getDate();
  const mm = creationDate.getMonth();
  const yyyy = creationDate.getFullYear();
  const newNote = {
    id: data.nextId,
    created: dd + "/" + mm + "/" + yyyy,
    content: form.target["text"].value,
    category: form.target["category"].value,
  };
  data.notesList.push(newNote);
  data.nextId++;
  document.querySelector(".header__create-btn").style.visibility = "visible";
  document.querySelector(".create-note").style.display = "none";
  document.querySelector(".content").style.display = "block";
  form.target["text"].value = "";
  form.target["category"].value = "Task";
};

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
  document.querySelector(".create-note__save").style.display = "none";
  const editBtn = document.createElement("button");
  editBtn.innerText = "Save edit";
  editBtn.onclick = (e) => {
    e.preventDefault();
    const editNoteId = parseInt(noteDiv.children[0].id);
    const editIndex = data.notesList.findIndex((note) => {
      return note.id === editNoteId;
    });
    data.notesList[editIndex].category = document.querySelector(
      "#create-note__category"
    ).value;
    data.notesList[editIndex].category =
      document.querySelector("#create-note__text").value;
  };
  document.querySelector(".create-note").appendChild(editBtn);
};

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
