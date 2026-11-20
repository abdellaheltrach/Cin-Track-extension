import { addShow, deleteShow, getAllShows, updateShow } from "./api.js";
import { clearError, validateForm } from "./validation.js";

const statusMessage = document.getElementById("status-message");
const tableContainer = document.getElementById("table-container");
const tableBody = document.getElementById("table-body");
const formModel = document.getElementById("formModel");



let modelCancelBtn = document.getElementById("btn-cancel");
let addbtn = document.getElementById("add-btn");

//events
formModel.addEventListener("submit", handleSubmit);
addbtn.addEventListener("click", openModelForAdding);
modelCancelBtn.addEventListener("click", closeModel);

const showTypeInput = document.getElementById("show-type");
const contenuDetails = document.getElementById("contenu-details");
showTypeInput.addEventListener("change", (e) => {
  renderTypeDetails(e.target.value);
});

loadShows();

function renderAdminTableRows(shows) {
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
        showFeedback(error.message, failed);
      }
    }

    //edit btn clicked
    if (editBtn) {
      const id = editBtn.dataset.id;
      const show = shows.find((i) => i.id == id);

      //show model
      const model = document.getElementById("modal");
      model.classList.remove("hidden");
      //edite title
      const modelTitle = document.getElementById("modal-title");
      modelTitle.textContent = "modifier un contenu";
      //edite submit botton
      const submitbtn = document.getElementById("btn-submit");
      submitbtn.textContent = "Modifier";

      submitbtn.dataset.id = show.id;


      const contenuDetails = document.getElementById("contenu-details");

      contenuDetails.innerHTML =
        show.type === "movie"
          ? `   <label for="show-duration" class="block text-sm text-gray-300 mb-1">Durée (min) *</label>
          <input type="number" min="10" name="" id="show-duration"
            class="w-full px-3 py-2 rounded-lg bg-[#121214] border border-[#35353d] text-white" placeholder="120">`
          : `<div>
          <label for="show-seasons" class="block text-sm text-gray-300 mb-1">Nombre de saisons *</label>
          <input type="number" id="show-seasons" min="1"
            class="w-full px-3 py-2 rounded-lg bg-[#121214] border border-[#35353d] text-white" placeholder="1">
        </div>`;

      //fill textboxes
      const showTitleInput = document.getElementById("show-title");
      const showDescriptionInput = document.getElementById("show-description");
      const showTypeInput = document.getElementById("show-type");
      const showYearInput = document.getElementById("show-year");
      const showImgInput = document.getElementById("show-img");
      const showGenresInput = document.getElementById("show-genres");
      const showDirectorsInput = document.getElementById("show-directors");
      const showCountriesInput = document.getElementById("show-countries");

      showTitleInput.value = show.title;
      showDescriptionInput.value = show.description ?? "";
      showTypeInput.value = show.type;
      showYearInput.value = show.releaseYear;
      showImgInput.value = show.image;

      if (show.type === "movie") {
        const showDurationInput = document.getElementById("show-duration");
        showDurationInput.value = show.duration;
      } else {
        const showSeasonsInput = document.getElementById("show-seasons");
        showSeasonsInput.value = show.seasons.length;
      }

      //disactivate it
      // showTypeInput.disabled = true;

      showGenresInput.value = show.genres.join(", ");

      showDirectorsInput.value = show.directors.join(", ");
      showCountriesInput.value = show.productionCountries.join(", ");
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

async function handleSubmit(e) {
  e.preventDefault();

  if(!validateForm()){
    return;
  }

  // element
  const showTitleInput = document.getElementById("show-title");
  const showDescriptionInput = document.getElementById("show-description");
  const showTypeInput = document.getElementById("show-type");
  const showYearInput = document.getElementById("show-year");
  const showImgInput = document.getElementById("show-img");
  const showGenresInput = document.getElementById("show-genres");
  const showDirectorsInput = document.getElementById("show-directors");
  const showCountriesInput = document.getElementById("show-countries");

  // values
  const title = showTitleInput.value.trim();
  const description = showDescriptionInput.value.trim();
  const type = showTypeInput.value;
  const releaseYear = Number(showYearInput.value);
  const image = showImgInput.value.trim();
  const genres = showGenresInput.value
    .split(",")
    .map((g) => g.trim())
    .filter(Boolean);
  const directors = showDirectorsInput.value
    .split(",")
    .map((d) => d.trim())
    .filter(Boolean);
  const productionCountries = showCountriesInput.value
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean);

  const submitbtn = document.getElementById("btn-submit");
  const id = submitbtn.dataset.id;
  let shows = await getAllShows();

  if (id) {
    // handle update
    const existing = shows.find((i) => String(i.id) === String(id));
    let updated;

    if (type === "movie") {
      const showDurationInput = document.getElementById("show-duration");
      updated = {
        ...existing,
        title,
        description,
        type,
        releaseYear,
        image,
        genres,
        directors,
        productionCountries,
        duration: Number(showDurationInput.value),
      };
      delete updated.seasons;
    } else {
      const showSeasonsInput = document.getElementById("show-seasons");
      const count = Number(showSeasonsInput.value);
      updated = {
        ...existing,
        title,
        description,
        type,
        releaseYear,
        image,
        genres,
        directors,
        productionCountries,
        seasons: createSeasonsArray(count),
      };
      delete updated.duration;
    }

    try {
      const saved = await updateShow(updated, id);
      shows = shows.map((i) => (String(i.id) === String(id) ? saved : i));
      renderAdminTableRows(shows);
      showFeedback(`« ${saved.title} » a bien été modifié.`, "success");
      closeModel();
    } catch (error) {
      showFeedback(error.message, "error");
    }
  } else {
    // handle adding
    let newShow;

    if (type === "movie") {
      const showDurationInput = document.getElementById("show-duration");
      newShow = {
        title,
        description,
        type,
        releaseYear,
        image,
        genres,
        directors,
        productionCountries,
        duration: Number(showDurationInput.value),
      };
    } else {
      const showSeasonsInput = document.getElementById("show-seasons");
      const count = Number(showSeasonsInput.value);
      newShow = {
        title,
        description,
        type,
        releaseYear,
        image,
        genres,
        directors,
        productionCountries,
        seasons: createSeasonsArray(count),
      };
    }

    try {
      const created = await addShow(newShow);
      shows = [...shows, created];
      renderAdminTableRows(shows);
      showFeedback(`« ${created.title} » a bien été ajouté.`, "success");
      closeModel();
    } catch (error) {
      showFeedback(error.message, "error");
    }
  }
}

