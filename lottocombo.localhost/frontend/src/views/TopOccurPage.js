import React, { useContext, useEffect } from 'react'
import { Context } from '../contexts/Provider'
import WinNumsCombosList from '../components/WinNumsCombosList'
import getData from '../services/getData'
import Search from '../components/Search'



const TopOccurPage = () => {
    const { topOccursState, topOccursDispatch, winNumsCombosState, game, search } = useContext(Context)

    const searchNumbersValid = !!search

    const url = `/lottery/winning-numbers-combinations/?game=${game}&top-occurrence=True`

    useEffect(() => {
        getData(url)(topOccursDispatch)
    }, [game, url, topOccursDispatch]);

    return (
        <>
            <Search/>
            {searchNumbersValid ? <WinNumsCombosList {...winNumsCombosState} /> : <WinNumsCombosList {...topOccursState} />}
        </>
    )
}

export default TopOccurPage
