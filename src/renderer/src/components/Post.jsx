import TextRenderer from "./TextRenderer"
import Attachment from "./Attachments"
import classes from "../css/post.module.css"
import translate from "translate";
import sidebar_classes from "../css/sidebar.module.css";
import { useState, useRef, useEffect } from "react";

translate.engine = "google";

function Post({ content: { username, text, attachment } }) {
  let [translatedText, setTranslateText] = useState(undefined);
  let [useTranslated, setTranslated] = useState(false);
  let [translating, setTranslating] = useState(false);

  useEffect(() => {
    if (useTranslated && translatedText == undefined && !translating) {
      setTranslating(true);
      async function translateText(text) {
        const translated_text = await translate(text, { to: "fi" });
        setTranslateText(translated_text);
        setTranslating(false);
      }
      translateText(text);
    }
  }, [useTranslated, text, translating])

  function toggle_translate() {
    setTranslated(!useTranslated);
  }

  return (
    <>
      <div className={classes.body}>
        <span className={classes.user}>{username}</span>
        <span className={classes.date}>23/11/2026</span>

        <TextRenderer text={useTranslated ?
          (translatedText ? translatedText : "Translating")
          : text} className={classes.text}></TextRenderer>
        {attachment != undefined ? (
          <Attachment attachment={attachment} className={classes.attachment}><div>inner</div></Attachment>
        ) : (<div className={classes.attachment}></div>)}
        <a className={classes.translate} onClick={toggle_translate}>{useTranslated ? "View original" : "Translate(using google translate)"} </a>
      </div >
    </>
  );
}

export default Post;
