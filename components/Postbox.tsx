import { LinkIcon } from '@heroicons/react/outline'
import { PhotographIcon } from '@heroicons/react/solid'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import Avatar from './Avatar'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { ADD_POST, ADD_SUBCUDDIT } from '../graphql/mutation'
import client from '../apollo-client'
import { GET_SUBCUDDIT_BY_TOPIC } from '../graphql/queries'
import toast from 'react-hot-toast'

type Inputs = {
  postTitle: string
  postBody: string
  postImage: string
  postSubCuddit: string
}

export default function Postbox() {
  const [addPost] = useMutation(ADD_POST)
  const [addSubCuddit] = useMutation(ADD_SUBCUDDIT)
  const [ImageBox, setImageBox] = useState<boolean>(false)
  const { data: session } = useSession()
  const {
    setValue,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = async (formdata) => {
    console.log(formdata)
    const notification = toast.loading('Creating post...')
    try {
      const {   
        data: { getSubcudditListByTopic },
      } = await client.query({
        query: GET_SUBCUDDIT_BY_TOPIC,
        variables: {
          topic: formdata.postSubCuddit,
        },
      })

      const subCudditExists = getSubcudditListByTopic.length > 0
      console.log(getSubcudditListByTopic)
      console.log(subCudditExists)
      if (!subCudditExists) {
        // console.log("SubCuddit is new ! Creating new SubCuddit...")

        const {
          data: { insertSubCuddit: newSubCuddit },
        } = await addSubCuddit({
          variables: {
            topic: formdata.postSubCuddit,
          },
        })
        console.log(newSubCuddit)

        const image = formdata.postImage || '';

        console.log("he")
        const {
          data: { insertPost: newPost },
        } = await addPost({
          variables: {
            body: formdata.postBody,
            Image: image,
            subcuddit_id: newSubCuddit.id,
            title: formdata.postTitle,
            username: session?.user?.name,
          },
        })

        console.log(newPost)
      } else {
        const image = formdata.postImage || ''

        const {
          data: { insertPost: newPost },
        } = await addPost({
          variables: {
            body: formdata.postBody,
            Image: image,
            subcuddit_id: getSubcudditListByTopic[0].id,
            title: formdata.postTitle,
            username: session?.user?.name,
          },
        })
      }

      setValue('postTitle', '')
      setValue('postBody', '')
      setValue('postImage', '')
      setValue('postSubCuddit', '')

      toast.success('Post created!', {
        id: notification,
      })
    } catch (error) {
      toast.error('Oops !!! Something went Wrong', {
        id: notification,
      })
    }
  }
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
            <div className="space-y-2 p-4 text-red-500">
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
