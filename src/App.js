/* eslint-disable */
import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthenticationContext from './assets/js/context/authenticationContext'
import FormInputContext from './assets/js/context/formInputContext'
import Loader from './views/loader'

const Login = lazy(() => import('./views/login/login'));
const Login1 = lazy(() => import('./views/login/login1'));
// const MainView = lazy(() => import('./views/mainView'));
const PrivateRoute = lazy(() => import('./assets/js/utils/privateRoute'));
const PublicRoute = lazy(() => import('./assets/js/utils/publicRoute'));

const App = () => {
    return (
        // <AuthenticationContext>
            <FormInputContext>
                <BrowserRouter>
                    <Suspense fallback={<Loader />}>
                        <Routes>
                            <Route exact path="/login" element={<Login />} />
                            <Route exact path="/login1" element={<Login1 />} />
                            <Route exact path="/loader" element={<Loader />} />
                            {/* <PrivateRoute component={MainView} /> */}
                        </Routes>
                    </Suspense>
                </BrowserRouter>
            </FormInputContext>
        // </AuthenticationContext>
    )
}

export default App
