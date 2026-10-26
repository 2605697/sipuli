import { useContext } from 'react'
import { PostsContext } from './PostsContext'
import { OptionsContext } from './Options'
import Post from './Post'
import classes from '../css/feed.module.css'

function Feed() {
  const { posts } = useContext(PostsContext)
  const { state } = useContext(OptionsContext)
  const search = state.search.toLowerCase()

  return (
    <div className={classes.feed_style}>
      {posts
        .filter((post) => (post.text ?? '').toLowerCase().includes(search))
        .map((post) => {
          return <Post key={post.id} content={post}></Post>
        })}
    </div>
  )
}

export default Feed
