import type { NextPage } from 'next'
import Head from 'next/head'
import Feed from '../components/Feed'
import Postbox from '../components/Postbox'

const Home: NextPage = () => {
  return (
    <div className="my-5 mx-auto max-w-5xl">
      <Head>
        <title>Cuddit</title>
      </Head>
      <Postbox />
      <div className="flex">
        <Feed />
        <div className="rounded-md sticky top-36 mx-5 mt-5 hidden h-fit min-w-[300px] border border-gray-300 bg-white lg:inline">
          <p>Top Communities</p>
          <div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
