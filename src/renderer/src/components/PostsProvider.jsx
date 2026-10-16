import { useState } from 'react'
import { PostsContext } from './PostsContext'
import { getIdentity } from '../identity'
import { Posts as initialPostsRaw } from '../mock_data/Posts.json'

const initialPosts = initialPostsRaw.map((post) => ({
  ...post,
  username: getIdentity(post.username)
}))

export function PostsProvider({ children }) {
  const [posts, setPosts] = useState(initialPosts)

  function addPost(post) {
    const body = typeof post === 'string' ? post : (post?.body ?? post?.text ?? '')
    const username = typeof post === 'string' ? undefined : post?.username

    setPosts((currentPosts) => [...currentPosts, { username: username ?? 'Anonymous', text: body }])
  }

  return <PostsContext.Provider value={{ posts, addPost }}>{children}</PostsContext.Provider>
}

