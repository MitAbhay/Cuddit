import { useMutation, useQuery } from '@apollo/client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import ReactTimeago from 'react-timeago'
import Avatar from '../../components/Avatar'
import Post from '../../components/Post'
import { ADD_COMMENT } from '../../graphql/mutation'
import { GET_POSTS_BY_POST_ID } from '../../graphql/queries'

type Inputs = {
  comment?: string
}

function post() {
  const [addComment] = useMutation(ADD_COMMENT, {
    refetchQueries: [GET_POSTS_BY_POST_ID, 'getPostByPostID'],
  })
  const { data: session } = useSession()

  const router = useRouter()
  const { data } = useQuery(GET_POSTS_BY_POST_ID, {
    variables: {
      post_id: router.query.postID,
    },
  })
  //   console.log(data)
  const post: Post[] = data?.getPostByPostID

  const {
    setValue,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = async (formdata) => {
    console.log(formdata)
    const notification = toast.loading('Creating comment...')
    await addComment({
      variables: {
        post_id: router.query.postID,
        text: formdata.comment,
        username: session?.user?.name,
      },
    })

    setValue('comment', '')

    toast.success('Comment created!', {
      id: notification,
    })
  }
  return (
    <div className="mx-auto my-7 max-w-5xl">
      {post?.map((post) => {
        return (
          <>
            <Post post={post} />
            <div className="-mt-1 rounded-b-md border border-t-0 border-gray-200 bg-white p-2 pl-16 text-sm">
              <p>
                Comment as{' '}
                <span className="my-1 font-bold">{post?.username}</span>
              </p>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="my-2 flex flex-col space-y-2"
              >
                <textarea
                  {...register('comment')}
                  disabled={!session}
                  className="h-24 rounded-md border border-gray-200 p-2 outline-none disabled:bg-gray-50"
                  placeholder={
                    !session
                      ? 'You must be logged in to comment'
                      : 'Comment your thoughts here...'
                  }
                ></textarea>
                <button
                  type="submit"
                  className="rounded-md bg-red-500 text-white"
                >
                  <span className="text-lg">Comment</span>
                </button>
              </form>
            </div>
            {console.log(post.comments)}

            <div className="-mt-1 space-y-3 rounded-b-md border border-t-0 border-gray-200 bg-white p-2 pl-16 text-sm">
              <hr className="p-2" />
              {post?.comments?.map((comment) => {
                return (
                  <div
                    key={comment.id}
                    className="relative flex items-center space-x-3"
                  >
                    <hr className="absolute top-10 left-8 z-0 h-6 border" />
                    <div className="z-50">
                      <Avatar seed={comment.username} />
                    </div>
                    <div className="flex flex-col text-sm">
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span className="pr-2">{session?.user?.name}</span>
                        •<ReactTimeago date={comment.created_at} />
                      </div>
                      <p>{comment?.text}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )
      })}
    </div>
  )
}

export default post
