import jwt_decode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import ScrollToTop from '~/layouts/components/ScrollToTop';
import MasterLayout from '~/layouts/MasterLayout';
import { privateRoutes, publicRoutes, restrictRoutes } from '~/routes';
import { setCurrentUser } from './features/user/userSlice';

function App() {
    const dispatch = useDispatch();
    const [lastSessionLoaded, setLastSessionLoaded] = useState(false);

    const userLogin = useSelector(state => state.user);

    useEffect(() => {
        //Check access token exists in local storage
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken) {
            //Check token expired
            const jwtPayload = jwt_decode(accessToken);

            if (!(jwtPayload.exp * 1000 < new Date().getTime())) {
                dispatch(setCurrentUser(accessToken));
            } else {
                //Hết hạn
            }
        }
        setLastSessionLoaded(true);
        // eslint-disable-next-line
    }, []);

    return (
        <>
            {lastSessionLoaded && (
                <ScrollToTop>
                    <MasterLayout>
                        <Routes>
                            {/* Public Routes */}
                            {publicRoutes.map((route, index) => {
                                const Page = route.component;
                                return <Route key={index} path={route.path} element={<Page />} />;
                            })}

                            {/* Private Routes */}
                            {privateRoutes.map((route, index) => {
                                const Page = route.component;
                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            userLogin.isLogin ? (
                                                route.roles.includes(userLogin.user.role) ? (
                                                    <Page />
                                                ) : (
                                                    <Navigate to={'/'} />
                                                )
                                            ) : (
                                                <Navigate to={'/login'} />
                                            )
                                        }
                                    />
                                );
                            })}

                            {/* Restrict Routes */}
                            {restrictRoutes.map((route, index) => {
                                const Page = route.component;
                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={!userLogin.isLogin ? <Page /> : <Navigate to={-1} />}
                                    />
                                );
                            })}
                        </Routes>
                    </MasterLayout>
                </ScrollToTop>
            )}
        </>
    );
}

export default App;
