import { gql } from '@apollo/client';

export const REGISTER_NEW_USER = gql`
  mutation register($user: UserInput!) {
    register(user: $user) {
      accessToken
      refreshToken
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
      user {
        id
        email
      }
    }
  }
`;

export const REFRESH_USER_TOKEN = gql`
  mutation refresh($refreshToken: String!) {
    refresh(refreshToken: $refreshToken) {
      accessToken
      refreshToken
    }
  }
`;

export const RESET_USER_PASSWORD = gql`
  mutation reset($email: String!) {
    reset(email: $email) {
      message
    }
  }
`;

export const CHANGE_USER_PASSWORD = gql`
  mutation changePassword($data: ChangePasswordInput!) {
    changePassword(data: $data) {
      message
    }
  }
`;
