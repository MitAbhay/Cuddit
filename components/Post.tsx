import React, { useEffect, useState } from 'react'
import {
  ShareIcon,
  GiftIcon,
  DotsHorizontalIcon,
  ChatAltIcon,
  BookmarkIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from '@heroicons/react/outline'
import Avatar from './Avatar'
import ReactTimeago from 'react-timeago'
import Link from 'next/link'
import { Jelly } from '@uiball/loaders'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import { useMutation, useQuery } from '@apollo/client'
import { ADD_VOTE } from '../graphql/mutation'
import { GET_VOTES_BY_POST_ID } from '../graphql/queries'

type Props = {
  post: Post
}

export default function Post({ post }: Props) {
  const [vote, setVote] = useState<boolean>()

  const { data: session } = useSession()

  const { data, loading } = useQuery(GET_VOTES_BY_POST_ID, {
    variables: {
      post_id: post?.id,
    },
  })

  const [addVote] = useMutation(ADD_VOTE, {
    refetchQueries: [GET_VOTES_BY_POST_ID, 'getVotesByPostId'],
  })

  useEffect(() => {
    const votes: [Vote] = data?.getVotesByPostId

    const vote = votes?.find((vote) => {
      vote.username == session?.user?.name
    })?.upvote

    setVote(vote)
  }, [data])

  const upvote = async (isUpvote: boolean) => {
    if (!session) {
      toast('You need to signIn to vote !!')
      return
    }

    if (vote && isUpvote) return
    if (vote == false && !isUpvote) return

    const {
      data: { insertVote: newVote },
    } = await addVote({
      variables: {
        post_id: post?.id,
        username: session?.user?.name,
        upvote: isUpvote,
      },
    })
  }

  const displayVote = (data: any) => {
    const votes: Vote[] = data?.getVotesByPostId
    const displayNumber = votes?.reduce(
      (total, vote) => (vote.upvote ? (total += 1) : (total -= 1)),
      0
    )
    if (votes?.length == 0) return 0
    if (displayNumber == 0) {
      return votes[0]?.upvote ? 1 : -1
    }

    return displayNumber
  }
  console.log(displayVote(data))
  if (!post)
    return (
      <div className="flex w-full items-center justify-center p-32 text-lg">
        <Jelly size={50} color="red" />
      </div>
    )
  return (
    <Link href={`/post/${post.id}`}>
      <div className="flex cursor-pointer rounded-md border border-gray-300 bg-white shadow-sm hover:border hover:border-gray-500">
        <div className="flex flex-col items-center justify-start space-y-4 p-4">
          <ArrowUpIcon
            onClick={() => upvote(true)}
            className={`h-6 w-6 rounded-md p-1 hover:bg-gray-300 hover:text-blue-500 ${
              vote && 'text-blue-500'
            }`}
          />
          <p className="font-bold">{displayVote(data)}</p>
          <ArrowDownIcon
            onClick={() => upvote(false)}
            className={`h-6 w-6 rounded-md p-1 hover:bg-gray-300 hover:text-red-500 ${
              vote == false && 'text-red-500'
            }`}
          />
        </div>
        <div>
          {/* Header */}
          <div className="flex items-center space-x-2">
            <Avatar seed={post.subcuddit[0]?.topic} />
            <p className="items-center space-x-2 text-xs text-gray-400">
              <Link href={`/subcuddit/${post.subcuddit[0]?.topic}`}>
                <span className="mr-2 font-bold hover:text-blue-500">
                  c/{post.subcuddit[0]?.topic}
                </span>
              </Link>
              • Posted by u/
              {post.username}
              <ReactTimeago date={post.created_at} />
            </p>
          </div>
          {/*  Body */}
          <div className="p-2 py-2">
            <p className="text-lg font-bold">{post.title}</p>
            <p className="">{post.body}</p>
          </div>
          {post.image && (
            <img className="w-full" src={post.image} alt="post_image" />
          )}

          {/* Post Footer */}
          <div className="flex items-center space-x-4 py-4 text-gray-400">
            <div className="flex items-center space-x-2 rounded-sm font-semibold hover:text-gray-600">
              <ChatAltIcon className="h-6 w-6" />
              <p>{post.comments.length} Comments</p>
            </div>
            <div className="flex items-center space-x-2 rounded-sm font-semibold hover:text-gray-600">
              <GiftIcon className="h-6 w-6" />
              <p className="hidden sm:inline">Gift</p>
            </div>
            <div className="flex items-center space-x-2 rounded-sm font-semibold hover:text-gray-600">
              <BookmarkIcon className="h-6 w-6" />
              <p className="hidden sm:inline">Bookmark</p>
            </div>
            <div className="flex items-center space-x-2 rounded-sm font-semibold hover:text-gray-600">
              <ShareIcon className="h-6 w-6" />
              <p className="hidden sm:inline">Share</p>
            </div>
            <div className="flex items-center space-x-2 rounded-sm font-semibold hover:text-gray-600">
              <DotsHorizontalIcon className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
