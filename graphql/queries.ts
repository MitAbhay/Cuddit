import { gql } from '@apollo/client'

export const GET_SUBCUDDIT_BY_TOPIC = gql`
  query MyQuery($topic: String!) {
    getSubcudditListByTopic(topic: $topic) {
      id
      topic
      created_at
    }
  }
`
export const GET_ALL_POSTS = gql`
  query MyQuery {
    getPostList {
      body
      created_at
      id
      image
      subcuddit {
        created_at
        id
        topic
      }
      subcuddit_id
      title
      username
      comments {
        created_at
        id
        post_id
        text
        username
      }
      votes {
        created_at
        id
        post_id
        upvote
        username
      }
    }
  }
`
