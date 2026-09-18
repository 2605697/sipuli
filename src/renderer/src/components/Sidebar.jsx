import { useState, useRef } from 'react'
import classes from '../css/sidebar.module.css'

function Sidebar({ }) {
  let newPostDialog = useRef(null)
  let openNewPost = () => newPostDialog.current.showModal()
  let closeNewPost = () => newPostDialog.current.close()

  let settingsDialog = useRef(null)
  let openSettings = () => settingsDialog.current.showModal()
  let closeSettings = () => settingsDialog.current.close()

  let [name, setName] = useState('')
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
        ref={newPostDialog}
        onClick={(ev) => {
          // Close when clicking outside the modal
          if (ev.target == newPostDialog.current) closeSettings()
        }}
      ></dialog>

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
            <span>
              <input
                placeholder="Identity code"
                onChange={(ev) => {
                  setName(ev.target.value)
                  console.log(ev)
                }}
              />{' '}
              ({name})
            </span>
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
  )
}

export default Sidebar
