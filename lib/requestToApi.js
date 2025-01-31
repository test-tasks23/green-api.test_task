const constructorUrl = require('./constructorUrl')
const axios = require("axios");

const requestToApi = async (
  httpMethod = "get",
  apiMethod,
  instanceId,
  apiKey
) => {
  try {
    if (httpMethod === "get") {
      const url = constructorUrl(apiMethod, instanceId, apiKey);
      const { data } = await axios[httpMethod](url);

      return { response: JSON.stringify(data), status: !!data };
    }
    if (httpMethod === "post") {
      return async (message = null, chatId) => {
        try {
          const fileName =
            apiMethod !== "sendMessage" ? message.split("/") : null;
          const payload =
            apiMethod === "sendMessage"
              ? { message, chatId: `${chatId}@c.us` }
              : {
                  chatId: `${chatId}@c.us`,
                  urlFile: message,
                  fileName: fileName[fileName.length - 1],
                };
          const url = constructorUrl(apiMethod, instanceId, apiKey);
          console.log(payload, chatId, message);
          const { data } = await axios[httpMethod](
            url,
            JSON.stringify(payload)
          );
          return { response: JSON.stringify(data), status: !!data };
        } catch (err) {
          return { response: JSON.stringify(err.message), status: !err };
        }
      };
    }
  } catch (err) {
    return { response: err.message, status: !err };
  }
};

module.exports = requestToApi