import http from "../http-common";

export const authLogin = (auth) => {
  return http.post("/singIn", auth);
};

export const authSingUp = (auth) => {
  return http.post("/singUp", auth);
};
