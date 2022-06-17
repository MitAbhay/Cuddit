import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_ALL_POSTS, GET_ALL_POSTS_BY_TOPIC } from '../graphql/queries'
import Post from './Post'
type Props = {
  subcuddit?: string
}
function Feed({ subcuddit }: Props) {
  const { data, error } = !subcuddit
    ? useQuery(GET_ALL_POSTS)
    : useQuery(GET_ALL_POSTS_BY_TOPIC, {
        variables: {
          topic: subcuddit,
        },
      })
  // console.log(subcuddit)
  const posts: Post[] = subcuddit ? data?.getPostListByTopic : data?.getPostList
  // console.log(posts)

  return (
    <div className="space-y-8 mt-8">
      {posts?.map((post) => {
        return <Post key={post.id} post={post} />
      })}
    </div>
  )
}

export default Feed
