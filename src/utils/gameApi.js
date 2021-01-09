import axios from 'axios';
import Host from '../config';

export async function addGame(userId, gameScore, selectedDay, token){
  const response = await axios.post(`${Host.url}/games/add`,
  {
    id: userId,
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

export async function pullGames(userId, token){
  const response = await axios.get(`${Host.url}/games/find?id=${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).catch(err => console.error(err));
  if(!response) return {error: "Error, please refresh and try again", response: null}
  return {error: null, response: response};
}

export async function deleteGame(userId, gameId, token){
  const response = await axios.delete(`${Host.url}/games`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      id: gameId,
      playerId: Host.id,
    }
}).catch(err => console.error(err));
  if(!response) return {error: "Error, please refresh and try again", response: null}
  return {error: null, response: response};
}

export async function getUserInfo(userId, token){
  const response = await axios.get(`${Host.url}/users/find?id=${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).catch(err => console.error(err));
  if(!response) return {error: "Error, please refresh and try again", response: null}
  return {error: null, response: response};
}

export async function getPlayerName(playerId, token){
  const response = await axios.get(`${Host.url}/users/find/name?id=${playerId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).catch(err => console.error(err));
  if(!response) return {error: "Error, please refresh and try again", response: null}
  return {error: null, response: response};
}

export async function acceptFriendRequest(playerId, token){
  const response = await axios.put(`${Host.url}/users/update?friendRequestId=${playerId}&id=${Host.id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).catch(err => console.error(err));
  if(!response) return {error: "Error, please refresh and try again", response: null}
  return {error: null, response: response};
}

export async function denyFriendRequest(playerId, token){
  const response = await axios.put(`${Host.url}/users/?id=${playerId}`).catch(err => console.error(err));
  if(!response) return {error: "Error, please refresh and try again", response: null}
  return {error: null, response: response};
}
