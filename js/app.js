export const renderNotes = (notes, htmlSelector) => {
  const mountPoint = document.querySelector(htmlSelector);
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
