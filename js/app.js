export const renderNotes = (notes, htmlSelector) => {
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
      <button class="note__archive">Archive</button>
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
  console.log(form.target["category"].value);
  console.log(dd + "/" + mm + "/" + yyyy);
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
};

export const displaySummary = (category, notes) => {
  const mountPoint = document.querySelector(htmlSelector);
  mountPoint.innerHTML = "";
  const summaryDiv = document.createElement("div");
  category.forEach((entry) => {
    const notesByCategory = notes.filter(
      (note) => note.category === category
    ).length;
  });
};

export const editNote = () => {};

export const deleteNote = () => {};

export const archiveNote = () => {};

export const unarchiveNote = () => {};
