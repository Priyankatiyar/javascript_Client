import { gql } from 'apollo-boost';

const CREATE_TRAINEE_SUB = gql`
subscription {
traineeAdded {
name
email
createdAt
originalId
_id
}
}
`;

const UPDATED_TRAINEE_SUB = gql`
subscription {
  traineeUpdated{
    email
    createdAt
    name
    originalId
    }
  }
`;

const DELETED_TRAINEE_SUB = gql`
subscription {
  traineeDeleted{
    status
    message
    data
  }
}
`;

export { DELETED_TRAINEE_SUB, UPDATED_TRAINEE_SUB, CREATE_TRAINEE_SUB };
