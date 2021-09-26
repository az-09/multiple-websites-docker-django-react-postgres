import React from 'react'
import { Container, Header, Message, Placeholder, Table } from 'semantic-ui-react'

const QuickPickList = (state) => {
    const { loading, data } = state
    
    return (
        <Container style={{marginTop: 15, marginBottom: 15 }}>
            <Header textAlign='right'>
            <Header.Subheader>{!loading && data && data.count > 0 ? 'Numbers based on top frequency combinations.': ''} </Header.Subheader>
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
                            <Table.HeaderCell textAlign="center" >Numbers Selected </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {data && data.results?.map((item) => (
                            <Table.Row key={item.quick_pick}>
                                <Table.Cell textAlign="center" >{item.quick_pick}</Table.Cell>
                            </Table.Row>
                        ))
                        }
                    </Table.Body>
                </Table>) }
            {!loading && data && data.count === 0 &&  <Message content="No quick picks" />}
       </Container>
    )
}

export default QuickPickList
