/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { NavLink } from 'react-router-dom'
import { Container, Menu } from 'semantic-ui-react'

const NavBar = () => {
       return (
        <Menu secondary pointing>
            <Container>
                <Menu.Item as='a' header style={{fontSize: "1.3em"}} >
                    LOTTO COMBO
                </Menu.Item>

                <Menu.Item as={NavLink} to="/winning-numbers" position="right" >
                    Winning Numbers
                </Menu.Item>
                <Menu.Item as={NavLink} to="/top-occurrence" >
                    Top Occurrence
                </Menu.Item>
                <Menu.Item as={NavLink} to="/quick-picks" >
                    Quick Picks
                </Menu.Item>
                <Menu.Item as={NavLink} to="/about">
                    About
                </Menu.Item>
            </Container>
        </Menu>
    )
}

export default NavBar
