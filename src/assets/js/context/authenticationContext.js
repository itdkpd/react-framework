/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
/* eslint-disable react/no-unused-class-component-methods */
/* eslint-disable react/no-unused-state */
/* eslint-disable */
import React, { PureComponent } from 'react'
// import io from 'socket.io-client'
import axios from 'axios'
import { overlaySpinner, disposeSpinner } from '../utils/appSpinner'
import { AuthContext } from './authContext'
// import { getAllowedModules, getUserDetails } from './_authFunctions'
// import LoginService from '../services/login/login.service'
// import config from '../utils/tfs.properties.json'

class AuthenticationContext extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            authenticated: false,
            name: '',
            role: '',
            currentWorkFlowRole: '',
            isFrontOfficeUser: '',
            isBusinessUserMaker: '',
            lastLoginDate: '',
            currentDate: '',
            userId: '',
            listOfSideMenuModules: [],
            listOfActionsModules: [],
            webSocket: null
        }
    }

    setStateLogin(response) {
        this.setState({
            name: response.data.user.userName,
            role: response.data.user.role,
            currentWorkFlowRole: response.data.currentWorkFlowRole,
            isFrontOfficeUser: response.data.user.isFrontOfficeUser,
            isBusinessUserMaker: response.data.isBusinessUserMaker,
            lastLoginDate: response.data.user.lastLoginDate,
            currentDate: response.data.user.currentDate,
            userId: response.data.user.userId
        })
    }

    setStateLogout() {
        this.setState({
            authenticated: false,
            name: '',
            role: '',
            currentWorkFlowRole: '',
            isFrontOfficeUser: '',
            isBusinessUserMaker: '',
            lastLoginDate: '',
            currentDate: '',
            userId: '',
            listOfSideMenuModules: [],
            webSocket: null,
            allUnactedTransactions: 0,
            userAllUnactedTransactions: 0,

            listOfYears: [],
        })
    }

    componentDidMount() {
        // axios.defaults.baseURL = config.gateway
        if (
            sessionStorage.getItem('request') === 'requestSession' ||
            localStorage.getItem('request') === 'requestSession'
        ) {
            // getUserDetails((response) => {
            //     this.initializeWebSocket()
            //     this.setStateLogin(response)
            //     this.getAllModulesOnReload()
            // },
            // () => {
            //     this.setState({ loading: false, authenticated: false })
            // })
            this.setState({ loading: false, authenticated: false })
        } else {
            this.setState({ loading: false, authenticated: false })
        }
    }

    // setActionsModules = (value) => {
    //     this.setState({ listOfActionsModules: value })
    // }

    logoutUser = () => {
        // const uid = overlaySpinner()
        // LoginService()
        //     .logout()
        //     .then((response) => {
        //         if (response.status === 200) {
        //             sessionStorage.removeItem('request')
        //             localStorage.removeItem('request')
        //             if (this.state.webSocket) {
        //                 this.state.webSocket.close()
        //             }
        //             this.setStateLogout()
        //         }
        //         disposeSpinner(uid)
        //     })
        //     .catch(() => {
        //         $('#notificationBoard').nb('push', {
        //             message: 'Something went wrong please try again later',
        //             status: 'danger',
        //         })
        //         disposeSpinner(uid)
        //     })
        return this
    }

    loginUser = () => {
        // this.initializeWebSocket()
        // getUserDetails((response) => {
        //     if (response.status === 200) {
        //         this.setStateLogin(response)
        //         this.getAllModules()
        //     }
        // },
        // () => {
        //     this.setState({ loading: false, authenticated: false })
        // })
        return this
    }

    // setSideMenuModules = (value) => {
    //     this.setState({
    //         listOfSideMenuModules: value,
    //     })
    // }

    // handleIncomingMessages = (client) => {
    //     const authenticationContext = this
    //     $('#notificationBoard').nb('INITIALIZE')
    //     client.emit(
    //         'receivePendingNotifications',
    //         JSON.stringify({
    //             type: 'receivePendingNotifications',
    //             from: authenticationContext.state.userId,
    //             user: authenticationContext.state.name,
    //         }),
    //     )
    //     client.on('message', function incoming(message) {
    //         const dataFromServer = JSON.parse(message)
    //         if (dataFromServer.type === 'notification') {
    //             $('#notificationBoard').nb('push', {
    //                 message: dataFromServer.msg,
    //                 status: 'info',
    //             })
    //         } else if (dataFromServer.type === 'message') {
    //             $('#notificationBoard').nb('push', {
    //                 message: `${dataFromServer.from || dataFromServer.user}: ${dataFromServer.msg}`,
    //                 status: 'info',
    //             })
    //         }
    //     })

    //     client.emit(
    //         'updateUsersUnactedTransaction',
    //         JSON.stringify({
    //             type: 'updateUsersUnactedTransaction',
    //             from: authenticationContext.state.name,
    //             user: authenticationContext.state.name,
    //             to: authenticationContext.state.userId,
    //         }),
    //     )

    //     client.on('requestUpdate', function incoming() {
    //         client.emit(
    //             'receiveUpdateSignal',
    //             JSON.stringify({
    //                 type: 'receiveUpdateSignal',
    //                 from: authenticationContext.state.name,
    //                 user: authenticationContext.state.name,
    //                 to: authenticationContext.state.userId,
    //             }),
    //         )
    //     })

    //     client.on('receiveUpdate', function incoming(message) {
    //         const dataFromServer = JSON.parse(message)
    //         authenticationContext.setState({
    //             allUnactedTransactions: dataFromServer.unactedTransaction.allUnactedTransaction,
    //             userAllUnactedTransactions:
    //                 dataFromServer.unactedTransaction.userUnactedTransaction,
    //         })
    //     })

    //     if(authenticationContext.state.listOfSideMenuModules && authenticationContext.state.listOfSideMenuModules.length === 0) {
    //         $('#notificationBoard').nb('push', {
    //             message: 'Access matrix is not yet defined for your role.',
    //             status: 'warning',
    //         })
    //     }
    // }

    // initializeWebSocket = () => {
    //     const Client = new io(config.gateway, {
    //         path: '/trade-finance/socket.io',
    //         autoConnect: false,
    //         forceNew: true,
    //         reconnection: true,
    //         transports: ['polling'],
    //         reconnectionDelay: 20000,
    //         reconnectionDelayMax: 20000,
    //         upgrade: true,
    //         withCredentials: true,
    //         transportOptions: {
    //             polling: {
    //                 extraHeaders: {
    //                     'x-client-room': 'aUtHoR1Z3DtFsRo0m',
    //                 },
    //             },
    //         },
    //     })

    //     Client.open()

    //     Client.on('reconnect_attempt', () => {
    //         Client.io.opts.transports = ['polling']
    //     })

    //     Client.on('error', (error) => {
    //         console.log(error)
    //     })

    //     Client.on('ping', () => {
    //         // console.log('ping')
    //     })

    //     Client.on('connect', () => {
    //         // console.info('connected')
    //     })

    //     Client.on('disconnect', () => {
    //         // console.log('disconnected')
    //     })

    //     Client.on('reconnect_error', () => {
    //         // Client.open();
    //     })

    //     this.setState({ webSocket: Client })
    // }

    // getAllModulesOnReload = () => {
    //     getAllowedModules((response) => {
    //         if (response.data.length > 0) {
    //             this.setState({
    //                 loading: false,
    //                 authenticated: true,
    //                 listOfSideMenuModules: response.data,
    //             })
    //         } else {
    //             this.setState({
    //                 loading: false,
    //                 authenticated: true,
    //             })
    //         }
    //     },
    //     () => {
    //         this.setState({ loading: false, authenticated: false })
    //     })
    // }

    // getAllModules = () => {
    //     getAllowedModules((response) => {
    //         if (response.data.length > 0) {
    //             this.setState({
    //                 listOfSideMenuModules: response.data,
    //                 authenticated: true,
    //             })
    //         } else {
    //             this.setState({
    //                 authenticated: true,
    //             })
    //         }
    //     },
    //     () => {
    //         this.setState({ authenticated: false })
    //     })
    // }

    render() {
        const defaultContext = {
            authenticated: this.state.authenticated,
            loading: this.state.loading,
            logoutUser: this.logoutUser,
            name: this.state.name,
            role: this.state.role,
            currentDate: this.state.currentDate,
            userId: this.state.userId,
            loginUser: this.loginUser,
            handleIncomingMessages: this.handleIncomingMessages,
            webSocket: this.state.webSocket,
            listOfSideMenuModules: this.state.listOfSideMenuModules,
            listOfActionsModules: this.state.listOfActionsModules,

            setSideMenuModules: this.setSideMenuModules,
            setActionsModules: this.setActionsModules,
            currentWorkFlowRole: this.state.currentWorkFlowRole,
            isFrontOfficeUser: this.state.isFrontOfficeUser,
            isBusinessUserMaker: this.state.isBusinessUserMaker,
            lastLoginDate: this.state.lastLoginDate
        }

        if (this.state.loading) {
            return null
        }

        return (
            <AuthContext.Provider value={React.memo(defaultContext)}>
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}
AuthenticationContext.contextType = AuthContext

export default AuthenticationContext
