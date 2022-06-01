import type { NextPage } from 'next'
import Head from 'next/head'
import Feed from '../components/Feed'
import Postbox from '../components/Postbox'

const Home: NextPage = () => {
  return (
    <div className="max-w-5xl my-5 mx-auto">
      <Head>
        <title>Reddit</title>
      </Head>
      <Postbox />
      <Feed/>
    </div>
  )
}

export default Home
