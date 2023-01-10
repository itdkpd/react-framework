import React, { useContext } from 'react'
import { Route, Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { AuthContext } from '../context/authContext'

const PublicRoute = ({ component: Component, ...rest }) => {
    const { authenticated, loading } = useContext(AuthContext)
    if (loading) {
        return null
    }

    return (
        <Route
            {...rest}
            render={(props) =>
                !authenticated && !loading ? <Component {...props} /> : <Navigate to="/tfs" />
            }
        />
    )
}

PublicRoute.propTypes = {
    component: PropTypes.object.isRequired
}

export default PublicRoute
