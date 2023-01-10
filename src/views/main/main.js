import React, { useContext, Suspense, lazy, useRef, useState } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../../assets/javascripts/context/authContext'
import checkRequest from '../../assets/js/utils/checkRequest'

const Headers = lazy(() => import('../layouts/header'))
const SideMenu = lazy(() => import('../layouts/sideMenu'))
const Home = lazy(() => import('../modules/home/home'))

function MainView() {
    const { listOfSideMenuModules } = useContext(AuthContext)

    const componentMap = {
    }

    const generateRoute = () => {
        const node = () => {
            return (
                <>
                    {listOfSideMenuModules.map((item, index) => (
                        <React.Fragment key={item.modId}>
                            {item.modUrl !== '' && item.modUrl !== 'null' && item.modUrl && (
                                <Route
                                    exact
                                    path={item.modUrl}
                                    component={componentMap[item.modName]}
                                />
                            )}
                        </React.Fragment>
                    ))}
                </>
            )
        }

        return node()
    }

    const checkPathIfExists = (path) => {
        let array
        if (path === '/' || path === '/tfs') {
            return <Redirect to="/tfs" />
        }
        if (listOfSideMenuModules.length > 0) {
            array = listOfSideMenuModules.filter((item) => {
                if (path === item.modUrl) {
                    return item
                }

                return false
            })
            if (array.length > 0) {
                return null
            }
            return <Redirect to="/404" />
        }
        return <Redirect to="/404" />
    }

    return (
        <div className="main-container">
            <Suspense fallback={<></>}>
                <Headers />
                <SideMenu />
                <FormProvider {...methods}>
                    <div className="main">
                        <div className="app-container">
                            <Route exact path="/tfs" component={Home} />
                            {generateRoute()}
                            <Route render={(props) => checkPathIfExists(props.location.pathname)} />
                        </div>
                    </div>
                    <IdleTimer />
                </FormProvider>
            </Suspense>
        </div>
    )
}

export default checkRequest(MainView)
