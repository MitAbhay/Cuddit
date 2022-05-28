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
