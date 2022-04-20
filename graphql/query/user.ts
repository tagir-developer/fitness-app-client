import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
  query {
    getAllUsers {
      id
      userName
      email
    }
  }
`;

export const GET_USER_BY_EMAIL = gql`
  query getUser($email: String!) {
    getUser(email: $email) {
      id
      email
      userName
    }
  }
`;
