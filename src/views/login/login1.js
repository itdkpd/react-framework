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

function Login1() {
    // const { loginUser } = useContext(AuthContext)
    const { getValues, setValue, watch, getErrors } = useContext(FormContext)
    const classes = useStyles()
    const useMountEffect = (func) => {
        useEffect(func, [])
    }

    const clear = async () => {
        console.log(getValues())
    }

    useMountEffect(() => {
        // watch('username')
    }, [])
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
                    <NavLink className="app-item-name" exact="true" to="/login">
                        <span>test</span>
                    </NavLink>
                    <NavLink className="app-item-name" exact="true" to="/loader">
                        <span>loader</span>
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
                            <Input validation={{ message: 'required' }}
                                    type="text"
                                    name="username"
                                    aria-label="username" required />
                        </div>
                    </div>
                    <div className="flex-row mt-2">
                        <div className="flex-24">
                            <label htmlFor="Password">Password</label>
                        </div>
                        <div className="flex-23">
                            <Input validation={{ message: 'required' }}
                                    type="password"
                                    name="password"
                                    aria-label="password" required />
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

export default Login1
