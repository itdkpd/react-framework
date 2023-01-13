/* eslint-disable */
import React, { useContext, useEffect, useReducer, useRef, useMemo } from 'react'
import useStyles from './style1'
import Input from '../../components/atoms/appInput'
import { NavLink } from 'react-router-dom'
// import LoginService from '../assets/javascripts/services/login/login.service'
import { overlaySpinner, disposeSpinner } from '../../assets/js/utils/appSpinner'
import { AuthContext } from '../../assets/js/context/authContext'
import { FormContext } from '../../assets/js/context/formContext'
import packageJson from '../../../package.json'

const Login = () => {
    const classes = useStyles()
    // const { loginUser } = useContext(AuthContext)
    const { initState, setState, getState } = useContext(FormContext)

    useEffect(() => {
        initState({
            // fields
            username: 'username',
            password: 'password',

            // variables
            testing: 'qwerty',
        })
    }, [])

    const clear = async () => {
        setState({ testing: 'q1', username: 's1', password: '' })
        getState('testing')
    }

    const authenticateUser = (data) => {
        const { username, password } = data
        if(username && password) {
            // const uid = overlaySpinner()
            // LoginService()
            //     .authenticateUser(username, password)
            //     .then((response) => {
            //         if (response.status === 200 && response.data.token) {
            //             sessionStorage.setItem('request', 'requestSession')
            //             localStorage.setItem('request', 'requestSession')
            //             disposeSpinner(uid)
            //             loginUser()
            //         } else if (response.data.message) {
            //             disposeSpinner(uid)
            //         }
            //     })
            //     .catch(() => {
            //         disposeSpinner(uid)
            //     })
        }
    }

    return (
        <div className={classes.root}>
            <div className="flex-row">
                <div className="flex-24">
                    <h1>Sign In</h1>
                    <NavLink className="app-item-name" exact="true" to="/login1">
                        <span>test</span>
                    </NavLink>
                    <NavLink className="app-item-name" exact="true" to="/loader">
                        <span>{ getState('testing') }</span>
                    </NavLink>
                </div>
            </div>
            <div className={classes.loginContainer}>
                <form>
                    <div className="flex-row">
                        <div className="flex-24">
                            <label htmlFor="Username">User Name</label>
                        </div>
                        <div className="flex-23">
                            <Input name="username" required />
                        </div>
                    </div>
                    <div className="flex-row mt-2">
                        <div className="flex-24">
                            <label htmlFor="Password">Password</label>
                        </div>
                        <div className="flex-23">
                            <Input type="password" name="password" required />
                        </div>
                    </div>
                    <div className="flex-row mt-5">
                        <div className="flex-24">
                            <input
                                type="submit"
                                value="Login"
                                className="btn-success"
                                disabled
                            />
                        </div>
                    </div>
                    <div className="flex-row mt-5">
                        <div className="flex-24">
                            <input
                                onClick={clear}
                                type="button"
                                value="Clear"
                                className="btn-success"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
