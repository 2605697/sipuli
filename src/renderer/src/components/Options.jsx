import React, { createContext, useReducer } from 'react'

export const OptionsContext = createContext()

const reducer = (state, pair) => ({ ...state, ...pair })

const initialState = {
  auto_translate: false
}

export function OptionsProvider(props) {
  const [state, update] = useReducer(reducer, initialState)

  return (
    <OptionsContext.Provider value={{ state, update }}>
      {props.children}
    </OptionsContext.Provider>
  )
}
