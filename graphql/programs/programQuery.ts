import { gql } from '@apollo/client';

export const GET_ALL_USER_PROGRAMS = gql`
  query {
    getAllUserPrograms {
      id
      name
      isUserProgram
      previewImage
    }
  }
`;

export const GET_PROGRAM_BY_ID = gql`
  query getProgramById($programId: String!) {
    getProgramById(programId: $programId) {
      id
      name
      description
      isUserProgram
      previewImage
      days {
        id
        name
        exercises {
          id
          name
          exerciseId
          muscleGroups
        }
      }
    }
  }
`;
