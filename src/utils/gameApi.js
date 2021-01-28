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

export async function loginUser(authId, email, playerName, token){
  const profile = {
    authId: authId,
    email: email,
    playerName: playerName
  }
  const response = await axios.post(`${Host.url}/players/login`, profile,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    }
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

export async function acceptFriendRequest(authId, friendAuthId, token){
  const response = await axios.put(`${Host.url}/players/add/friend`,
  {
    authId: authId,
    friendAuthId: friendAuthId,
  },
  {
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

export async function removeNotification(authId, friendAuthId, data, token){
  const response = await axios.put(`${Host.url}/notifications/acceptRequest`,
  {
    authId: authId,
    friendAuthId: friendAuthId,
    data: data,
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).catch(err => console.error(err));
  if(!response) return {error: "Error, please refresh and try again", response: null}
  return {error: null, response: response};
}

export async function getPublicPlayerData(authId, token){
  const response = await axios.get(`${Host.url}/players/find/publicData?authId=${authId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).catch(err => console.error(err));
  if(!response) return {error: "Error, please refresh and try again", response: null}
  return {error: null, response: response};
}

export async function sendFriendRequest(authId, friendAuthId, data, token){
  const response = await axios.put(`${Host.url}/notifications/friendRequest`,
  {
    authId: authId,
    friendAuthId: friendAuthId,
    data: data,
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).catch(err => console.error(err));
  if(!response) return {error: "Error, please refresh and try again", response: null}
  return {error: null, response: response};
}