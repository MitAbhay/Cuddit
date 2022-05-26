import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: 'https://sawmills.stepzen.net/api/dozing-fly/__graphql',
  headers: {
    Authorization: `Apikey ${process.env.NEXT_PUBLIC_API_KEY}`,
  },
  cache: new InMemoryCache(),
})

export default client
