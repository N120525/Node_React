import { devKeys } from "./dev";
import { prodKeys } from "./prod";

export interface Keys {
  appId: string,
  key: string,
  secret: string,
  cluster: string,
  encrypted: boolean,
  googleClientId:string,
  API_KEY:string,
  CHAT_ID:string
}

export const keys = (): Keys => {
  if (process.env.NODE_ENV === "production") {
    return prodKeys;
  } else {
    return devKeys;
  }
};
