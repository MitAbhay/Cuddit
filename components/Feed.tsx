import { useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { GET_ALL_POSTS, GET_ALL_POSTS_BY_TOPIC } from '../graphql/queries'
import Post from './Post'
import MyLoader from '../components/Loader'

type Props = {
  subcuddit?: string
}
function Feed({ subcuddit }: Props) {
  const [loading, setloading] = useState<boolean>(true)
  const { data } = !subcuddit
    ? useQuery(GET_ALL_POSTS)
    : useQuery(GET_ALL_POSTS_BY_TOPIC, {
        variables: {
          topic: subcuddit,
        },
      })
  // console.log(subcuddit)
  // console.log(data)
  const posts: Post[] = subcuddit ? data?.getPostListByTopic : data?.getPostList

  // console.log(loading)

  // if (data) {
  //   setloading(false)
  // }

  return (
    <div className="mt-8 space-y-8">
      {loading ? (
        <MyLoader />
      ) : (
        posts?.map((post) => {
          return <Post key={post.id} post={post} />
        })
      )}
    </div>
  )
}

export default Feed
