import { GET_SETTINGS } from "./GET_SETTINGS";
import { STATE_INSTANCE } from "./STATE_INSTANCE";
import { SEND_MESSAGE } from "./SEND_MESSAGE";
import { SEND_FILE_BY_URL } from "./SEND_FILE_BY_URL";
export function apiToGqlResolvers(apiMethod) {
  switch (apiMethod) {
    case "getSettings":
      return GET_SETTINGS;
    case "stateInstance":
      return STATE_INSTANCE;
    case "sendMessage":
      return SEND_MESSAGE;
    case "urlToFile":
      return SEND_FILE_BY_URL;
    default:
      return null;
  }
}
