export interface IUser {
  last_login: string;
  username: string;
  email: string;
  date_joined: string;
  avatar: string;
  name: string;
  is_host: boolean;
  gender: string;
  language: string;
  currency: string;
}

export interface IUsernameLoginVariables {
  username: string;
  password: string;
}
export interface IUsernameLoginSuccess {
  ok: string;
}
export interface IUsernameLoginError {
  error: string;
}
export interface IForm {
  username: string;
  password: string;
}

export interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface IUploadAudioVariables {
  file: FileList;
  title: string;
}

interface IForm {
  file: FileList;
  title: string;
  myWords: string;
}

interface IScriptInfo {
  origin_script: string;
  modified_script: string;
  charecters: Array<ICharecter>;
  audio_pk: number;
  audio_src: string;
}

interface ICharecter {
  start_time: string;
  end_time: string;
  alternatives: Array<IAlternative>;
  type: string;
}

interface IAlternative {
  confidence: string;
  content: string;
}

interface ICardScript {
  title: string;
  modified_script: string;
}

interface IAudio {
  script_title: string;
  origin_script: string;
  modified_script: string;
}

interface IUserData {
  username: string;
  email: string;
  using_gpt_token: boolean;
  rem_gpt_token: boolean;
  audios: IAudio[];
}
