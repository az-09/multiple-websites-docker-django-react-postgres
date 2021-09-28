import React, { useContext, useEffect } from 'react'
import { Button, Input, Select } from 'semantic-ui-react'
import { Context } from '../contexts/Provider'
import { CLEAR_SEARCH } from '../contexts/actions'
import { cleanedSearchNumbers } from '../utils/appUtils'
import getData from '../services/getData'

const Search = () => {
    const { winNumsCombosDispatch, game, setGame, search, setSearch } = useContext(Context)

    const gameOptions = [
        { key: 'megamillions', text: 'Mega Millions', value: 'megamillions' },
        { key: 'powerball', text: 'Powerball', value: 'powerball' },
    ]

    const onFieldChange = (e, { value }) => {
        setSearch(value)
    }

    const onFormSubmit = () => {
        const searchNumbers = cleanedSearchNumbers(search)
        const url = `/lottery/winning-numbers-combinations/?game=${game}&numbers=${searchNumbers}`
        getData(url)(winNumsCombosDispatch)
    }

    const onGameChange = (e, { value }) => {
        setGame(value)
        setSearch('')
    }

    const searchNumbersValid = !search?.length

    const onKeyPress = (e) => {
        if (e.key === 'Enter') {
            onFormSubmit()
        }
    }

    useEffect(() => {
        if (!!search) {
            winNumsCombosDispatch({
                type: CLEAR_SEARCH
            })
        }

    }, [winNumsCombosDispatch, search])

    return (

        <Input fluid type='text' placeholder="Enter numbers to search combinations. eg) 10 20" onChange={onFieldChange} value={search} action onKeyPress={onKeyPress}>
            <Select compact options={gameOptions} defaultValue='megamillions' onChange={onGameChange} />
            <input />

            <Button type="submit" primary onClick={onFormSubmit} disabled={searchNumbersValid}>Search</Button>
        </Input>
    )
}

export default Search
