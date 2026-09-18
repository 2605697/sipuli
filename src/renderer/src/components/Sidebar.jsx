import { useState, useRef } from "react";
import classes from "../css/sidebar.module.css";
import { getIdentity } from "../identity.js";

function Sidebar({ }) {
  let dialog = useRef(null);
  let open  = () => dialog.current.showModal();
  let close = () => dialog.current.close();
  let [name, setName] = useState("");
  return (
    <div className={classes.root}>
      <div style={{background:"#0000"/*placeholder element*/}}>
      </div>
      <button onClick={open} className={classes.newpost}>New post</button>
      <dialog className={classes.modal} ref={dialog} onClick={ev => {
        // Close when clicking outside the modal
        if (ev.target == dialog.current) close();
      }}>
        <form method="dialog">
          <div className={classes.header}>
            <span><input className={classes.code} type="password"
                         placeholder="Identity code"
                         onChange={ev => {
              if (ev.target.value.length >= 4)
                setName(getIdentity(ev.target.value))
              else
                setName("")
            }}/> ({name || "Code must be at least 4 characters"})</span>
            <button className={classes.close}>X</button>
          </div>
          <textarea className={classes.content} rows="10"></textarea>
          <div className={classes.actions}>
            <span></span>
            <button className={classes.submitpost}>Post</button>
          </div>
        </form>
      </dialog>
    </div>
  );
}

export default Sidebar;
