const constructorUrl = (
  apiMethod,
  instanceId,
  apiKey,
  transportProtocol = "https",
  host = "1103.api.green-api.com"
) => {
  const url = `${transportProtocol}://${host}/waInstance${instanceId}/${apiMethod}/${apiKey}`;
  return url;
};

module.exports = constructorUrl