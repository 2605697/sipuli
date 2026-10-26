import { useState, useRef, useContext } from 'react'
import classes from '../css/sidebar.module.css'
import { getIdentity } from '../identity.js'
import { OptionsContext } from './Options.jsx'
import { submitNewEvent } from './AdsBar.jsx'
import { submitNewPost } from './Feed.jsx'
import { themes } from '../themes'

function Dialog({ setopen, onSubmit, children }) {
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
      <form
        method="dialog"
        onSubmit={(ev) => {
          // Ignore dialog close
          if (ev.nativeEvent.submitter?.value != 'close' && onSubmit)
            onSubmit(ev)
        }}
      >
        <div className={classes.header}>
          <span></span>
          <button className={classes.close} value="close" formNoValidate>
            X
          </button>
        </div>
        {children}
      </form>
    </dialog>
  )
}

function Sidebar({ }) {
  let openSettings = null
  let openNewEvent = null
  let openNewPost = null

  let [name, setName] = useState('')
  let [menu, setMenuOpen] = useState(false)
  const { state, update } = useContext(OptionsContext)

  function toggleAutoTranslate() {
    update({ auto_translate: !state.auto_translate })
  }

  let open = (cb) => () => {
    setMenuOpen(false)
    cb()
  }

  return (
    <>
      <button
        className={classes.hamburger}
        onClick={() => setMenuOpen(!menu)}
      >
        ☰
      </button>
      {menu && <div className={classes.backdrop} onClick={() => setMenuOpen(false)}></div>}

      <div className={`${classes.root} ${menu ? classes.open : ''}`}>
        <div style={{ background: '#0000' /*placeholder element*/ }}></div>
        <button onClick={open(() => openSettings())} className={classes.barComponent}>
          Settings
        </button>

        <button onClick={open(() => openNewEvent())} className={classes.barComponent}>
          New Event
        </button>

        <button onClick={open(() => openNewPost())} className={classes.barComponent}>
          New Post
        </button>
      </div>

      {/* Dialogs live outside the root so they still work while it is hidden */}

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

      <Dialog setopen={(cb) => openNewEvent = cb} onSubmit={submitNewEvent}>
        <label className={classes.field}>
          Title
          <input name="title" type="text" required />
        </label>
        <label className={classes.field}>
          Date
          <input name="date" type="date" required />
        </label>
        <label className={classes.field}>
          Location
          <input name="location" type="text" required />
        </label>
        <div className={classes.actions}>
          <span></span>
          <button className={classes.submitpost}>Create event</button>
        </div>
      </Dialog>

      <Dialog setopen={(cb) => openNewPost = cb} onSubmit={submitNewPost}>
        <span>
          <input
            className={classes.code}
            name="code"
            type="password"
            placeholder="Identity code"
            onChange={(ev) => {
              if (ev.target.value.length >= 4) setName(getIdentity(ev.target.value))
              else setName('')
            }}
          />{' '}
          ({name || 'Code must be at least 4 characters'})
        </span>
        <textarea className={classes.content} name="text" rows="10" required></textarea>
        <div className={classes.actions}>
          <span></span>
          <button className={classes.submitpost}>Post</button>
        </div>
      </Dialog>
    </>
  )
}

export default Sidebar
