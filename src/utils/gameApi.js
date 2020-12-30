import axios from 'axios';
import Host from '../config';

export async function addGame(gameScore, selectedDay){
  const response = await axios.post(`${Host.url}/games/add`, {
    id: Host.email,
    score: gameScore,
    date: selectedDay
  }).catch(err => console.error(err));
  if(!response) return {error: "Error, please refresh and try again", response: null}
  return {error: null, response: response};
}

export async function pullGames(){
  const response = await axios.get(`${Host.url}/games/find?id=${Host.email}`).catch(err => console.error(err));
  if(!response) return {error: "Error, please refresh and try again", response: null}
  return {error: null, response: response};
}

export async function deleteGame(gameId){
  const response = await axios.delete(`${Host.url}/games`,{
    data: {
      id: gameId,
      playerId: Host.email,
    }
}).catch(err => console.error(err));
  if(!response) return {error: "Error, please refresh and try again", response: null}
  return {error: null, response: response};
}
