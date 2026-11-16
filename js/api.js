import { handleFetchError } from "./ui.js";


const shows_Url = "https://6afaf050730c1d152f32ca6c.mockapi.io/api/v1/shows";





export async function loadData() {
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
