import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { publicRoutes } from '~/routes';
import MasterLayout from '~/layouts/MasterLayout';
import ScrollToTop from '~/layouts/components/ScrollToTop';

function App() {
    return (
        <Router>
            <ScrollToTop>
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
            </ScrollToTop>
        </Router>
    );
}

export default App;
