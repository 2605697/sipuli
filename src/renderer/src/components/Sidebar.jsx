import { useState, useRef, useContext } from "react";
import classes from "../css/sidebar.module.css";
import { getIdentity } from "../identity.js";
import { OptionsContext } from "./Options.jsx";


function Sidebar({ }) {
  let newPostDialog = useRef(null)
  let openNewPost = () => newPostDialog.current.showModal()
  let closeNewPost = () => newPostDialog.current.close()

  let settingsDialog = useRef(null)
  let openSettings = () => settingsDialog.current.showModal()
  let closeSettings = () => settingsDialog.current.close()

  let [name, setName] = useState('')
  const { state, update } = useContext(OptionsContext);


  function toggleAutoTranslate() {
    update({ auto_translate: !state.auto_translate });
  }

  return (
    <div className={classes.root}>
      <div style={{ background: '#0000' /*placeholder element*/ }}></div>
      <button onClick={openSettings} className={classes.barComponent}>
        Settings
      </button>

      <button onClick={openNewPost} className={classes.barComponent}>
        New post
      </button>

      <dialog
        className={classes.modal}
        ref={settingsDialog}
        onClick={(ev) => {
          // Close when clicking outside the modal
          if (ev.target == newPostDialog.current) closeSettings()
        }}
      >
        <form method="dialog">
          <div className={classes.header}>
            <button className={classes.close}>X</button>
          </div>
          <span>Auto translate posts : <label className={classes.switch}>
            <input type="checkbox" value={state.auto_translate} onClick={toggleAutoTranslate}></input>
            <span className={classes.slider}></span>
          </label></span>
          <span><label htmlFor="lang">Preferd language : </label>
            <select name="lang" id="lang">
              <option value="en">English (en)</option>
              <option value="fi">Suomi (fi)</option>
            </select>
          </span>
          <div className={classes.actions}>
            <span></span>
            <button className={classes.submitpost}>Save</button>
          </div>
        </form>
      </dialog>

      <dialog
        className={classes.modal}
        ref={newPostDialog}
        onClick={(ev) => {
          // Close when clicking outside the modal
          if (ev.target == newPostDialog.current) closeNewPost()
        }}
      >
        <form method="dialog">
          <div className={classes.header}>
            <span><input className={classes.code} type="password"
              placeholder="Identity code"
              onChange={ev => {
                if (ev.target.value.length >= 4)
                  setName(getIdentity(ev.target.value))
                else
                  setName("")
              }} /> ({name || "Code must be at least 4 characters"})</span>
            <button className={classes.close}>X</button>
          </div>
          <textarea className={classes.content} rows="10"></textarea>
          <div className={classes.actions}>
            <span></span>
            <button className={classes.submitpost}>Post</button>
          </div>
        </form>
      </dialog>
    </div >
  )
}

export default Sidebar
