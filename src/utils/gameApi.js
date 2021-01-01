import axios from 'axios';
import Host from '../config';

export async function addGame(gameScore, selectedDay){
  const response = await axios.post(`${Host.url}/games/add`, {
    id: Host.id,
    score: gameScore,
    date: selectedDay
  }).catch(err => console.error(err));
  if(!response) return {error: "Error, please refresh and try again", response: null}
  return {error: null, response: response};
}

export async function pullGames(){
  const response = await axios.get(`${Host.url}/games/find?id=${Host.id}`).catch(err => console.error(err));
  if(!response) return {error: "Error, please refresh and try again", response: null}
  return {error: null, response: response};
}

export async function deleteGame(gameId){
  const response = await axios.delete(`${Host.url}/games`,{
    data: {
      id: gameId,
      playerId: Host.id,
    }
}).catch(err => console.error(err));
  if(!response) return {error: "Error, please refresh and try again", response: null}
  return {error: null, response: response};
}

export async function getUserInfo(){
  const response = await axios.get(`${Host.url}/users/find?id=${Host.id}`).catch(err => console.error(err));
  if(!response) return {error: "Error, please refresh and try again", response: null}
  return {error: null, response: response};
}

export async function getPlayerName(playerId){
  const response = await axios.get(`${Host.url}/users/find/name?id=${playerId}`).catch(err => console.error(err));
  if(!response) return {error: "Error, please refresh and try again", response: null}
  return {error: null, response: response};
}

export async function acceptFriendRequest(playerId){
  const response = await axios.put(`${Host.url}/users/update?friendRequestId=${playerId}&id=${Host.id}`).catch(err => console.error(err));
  if(!response) return {error: "Error, please refresh and try again", response: null}
  return {error: null, response: response};
}

export async function denyFriendRequest(playerId){
  const response = await axios.put(`${Host.url}/users/?id=${playerId}`).catch(err => console.error(err));
  if(!response) return {error: "Error, please refresh and try again", response: null}
  return {error: null, response: response};
}
