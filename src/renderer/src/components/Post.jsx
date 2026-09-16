import TextRenderer from "./TextRenderer"
import Attachment from "./Attachements"
import classes from "../css/post.module.css"

function Post({ content: { username, text, attachment } }) {

  return (
    <>
      <div className={classes.body}>
        <span className={classes.user}>{username}</span>
        <span className={classes.date}>23/11/2026</span>
        <TextRenderer text={text} className={classes.text}></TextRenderer>
        {attachment != undefined ? (
          <Attachment attachment={attachment} className={classes.attachment}><div>inner</div></Attachment>
        ) : (<div className={classes.attachment}></div>)}
        <a className={classes.translate} href="https://www.youtube.com/watch?v=XfELJU1mRMg">translate</a>
      </div>
    </>
  );
}

export default Post;
