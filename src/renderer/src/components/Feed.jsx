import { Posts } from "../mock_data/Posts.json";
import Post from "./Post";
import classes from "../css/feed.module.css";
import { getIdentity } from "../identity.js";

// TODO: eventually the data will just contain public identities
Posts.forEach(p => p.username = getIdentity(p.username));

function Feed({ }) {
  return (<>
    <div className={classes.feed_style}>
      {
        Posts.map((post, index) => {
          return (
            <Post key={index} content={post}></Post>
          )
        })
      }
    </div>
  </>)
}

export default Feed;
