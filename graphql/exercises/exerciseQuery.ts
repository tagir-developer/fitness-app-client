import { gql } from '@apollo/client';

export const GET_ALL_EXERCISES = gql`
  query {
    getAllExercises {
      id
      name
    }
  }
`;
