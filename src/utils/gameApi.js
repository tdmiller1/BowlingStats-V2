import axios from "axios";
import Host from "../config";

import { Auth0Client } from "@auth0/auth0-spa-js";

const auth0 = new Auth0Client({
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
  client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  useRefreshTokens: true,
});

const httpClient = axios.create({
  baseURL: Host.url,
});

async function getToken() {
  const token = await auth0.getTokenSilently();
  localStorage.setItem("access_token", token);
  return token;
}

httpClient.interceptors.request.use(async function (config) {
  const token = localStorage.getItem("access_token");
  config.headers.Pragma = "no-cache";
  config.headers["Cache-Control"] = "no-cache";
  config.headers.Authorization = token
    ? `Bearer ${token}`
    : `Bearer ${await getToken()}`;
  return config;
});

export async function addGame(authId, gameScore, selectedDay) {
  const response = await httpClient
    .put("/games/add", {
      authId: authId,
      score: gameScore,
      date: selectedDay,
    })
    .catch((err) => console.error(err));
  if (!response)
    return { error: "Error, please refresh and try again", response: null };
  return { error: null, response: response };
}

export async function pullGames(authId, token) {
  const response = await httpClient
    .get(`/games/find?authId=${authId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => console.error(err));
  if (!response)
    return { error: "Error, please refresh and try again", response: null };
  return { error: null, response: response };
}

export async function deleteGame(authId, gameId, token) {
  const response = await httpClient
    .delete("/games", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        authId: authId,
        gameObjectID: gameId,
      },
    })
    .catch((err) => console.error(err));
  if (!response)
    return { error: "Error, please refresh and try again", response: null };
  return { error: null, response: response };
}

export async function getUserInfo(authId, token) {
  const response = await httpClient
    .get(`/players/find?authId=${authId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => console.error(err));
  if (!response)
    return { error: "Error, please refresh and try again", response: null };
  return { error: null, response: response };
}

export async function loginUser(authId, email, playerName, token) {
  const profile = {
    authId: authId,
    email: email,
    playerName: playerName,
  };
  const response = await httpClient
    .post("/players/login", profile, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => console.error(err));
  if (!response)
    return { error: "Error, please refresh and try again", response: null };
  return { error: null, response: response };
}

export async function getPlayerName(authId, token) {
  const response = await httpClient
    .get(`/players/find/name?authId=${authId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => console.error(err));
  if (!response)
    return { error: "Error, please refresh and try again", response: null };
  return { error: null, response: response };
}

export async function acceptFriendRequest(authId, friendAuthId, token) {
  const response = await httpClient
    .put(
      "/players/add/friend",
      {
        authId: authId,
        friendAuthId: friendAuthId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .catch((err) => console.error(err));
  if (!response)
    return { error: "Error, please refresh and try again", response: null };
  return { error: null, response: response };
}

export async function removeFriend(authId, friendAuthId, token) {
  const response = await httpClient
    .put(
      "/players/remove/friend",
      {
        authId,
        friendAuthId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .catch((err) => console.error(err));
  if (!response)
    return { error: "Error, please refresh and try again", response: null };
  return { error: null, response: response };
}

export async function removeNotification(authId, friendAuthId, data, token) {
  const response = await httpClient
    .put(
      "/notifications/removeNotification",
      {
        authId: authId,
        friendAuthId: friendAuthId,
        data: data,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .catch((err) => console.error(err));
  if (!response)
    return { error: "Error, please refresh and try again", response: null };
  return { error: null, response: response };
}

export async function getPublicPlayerData(authId, friendAuthId, token) {
  const response = await httpClient
    .get(
      `/players/find/publicData?authId=${authId}&friendAuthId=${friendAuthId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .catch((err) => console.error(err));
  if (!response)
    return { error: "Error, please refresh and try again", response: null };
  return { error: null, response: response };
}

export async function sendFriendRequest(authId, friendAuthId, data, token) {
  const response = await httpClient
    .put(
      `/notifications/friendRequest`,
      {
        authId: authId,
        friendAuthId: friendAuthId,
        data: data,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .catch((err) => console.error(err));
  if (!response)
    return { error: "Error, please refresh and try again", response: null };
  return { error: null, response: response };
}

export async function updatePlayerInfo(authId, playerData, token) {
  const response = await httpClient
    .put(
      `/players/update`,
      {
        authId: authId,
        ...playerData,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .catch((err) => console.error(err));
  if (!response)
    return { error: "Error, please refresh and try again", response: null };
  return { error: null, response: response };
}

export async function getSubmissions() {
  const response = await httpClient
    .get(`/admin/pendingReviews`)
    .catch((err) => console.error(err));
  if (!response)
    return { error: "Error, please refresh and try again", response: null };
  return { error: null, response: response };
}

export async function gradeSubmission(
  authId,
  submissionId,
  status,
  score,
  date
) {
  const response = await httpClient
    .put("/admin/grade", {
      authId,
      submissionId,
      status,
      score,
      date,
    })
    .catch((err) => console.error(err));
  if (!response)
    return { error: "Error, please refresh and try again", response: null };
  return { error: null, response: response };
}

export async function deleteSubmission(authId, submissionId) {
  const response = await httpClient
    .delete("/players/submission", {
      data: {
        authId,
        submissionId,
      },
    })
    .catch((err) => console.error(err));
  if (!response)
    return { error: "Error, please refresh and try again", response: null };
  return { error: null, response: response };
}

export async function submitReviewImage(
  authId,
  submissionId,
  imageUrl,
  date,
  score
) {
  const response = await httpClient
    .post("/admin/reviewImage", {
      authId,
      submissionId,
      imageUrl,
      date,
      score,
    })
    .catch((err) => console.error(err));
  if (!response)
    return { error: "Error, please refresh and try again", response: null };
  return { error: null, response: response };
}

export async function submitReviewState(
  authId,
  submissionId,
  date,
  statement,
  score
) {
  const response = await httpClient
    .post("/admin/reviewStatement", {
      authId,
      submissionId,
      date,
      statement,
      score,
    })
    .catch((err) => console.error(err));
  if (!response)
    return { error: "Error, please refresh and try again", response: null };
  return { error: null, response: response };
}
