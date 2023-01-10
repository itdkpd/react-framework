import { overlaySpinner, disposeSpinner } from '../utils/appSpinner'
import SideMenuService from '../services/sideMenu/sideMenu.service'
import LoginService from '../services/login/login.service'

export const getUserDetails = (callbackSuccess, callbackError) => {
    const uid = overlaySpinner()
        LoginService()
        .getUserData()
            .then((response) => {
                if(response.status === 200) {
                    callbackSuccess(response)
                } else {
                    callbackError()
                }
                disposeSpinner(uid)
            })
            .catch(() => {
                callbackError()
                disposeSpinner(uid)
            })
}

export const getAllowedModules = (callbackSuccess, callbackError) => {
    const uid = overlaySpinner()
    SideMenuService().getAllowedModules()
        .then((response) => {
            if(response.status === 200) {
                callbackSuccess(response)
            } else {
                callbackError()
            }
            disposeSpinner(uid)
        })
        .catch(() => {
            callbackError()
            disposeSpinner(uid)
        })
}
