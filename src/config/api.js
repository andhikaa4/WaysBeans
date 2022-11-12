import axios from "axios";

export const API = axios.create({
  baseURL: "https://chubby-bikes-cough-182-253-250-106.loca.lt/api/v1/",
});

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.commin["Authorization"];
  }
};