import { useRef, useState } from 'react'
import { PostsContext } from './PostsContext'
import { getIdentity } from '../identity'
import { Posts as initialPostsRaw } from '../mock_data/Posts.json'

const initialPosts = initialPostsRaw.map((post, index) => ({
  id: `initial-${index}`,
  ...post,
  username: getIdentity(post.username)
}))

export function PostsProvider({ children }) {
  const [posts, setPosts] = useState(initialPosts)
  const nextPostId = useRef(initialPostsRaw.length)

  function addPost(post) {
    const body = typeof post === 'string' ? post : (post?.body ?? post?.text ?? '')
    const username = typeof post === 'string' ? undefined : post?.username
    const newPost = {
      id: `post-${nextPostId.current++}`,
      username: username ?? 'Anonymous',
      text: body
    }

    setPosts((currentPosts) => [newPost, ...currentPosts])
  }

  return <PostsContext.Provider value={{ posts, addPost }}>{children}</PostsContext.Provider>
}
