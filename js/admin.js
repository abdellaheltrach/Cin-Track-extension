import { deleteShow, getAllShows } from "./api.js";

const statusMessage = document.getElementById("status-message");
const tableContainer = document.getElementById("table-container");
const tableBody = document.getElementById("table-body");


let modelCancelBtn = document.getElementById("btn-cancel");

modelCancelBtn.addEventListener('click',(e)=> {
        const model = document.getElementById("modal");
        model.classList.add("hidden");
})

loadShows();

function renderAdminTableRows(shows) {
  if (!shows) {
    tableContainer.classList.add("hidden");
    showStatus("Aucun contenu disponible.", "text-gray-400");
    return;
  }


  console.log(shows)

  tableContainer.classList.remove("hidden");
  tableBody.innerHTML = "";
  tableBody.innerHTML = shows
    .map(
      (elm) =>
        `
      <tr class="hover:bg-[#26262c] transition-colors">
        <td class="py-3 px-4">
          <img 
            src="${elm.image}" 
            alt="${elm.title}" 
            class="w-12 h-16 object-cover rounded border border-[#35353d]"
          />
        </td>
        <td class="py-3 px-4 font-medium text-white">${elm.title}</td>
        <td class="py-3 px-4">
          <span class="px-2.5 py-1 text-x font-semibold  text-[#FF0000]">
            ${elm.type}
          </span>
        </td>
        <td class="py-3 px-4 text-gray-300">${elm.releaseYear}</td>
        <td class="py-3 px-4 text-right space-x-2">
          <button 
            data-id="${elm.id}" 
            class="btn-edit my-3 px-3 py-1.5 text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white rounded transition-colors cursor-pointer"
          >
            Modifier
          </button>
          <button 
            data-id="${elm.id}" 
            class="btn-delete px-3 py-1.5 text-sm font-medium bg-red-600 hover:bg-red-500 text-white rounded transition-colors cursor-pointer"
          >
            Supprimer
          </button>
        </td>
      </tr>
    `,
    )
    .join("");

  //add contaner events

  tableBody.addEventListener("click", async (e) => {
    const deleteBtn = e.target.closest(".btn-delete");
    const editBtn = e.target.closest(".btn-edit");

    //delete clicked
    if (deleteBtn) {
      const id = deleteBtn.dataset.id;
      const show = shows.find((i) => i.id == id);
      if (!show) {
        return;
      }

      if (!confirm(`Supprimer le ${show.type} "${show.title}" ?`)) return;

      //call delete

      try {
        deleteShow(id);
        shows = await getAllShows();
        renderAdminTableRows(shows);
      } catch (error) {
        alert(`Erreur : ${error.message}`);
      }
    }

    //edit btn clicked
    if (editBtn) {
      const model = document.getElementById("modal");
      model.classList.remove('hidden')
    }
  });
}

async function loadShows() {
  showStatus("Chargement…", "text-gray-300 animate-pulse");
  try {
    let shows = await getAllShows();
    hideStatus();
    renderAdminTableRows(shows);
  } catch (error) {
    showStatus(
      `Impossible de charger les contenus : ${error}`,
      "text-red-400 bg-red-950/30 border border-red-800 rounded-lg p-4",
    );
  }
}

function showStatus(text, classes) {
  statusMessage.className = `text-center py-8 text-lg ${classes}`;
  statusMessage.textContent = text;
  statusMessage.classList.remove("hidden");
}

function hideStatus() {
  statusMessage.classList.add("hidden");
}
