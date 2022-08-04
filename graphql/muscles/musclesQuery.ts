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
