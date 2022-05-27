import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'

export default function Avatar() {
  const { data: session } = useSession()
  return (
    <div>
      <Image
        src={`https://avatars.dicebear.com/api/open-peeps/${
          session?.user?.name || 'placeholder'
        }.svg`}
        layout="fill"
      />
    </div>
  )
}
