import { gql } from '@apollo/client';

export const GET_MUSCLE_GROUPS = gql`
  query {
    getMuscleGroups {
      id
      name
      previewImage
    }
  }
`;

export const GET_ALL_MUSCLES = gql`
  query getAllMuscles($searchText: String!) {
    getAllMuscles(searchText: $searchText) {
      id
      name
      previewImage
    }
  }
`;

export const GET_MUSCLE_GROUP_MUSCLES = gql`
  query getMusclesByMuscleGroupId(
    $muscleGroupId: String!
    $searchText: String!
  ) {
    getMusclesByMuscleGroupId(
      muscleGroupId: $muscleGroupId
      searchText: $searchText
    ) {
      id
      name
      previewImage
    }
  }
`;

export const GET_MUSCLE_DETAIL_DATA = gql`
  query getMuscleData($muscleId: String!) {
    getMuscleData(muscleId: $muscleId) {
      id
      name
      descriptionImages
      description {
        title
        subTitle
        text
      }
      exercises {
        id
        name
        previewImage
      }
    }
  }
`;
