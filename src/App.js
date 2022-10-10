import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ScrollToTop from '~/layouts/components/ScrollToTop';
import MasterLayout from '~/layouts/MasterLayout';
import { publicRoutes } from '~/routes';

function App() {
    return (
        <Router>
            <ScrollToTop>
                <MasterLayout>
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Page = route.component;
                            return <Route key={index} path={route.path} element={<Page />} />;
                        })}
                    </Routes>
                </MasterLayout>
            </ScrollToTop>
        </Router>
    );
}

export default App;
