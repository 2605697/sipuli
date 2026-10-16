import { Posts as mockPosts } from "../mock_data/Posts.json";
import Post from "./Post";
import classes from "../css/feed.module.css";
import { getIdentity } from "../identity.js";
import { useState, useContext } from "react";
import { OptionsContext } from "./Options";

// TODO: eventually the data will just contain public identities
let posts = mockPosts.map(p => ({ ...p, username: getIdentity(p.username) }));
let setPostList = null;

export function submitNewPost(ev) {
  let form = ev.currentTarget;
  let { code, text } = Object.fromEntries(new FormData(form));
  let username = code.length >= 4 ? getIdentity(code) : "Anonymous";
  posts = [{ username, text }, ...posts];
  setPostList(posts);
  // Keep the identity code, only clear the post text
  form.elements.text.value = "";
}

function Feed() {
  let [postList, setList] = useState(posts);
  setPostList = setList;
  const { state } = useContext(OptionsContext);
  const search = state.search.toLowerCase();
  return (
    <div className={classes.feed_style}>
      {
        // TODO: filtering makes react recreate elements which is slow
        postList.filter(post => post.text.toLowerCase().includes(search)).map((post, index) => {
          return (
            <Post key={index} content={post}></Post>
          )
        })
      }
    </div>
  )
}

export default Feed
