import Cookie from "js-cookie";
import axios from "axios";
import {
  IUpdateScript,
  IUploadAudioVariables,
  IUsernameLoginVariables,
} from "./types";

const instance = axios.create({
  baseURL: `http://ecs-lb-1023174556.ap-northeast-2.elb.amazonaws.com/api/v1/`,
  withCredentials: true,
});

export const getMe = () =>
  instance.get(`users/`).then((response) => response.data);

export const getMyScripts = () =>
  instance.get(`users/me`).then((response) => response.data);

export const logOut = () =>
  instance
    .post(`users/logout`, null, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export const kakaoLogin = (code: string) =>
  instance
    .post(
      `users/kakao`,
      { code },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.status);

export const usernameLogIn = ({
  username,
  password,
}: IUsernameLoginVariables) =>
  instance.post(
    `/users/login`,
    { username, password },
    {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    }
  );

export const uploadAudio = ({ file, title }: IUploadAudioVariables) => {
  const form = new FormData();
  form.append("file", file[0]);
  form.append("title", title);

  return instance
    .post(`scripts/create`, form, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data);
};

export const updateScript = ({ charecters, audioPk }: IUpdateScript) => {
  const jsonCharecters = JSON.stringify(charecters);
  const form = new FormData();
  form.append("charecters", jsonCharecters);
  form.append("audioPk", String(audioPk));

  return instance
    .put(`scripts/create`, form, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data);
};
