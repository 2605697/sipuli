import { useContext } from 'react'
import { PostsContext } from './PostsContext'
import Post from './Post'
import classes from '../css/feed.module.css'

function Feed() {
  const { posts } = useContext(PostsContext)

  return (
    <div className={classes.feed_style}>
      {posts.map((post, index) => {
        return <Post key={index} content={post}></Post>
      })}
    </div>
  )
}

export default Feed
