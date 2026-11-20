import { handleFetchError } from "./ui.js";

const shows_Url = "https://6afaf050730c1d152f32ca6c.mockapi.io/api/v1/shows";

export async function getComments(showId) {
  const comments_url = shows_Url + `/${showId}/comments`;

    let response = await fetch(comments_url);

    if (!response.ok) {
      throw new Error("error loading the data");
    }
    let data = await response.json();
    return data;
  
}

export async function addComments(showId, author, comment) {
  let response = await fetch(shows_Url + `/${showId}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      author,
      comment,
      showId: String(showId),
      date: new Date().toLocaleDateString("fr-FR"),
    }),
  });

  if (!response.ok) {
    throw new Error("error loading the data");
  }
  let data = await response.json();
  return data;
}

export async function getShows() {
  try {
    let response = await fetch(shows_Url);

    if (!response.ok) {
      throw new Error("error loading the data");
    }
    let data = await response.json();
    return data;
  } catch (error) {
    handleFetchError();
  }
}

export async function getAllShows() {
  let response = await fetch(shows_Url);

  if (!response.ok) {
    throw new Error("error loading the data");
  }
  let data = await response.json();
  return data;
}

export async function getShowById(id) {
  try {
    let response = await fetch(shows_Url + "/" + { id });

    if (!response.ok) {
      throw new Error("error loading the data");
    }
    let data = await response.json();
    return data;
  } catch (error) {
    console.log("error loading the data from the api");
  }
}

export async function addShow(newShow) {
  let response = await fetch(shows_Url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newShow),
  });

  if (!response.ok) {
    throw new Error("error loading the data");
  }
  let data = await response.json();
  return data;
}

export async function updateShow(showData, id) {
  try {
    let response = await fetch(`${shows_Url}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(showData),
    });

    if (!response.ok) {
      throw new Error("Error updating the data");
    }
    let data = await response.json();
    return data;
  } catch (error) {
    console.log("Error updating show: ", error);
  }
}

export async function deleteShow(id) {
  let response = await fetch(`${shows_Url}/${id}`, { method: "DELETE" });

  if (!response.ok) {
    throw new Error("Error delete the data");
  }
  let data = await response.json();
  return data;
}
