type Comments = {
  created_at: String
  id: number
  post_id: number
  text: String
  username: String
}

type Vote = {
  created_at: String
  id: number
  post_id: number
  upvote: boolean
  username: String
}

type Subcuddit = {
  created_at: String
  id: number
  topic: String
}

type Post = {
  body: String
  created_at: String
  id: number
  image: String
  subcuddit_id: number
  title: String
  username: String
  votes: [Vote]
  comments: [Comment]
  subcuddit: [Subcuddit]
}
