import React, { useContext, useEffect } from 'react'
import QuickPickList from '../components/QuickPickList'
import WinNumsCombosList from '../components/WinNumsCombosList'
import { Context } from '../contexts/Provider'
import getData from '../services/getData'
import Search from '../components/Search'

const QuickPicksPage = () => {
    const { quickPicksState, quickPicksDispatch, winNumsCombosState, game, search } = useContext(Context)

    const searchNumbersValid = !!search

    const url = `/quick-picks/${game}/`

    useEffect(() => {
        getData(url)(quickPicksDispatch)
    }, [game, url, quickPicksDispatch]);

    return (
        <>
            <Search/>
            {searchNumbersValid ? <WinNumsCombosList {...winNumsCombosState} /> : <QuickPickList {...quickPicksState} />}
        </>
    )
}

export default QuickPicksPage
