import React, { createContext, useReducer } from 'react'
import { applyTheme, defaultTheme } from '../themes'

export const OptionsContext = createContext()

const reducer = (state, pair) => ({ ...state, ...pair })

const initialState = {
  auto_translate: false,
  theme: defaultTheme
}

export function OptionsProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const update = (pair) => {
    if (pair.theme) applyTheme(pair.theme)
    dispatch(pair)
  }

  return (
    <OptionsContext.Provider value={{ state, update }}>{props.children}</OptionsContext.Provider>
  )
}
