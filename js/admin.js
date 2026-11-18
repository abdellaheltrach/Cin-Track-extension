import { getShows } from "./api.js";

const statusMessage = document.getElementById("status-message");
const tableContainer = document.getElementById("table-container");
const tableBody = document.getElementById("table-body");

// console.log(statusMessage)
// console.log(tableContainer);
// console.log(tableBody);

let shows = await getShows();
console.table(shows)
renderAdminTableRows();

function renderAdminTableRows() {
  if (!shows) {
    tableContainer.classList.add("hidden");
    showStatus("Aucun contenu disponible.", "text-gray-400");
    return;
  }

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
            class="btn-edit px-3 py-1.5 text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white rounded transition-colors cursor-pointer"
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
}
