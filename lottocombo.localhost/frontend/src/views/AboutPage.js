import React, { useContext, useEffect } from 'react'
import { Container} from 'semantic-ui-react'
import WinNumsCombosList from '../components/WinNumsCombosList'
import { Context } from '../contexts/Provider'
import getData from '../services/getData'

const AboutPage = () => {
    const { winNumsCombosState, topOccursDispatch, game, search } = useContext(Context)
    const searchNumbersValid = !!search

    const url = `/lottery/winning-numbers-combinations/?game=${game}&top-occurrence=True`

    useEffect(() => {
        getData(url)(topOccursDispatch)
    }, [url, topOccursDispatch]);

    return (
        <Container style={{ marginTop: 15, marginBottom: 15 }}>
            {searchNumbersValid ?
                <WinNumsCombosList {...winNumsCombosState} /> :
                <>
                    {/* <Header as='h1'>About</Header> */}
                    <p>Lotto Combo analyzes the number of occurrences from combinations of lottery winning numbers.</p>
                    <p>Occurrences are updated daily based on data from https://data.ny.gov/. </p>
                    <p>This app does neither promote playing the games nor predicting future winning numbers, so use it at your own risk.</p>
                </>
            }
        </Container>
    )
}

export default AboutPage
