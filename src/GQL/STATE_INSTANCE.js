import { gql } from "@apollo/client";

export const STATE_INSTANCE = gql`
    query StateInstance($credentials: String!) {
    stateInstance(credentials: $credentials) {
        response
    }
}`