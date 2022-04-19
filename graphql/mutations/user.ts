import { gql } from '@apollo/client';

export const REGISTER_NEW_USER = gql`
  mutation register($user: UserInput!) {
    register(user: $user) {
      accessToken
      refreshToken
      status
      user {
        id
        email
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($user: UserInput!) {
    login(user: $user) {
      accessToken
      refreshToken
      status
      user {
        id
        email
      }
    }
  }
`;
