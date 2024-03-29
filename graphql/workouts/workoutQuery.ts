import { gql } from '@apollo/client';

export const GET_ALL_USER_PROGRAMS = gql`
  query {
    getAllUserPrograms {
      id
      name
      isUserProgram
      isUserActiveProgram
      previewImage
    }
  }
`;

// export const GET_PROGRAM_BY_ID = gql`
//   query getProgramById($programId: String!) {
//     getProgramById(programId: $programId) {
//       id
//       name
//       days {
//         id
//         name
//         exercises {
//           id
//           name
//           exerciseId
//           muscleGroups
//         }
//       }
//     }
//   }
// `;

// export const GET_PROGRAM_DESCRIPTION_BY_ID = gql`
//   query getProgramById($programId: String!) {
//     getProgramById(programId: $programId) {
//       id
//       name
//       descriptionImages
//       description {
//         title
//         subTitle
//         text
//       }
//     }
//   }
// `;
