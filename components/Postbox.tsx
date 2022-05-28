import { LinkIcon } from '@heroicons/react/outline'
import { PhotographIcon } from '@heroicons/react/solid'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import Avatar from './Avatar'
import { useForm, SubmitHandler } from 'react-hook-form'

type Inputs = {
  postTitle: string
  postBody: string
  postImage: string
  postSubCuddit: string
}

export default function Postbox() {
  const [ImageBox, setImageBox] = useState<boolean>(false)
  const { data: session } = useSession()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="sticky top-16 z-50 rounded-md border border-gray-200 bg-white p-2"
    >
      <div className="flex items-center space-x-4">
        <Avatar seed="Abhay" />
        <input
          {...register('postTitle', { required: true })}
          disabled={!session}
          className="flex-1 rounded-md bg-gray-50 p-2 outline-none"
          type="text"
          placeholder={
            session
              ? 'Type your TITLE here for the Post'
              : 'Sign in to Reddit to Post'
          }
        />
        <PhotographIcon
          onClick={() => setImageBox(!ImageBox)}
          className={`h-6 cursor-pointer text-gray-400 ${
            ImageBox && 'text-blue-400'
          }`}
        />
        <LinkIcon className="h-6 cursor-pointer text-gray-400" />
      </div>
      {!!watch('postTitle') && (
        <div className="flex flex-col">
          {/* BODY OF THE POST */}
          <div className="flex items-center space-x-6 p-2">
            <p className="min-w-[90px] font-bold">BODY:</p>
            <input
              {...register('postBody')}
              className="flex-1 bg-gray-50 outline-none"
              placeholder="Type your BODY here (optional)"
              type="text"
            />
          </div>
          {/* SUBCUDDIT */}
          <div className="flex items-center space-x-6 p-2">
            <p className="min-w-[90px] font-bold">SUBCUDDIT:</p>
            <input
              {...register('postSubCuddit', { required: true })}
              className="flex-1 bg-gray-50 outline-none"
              placeholder="Example: nextjs"
              type="text"
            />
          </div>
          {/* IMAGE */}
          {ImageBox && (
            <div className="flex items-center space-x-6 p-2">
              <p className="min-w-[90px] font-bold">IMAGE URL:</p>
              <input
                {...register('postImage')}
                className="flex-1 bg-gray-50 outline-none"
                placeholder="optional..."
                type="text"
              />
            </div>
          )}
          {/* Errors */}
          {Object.keys(errors).length > 0 && (
            <div className="p-4 space-y-2 text-red-500">
              {errors.postTitle?.type === 'required' && (
                <p>*Title is required</p>
              )}
              {errors.postSubCuddit?.type === 'required' && (
                <p>*SubCuddit is required</p>
              )}
            </div>
          )}

          {/* SUMBIT BUTTON */}

          <button
            className=" shadow-light w-full cursor-pointer rounded-full bg-blue-400 text-center text-lg text-white"
            type="submit"
          >
            Create Post
          </button>
        </div>
      )}
    </form>
  )
}
