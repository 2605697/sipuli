import { useState, useRef } from "react";
import classes from "../css/sidebar.module.css";

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
            <span><input placeholder="Identity code" onChange={ev => {
              setName(ev.target.value)
              console.log(ev);
            }}/> ({name})</span>
            <button className={classes.close}>X</button>
          </div>
          <textarea rows="10"></textarea>
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
