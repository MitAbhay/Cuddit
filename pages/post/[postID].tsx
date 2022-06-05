import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import React from 'react'
import Post from '../../components/Post'
import { GET_POSTS_BY_POST_ID } from '../../graphql/queries'

function post() {
  const router = useRouter()
  const { data } = useQuery(GET_POSTS_BY_POST_ID, {
    variables: {
      post_id: router.query.postID,
    },
  })
//   console.log(data)
  const post: Post = data?.getPostByPostID
//   console.log({post})
  return (
    <div>
      <Post post={post} />
    </div>
  )
}

export default post
