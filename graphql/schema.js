const { buildSchema } = require("graphql");

const schema = buildSchema(`
    type Response {
        response: String
    }

    type Query {
        getSettings(credentials: String!): Response
        stateInstance(credentials: String!): Response
        sendMessage(credentials: String!): Response
        sendFileByUrl(credentials: String!): Response
    }
    


`);

module.exports = schema