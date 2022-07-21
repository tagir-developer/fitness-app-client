import { gql } from '@apollo/client';

export const CREATE_PROGRAM = gql`
  mutation createProgram($program: ProgramInput!) {
    createProgram(program: $program) {
      id
      name
    }
  }
`;

export const UPDATE_PROGRAM = gql`
  mutation updateProgram(
    $programId: String!
    $trainingDays: [TrainingDayInput!]!
  ) {
    updateProgram(programId: $programId, trainingDays: $trainingDays) {
      id
      name
    }
  }
`;

export const COPY_PROGRAM = gql`
  mutation copyProgram($programId: String!) {
    copyProgram(programId: $programId) {
      id
      name
      isUserProgram
      previewImage
    }
  }
`;

export const DELETE_PROGRAM = gql`
  mutation deleteProgram($programId: String!) {
    deleteProgram(programId: $programId)
  }
`;

export const CHANGE_USER_ACTIVE_PROGRAM = gql`
  mutation setActiveUserProgram($programId: String!) {
    setActiveUserProgram(programId: $programId)
  }
`;

export const RENAME_PROGRAM = gql`
  mutation changeProgramName($programId: String!, $name: String!) {
    changeProgramName(programId: $programId, name: $name) {
      id
      name
      isUserProgram
      previewImage
    }
  }
`;
