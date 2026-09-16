import Posts from "../mock_data/Posts.json"
import Post from "./Post"
import classes from "../css/feed.module.css"

function Feed({ }) {



  return (<>
    <div className={classes.feed_style}>
      {
        Posts.Posts.map((post, index) => {
          return (
            <Post key={index} content={post}></Post>
          )
        })
      }
    </div>
  </>)
}

export default Feed;
