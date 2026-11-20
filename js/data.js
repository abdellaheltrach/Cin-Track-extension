import { handleFetchError } from "./ui.js";


const key = "favos";


export function loadFavorites() {
  let stringData = localStorage.getItem(key);

  try{
    if(!stringData)
    {
      localStorage.setItem(key, JSON.stringify([]))
      return [];
    }
    else
    {
      return JSON.parse(stringData);
    }
  } catch (error) {
      
    return [];
     }
  
  
}
export function saveFavorites(newFav) {
  localStorage.setItem(key, JSON.stringify(newFav));
}
