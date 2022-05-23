import Image from 'next/image'
import React from 'react'

function Header() {
  return (
    <div>
      <div className="relative h-10 w-20 cursor-pointer flex-shrink-0">
        <Image layout="fill" src="/logo.png" />
      </div>
      <div></div>
    </div>
  )
}

export default Header
