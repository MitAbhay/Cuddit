import { gql } from '@apollo/client'

export const ADD_POST = gql`
  mutation addPost(
    $body: String!
    $Image: String!
    $subcuddit_id: ID!
    $title: String!
    $username: String!
  ) {
    insertPost(
      body: $body
      Image: $Image
      subCuddit: $subcuddit_id
      title: $title
      username: $username
    ) {
      id
      body
      Image
      subCuddit
      title
      username
    }
  }
`

export const ADD_SUBCUDDIT = gql`
  mutation MyMutation($topic: String!) {
    insertSubCuddit(topic: $topic) {
      id
      topic
      created_at
    }
  }
`
