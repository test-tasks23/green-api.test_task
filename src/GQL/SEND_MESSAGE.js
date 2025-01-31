import { gql } from "@apollo/client";

export const SEND_MESSAGE = gql`
    query SendMessage($credentials: String!) {
    sendMessage(credentials: $credentials) {
        response
    }
}
`
