import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { publicRoutes } from '~/routes';
import MasterLayout from '~/layouts/MasterLayout';

function App() {
    return (
        <BrowserRouter>
            <MasterLayout>
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={<Page />}
                            />
                        );
                    })}
                </Routes>
            </MasterLayout>
        </BrowserRouter>
    );
}

export default App;
