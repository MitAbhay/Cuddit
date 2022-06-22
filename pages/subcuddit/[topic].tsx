import { useRouter } from 'next/router'
import React from 'react'
import Avatar from '../../components/Avatar'
import Feed from '../../components/Feed'
import Postbox from '../../components/Postbox'

function SubCuddit() {
  const {
    query: { topic },
  } = useRouter()
  return (
    <div>
      <div className={`sticky bg-red-400 pt-8`}>
        <div className="mt-8 bg-white">
          <div className="mx-auto flex max-w-5xl items-center space-x-6 py-2">
            <div className="-mt-6">
              <Avatar seed={topic as string} large />
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                Welcome to c/{topic} Subcuddit
              </h1>
              <p className="text-gray-500">c/{topic}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-5xl ">
        <Postbox subcuddit={topic as string} />
        <Feed subcuddit={topic as string} />
      </div>
    </div>
  )
}

export default SubCuddit
