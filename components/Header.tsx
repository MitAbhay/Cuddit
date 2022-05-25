import Image from 'next/image'
import React from 'react'
import { HomeIcon, ChevronDownIcon, SearchIcon } from '@heroicons/react/solid'

function Header() {
  return (
    <div className="sticky top-0 z-50 flex bg-white px-4 py-2 shadow-lg">
      {/* Logo */}
      <div className="relative h-10 w-20 flex-shrink-0 cursor-pointer">
        <Image layout="fill" src="/logo.png" />
      </div>
      {/* HomeIcon */}
      <div className="mx-8 flex items-center xl:min-w-[300px]">
        <HomeIcon className="h-5 w-5" />
        <p className="ml-2 hidden flex-1 lg:inline">Home</p>
        <ChevronDownIcon className="h-5 w-5" />
      </div>
      {/* Search */}
      <form className="flex flex-1 items-center space-x-2 rounded-lg border border-gray-200 bg-gray-100 px-2 py-2">
        <SearchIcon className="h-5 w-5 text-gray-400" />
        <input
          className="flex-1 bg-transparent outline-none"
          placeholder="Search Reddit"
          type="text"
        />
        <button hidden type="submit" />
      </form>
    </div>
  )
}

export default Header
