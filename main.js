const express = require('express')
const cors = require("cors");
const { createHandler } = require("graphql-http/lib/use/express");
const { buildSchema } = require("graphql");
const axios = require('axios')

const schema = buildSchema(`

    type SettingsResponse {
    settings: String
    status: Boolean
    
    }

    type StateResponse {
    stateInstance: String
    }
    type ResponseSendMessage {
    response: String
    status: Boolean
    }

    
    getSettings(instanceId: String!, apiKey: String!): SettingsResponse
    stateInstance(instanceId: String!, apiKey: String!): StateResponse
    
    sendMessage(chatId:String!, message:String!, instanceId: String!, apiKey: String!): ResponseSendMessage
    sendFileByUrl(chatId: String!, urlToFile: String!, instanceId: String!, apiKey: String!): ResponseSendMessage



`)
const constructorUrl = ( apiMethod, instanceId, apiKey,transportProtocol='https', host='1103.api.green-api.com') =>  {
    const url = `${transportProtocol}://${host}/${instanceId}/${apiMethod}/${apiKey}`
    return url
}
const requestToApi = async (httpMethod='get', apiMethod, instanceId, apiKey) => {
    try {
        if(httpMethod === 'get') {
            const url = constructorUrl(apiMethod,instanceId, apiKey )
            const {data} = await axios[httpMethod](url)
    
            return {response: JSON.stringify(data) , status: !!data}
        }
       if(httpMethod === 'post') {
            return async (chatId, message=null) => {
                try {
                    const fileName = apiMethod !== 'sendMessage' ? message.split('/') : null
                    const payload =  apiMethod === 'sendMessage'
                    ? {message, chatId: `${chatId}@c.us`} 
                    : { chatId: `${chatId}@c.us`,urlFile:message, fileName: fileName[fileName.length - 1] }
                    const url = constructorUrl(apiMethod,instanceId, apiKey)
                    const {data} = await axios[httpMethod](url,JSON.stringify(payload))
                    return {response: JSON.stringify(data), status: !!data}
                } catch(err) {
                    return { response:JSON.stringify( err.message ), status: !err }
                }
                
            }
        }
        
    } catch( err ) {
        return { response: err.message, status: !err }
    }
}

const handlers = {

    async getSettings({instanceId, apiKey}) {
       const response = await requestToApi('get', 'getSettings', instanceId, apiKey)
       return response

    },
    async stateInstance({instanceId, apiKey}) {
        const response = await requestToApi('get', 'getStateInstance', instanceId, apiKey)
        return response
    },
    async sendMessage({chatId, message, instanceId, apiKey}) {
        const initSendMessageHandler = await requestToApi('post','sendMessage',instanceId, apiKey)
        const sendMessageHandler = await initSendMessageHandler(message, chatId)
        return sendMessageHandler

    },
    async sendFileByUrl({chatId, urlToFile, instanceId, apiKey}) {
        const initSendFileByUrl = await requestToApi('post','sendFileByUrl',instanceId, apiKey)
        const sendFileByUrlHandler = await initSendFileByUrl( chatId,urlToFile )
        return sendFileByUrlHandler
    }
}



const app = express()
// app.use(express.static(path.join(__dirname, 'view')));
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'view', 'index.html'));
// });
app.use(cors())
app.get('/test', (req,res) => res.status(200).send('ok'))
app.all(
    "/graphql",
    createHandler({schema,rootValue: handlers})
)

app.listen(8080, () => console.log('Сервер запущен'))