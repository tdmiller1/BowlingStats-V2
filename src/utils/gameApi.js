import axios from 'axios';
import Host from '../config';

export async function addGame(authId, gameScore, selectedDay, token){
  const response = await axios.put(`${Host.url}/games/add`,
  {
    authId: authId,
    score: gameScore,
    date: selectedDay
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).catch(err => console.error(err));
  if(!response) return {error: "Error, please refresh and try again", response: null}
  return {error: null, response: response};
}

export async function pullGames(authId, token){
  const response = await axios.get(`${Host.url}/games/find?authId=${authId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).catch(err => console.error(err));
  if(!response) return {error: "Error, please refresh and try again", response: null}
  return {error: null, response: response};
}

export async function deleteGame(authId, gameId, token){
  const response = await axios.delete(`${Host.url}/games`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      authId: authId,
      gameObjectID: gameId,
    }
}).catch(err => console.error(err));
  if(!response) return {error: "Error, please refresh and try again", response: null}
  return {error: null, response: response};
}

export async function getUserInfo(authId, token){
  const response = await axios.get(`${Host.url}/players/find?authId=${authId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).catch(err => console.error(err));
  if(!response) return {error: "Error, please refresh and try again", response: null}
  return {error: null, response: response};
}

export async function getPlayerName(authId, token){
  const response = await axios.get(`${Host.url}/players/find/name?authId=${authId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).catch(err => console.error(err));
  if(!response) return {error: "Error, please refresh and try again", response: null}
  return {error: null, response: response};
}

export async function acceptFriendRequest(authId, token){
  const response = await axios.put(`${Host.url}/players/update?friendRequestId=${authId}&id=${Host.id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).catch(err => console.error(err));
  if(!response) return {error: "Error, please refresh and try again", response: null}
  return {error: null, response: response};
}

export async function denyFriendRequest(authId, token){
  const response = await axios.put(`${Host.url}/players/?authId=${authId}`).catch(err => console.error(err));
  if(!response) return {error: "Error, please refresh and try again", response: null}
  return {error: null, response: response};
}
