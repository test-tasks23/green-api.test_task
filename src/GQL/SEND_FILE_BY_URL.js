import { gql } from "@apollo/client";

export const SEND_FILE_BY_URL = gql`
    query SendFileByUrl($credentials: String!) {
    sendFileByUrl(credentials:$credentials) {
        response
    }
}
`