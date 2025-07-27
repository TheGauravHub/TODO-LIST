let addnew = document.querySelector(".addnew");
//FUNCTION TO SAVE ARRAY DATA IN A ARRAY
function saveNoteToLocalStorage(title, description) {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.push({ title, description });
  localStorage.setItem("notes", JSON.stringify(notes));
}

addnew.addEventListener("click", (e) => {
  e.preventDefault();
  const popup = document.createElement("div");
  popup.classList.add(
    "popup",
    "text-black",
    "flex",
    "justify-center",
    "items-center",
    "relative",
    "z-50",
    "w-full",
    "min-h-screen",
    "bg-black/50"
  );

  popup.innerHTML = `
    <div class="popup-content h-96 w-64 bg-white rounded-2xl shadow-lg flex flex-col p-6 z-20 mt-28">
      <div class="header flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold">Add New Task</h2>
        <span class="cancel hover:text-red-700 cursor-pointer material-symbols-outlined">close</span>
      </div>
      <p>Title</p>
      <input type="text" class="titleinput border border-gray-300 rounded p-2 w-full mb-4" placeholder="Enter task title">
      <p>Description</p>
      <textarea class="descriptioninput border border-gray-300 rounded p-2 w-full h-auto mb-4" placeholder="Enter task description"></textarea>
      <div>
        <button class="savebtn bg-[#7acb53] hover:bg-[#68b847] text-white rounded p-2 w-full">Save Task</button>
      </div>
    </div>
  `;
  document.body.appendChild(popup);

  const cancel = popup.querySelector(".cancel");
  cancel.addEventListener("click", (e) => {
    e.preventDefault();
    popup.remove();
  });

  const savebtn = popup.querySelector(".savebtn");
  savebtn.addEventListener("click", (e) => {
    e.preventDefault();

    const titleinput = popup.querySelector(".titleinput");
    const descriptioninput = popup.querySelector(".descriptioninput");
    //  localStorage.setItem("key",JSON.stringify({
    //     title: titleinput.value,
    //     description: descriptioninput.value,
    //   }));
    //    console.log(e);
    const newnote = document.createElement("div");
    newnote.classList.add(
      "note",
      "gap-4",
      "flex",
      "flex-col",
      "bg-white",
      "h-60",
      "rounded-2xl",
      "shadow-lg",
      "text-black",
      "p-5",
      "gap-4",
      "w-60",
      "relative"
    );

    newnote.innerHTML = `
      <div class="details flex flex-col">
        <h2 class="text-xl font-semibold">${titleinput.value}</h2>
        <p class="text-sm">${descriptioninput.value}</p>
      </div>
   
      <div class="options ml-[90%] mt-[60%]">
        <span class="material-symbols-outlined cursor-pointer">more_horiz</span>
      </div>
    `;

    document.querySelector(".content").appendChild(newnote);
    saveNoteToLocalStorage(titleinput.value, descriptioninput.value);

    popup.remove();

    const optionsBtn = newnote.querySelector(".options");

    let popuptwo = null;

    optionsBtn.addEventListener("click", (e) => {
      e.preventDefault();

      if (popuptwo) return;

      popuptwo = document.createElement("div");
      popuptwo.classList.add(
        "flex",
        "flex-col",
        "bg-white",
        "text-black",
        "absolute",
        "top-8",
        "right-2",
        "shadow-md",
        "rounded",
        "p-2",
        "z-50",
        "h-20",
        "w-20",
        "mt-[80%]",
        "transperant",
        "border",
        "border-gray-200"
      );

      popuptwo.innerHTML = `
  <span class="editnote hover:bg-green-100 px-2 py-1 rounded text-sm cursor-pointer text-green-700 font-medium">
     Edit
  </span>
  <span class="deletenote hover:bg-red-100 px-2 py-1 rounded text-sm cursor-pointer text-red-600 font-medium">
     Delete
  </span>
`;

      optionsBtn.appendChild(popuptwo);

      const editnote = popuptwo.querySelector(".editnote");
      editnote.addEventListener("click", () => {
        popuptwo.remove();

        addnew.click();

        setTimeout(() => {
          const titleInput = document.querySelector(".titleinput");
          const descInput = document.querySelector(".descriptioninput");
          titleInput.value = newnote.querySelector("h2").textContent;
          descInput.value = newnote.querySelector("p").textContent;
        }, 0);
        newnote.remove();
      });

      const deletenote = popuptwo.querySelector(".deletenote");
      deletenote.addEventListener("click", () => {
        popuptwo.remove();
        newnote.remove();
      });
    });

    optionsBtn.addEventListener("dblclick", () => {
      if (popuptwo) {
        popuptwo.remove();
        popuptwo = null;
      }
    });
  });
});

const deleteall = document.querySelector(".deleteall");
deleteall.addEventListener("click", () => {
  const allNotes = document.querySelectorAll(".note");
  allNotes.forEach((note) => note.remove());
  localStorage.removeItem("notes");
});
//TO PERSIST DATA ON LOCALSTORAGE ON PAGE REFRESH ASWELL
window.addEventListener("DOMContentLoaded", () => {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];

  notes.forEach((note) => {
    const newnote = document.createElement("div");
    newnote.classList.add(
      "note",
      "gap-4",
      "flex",
      "flex-col",
      "bg-white",
      "h-60",
      "rounded-2xl",
      "shadow-lg",
      "text-black",
      "p-5",
      "gap-4",
      "w-60",
      "relative"
    );

    newnote.innerHTML = `
      <div class="details flex flex-col">
        <h2 class="text-xl font-semibold">${note.title}</h2>
        <p class="text-sm">${note.description}</p>
      </div>
      <div class="options ml-[90%] mt-[60%]">
        <span class="material-symbols-outlined cursor-pointer">more_horiz</span>
      </div>
    `;

    document.querySelector(".content").appendChild(newnote);
  });
});
