import { gql } from '@apollo/client'

export const ADD_POST = gql`
  mutation addPost(
    $body: String!
    $image: String!
    $subcuddit_id: ID!
    $title: String!
    $username: String!
  ) {
    insertPost(
      body: $body
      image: $image
      subcuddit_id: $subcuddit_id
      title: $title
      username: $username
    ) {
      id
      body
      image
      subcuddit_id
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

export const ADD_COMMENT = gql`
  mutation MyMutation($post_id: ID!, $text: String!, $username: String!) {
    insertComment(post_id: $post_id, text: $text, username: $username) {
      id
      text
      username
      post_id
      created_at
    }
  }
`

export const ADD_VOTE = gql`
  mutation MyMutation($post_id: ID!, $username: String!, $upvote: Boolean!) {
    insertVote(post_id: $post_id, username: $username, upvote: $vote) {
      id
      username
      post_id
      created_at
      upvote
    }
  }
`
