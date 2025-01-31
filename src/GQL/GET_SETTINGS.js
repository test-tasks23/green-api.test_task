import { gql } from "@apollo/client";

export const GET_SETTINGS = gql`
    query GetSettings($credentials: String!) {
    getSettings(credentials:$credentials) {
        response
    }
}
`