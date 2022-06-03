import React from 'react'
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

type Props = {
  post: Post
}

export default function Post(post: Props) {
  return (
    <div className="my-8 flex cursor-pointer rounded-md border border-gray-300 bg-white p-2 shadow-sm hover:border hover:border-gray-500">
      <div className="flex flex-col items-center justify-start space-y-4 p-4">
        <ArrowUpIcon className="h-6 w-6 rounded-md p-1 hover:bg-gray-300 hover:text-blue-500" />
        <p className="font-bold">0</p>
        <ArrowDownIcon className="h-6 w-6 rounded-md p-1 hover:bg-gray-300 hover:text-red-500" />
      </div>
      <div>
        {/* Header */}
        <div className="flex items-center space-x-2">
          <Avatar seed={post.post.subcuddit[0]?.topic} />
          <p className="items-center text-xs text-gray-400">
            {/* {console.log(post.post)} */}
            <span className="font-bold hover:text-blue-500">
              {' '}
              r/{post.post.subcuddit[0]?.topic}{' '}
            </span>
            • Posted by u/
            {post.post.username}
            <ReactTimeago date={post.post.created_at} />
          </p>
        </div>
        {/*  Body */}
        <div className="p-2 py-2">
          <p className="text-lg font-bold">{post.post.title}</p>
          <p className="">{post.post.body}</p>
        </div>
        <img className="w-full" src={post.post.image} alt="post_image" />

        {/* Post Footer */}
        <div className="flex items-center space-x-4 py-4 text-gray-400">
          <div className="flex items-center space-x-2 rounded-sm font-semibold hover:text-gray-600">
            <ChatAltIcon className="h-6 w-6" />
            <p>{post.post.comments.length} Comments</p>
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
  )
}