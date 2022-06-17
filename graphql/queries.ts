import { gql } from '@apollo/client'

export const GET_VOTES_BY_POST_ID = gql`
  query MyQuery($post_id: ID!) {
    getVotesByPostId(post_id: $post_id) {
      id
      created_at
      post_id
      vote
      username
    }
  }
`

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
export const GET_ALL_POSTS_BY_TOPIC = gql`
  query MyQuery($topic: String!) {
    getPostListByTopic(topic: $topic) {
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

export const GET_POSTS_BY_POST_ID = gql`
  query MyQuery($post_id: ID!) {
    getPostByPostID(post_id: $post_id) {
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
