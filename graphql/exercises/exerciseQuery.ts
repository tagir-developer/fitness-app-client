import { gql } from '@apollo/client';

export const GET_ALL_EXERCISES = gql`
  query getAllExercises($searchText: String!) {
    getAllExercises(searchText: $searchText) {
      id
      name
      previewImage
      muscles {
        name
        workLevel {
          muscleWorkLevel
        }
      }
    }
  }
`;

export const GET_MUSCLE_GROUP_EXERCISES = gql`
  query getExercisesByMuscleGroupId(
    $muscleGroupId: String!
    $searchText: String!
  ) {
    getExercisesByMuscleGroupId(
      muscleGroupId: $muscleGroupId
      searchText: $searchText
    ) {
      id
      name
      previewImage
      muscles {
        name
        workLevel {
          muscleWorkLevel
        }
      }
    }
  }
`;

export const GET_EXERCISE_DETAIL_DATA = gql`
  query getExerciseData($exerciseId: String!) {
    getExerciseData(exerciseId: $exerciseId) {
      id
      name
      descriptionImages
      description {
        title
        subTitle
        text
      }
      similarExercises {
        id
        name
        previewImage
      }
      muscles {
        id
        name
        previewImage
        workLevel {
          muscleWorkLevel
        }
      }
    }
  }
`;
