import jwt_decode from 'jwt-decode';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import ScrollToTop from '~/layouts/components/ScrollToTop';
import MasterLayout from '~/layouts/MasterLayout';
import { privateRoutes, publicRoutes, restrictRoutes } from '~/routes';
import { setCurrentUser } from './features/user/userSlice';

function App() {
    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.user);

    console.log(userLogin);
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
        // eslint-disable-next-line
    }, []);

    return (
        <ScrollToTop>
            <MasterLayout>
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        return <Route key={index} path={route.path} element={<Page />} />;
                    })}
                    {privateRoutes.map((route, index) => {
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    route.roles.includes(userLogin.user.role) ? (
                                        <Page />
                                    ) : userLogin.isLogin ? (
                                        <Navigate to={'/'} />
                                    ) : (
                                        <Navigate to={'/login'} />
                                    )
                                }
                            />
                        );
                    })}
                    {restrictRoutes.map((route, index) => {
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={!userLogin.isLogin ? <Page /> : <Navigate to={'/'} />}
                            />
                        );
                    })}
                </Routes>
            </MasterLayout>
        </ScrollToTop>
    );
}

export default App;
