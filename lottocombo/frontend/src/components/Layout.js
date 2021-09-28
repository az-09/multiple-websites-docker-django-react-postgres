import React from 'react'
import { Container} from 'semantic-ui-react'
import Footer from './Footer'
import NavBar from './NavBar'

const Layout = ({children}) => {
    return (
        <>
            <NavBar/>
            <Container text style={{ marginTop: '1.3em' }}>
                {children}
            </Container>
            <Footer />
        </>
    )
}

export default Layout
