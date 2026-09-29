import TextRenderer from "./TextRenderer"
import Attachment from "./Attachments"
import classes from "../css/post.module.css"
import translate from "translate";
import { useState, useEffect, useContext } from "react";
import { OptionsContext } from "./Options";

translate.engine = "google";

function Post({ content: { username, text, attachment } }) {
  let [translatedText, setTranslateText] = useState(undefined);
  let [useTranslated, setTranslated] = useState(false);
  let [translating, setTranslating] = useState(false);
  const { state } = useContext(OptionsContext);


  //Use a effect to get the translated text
  useEffect(() => {
    if ((state.auto_translate ? !useTranslated : useTranslated) && translatedText == undefined && !translating) {
      setTranslating(true);
      async function translateText(text) {
        try {
          const translated_text = await translate(text, { to: "fi" });
          setTranslateText(translated_text);
          setTranslating(false);
        } catch (e) {
          setTranslateText("Translation Failed...");
        }
      }
      translateText(text);
    }
  }, [useTranslated, text, translating, state.auto_translate])

  function toggle_translate() {
    setTranslated(!useTranslated);
  }

  return (
    <>
      <div className={classes.body}>
        <span className={classes.user}>{username}</span>
        <span className={classes.date}>23/11/2026</span>

        <TextRenderer text={(state.auto_translate ? !useTranslated : useTranslated) ?
          (translatedText ? translatedText : "Translating")
          : text} className={classes.text}></TextRenderer>
        {attachment != undefined ? (
          <Attachment attachment={attachment} className={classes.attachment}><div>inner</div></Attachment>
        ) : (<div className={classes.attachment}></div>)}
        <a className={classes.translate} onClick={toggle_translate}>{(state.auto_translate ? !useTranslated : useTranslated) ? "View original" : "Translate(using google translate)"} </a>
      </div >
    </>
  );
}

export default Post;
