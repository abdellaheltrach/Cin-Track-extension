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

  //validate empty fields

  if (
    !title ||
    !description ||
    !type ||
    !releaseYear ||
    !image ||
    genres.length === 0 ||
    directors.length === 0 ||
    productionCountries.length === 0
  ) {
    showError("tout les champs sont obligatoire");
    return false;
  }

  //verify the year
  const currantYear = new Date().getFullYear();
  if (
    Number.isNaN(releaseYear) ||
    releaseYear < 1900 ||
    releaseYear > currantYear
  ) {
    showError(`L'année doit être comprise entre 1900 et ${currantYear}.`);
    return false;
  }

  //verify url
  const regix = /^https?:\/\/[^\s/$.?#].[^\s]*$/i;
  if (!regix.test(image)) {
    showError(`incorrect img URL.`);
    return false;
  }

  //verify the duration and seasns
  if (type === "movie") {
    const durationInput = document.getElementById("show-duration");
    const duration = Number(durationInput.value);
    if (!durationInput?.value || Number.isNaN(duration) || duration <= 0) {
      showError("La durée du film doit être supérieure à 0 minute.");
      return false;
    }
  } else if (type === "series") {
    const seasonsInput = document.getElementById("show-seasons");
    const seasonsCount = Number(seasonsInput?.value);
    if (
      !seasonsInput.value ||
      Number.isNaN(seasonsCount) ||
      seasonsCount < 1
    ) {
      showError("Le nombre de saisons doit être au moins 1.");
      return false;
    }
  }

  return true;
}

export function clearError() {
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
