import { useQuery } from '@apollo/client'
import type { NextPage } from 'next'
import Head from 'next/head'
import Feed from '../components/Feed'
import Postbox from '../components/Postbox'
import SubcudditRow from '../components/SubcudditRow'
import { GET_SUBCUDDIT_WITH_LIMITS } from '../graphql/queries'

const Home: NextPage = () => {
  const { data } = useQuery(GET_SUBCUDDIT_WITH_LIMITS, {
    variables: {
      limit: 10,
    },
  })

  const subcuddits: Subcuddit[] = data?.getSubcudditWithLimit
  console.log(subcuddits)
  return (
    <div className="my-5 mx-auto max-w-5xl">
      <Head>
        <title>Cuddit</title>
      </Head>
      <Postbox />
      <div className="flex">
        <Feed />
        <div className="sticky top-36 mx-5 mt-8 hidden h-fit min-w-[300px] rounded-md border border-gray-300 bg-white lg:inline">
          <p className="items-center text-center text-lg font-bold py-2 shadow-sm">Top Communities</p>
          <div>
            {subcuddits?.map((subcuddit, i) => (
              <SubcudditRow
                key={subcuddit.id}
                topic={subcuddit.topic}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
