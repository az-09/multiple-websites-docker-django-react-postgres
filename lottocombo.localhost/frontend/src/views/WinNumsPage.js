import React, { useContext, useEffect } from 'react'
import { Context } from '../contexts/Provider'
import WinNumsList from '../components/WinNumsList'
import WinNumsCombosList from '../components/WinNumsCombosList'
import getData from '../services/getData'
import Search from '../components/Search'


const WinNumsPage = () => {
    const { winNumsState, winNumsDispatch, winNumsCombosState, game, search } = useContext(Context)

    const searchNumbersValid = !!search

    const url = `/lottery/${game}/`

    useEffect(() => {

        getData(url)(winNumsDispatch)
    }, [game, url, winNumsDispatch]);

    return (
        <>
            <Search/>
            {searchNumbersValid ? <WinNumsCombosList {...winNumsCombosState} /> : <WinNumsList {...winNumsState} />}
        </>
    )
}

export default WinNumsPage
