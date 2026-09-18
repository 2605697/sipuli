import { useState } from "react";
import classes from "../css/attachment.module.css"


function Attachment({ attachment: { src, type }, className }) {

  const [isExpanded, setIsExpanded] = useState(false);

  function handleExpand() {
    setIsExpanded(!isExpanded);
  }

  return (
    <>
      <div className={className} >
        <div className={isExpanded ? classes.bodyExpanded : classes.body} onClick={handleExpand}>
          <img className={classes.content} src={src}></img>
        </div>
      </div >
    </>
  );
}

export default Attachment;
