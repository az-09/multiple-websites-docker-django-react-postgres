import React from 'react'
import { Route } from 'react-router-dom'

const RenderRoute = (route) => {

    const { path, component, title } = route
    document.tile = title || 'Lotto Combo Search'

    return (
        <Route path={path} exact component={component} />
    )
}

export default RenderRoute
