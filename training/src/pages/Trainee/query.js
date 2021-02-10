import { gql } from 'apollo-boost';

const GET_TRAINEE = gql`
query GetTrainee($skip: Int, $limit:Int, $sort:String) {
  getAllTrainees(payload: { skip: $skip, limit: $limit, sort: $sort}) {
    message
    totalCount
    data{
      name
      email
      createdAt
      originalId
    }
    }
  }`;

export { GET_TRAINEE };
