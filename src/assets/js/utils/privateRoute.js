import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types'
import { AuthContext } from '../context/authContext'

const PrivateRoute = ({ component: Component }) => {
    const { authenticated, loading } = useContext(AuthContext)
    if (loading) {
        return null
    }

    return authenticated && !loading ? <Component /> : <Navigate to="/login" />
}

PrivateRoute.propTypes = {
    component: PropTypes.object.isRequired
}

export default PrivateRoute
