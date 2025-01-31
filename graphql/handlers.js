const requestToApi = require('../lib/requestToApi')
const handlers = {
    async getSettings({ credentials }) {
      const { idInstance, apiKey } = JSON.parse(credentials);
  
      const response = await requestToApi(
        "get",
        "getSettings",
        idInstance.trim(),
        apiKey.trim()
      );
  
      return response;
    },
    async stateInstance({ credentials }) {
      const { idInstance, apiKey } = JSON.parse(credentials);
      const { response } = await requestToApi(
        "get",
        "getStateInstance",
        idInstance.trim(),
        apiKey.trim()
      );
  
      return { response };
    },
    async sendMessage({ credentials }) {
      const { idInstance, apiKey, phoneNumber, message } =
        JSON.parse(credentials);
      const initSendMessageHandler = await requestToApi(
        "post",
        "sendMessage",
        idInstance,
        apiKey
      );
      const response = await initSendMessageHandler(message, phoneNumber);
  
      // return sendMessageHandler
      return response;
    },
    async sendFileByUrl({ credentials }) {
      const { idInstance, apiKey, phoneNumber, urlToFile } =
        JSON.parse(credentials);
      const initSendFileByUrl = await requestToApi(
        "post",
        "sendFileByUrl",
        idInstance,
        apiKey
      );
      const response = await initSendFileByUrl(urlToFile, phoneNumber);
      return response;
    },
  };

module.exports = handlers