function createSeasonsArray(count) {
  const seasons = [];
  for (let i = 1; i <= count; i++) {
    seasons.push(i);
  }
  return seasons;
}

function closeModel() {
  const modal = document.getElementById("modal");
  const form = document.getElementById("formModel");
  const submitbtn = document.getElementById("btn-submit");

  modal.classList.add("hidden");
  form.reset();

  submitbtn.dataset.id = "";
  submitbtn.textContent = "Enregistrer";
  clearError();
}

function openModelForAdding() {
  const modal = document.getElementById("modal");
  const form = document.getElementById("formModel");
  const submitbtn = document.getElementById("btn-submit");

  form.reset();
  modal.classList.remove("hidden");

  submitbtn.dataset.id = "";
  submitbtn.textContent = "ajouter";

  clearError();
}

function showFeedback(message, type = "success") {
  const banner = document.getElementById("feedback-banner");
  banner.textContent = message;
  banner.className =
    type === "success"
      ? "mb-6 px-4 py-3 rounded-lg text-sm border bg-emerald-950/60 border-emerald-700 text-emerald-300"
      : "mb-6 px-4 py-3 rounded-lg text-sm border bg-red-950/60 border-red-700 text-red-300";
}

function renderTypeDetails(type) {
  contenuDetails.innerHTML =
    type === "movie"
      ? `<label for="show-duration" class="block text-sm text-gray-300 mb-1">Durée (min) *</label>
         <input type="number" min="10" name="" id="show-duration"
           class="w-full px-3 py-2 rounded-lg bg-[#121214] border border-[#35353d] text-white" placeholder="120">`
      : `<div>
           <label for="show-seasons" class="block text-sm text-gray-300 mb-1">Nombre de saisons *</label>
           <input type="number" id="show-seasons" min="1"
             class="w-full px-3 py-2 rounded-lg bg-[#121214] border border-[#35353d] text-white" placeholder="1">
         </div>`;
}