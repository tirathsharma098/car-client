import API_LOCAL from "./api-local";
const hostname = window.location.hostname;
const port = window.location.port;
let isLocalApi = +port >= 3000;

export const API =
  hostname === "localhost" || isLocalApi ? API_LOCAL : API_LOCAL;
