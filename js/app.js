export const renderNotes = (notes, htmlSelector, archive = false) => {
  const mountPoint = document.querySelector(htmlSelector);
  mountPoint.innerHTML = "";
  notes.forEach((note) => {
    const noteDiv = document.createElement("div");
    noteDiv.classList.add("note");
    noteDiv.innerHTML = `
    <div class="note__body" id=${note.id}>
      <h3 class="note__created">${note.created}</h3>
      <p class="note__content">${note.content}</p>
      <p class="note__category">${note.category}</p>
      <p class="note__dates">${note.created}</p>
    </div>
    <div class="note__settings">
      <button class="note__edit">Edit</button>
      <button class="note__archive">${archive ? "Una" : "A"}rchive</button>
      <button class="note__delete">Delete</button>
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
    id: 2,
    created: dd + "/" + mm + "/" + yyyy,
    content: form.target["text"].value,
    category: form.target["category"].value,
  };
  data.notesList.push(newNote);
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

export const editNote = (e) => {
  console.log(e.target.parentNode.parentNode);
};

export const deleteNote = (e, data) => {
  const noteDiv = e.target.parentNode.parentNode;
  noteDiv.style.display = "none";
  const noteId = parseInt(noteDiv.children[0].id);
  data.notesList = data.notesList.filter((note) => {
    return note.id !== noteId;
  });
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
