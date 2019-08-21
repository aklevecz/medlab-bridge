import config from "config";
import { authHeader, handleResponse } from "@/_helpers";
import { authenticationService } from "./authentication.service";

export const toadService = {
  createToad,
  getYours
};

function getYours() {
  const requestOptions = { method: "GET", headers: authHeader() };
  return fetch(`${config.apiUrl}/toad/yours`, requestOptions).then(
    handleResponse
  );
}
function createToad(cat) {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authenticationService.currentUserValue.token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ cat })
  };
  console.log(authenticationService.currentUserValue.token);
  return fetch(`${process.env.MEDENG_URL}/toad/create-toad`, requestOptions)
    .then(handleResponse)
    .then(toad => toad);
}
