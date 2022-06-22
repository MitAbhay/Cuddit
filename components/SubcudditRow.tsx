import { ChevronUpIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import React from 'react'
import Avatar from './Avatar'

type Props = {
  index: number
  topic: string
}
function SubcudditRow({ index, topic }: Props) {
  return (
    <div className="flex items-center space-x-2 rounded-md bg-white p-2">
      <div className=" flex flex-1 items-center space-x-2">
        <p>{index + 1}</p>
        <ChevronUpIcon className="h-4 w-4 flex-shrink-0 text-green-400" />
        <Avatar seed={`/subcuddit/${topic}`} />
        <p className="ml-2">c/{topic}</p>
      </div>
      <Link href={`/subcuddit/${topic}`}>
        <div className="cursor-pointer rounded-lg bg-blue-500 px-1 text-white ">
          {' '}
          view
        </div>
      </Link>
    </div>
  )
}

export default SubcudditRow
