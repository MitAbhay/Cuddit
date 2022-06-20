import Image from 'next/image'
import React from 'react'
import {
  HomeIcon,
  ChevronDownIcon,
  SearchIcon,
  BeakerIcon,
  MenuIcon,
} from '@heroicons/react/solid'
import {
  SparklesIcon,
  ChatIcon,
  VideoCameraIcon,
  GlobeIcon,
  PlusIcon,
  BellIcon,
  SpeakerphoneIcon,
} from '@heroicons/react/outline'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

function Header() {
  const { data: session } = useSession()
  return (
    <div className="sticky top-0 z-50 flex items-center bg-white px-4 py-2 shadow-lg">
      {/* Logo */}
      <div className="relative h-12 w-28 flex-shrink-0 cursor-pointer">
        <Link href="/">
          <Image layout="fill" src="/cuddit.png" />
        </Link>
      </div>
      {/* HomeIcon */}
      <div className="mx-8 flex cursor-pointer items-center xl:min-w-[300px]">
        <HomeIcon className="h-5 w-5" />
        <p className="ml-2 hidden flex-1 lg:inline">Home</p>
        {/* <ChevronDownIcon className="h-5 w-5" /> */}
      </div>
      {/* Search */}
      <form className="flex flex-1 items-center space-x-2 rounded-lg border border-gray-200 bg-gray-100 px-2 py-2">
        <SearchIcon className="h-5 w-5 text-gray-400" />
        <input
          className="flex-1 bg-transparent outline-none"
          placeholder="Search Cuddit"
          type="text"
        />
        <button hidden type="submit" />
      </form>
      {/* Icons */}
      <div className="hidden items-center px-4 text-gray-500 lg:inline-flex">
        <SparklesIcon className="icon" />
        <ChatIcon className="icon" />
        <GlobeIcon className="icon" />
        <VideoCameraIcon className="icon" />
        <BellIcon className="icon" />
        <PlusIcon className="icon" />
        <SpeakerphoneIcon className="icon" />
      </div>
      <div className="ml-5 flex items-center lg:hidden">
        <MenuIcon className="icon" />
      </div>
      {/* signIn/SignOut */}
      {session ? (
        <div className="hidden items-center space-x-2 rounded-lg border border-gray-500 p-1 lg:flex">
          <div className="flex-1 text-xs text-gray-500">
            <p className="font-bold">{session?.user?.name}</p>
            <p>1 cud</p>
          </div>
          <span>||</span>
          <div
            onClick={() => signOut()}
            className=" text-md cursor-pointer items-center rounded-lg p-1 font-bold hover:bg-blue-400 "
          >
            SignOut
          </div>
        </div>
      ) : (
        <div
          onClick={() => signIn()}
          className="hidden cursor-pointer items-center rounded-lg border border-gray-500 p-2 hover:bg-gray-300 lg:flex "
        >
          <p className="text-gray-500">Sign In</p>
        </div>
      )}
    </div>
  )
}

export default Header
