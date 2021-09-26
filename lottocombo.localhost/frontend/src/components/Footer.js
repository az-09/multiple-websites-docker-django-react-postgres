import React from 'react'
import { Container, Grid, Icon } from 'semantic-ui-react'

const Footer = () => {
    return (
        <Container style={{ marginTop: "auto" }}>
            <Grid divided='vertically' >
                <Grid.Row columns={2}>
                    <Grid.Column textAlign="right" verticalAlign="middle">
                        Lotto Combo © {new Date().getFullYear()}
                    </Grid.Column>
                    <Grid.Column>
                        <Icon size="big" name="user circle"></Icon>
                        Tae Hee Choi
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    )
}

export default Footer
