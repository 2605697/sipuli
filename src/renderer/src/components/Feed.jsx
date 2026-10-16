import { Posts } from "../mock_data/Posts.json";
import Post from "./Post";
import classes from "../css/feed.module.css";
import { getIdentity } from "../identity.js";
import { useContext } from "react";
import { OptionsContext } from "./Options";

// TODO: eventually the data will just contain public identities
Posts.forEach(p => p.username = getIdentity(p.username));

function Feed() {
  const { state } = useContext(OptionsContext);
  const search = state.search.toLowerCase();
  return (
    <div className={classes.feed_style}>
      {
        // TODO: filtering makes react recreate elements which is slow
        Posts.filter(post => post.text.toLowerCase().includes(search)).map((post, index) => {
          return (
            <Post key={index} content={post}></Post>
          )
        })
      }
    </div>
  )
}

export default Feed;
