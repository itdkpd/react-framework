import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const checkRequests = (Wrapped) => {
    function CheckRequests() {
        const history = useHistory()
        useEffect(() => {
            axios.interceptors.response.use(
                (response) => {
                    // Do something with response data
                    return response
                },
                (error) => {
                    let path
                    switch (error.response.status) {
                        case 401:
                            path = '/401'
                            history.push(path) // we will redirect user into 401 page
                            break
                        case 403:
                            path = '/403'
                            history.push(path) // we will redirect user into 403 page
                            break
                        case 500:
                            path = '/500'
                            history.push(path) // we will redirect user into 500 page
                            break
                        default:
                            break
                    }
                    return Promise.reject(error)
                },
            )
        })

        return <Wrapped />
    }
    return CheckRequests
}

export default checkRequests
