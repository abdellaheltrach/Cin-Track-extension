export function validateForm() {
  clearError();

  const showTitleInput = document.getElementById("show-title");
  const showDescriptionInput = document.getElementById("show-description");
  const showTypeInput = document.getElementById("show-type");
  const showYearInput = document.getElementById("show-year");
  const showImgInput = document.getElementById("show-img");
  const showGenresInput = document.getElementById("show-genres");
  const showDirectorsInput = document.getElementById("show-directors");
  const showCountriesInput = document.getElementById("show-countries");

  const title = showTitleInput.value.trim();
  const description = showDescriptionInput.value.trim();
  const type = showTypeInput.value;
  const yearRaw = showYearInput.value.trim();
  const releaseYear = Number(yearRaw);
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

  if (
    !title ||
    !description ||
    !type ||
    !releaseYear ||
    !image ||
    genres.length === 0 ||
    directors=== 0 ||
    productionCountries.length === 0
  ) {
    showError("tout les champs sont obligatoire");
    return false;
  }
}

function clearError() {
  const errorHTML = document.getElementById("form-error");

  if (!errorHTML) {
    return;
  }

  errorHTML.textContent = "";
  errorHTML.classList.add("hidden");
}

function showError(message) {
  const errorHTML = document.getElementById("form-error");

  if (!errorHTML) {
    return;
  }
  errorHTML.textContent = message;
  errorHTML.classList.remove("hidden");
}
