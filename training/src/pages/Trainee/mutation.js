import { gql } from 'apollo-boost';

const CREATE_TRAINEE = gql`
mutation CreateTrainee($name: String!, $email: String!, $password: String!) {
    createTrainee(user: { name: $name, email: $email,password: $password})
    {
      name
    }
}
`;

const UPDATE_TRAINEE = gql`
mutation UpdateTrainee($id: ID! $name: String, $email: String) {
    updateTrainee(payload: { id: $id, name: $name, email: $email})
    {
      name
      id
    }
}
`;

const DELETE_TRAINEE = gql`
mutation DeleteTrainee($originalId: ID!) {
    deleteTrainee(payload: {originalId: $originalId} )
    {
      message
      data
      status
    }
}
`;

export { DELETE_TRAINEE, UPDATE_TRAINEE, CREATE_TRAINEE };
