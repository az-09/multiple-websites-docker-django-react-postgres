import React from 'react'
import { Container, Header, Message, Placeholder, Table } from 'semantic-ui-react'


const WinNumsCombosList = (state) => {
    const { loading, data } = state

    return (
        <Container style={{marginTop: 15, marginBottom: 15 }}>
            <Header textAlign='right'>
            <Header.Subheader>{!loading && data && data.count > 0 ? 'Most frequent combinations. One number is excluded.': ''}</Header.Subheader>
            </Header>
            {loading && (
                <Placeholder>
                    <Placeholder.Header image>
                        <Placeholder.Line />
                        <Placeholder.Line />
                    </Placeholder.Header>
                    <Placeholder.Paragraph>
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                    </Placeholder.Paragraph>
                </Placeholder>
            )}
            {!loading && data && data.count > 0 && (
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell textAlign="center" >Combinations (*ball)</Table.HeaderCell>
                            <Table.HeaderCell textAlign="center" >Occurrences / {data.results[0].number_of_draws} plays</Table.HeaderCell>
                            <Table.HeaderCell textAlign="center" >Possibility %</Table.HeaderCell>

                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {data && data.results?.map((item) => (
                            <Table.Row key={item.winning_numbers_combination}>
                                <Table.Cell textAlign="center" >{item.winning_numbers_combination}</Table.Cell>
                                <Table.Cell textAlign="center" >{item.winning_numbers_combination_occurrence}</Table.Cell>
                                <Table.Cell textAlign="center" >{item.possibility}</Table.Cell>
                            </Table.Row>
                        ))
                        }
                    </Table.Body>
                </Table>
            )}
            {!loading && data && data.count === 0 && <Message content="No combinations or combinations do not meet minimum occurrence rules." />}
        </Container>
    )
}

export default WinNumsCombosList
