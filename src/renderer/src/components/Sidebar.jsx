import { useState, useRef, useContext } from 'react'
import classes from '../css/sidebar.module.css'
import { getIdentity } from '../identity.js'
import { OptionsContext } from './Options.jsx'
import { themes } from '../themes'

function Dialog({ setopen, children }) {
  let dialog = useRef(null)
  setopen(() => dialog.current.showModal())
  let close = () => dialog.current.close()
  return (
    <dialog
      className={classes.modal}
      ref={dialog}
      onClick={(ev) => {
        // Close when clicking outside the modal
        if (ev.target == dialog.current) close()
      }}
    >
      <form method="dialog">
        <div className={classes.header}>
          <span></span>
          <button className={classes.close}>X</button>
        </div>
        {children}
      </form>
    </dialog>
  )
}

function Sidebar({ }) {
  let openSettings = null
  let openEvent = null
  let openNewPost = null

  let [name, setName] = useState('')
  const { state, update } = useContext(OptionsContext)

  function toggleAutoTranslate() {
    update({ auto_translate: !state.auto_translate })
  }

  return (
    <div className={classes.root}>
      <div style={{ background: '#0000' /*placeholder element*/ }}></div>
      <button onClick={() => openSettings()} className={classes.barComponent}>
        Settings
      </button>

      <button onClick={() => openNewEvent()} className={classes.barComponent}>
        New Event
      </button>

      <button onClick={() => openNewPost()} className={classes.barComponent}>
        New Post
      </button>

      <Dialog setopen={(cb) => openSettings = cb}>
        <span>
          Auto translate posts :{' '}
          <label className={classes.switch}>
            <input
              type="checkbox"
              value={state.auto_translate}
              onClick={toggleAutoTranslate}
            ></input>
            <span className={classes.slider}></span>
          </label>
        </span>
        <span>
          <label htmlFor="theme">Theme : </label>
          <select
            name="theme"
            id="theme"
            value={state.theme}
            onChange={(ev) => update({ theme: ev.target.value })}
          >
            {themes.map(({ id, label }) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </select>
        </span>
        <span>
          <label htmlFor="lang">Preferd language : </label>
          <select name="lang" id="lang">
            <option value="en">English (en)</option>
            <option value="fi">Suomi (fi)</option>
          </select>
        </span>
        <div className={classes.actions}>
          <span></span>
          <button className={classes.submitpost}>Save</button>
        </div>
      </Dialog>

      <Dialog setopen={(cb) => openNewPost = cb}>
        <span>
          <input
            className={classes.code}
            type="password"
            placeholder="Identity code"
            onChange={(ev) => {
              if (ev.target.value.length >= 4) setName(getIdentity(ev.target.value))
              else setName('')
            }}
          />{' '}
          ({name || 'Code must be at least 4 characters'})
        </span>
        <textarea className={classes.content} rows="10"></textarea>
        <div className={classes.actions}>
          <span></span>
          <button className={classes.submitpost}>Post</button>
        </div>
      </Dialog>
    </div>
  )
}

export default Sidebar
