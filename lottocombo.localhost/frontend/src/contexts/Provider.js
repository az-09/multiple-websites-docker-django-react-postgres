import React, { createContext, useReducer, useState } from 'react'
import reducer from './reducer'

export const initialState = {
    loading: false,
    data: [],
    error: null
}

export const Context = createContext({})

export const Provider = ({ children }) => {
    const [winNumsState, winNumsDispatch] = useReducer(reducer, initialState)
    const [winNumsCombosState, winNumsCombosDispatch] = useReducer(reducer, initialState)
    const [topOccursState, topOccursDispatch] = useReducer(reducer, initialState)
    const [quickPicksState, quickPicksDispatch] = useReducer(reducer, initialState)
    const [game, setGame] = useState('megamillions')
    const [search, setSearch] = useState('')

    return (
        <Context.Provider
            value={{
                winNumsState,
                winNumsDispatch,
                winNumsCombosState,
                winNumsCombosDispatch,
                topOccursState,
                topOccursDispatch,
                quickPicksState,
                quickPicksDispatch,
                game,
                setGame,
                search,
                setSearch

            }}
        >
            {children}
        </Context.Provider>
    )
}

