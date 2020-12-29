import axios from 'axios';
import Host from '../config';

export default async function addGame(gameScore, selectedDay){
  const response = await axios.post(`${Host.url}/games/add`, {
    id: Host.email,
    score: gameScore,
    date: selectedDay
  }).catch(err => console.error(err));
  if(!response) return {error: "Error, please refresh and try again", response: null}
  return {error: null, response: response};
}
