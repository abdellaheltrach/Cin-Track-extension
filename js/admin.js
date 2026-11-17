import { getShows } from "./api.js";


let shows = await getShows();
console.table(shows)